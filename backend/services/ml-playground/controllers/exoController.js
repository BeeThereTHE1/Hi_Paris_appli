'use strict';

const { supabase } = require('../../../supabaseClient');
const { Exercise } = require('../models/exoModel');

function createHttpError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

async function resolveUserId(rawUserId) {
  if (!rawUserId) return null;

  const normalized = String(rawUserId).trim();
  if (!normalized) return null;

  const isEmailLike = normalized.includes('@');
  if (!isEmailLike) return normalized;

  const { data, error } = await supabase
    .from('users')
    .select('id')
    .eq('email', normalized.toLowerCase())
    .maybeSingle();

  if (error) {
    throw createHttpError(500, 'Unable to resolve user from email.');
  }

  if (!data || !data.id) {
    throw createHttpError(404, 'User not found for provided email.');
  }

  return data.id;
}

async function getProgressFromMlTable(exerciseId, userId) {
  const { data, error } = await supabase
    .from('ml_playground_progress')
    .select('*')
    .eq('exercise_id', exerciseId)
    .eq('user_id', userId)
    .maybeSingle();

  if (error) {
    return { data: null, error, source: 'ml_playground_progress' };
  }

  return { data, error: null, source: 'ml_playground_progress' };
}

async function getProgressFromLegacyTable(exerciseId, rawUserId, resolvedUserId) {
  const isEmailLike = String(rawUserId).includes('@');
  const baseQuery = supabase.from('progress').select('*').eq('official_id', exerciseId);

  const query = isEmailLike ? baseQuery.eq('email', String(rawUserId).toLowerCase()) : baseQuery.eq('user_id', resolvedUserId);

  const { data, error } = await query.maybeSingle();

  if (error) {
    return { data: null, error, source: 'progress' };
  }

  return { data, error: null, source: 'progress' };
}

function normalizeProgress(progressRow) {
  if (!progressRow) return null;

  const scoreDetails = progressRow.score_details && typeof progressRow.score_details === 'object' ? progressRow.score_details : {};

  return {
    id: progressRow.id,
    user_id: progressRow.user_id || progressRow.email || null,
    exercise_id: progressRow.exercise_id || progressRow.official_id || null,
    status: progressRow.status || 'IN_PROGRESS',
    current_step: Number.isInteger(progressRow.current_step) ? progressRow.current_step : 0,
    score_details: scoreDetails,
    completed_at: progressRow.completed_at || null,
    created_at: progressRow.created_at || null,
    updated_at: progressRow.updated_at || null,
  };
}

async function upsertMlProgress(payload) {
  const { data, error } = await supabase
    .from('ml_playground_progress')
    .upsert(payload, { onConflict: 'user_id,exercise_id' })
    .select('*')
    .single();

  return { data, error, source: 'ml_playground_progress' };
}

async function upsertLegacyProgress(payload, rawUserId) {
  const isEmailLike = String(rawUserId).includes('@');
  const legacyPayload = {
    status: payload.status,
    score_details: payload.score_details,
    completed_at: payload.completed_at,
    updated_at: new Date().toISOString(),
  };

  if (Number.isInteger(payload.current_step)) {
    legacyPayload.current_step = payload.current_step;
  }

  if (isEmailLike) {
    legacyPayload.email = String(rawUserId).toLowerCase();
    legacyPayload.official_id = payload.exercise_id;
  } else {
    legacyPayload.user_id = payload.user_id;
    legacyPayload.exercise_id = payload.exercise_id;
  }

  const onConflict = isEmailLike ? 'email,official_id' : 'user_id,exercise_id';

  const { data, error } = await supabase
    .from('progress')
    .upsert(legacyPayload, { onConflict })
    .select('*')
    .single();

  return { data, error, source: 'progress' };
}

async function getExerciseById(req, res, next) {
  try {
    const exoId = Number(req.params.exoId);
    const exercise = Exercise.loadExerciseById(exoId);

    if (!exercise) {
      throw createHttpError(404, `Exercise ${exoId} not found.`);
    }

    res.status(200).json({ success: true, data: exercise.toJSON() });
  } catch (error) {
    next(error);
  }
}

async function getAllExercises(req, res, next) {
  try {
    const limit = Math.min(parseInt(req.query.limit || '50', 10), 200);
    const offset = Math.max(parseInt(req.query.offset || '0', 10), 0);

    const { items, total } = Exercise.getAllExercises({ limit, offset });

    res.status(200).json({
      success: true,
      data: items,
      pagination: {
        total,
        limit,
        offset,
        count: items.length,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function getUserProgress(req, res, next) {
  try {
    const exoId = Number(req.params.exoId);
    const rawUserId = req.params.userId;
    const resolvedUserId = await resolveUserId(rawUserId);

    let progress = await getProgressFromMlTable(exoId, resolvedUserId);

    if (progress.error || !progress.data) {
      progress = await getProgressFromLegacyTable(exoId, rawUserId, resolvedUserId);
      if (progress.error) {
        throw createHttpError(500, 'Unable to load exercise progress.');
      }
    }

    res.status(200).json({ success: true, data: normalizeProgress(progress.data) });
  } catch (error) {
    next(error);
  }
}

async function saveUserProgress(req, res, next) {
  try {
    const exoId = Number(req.params.exoId);
    const rawUserId = req.body.user_id;

    const validation = Exercise.validateProgressData(req.body);
    if (!validation.isValid) {
      throw createHttpError(400, validation.errors.join(' '));
    }

    const resolvedUserId = await resolveUserId(rawUserId);

    if (!resolvedUserId) {
      throw createHttpError(400, 'user_id is required.');
    }

    const payload = {
      user_id: resolvedUserId,
      exercise_id: exoId,
      status: validation.value.status,
      current_step: validation.value.current_step,
      score_details: validation.value.score_details,
      completed_at: validation.value.status === 'COMPLETED' ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    };

    let saved = await upsertMlProgress(payload);

    if (saved.error) {
      saved = await upsertLegacyProgress(payload, rawUserId);
      if (saved.error) {
        throw createHttpError(500, 'Unable to save exercise progress.');
      }
    }

    res.status(201).json({ success: true, data: normalizeProgress(saved.data) });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getExerciseById,
  getAllExercises,
  getUserProgress,
  saveUserProgress,
};
