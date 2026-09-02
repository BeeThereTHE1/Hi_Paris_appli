const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');
const { Resend } = require('resend');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Disable TLS verification only in local/dev environments
if (process.env.NODE_ENV !== 'production' && process.env.ALLOW_INSECURE_TLS === 'true') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev';

const VALID_SUBMISSION_STATUS = new Set(['PENDING', 'APPROVED', 'REJECTED']);
const VALID_PROGRESS_STATUS = new Set(['IN_PROGRESS', 'COMPLETED']);

function sendError(res, status, message, details = undefined) {
  const payload = { error: message };
  if (details !== undefined) payload.details = details;
  return res.status(status).json(payload);
}

function requireEnv(name) {
  if (!process.env[name]) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function parseBoolean(value) {
  if (typeof value === 'boolean') return value;
  if (value === 'true') return true;
  if (value === 'false') return false;
  return undefined;
}

function generateToken() {
  return crypto.randomBytes(4).toString('hex').toUpperCase();
}

async function sendTokenEmail(email, prenom, token, isNew = true) {
  if (!resend) {
    throw new Error('RESEND_API_KEY is not configured');
  }

  const subject = isNew
    ? '🎓 Bienvenue sur Hi!Paris Playground - Votre token de connexion'
    : '🔑 Hi!Paris Playground - Votre nouveau token de connexion';

  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject,
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 480px; margin: 0 auto; background: #0b0f1a; color: #eef2ff; border-radius: 16px; overflow: hidden; border: 1px solid rgba(99,102,241,0.15);">
        <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 32px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px; color: white; letter-spacing: -0.5px;">Hi!Paris Playground</h1>
          <p style="margin: 8px 0 0; color: rgba(255,255,255,0.8); font-size: 14px;">Neural Deep Learning Platform</p>
        </div>
        <div style="padding: 32px;">
          <p style="font-size: 16px; margin-bottom: 8px; color: #eef2ff;">Bonjour <strong>${prenom}</strong>,</p>
          <p style="color: #94a3b8; font-size: 14px; margin-bottom: 24px; line-height: 1.6;">
            ${isNew ? 'Votre compte a été créé avec succès.' : 'Voici votre nouveau token de connexion.'}<br>
            Utilisez le code ci-dessous pour vous connecter à la plateforme.
          </p>
          <div style="background: rgba(99,102,241,0.15); border: 1px solid rgba(99,102,241,0.4); border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 24px;">
            <p style="margin: 0 0 8px; font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 2px;">Votre token de connexion</p>
            <p style="margin: 0; font-size: 36px; font-weight: 800; color: #a5b4fc; letter-spacing: 8px; font-family: monospace;">${token}</p>
          </div>
          <p style="color: #475569; font-size: 12px; text-align: center; line-height: 1.6;">
            Conservez ce token précieusement.<br>
            Si vous le perdez, cliquez sur <strong>"Token oublié ?"</strong> sur la page de connexion.
          </p>
        </div>
      </div>
    `
  });
}

// Placeholder auth middleware.
// Replace with real JWT/session/role verification before production use.
const requireTeacher = async (req, res, next) => {
  const role = req.header('x-user-role');
  if (process.env.NODE_ENV === 'production' && role !== 'TEACHER') {
    return sendError(res, 403, 'Forbidden: teacher access required');
  }
  next();
};

async function getExerciseById(id) {
  return supabase
    .from('exercises')
    .select('id, title, description, config_json, creator_id, is_official, visibility, official_id, status, created_at')
    .eq('id', id)
    .single();
}

async function getUserIdByEmail(email) {
  if (!isNonEmptyString(email)) return { user: null, error: new Error('Email is required') };
  return supabase.from('users').select('id').eq('email', email).single();
}

// Health
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', time: new Date().toISOString() });
});

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: '🚀 Hi!Paris API is running' });
});

// Exercises
app.get('/api/exercises', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('exercises')
      .select('id, title, description, config_json, creator_id, is_official, visibility, official_id, created_at')
      .eq('visibility', 'PUBLIC')
      .order('created_at', { ascending: false });

    if (error) return sendError(res, 400, 'Failed to load exercises', error.message);
    return res.json(data || []);
  } catch (err) {
    console.error('GET /api/exercises failed:', err);
    return sendError(res, 500, 'Internal server error');
  }
});

app.get('/api/exercises/:id', async (req, res) => {
  try {
    const { data, error } = await getExerciseById(req.params.id);
    if (error || !data) return sendError(res, 404, 'Exercice introuvable');
    return res.json(data);
  } catch (err) {
    console.error('GET /api/exercises/:id failed:', err);
    return sendError(res, 500, 'Internal server error');
  }
});

app.post('/api/exercises', async (req, res) => {
  try {
    const {
      title,
      description,
      config_json,
      creator_id,
      is_official,
      visibility,
      teacher_id
    } = req.body || {};

    if (!isNonEmptyString(title)) {
      return sendError(res, 400, 'title is required');
    }
    if (!isNonEmptyString(creator_id)) {
      return sendError(res, 400, 'creator_id is required');
    }

    const official = parseBoolean(is_official) ?? false;
    const vis = isNonEmptyString(visibility) ? visibility : (official ? 'PUBLIC' : 'PRIVATE');

    console.log('📨 Creating exercise:', title);

    const { data: exo, error: exoError } = await supabase
      .from('exercises')
      .insert([{
        title,
        description: description || '',
        config_json: config_json ?? null,
        creator_id,
        is_official: official,
        visibility: vis
      }])
      .select()
      .single();

    if (exoError) {
      console.error('❌ Error inserting exercise:', exoError);
      return sendError(res, 400, 'Failed to create exercise', exoError.message);
    }

    if (!official && isNonEmptyString(teacher_id)) {
      const { error: subError } = await supabase
        .from('exercise_submissions')
        .insert([{
          exercise_id: exo.id,
          student_id: creator_id,
          teacher_id,
          status: 'PENDING'
        }]);

      if (subError) {
        console.error('❌ Error creating submission:', subError);
        return sendError(res, 400, 'Exercise created but submission failed', subError.message);
      }
    }

    return res.status(201).json(exo);
  } catch (err) {
    console.error('POST /api/exercises failed:', err);
    return sendError(res, 500, 'Internal server error');
  }
});

app.patch('/api/exercises/:id', async (req, res) => {
  try {
    const { title, description, config_json, is_official, visibility, teacher_id, creator_id } = req.body || {};
    const updateData = {};

    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (config_json !== undefined) updateData.config_json = config_json;
    if (is_official !== undefined) updateData.is_official = parseBoolean(is_official);
    if (visibility !== undefined) updateData.visibility = visibility;

    if (Object.keys(updateData).length === 0) {
      return sendError(res, 400, 'No valid fields provided for update');
    }

    const { data: exo, error } = await supabase
      .from('exercises')
      .update(updateData)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error || !exo) {
      return sendError(res, 400, 'Failed to update exercise', error?.message);
    }

    if (isNonEmptyString(teacher_id) && isNonEmptyString(creator_id)) {
      const { error: submissionError } = await supabase
        .from('exercise_submissions')
        .upsert([{
          exercise_id: exo.id,
          student_id: creator_id,
          teacher_id,
          status: 'PENDING'
        }], { onConflict: 'exercise_id, student_id' });

      if (submissionError) {
        console.error('⚠️ Submission upsert failed:', submissionError);
      }
    }

    return res.json(exo);
  } catch (err) {
    console.error('PATCH /api/exercises/:id failed:', err);
    return sendError(res, 500, 'Internal server error');
  }
});

app.delete('/api/exercises/:id', requireTeacher, async (req, res) => {
  try {
    const exerciseId = req.params.id;

    const { error: progressError } = await supabase
      .from('progress')
      .delete()
      .eq('exercise_id', exerciseId);

    if (progressError) return sendError(res, 400, 'Failed to delete exercise progress', progressError.message);

    const { error: submissionsError } = await supabase
      .from('exercise_submissions')
      .delete()
      .eq('exercise_id', exerciseId);

    if (submissionsError) return sendError(res, 400, 'Failed to delete exercise submissions', submissionsError.message);

    const { data, error } = await supabase
      .from('exercises')
      .delete()
      .eq('id', exerciseId)
      .select()
      .single();

    if (error || !data) return sendError(res, 400, 'Failed to delete exercise', error?.message);

    return res.json({ message: 'Exercice supprimé', data });
  } catch (err) {
    console.error('DELETE /api/exercises/:id failed:', err);
    return sendError(res, 500, 'Internal server error');
  }
});

// Teachers
app.get('/api/teachers', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('id, nom, prenom, email')
      .eq('role', 'TEACHER');

    if (error) return sendError(res, 400, 'Failed to load teachers', error.message);
    return res.json(data || []);
  } catch (err) {
    console.error('GET /api/teachers failed:', err);
    return sendError(res, 500, 'Internal server error');
  }
});

// Submissions
app.get('/api/submissions/student/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('exercise_submissions')
      .select(`
        id,
        status,
        feedback,
        created_at,
        exercises ( id, title, description, config_json )
      `)
      .eq('student_id', req.params.id);

    if (error) return sendError(res, 400, 'Failed to load student submissions', error.message);
    return res.json(data || []);
  } catch (err) {
    console.error('GET /api/submissions/student/:id failed:', err);
    return sendError(res, 500, 'Internal server error');
  }
});

app.get('/api/submissions/teacher/:id', requireTeacher, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('exercise_submissions')
      .select(`
        id,
        status,
        feedback,
        created_at,
        student:users!exercise_submissions_student_id_fkey ( prenom, nom, email ),
        exercises ( id, title, description, config_json )
      `)
      .eq('teacher_id', req.params.id)
      .eq('status', 'PENDING');

    if (error) return sendError(res, 400, 'Failed to load teacher submissions', error.message);
    return res.json(data || []);
  } catch (err) {
    console.error('GET /api/submissions/teacher/:id failed:', err);
    return sendError(res, 500, 'Internal server error');
  }
});

app.get('/api/submissions/teacher/:id/count', requireTeacher, async (req, res) => {
  try {
    const { count, error } = await supabase
      .from('exercise_submissions')
      .select('*', { count: 'exact', head: true })
      .eq('teacher_id', req.params.id)
      .eq('status', 'PENDING');

    if (error) return sendError(res, 400, 'Failed to count submissions', error.message);
    return res.json({ count: count || 0 });
  } catch (err) {
    console.error('GET /api/submissions/teacher/:id/count failed:', err);
    return sendError(res, 500, 'Internal server error');
  }
});

app.patch('/api/submissions/:id', requireTeacher, async (req, res) => {
  try {
    const { status, feedback } = req.body || {};

    if (!VALID_SUBMISSION_STATUS.has(status)) {
      return sendError(res, 400, 'Invalid submission status');
    }

    const { data: sub, error: subError } = await supabase
      .from('exercise_submissions')
      .update({ status, feedback: feedback ?? null })
      .eq('id', req.params.id)
      .select()
      .single();

    if (subError || !sub) {
      return sendError(res, 400, 'Failed to update submission', subError?.message);
    }

    if (status === 'APPROVED' && sub.exercise_id) {
      const { error: exoError } = await supabase
        .from('exercises')
        .update({ is_official: true, visibility: 'PUBLIC' })
        .eq('id', sub.exercise_id);

      if (exoError) {
        console.warn('⚠️ Could not mark exercise as official:', exoError.message);
      }
    }

    return res.json(sub);
  } catch (err) {
    console.error('PATCH /api/submissions/:id failed:', err);
    return sendError(res, 500, 'Internal server error');
  }
});

app.delete('/api/submissions/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('exercise_submissions')
      .delete()
      .eq('id', req.params.id)
      .select()
      .single();

    if (error || !data) return sendError(res, 400, 'Failed to delete submission', error?.message);
    return res.json({ message: 'Soumission supprimée', data });
  } catch (err) {
    console.error('DELETE /api/submissions/:id failed:', err);
    return sendError(res, 500, 'Internal server error');
  }
});

// Teacher dashboard
app.get('/api/teacher/students-progress', requireTeacher, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select(`
        id, nom, prenom, email, role, ecole,
        progress ( status, completed_at, time_spent, is_saved, exercises ( title ) )
      `)
      .eq('role', 'STUDENT');

    if (error) return sendError(res, 400, 'Failed to load students progress', error.message);

    const stats = (data || []).map(u => {
      const activeProgress = Array.isArray(u.progress) ? u.progress.filter(p => p.exercises) : [];

      return {
        id: u.id,
        nom: u.nom,
        prenom: u.prenom,
        email: u.email,
        ecole: u.ecole || 'Non spécifiée',
        exosFaits: activeProgress.filter(p => p.status === 'COMPLETED').length,
        totalTime: activeProgress.reduce((acc, p) => acc + (p.time_spent || 0), 0),
        lastActive: activeProgress.length > 0
          ? new Date(
              Math.max(...activeProgress.map(p => new Date(p.completed_at || 0).getTime()))
            ).toLocaleDateString()
          : 'Jamais',
        history: activeProgress.map(p => ({
          nom: p.exercises.title,
          temps: p.time_spent || 0,
          date: p.completed_at
            ? new Date(p.completed_at).toLocaleDateString()
            : (p.is_saved ? 'Sauvegardé' : 'En cours')
        }))
      };
    });

    return res.json(stats);
  } catch (err) {
    console.error('GET /api/teacher/students-progress failed:', err);
    return sendError(res, 500, 'Internal server error');
  }
});

// Stats
app.get('/api/stats/users', async (req, res) => {
  try {
    const { count: studentCount, error: studentErr } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('role', 'STUDENT');

    if (studentErr) return sendError(res, 400, 'Failed to count students', studentErr.message);

    const { count: teacherCount, error: teacherErr } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('role', 'TEACHER');

    if (teacherErr) return sendError(res, 400, 'Failed to count teachers', teacherErr.message);

    const { data: visitData, error: visitErr } = await supabase
      .from('site_stats')
      .select('count')
      .eq('id', 'visits')
      .single();

    if (visitErr && visitErr.code !== 'PGRST116') {
      return sendError(res, 400, 'Failed to load visit stats', visitErr.message);
    }

    return res.json({
      students: studentCount || 0,
      teachers: teacherCount || 0,
      visits: visitData ? visitData.count : 0
    });
  } catch (err) {
    console.error('GET /api/stats/users failed:', err);
    return sendError(res, 500, 'Internal server error');
  }
});

app.get('/api/stats/visit', async (req, res) => {
  try {
    const { data: current, error: readErr } = await supabase
      .from('site_stats')
      .select('count')
      .eq('id', 'visits')
      .single();

    if (readErr && readErr.code !== 'PGRST116') {
      return sendError(res, 400, 'Failed to load visit counter', readErr.message);
    }

    const newCount = (current?.count || 0) + 1;

    const { error: updateErr } = await supabase
      .from('site_stats')
      .update({ count: newCount })
      .eq('id', 'visits');

    if (updateErr) return sendError(res, 400, 'Failed to update visit counter', updateErr.message);

    return res.json({ count: newCount });
  } catch (err) {
    console.error('GET /api/stats/visit failed:', err);
    return sendError(res, 500, 'Internal server error');
  }
});

// Progress
app.post('/api/progress', async (req, res) => {
  try {
    const { email, official_id, exercise_id, status, is_saved, time_spent } = req.body || {};

    console.log(
      `[API] Progress Update: ${email} | Exo: ${official_id || 'N/A'} (UUID: ${exercise_id || 'N/A'}) | Status: ${status} | Saved: ${is_saved} | Time: ${time_spent}s`
    );

    if (!isNonEmptyString(email)) {
      return sendError(res, 400, 'email is required');
    }

    if (!official_id && !exercise_id) {
      return sendError(res, 400, "ID d'exercice manquant (ni official_id ni exercise_id fournis).");
    }

    if (status !== undefined && !VALID_PROGRESS_STATUS.has(status)) {
      return sendError(res, 400, 'Invalid progress status');
    }

    const { data: user, error: userErr } = await getUserIdByEmail(email);
    if (userErr || !user) {
      return sendError(res, 404, 'Utilisateur non trouvé avec cet e-mail');
    }

    let finalExoId = exercise_id;

    if (official_id) {
      const { data: exo, error: exoErr } = await supabase
        .from('exercises')
        .select('id')
        .eq('official_id', official_id)
        .single();

      if (exoErr || !exo) {
        console.error(`[API] Exercice official_id=${official_id} non trouvé.`);
        return sendError(res, 404, `Exercice natif #${official_id} manquant dans la base de données.`);
      }

      finalExoId = exo.id;
    }

    const updateData = {
      user_id: user.id,
      exercise_id: finalExoId
    };

    if (is_saved !== undefined) updateData.is_saved = Boolean(is_saved);
    if (status !== undefined) updateData.status = status;
    if (time_spent !== undefined && Number.isFinite(Number(time_spent))) {
      updateData.time_spent = Number(time_spent);
    }

    if (status === 'COMPLETED') {
      updateData.completed_at = new Date().toISOString();
    }

    const { data, error: progError } = await supabase
      .from('progress')
      .upsert(updateData, { onConflict: 'user_id, exercise_id' })
      .select();

    if (progError) return sendError(res, 400, 'Failed to save progress', progError.message);

    return res.json({ success: true, message: 'Progression synchronisée !', data: data?.[0] || null });
  } catch (err) {
    console.error('POST /api/progress failed:', err);
    return sendError(res, 500, 'Erreur serveur lors de la mise à jour de la progression', err.message);
  }
});

app.get('/api/progress/:email', async (req, res) => {
  try {
    const { email } = req.params;

    const { data: user, error: userErr } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (userErr || !user) return sendError(res, 404, 'Utilisateur non trouvé');

    const { data: progress, error: progErr } = await supabase
      .from('progress')
      .select(`
        status,
        is_saved,
        completed_at,
        time_spent,
        exercises (
          id,
          official_id,
          title
        )
      `)
      .eq('user_id', user.id);

    if (progErr) return sendError(res, 400, 'Failed to load progress', progErr.message);
    return res.json(progress || []);
  } catch (err) {
    console.error('GET /api/progress/:email failed:', err);
    return sendError(res, 500, 'Internal server error');
  }
});

module.exports = app;
