// backend/supabaseClient.js
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });


const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// Crée et exporte la connexion à la base de données
const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log("✅ Fichier supabaseClient chargé Version Supabase 20260504!");

module.exports = { supabase };
