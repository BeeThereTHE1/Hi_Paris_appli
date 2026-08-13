'use strict';

// backend/test.js
// Improved test script for verifying Supabase connectivity and fetching rows from a table.
// - Safer TLS handling (only disabled when DISABLE_TLS_VERIFY=true)
// - Configurable table and row limit via env vars
// - Proper error handling and exit codes
// - Exports testerConnexion for reuse in other scripts/tests

if (process.env.DISABLE_TLS_VERIFY === 'true') {
  // Only disable TLS verification when explicitly requested (e.g., in a controlled dev environment)
  // WARNING: Disabling TLS verification is insecure. Do not enable in production.
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  console.warn('⚠️  SSL verification disabled (DISABLE_TLS_VERIFY=true). This is insecure — use only in development.');
}

const { supabase } = require('./supabaseClient');

/**
 * Test connection to Supabase and fetch rows from a table.
 * @param {Object} [options]
 * @param {string} [options.table] - Table name to query (default: process.env.SUPABASE_TEST_TABLE || 'users')
 * @param {number} [options.limit] - Max number of rows to fetch (default: process.env.SUPABASE_TEST_LIMIT || 100)
 */
async function testerConnexion(options = {}) {
  const table = options.table || process.env.SUPABASE_TEST_TABLE || 'users';
  const limit = Number.isFinite(options.limit) ? options.limit : parseInt(process.env.SUPABASE_TEST_LIMIT, 10) || 100;

  console.log(`⏳ Attempting to fetch up to ${limit} row(s) from Supabase table "${table}"...`);

  try {
    const query = supabase.from(table).select('*');
    if (limit > 0) query.limit(limit);

    const { data, error } = await query;

    if (error) {
      console.error('❌ Supabase returned an error:', error);
      return { success: false, error };
    }

    console.log('✅ Query succeeded. Retrieved rows:');
    console.log(JSON.stringify(data, null, 2));
    return { success: true, data };
  } catch (err) {
    console.error('❌ Unexpected error while querying Supabase:', err);
    return { success: false, error: err };
  }
}

// Allow running the script directly: `node backend/test.js`
if (require.main === module) {
  testerConnexion()
    .then((result) => {
      if (!result.success) process.exitCode = 1;
    })
    .catch((err) => {
      console.error('Unhandled error:', err);
      process.exitCode = 1;
    });
}

module.exports = { testerConnexion };