// backend/supabaseClient.js
'use strict';

const path = require('path');

/**
 * Load .env only in non-production environments so deployed apps rely on real env vars.
 * This keeps production behavior predictable and avoids accidentally reading a local .env.
 */
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
}

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

/**
 * Fail fast when required environment variables are missing.
 * This prevents obscure runtime errors later when the client is used.
 * @param {string} name - environment variable name
 * @param {string|undefined} value - environment variable value
 */
function assertEnv(name, value) {
  if (!value) {
    // Throwing here stops startup so it's obvious what's misconfigured.
    throw new Error(
      `Missing required environment variable ${name}. ` +
      `Set ${name} in your environment (or ../.env for local development).`
    );
  }
}

assertEnv('SUPABASE_URL', SUPABASE_URL);
assertEnv('SUPABASE_ANON_KEY', SUPABASE_ANON_KEY);

/**
 * Default singleton Supabase client used by the app.
 * Use createSupabaseClient below if you need an independent client (for tests or multiple projects).
 */
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Factory to create a new Supabase client. Useful for tests or when you need
 * multiple clients with different keys/URLs.
 * @param {{url?: string, key?: string}} [opts]
 * @returns {import('@supabase/supabase-js').SupabaseClient}
 */
function createSupabaseClient(opts = {}) {
  const url = opts.url || SUPABASE_URL;
  const key = opts.key || SUPABASE_ANON_KEY;
  assertEnv('SUPABASE_URL', url);
  assertEnv('SUPABASE_ANON_KEY', key);
  return createClient(url, key);
}

/**
 * Minimal logging: show success message only in non-production to avoid leaking info.
 */
if (process.env.NODE_ENV !== 'production') {
  console.log('✅ supabaseClient loaded (dev).');
}

module.exports = {
  supabase,
  createSupabaseClient,
};
