'use strict';

class ApiClient {
  constructor(options = {}) {
    this.baseUrl = options.baseUrl || '/api/ml-playground';
    this.cacheEnabled = options.cacheEnabled !== false;
    this.cache = new Map();
  }

  getExercise(exoId) {
    const cacheKey = `exercise:${exoId}`;

    if (this.cacheEnabled && this.cache.has(cacheKey)) {
      return Promise.resolve(this.cache.get(cacheKey));
    }

    return this._request(`/exos/${encodeURIComponent(exoId)}`)
      .then((payload) => {
        if (this.cacheEnabled && payload) {
          this.cache.set(cacheKey, payload);
        }
        return payload;
      });
  }

  getProgress(exoId, userId) {
    if (!userId) return Promise.resolve(null);

    const encodedUserId = encodeURIComponent(userId);
    return this._request(`/exos/${encodeURIComponent(exoId)}/progress/${encodedUserId}`);
  }

  saveProgress(exoId, userId, data = {}) {
    if (!userId) {
      return Promise.reject(new Error('userId is required to save progress.'));
    }

    const payload = {
      user_id: userId,
      status: data.status || 'IN_PROGRESS',
      current_step: Number.isInteger(data.current_step) ? data.current_step : 0,
      score_details: data.score_details && typeof data.score_details === 'object' ? data.score_details : {},
    };

    return this._request(`/exos/${encodeURIComponent(exoId)}/progress`, {
      method: 'POST',
      body: payload,
    });
  }

  getAllExercises(options = {}) {
    const search = new URLSearchParams();

    if (options.limit !== undefined) search.set('limit', String(options.limit));
    if (options.offset !== undefined) search.set('offset', String(options.offset));

    const suffix = search.toString() ? `/exos?${search.toString()}` : '/exos';
    return this._request(suffix, { raw: true });
  }

  async _request(path, options = {}) {
    const requestOptions = {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    };

    if (options.body !== undefined) {
      requestOptions.body = JSON.stringify(options.body);
    }

    const response = await fetch(`${this.baseUrl}${path}`, requestOptions);

    let payload = null;
    try {
      payload = await response.json();
    } catch (error) {
      payload = null;
    }

    if (!response.ok) {
      const message = payload && (payload.error || payload.message)
        ? payload.error || payload.message
        : `Request failed with status ${response.status}`;
      throw new Error(message);
    }

    if (!payload) return null;
    if (options.raw) return payload;
    return payload.data !== undefined ? payload.data : payload;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ApiClient;
}

if (typeof window !== 'undefined') {
  window.MLPlaygroundApiClient = ApiClient;
}
