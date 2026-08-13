// Only bypass TLS in development (not recommended for production)
if (process.env.NODE_ENV === 'development') {
  // For local dev where you control the environment:
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

require('express-async-errors'); // allows throwing in async route handlers
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();
const { supabase } = require('./supabaseClient');

const app = express();
const PORT = process.env.PORT || 3001;

// Security & basic hardening
app.disable('x-powered-by');
app.use(helmet());

// Logging
app.use(morgan(process.env.MORGAN_FORMAT || 'combined'));

// CORS: restrictable via env var CORS_ORIGIN (comma-separated) or fallback to true for quick dev
const corsOrigin = process.env.CORS_ORIGIN;
const corsOptions = corsOrigin
  ? { origin: corsOrigin.split(',').map(s => s.trim()) }
  : { origin: true }; // change to a specific origin for production
app.use(cors(corsOptions));

app.use(express.json());

// ─────────────────────────────────────────────
// SANTÉ DU SERVEUR
// ─────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: '🚀 Serveur HiParis en ligne !' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', time: new Date().toISOString() });
});

// Utility: uniform error throw helper
function throwWithStatus(status, message) {
  const err = new Error(message);
  err.status = status;
  throw err;
}

// ─────────────────────────────────────────────
// ROUTES : UTILISATEURS (users)
// ─────────────────────────────────────────────

// Créer ou mettre à jour un utilisateur (upsert à l'inscription/login)
app.post('/api/users', async (req, res) => {
  const { email, nom, prenom, ecole, role } = req.body;

  if (!email) return res.status(400).json({ error: 'email requis' });

  const { data, error } = await supabase
    .from('users')
    .upsert(
      { email, nom, prenom, ecole, role },
      { onConflict: 'email' }
    )
    .select()
    .single();

  if (error) throwWithStatus(500, error.message);
  res.json(data);
});

// Récupérer un utilisateur par email
app.get('/api/users/:email', async (req, res) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', req.params.email)
    .single();

  if (error) throwWithStatus(404, 'Utilisateur introuvable');
  res.json(data);
});

// Récupérer tous les enseignants (avec pagination)
app.get('/api/users/role/teachers', async (req, res) => {
  const limit = Math.min(parseInt(req.query.limit || '50', 10), 200);
  const offset = Math.max(parseInt(req.query.offset || '0', 10), 0);

  const { data, error } = await supabase
    .from('users')
    .select('id, email, prenom, nom')
    .eq('role', 'TEACHER')
    .range(offset, offset + limit - 1);

  if (error) throwWithStatus(500, error.message);
  res.json(data);
});

// ─────────────────────────────────────────────
// ROUTES : EXERCICES (exercises)
// ─────────────────────────────────────────────

// Récupérer tous les exercices officiels (le catalogue public) with pagination / filtering
app.get('/api/exercises', async (req, res) => {
  const limit = Math.min(parseInt(req.query.limit || '50', 10), 200);
  const offset = Math.max(parseInt(req.query.offset || '0', 10), 0);
  const visibility = req.query.visibility; // optional

  let query = supabase
    .from('exercises')
    .select('id, title, description, config_json, creator_id, is_official, visibility, created_at')
    .eq('is_official', true)
    .order('created_at', { ascending: true });

  if (visibility) query = query.eq('visibility', visibility);

  const { data, error } = await query.range(offset, offset + limit - 1);

  if (error) throwWithStatus(500, error.message);
  res.json(data);
});

// Récupérer les exercices d'un créateur spécifique
app.get('/api/exercises/creator/:userId', async (req, res) => {
  const { data, error } = await supabase
    .from('exercises')
    .select('*')
    .eq('creator_id', req.params.userId)
    .order('created_at', { ascending: false });

  if (error) throwWithStatus(500, error.message);
  res.json(data);
});

// Récupérer un exercice par ID
app.get('/api/exercises/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('exercises')
    .select('*')
    .eq('id', req.params.id)
    .single();

  if (error) throwWithStatus(404, 'Exercice introuvable');
  res.json(data);
});

// Créer un nouvel exercice (depuis le Studio)
// config_json : { css: "...", hash: "..." }
app.post('/api/exercises', async (req, res) => {
  const { title, description, config_json, creator_id, visibility } = req.body;
  if (!title || !config_json) return res.status(400).json({ error: 'title et config_json sont requis' });

  const { data, error } = await supabase
    .from('exercises')
    .insert({ title, description, config_json, creator_id, is_official: false, visibility: visibility || 'PRIVATE' })
    .select()
    .single();

  if (error) throwWithStatus(500, error.message);
  res.status(201).json(data);
});

// Mettre à jour un exercice (ex: rendre officiel)
app.patch('/api/exercises/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('exercises')
    .update({ ...req.body, updated_at: new Date().toISOString() })
    .eq('id', req.params.id)
    .select()
    .single();

  if (error) throwWithStatus(500, error.message);
  res.json(data);
});

// ─────────────────────────────────────────────
// ROUTES : SOUMISSIONS (exercise_submissions)
// ─────────────────────────────────────────────

// Soumettre un exercice à un enseignant pour validation
app.post('/api/submissions', async (req, res) => {
  const { exercise_id, student_id, teacher_id } = req.body;
  if (!exercise_id || !student_id || !teacher_id) {
    return res.status(400).json({ error: 'exercise_id, student_id et teacher_id sont requis' });
  }

  const { data, error } = await supabase
    .from('exercise_submissions')
    .insert({ exercise_id, student_id, teacher_id, status: 'PENDING' })
    .select()
    .single();

  if (error) throwWithStatus(500, error.message);
  res.status(201).json(data);
});

// Récupérer les soumissions reçues par un enseignant
app.get('/api/submissions/teacher/:teacherId', async (req, res) => {
  const { data, error } = await supabase
    .from('exercise_submissions')
    .select('*, exercises(title, description), users!student_id(prenom, nom, email)')
    .eq('teacher_id', req.params.teacherId)
    .eq('status', 'PENDING')
    .order('created_at', { ascending: false });

  if (error) throwWithStatus(500, error.message);
  res.json(data);
});

// Approuver ou rejeter une soumission (action du prof)
app.patch('/api/submissions/:id', async (req, res) => {
  const { status, feedback } = req.body; // status: 'APPROVED' ou 'REJECTED'
  if (!['APPROVED', 'REJECTED'].includes(status)) {
    return res.status(400).json({ error: 'status doit être APPROVED ou REJECTED' });
  }

  const { data, error } = await supabase
    .from('exercise_submissions')
    .update({ status, feedback })
    .eq('id', req.params.id)
    .select()
    .single();

  // Si approuvé, rendre l'exercice officiel dans le catalogue
  if (!error && status === 'APPROVED' && data.exercise_id) {
    await supabase
      .from('exercises')
      .update({ is_official: true, visibility: 'PUBLIC' })
      .eq('id', data.exercise_id);
  }

  if (error) throwWithStatus(500, error.message);
  res.json(data);
});

// ─────────────────────────────────────────────
// ROUTES : PROGRESSION (progress)
// ─────────────────────────────────────────────

// Récupérer la progression d'un utilisateur (tout son historique)
app.get('/api/progress/:userId', async (req, res) => {
  const { data, error } = await supabase
    .from('progress')
    .select('*, exercises(title, is_official)')
    .eq('user_id', req.params.userId)
    .order('created_at', { ascending: false });

  if (error) throwWithStatus(500, error.message);
  res.json(data);
});

// Sauvegarder ou mettre à jour la progression sur un exercice
app.post('/api/progress', async (req, res) => {
  const { user_id, exercise_id, status, score_details } = req.body;
  if (!user_id || !exercise_id) return res.status(400).json({ error: 'user_id et exercise_id requis' });

  const payload = {
    user_id,
    exercise_id,
    status: status || 'IN_PROGRESS',
    score_details: score_details || null,
    completed_at: status === 'COMPLETED' ? new Date().toISOString() : null,
  };

  // Upsert : crée ou met à jour (une seule ligne par user/exercise)
  const { data, error } = await supabase
    .from('progress')
    .upsert(payload, { onConflict: 'user_id,exercise_id' })
    .select()
    .single();

  if (error) throwWithStatus(500, error.message);
  res.json(data);
});

// Centralized error handler (must be after routes)
app.use((err, req, res, next) => {
  console.error(err.stack || err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Internal Server Error' });
});

// Graceful shutdown
function shutdown(signal) {
  console.log(`Received ${signal}. Closing server...`);
  process.exit(0);
}
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

// ─────────────────────────────────────────────
// DÉMARRAGE DU SERVEUR
// ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Serveur API HiParis en ligne sur http://localhost:${PORT}`);
  console.log(`📋 Routes disponibles :`);
  console.log(`   GET  /api/exercises          → Catalogue officiel`);
  console.log(`   POST /api/exercises          → Créer un exercice (Studio)`);
  console.log(`   POST /api/submissions        → Soumettre à un prof`);
  console.log(`   POST /api/progress           → Sauvegarder la progression`);
});
