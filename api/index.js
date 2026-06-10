const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const { Resend } = require('resend');
const crypto = require('crypto');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Désactiver la vérification SSL UNIQUEMENT en local
if (process.env.NODE_ENV !== 'production') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

// Initialisation Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev';

// Génère un token OTP 8 caractères (ex: A3F9B2C1)
function generateToken() {
  return crypto.randomBytes(4).toString('hex').toUpperCase();
}

// Envoie le token par email via Resend
async function sendTokenEmail(email, prenom, token, isNew = true) {
  const subject = isNew
    ? '🎓 Bienvenue sur Hi!Paris Playground - Votre token de connexion'
    : '🔑 Hi!Paris Playground - Votre nouveau token de connexion';

  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject,
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 480px; margin: 0 auto; background: #0b0f1a; color: #eef2ff; border-radius: 16px; overflow: hidden; border: 1px solid rgba(99,102,241,0.3);">
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

// --- MIDDLEWARE D'AUTORISATION ---

// Middleware pour vérifier le rôle TEACHER
const requireTeacher = async (req, res, next) => {
  // On attend l'email ou l'ID dans le header personnalisé
  const userEmail = req.headers['x-user-email'];
  
  if (!userEmail) {
    return res.status(401).json({ error: "Accès refusé : Identifiant manquant dans les headers (x-user-email)" });
  }

  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('role')
      .eq('email', userEmail)
      .single();

    if (error || !user) {
      return res.status(401).json({ error: "Utilisateur non trouvé" });
    }

    if (user.role !== 'TEACHER') {
      return res.status(403).json({ error: "Accès interdit : Privilèges enseignants requis" });
    }

    next(); // L'utilisateur est bien un prof, on continue vers la route
  } catch (err) {
    return res.status(500).json({ error: "Erreur lors de la vérification des droits" });
  }
};

// --- ROUTES UTILISATEURS ---

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error("⚠️ ATTENTION : La clé SERVICE_ROLE est manquante !");
}

// Connexion (Login) — via token reçu par mail
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body; // 'password' contient désormais le token
  console.log("🔑 Tentative de connexion pour :", email);

  if (!email || !password) {
    return res.status(400).json({ error: "Email et token requis" });
  }

  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      return res.status(401).json({ error: "Email ou token incorrect" });
    }

    // Vérification du token (insensible à la casse)
    if (!user.login_token || user.login_token !== password.trim().toUpperCase()) {
      return res.status(401).json({ error: "Email ou token incorrect" });
    }

    // On ne renvoie pas les champs sensibles
    const safeUser = { ...user };
    delete safeUser.login_token;
    delete safeUser.password;

    res.json(safeUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Créer un utilisateur (Register) — génère un token OTP et l'envoie par mail
app.post('/api/users', async (req, res) => {
  const { email, role, token, prenom, nom, ecole } = req.body;
  console.log("📨 Tentative d'inscription pour :", email);

  if (role === 'TEACHER') {
    const validTokens = (process.env.TEACHER_TOKENS || "").split(',');
    if (!token || !validTokens.includes(token)) {
      return res.status(401).json({ error: "Token enseignant invalide" });
    }
  }

  try {
    // Génération du token OTP de connexion
    let loginToken = generateToken();

    // TEMPORAIRE DÉMO : Si le domaine Resend n'est pas encore validé
    if (process.env.RESEND_DOMAIN_VERIFIED !== 'true') {
      loginToken = role === 'TEACHER' ? '#TOKEN_TEACHERSHI!PARIS2026#' : '#TOKEN_STUDENTHIPARIS2026';
    }

    const userData = { email, nom, prenom, ecole, role, login_token: loginToken };

    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select();

    if (error) throw error;

    // Envoi du token par email (On ignore l'erreur si Resend bloque en Sandbox)
    try {
      await sendTokenEmail(email, prenom, loginToken, true);
    } catch (mailErr) {
      console.warn("⚠️ Impossible d'envoyer l'email (Sandbox Resend). Token standard fourni.");
    }

    const safeUser = { ...data[0] };
    delete safeUser.login_token;
    delete safeUser.password;
    res.status(201).json(safeUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Token oublié — génère un nouveau token et l'envoie par mail
app.post('/api/forgot-token', async (req, res) => {
  const { email } = req.body;
  console.log("🔄 Demande de nouveau token pour :", email);

  if (!email) {
    return res.status(400).json({ error: "Email requis" });
  }

  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, prenom, role')
      .eq('email', email)
      .single();

    // Même réponse si l'email n'existe pas (sécurité : ne pas révéler les comptes)
    if (error || !user) {
      return res.json({ message: "Si cet email est enregistré, un token a été envoyé." });
    }

    let newToken = generateToken();

    // TEMPORAIRE DÉMO : Si le domaine Resend n'est pas encore validé
    if (process.env.RESEND_DOMAIN_VERIFIED !== 'true') {
      newToken = user.role === 'TEACHER' ? '#TOKEN_TEACHERSHI!PARIS2026#' : '#TOKEN_STUDENTHIPARIS2026';
    }

    await supabase
      .from('users')
      .update({ login_token: newToken })
      .eq('id', user.id);

    try {
      await sendTokenEmail(user.email, user.prenom, newToken, false);
    } catch (mailErr) {
      console.warn("⚠️ Impossible d'envoyer l'email (Sandbox Resend). Token standard fourni.");
    }

    res.json({ message: "Un nouveau token a été envoyé à votre adresse email." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// --- ROUTES EXERCICES & PROFESSEURS ---

// ✅ Lister tous les exercices publics (catalogue)
app.get('/api/exercises', async (req, res) => {
  const { data, error } = await supabase
    .from('exercises')
    .select('id, title, description, config_json, creator_id, is_official, visibility, official_id, created_at')
    .eq('visibility', 'PUBLIC')
    .order('created_at', { ascending: false });

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// ✅ Récupérer un exercice par son UUID (pour custom_exo_template.html)
app.get('/api/exercises/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('exercises')
    .select('id, title, description, config_json, creator_id, is_official, visibility, official_id, status')
    .eq('id', req.params.id)
    .single();

  if (error) return res.status(404).json({ error: 'Exercice introuvable' });
  res.json(data);
});

// ✅ Mettre à jour un exercice (Brouillon -> Public, ou Soumission Prof)
app.patch('/api/exercises/:id', async (req, res) => {
  const { title, description, config_json, is_official, visibility, teacher_id, creator_id } = req.body;
  const updateData = {};
  if (title !== undefined) updateData.title = title;
  if (description !== undefined) updateData.description = description;
  if (config_json !== undefined) updateData.config_json = config_json;
  if (is_official !== undefined) updateData.is_official = is_official;
  if (visibility !== undefined) updateData.visibility = visibility;

  const { data: exo, error } = await supabase
    .from('exercises')
    .update(updateData)
    .eq('id', req.params.id)
    .select()
    .single();

  if (error) return res.status(400).json({ error: error.message });

  // Si on soumet à un prof, on crée/maj la soumission
  if (teacher_id && creator_id) {
    await supabase
      .from('exercise_submissions')
      .upsert([{
        exercise_id: exo.id,
        student_id: creator_id,
        teacher_id: teacher_id,
        status: 'PENDING'
      }], { onConflict: 'exercise_id, student_id' });
  }

  res.json(exo);
});

// Récupérer la liste des enseignants (pour la sélection par l'étudiant)
app.get('/api/teachers', async (req, res) => {
  const { data, error } = await supabase
    .from('users')
    .select('id, nom, prenom, email')
    .eq('role', 'TEACHER');

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// ✅ Supprimer un exercice du catalogue (enseignant uniquement)
app.delete('/api/exercises/:id', requireTeacher, async (req, res) => {
  try {
    const exerciseId = req.params.id;

    // 1. Supprimer la progression associée
    await supabase
      .from('progress')
      .delete()
      .eq('exercise_id', exerciseId);

    // 2. Supprimer les soumissions associées
    await supabase
      .from('exercise_submissions')
      .delete()
      .eq('exercise_id', exerciseId);

    // 3. Supprimer l'exercice lui-même
    const { data, error } = await supabase
      .from('exercises')
      .delete()
      .eq('id', exerciseId)
      .select()
      .single();

    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: 'Exercice supprimé', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Enregistrer un exercice et gérer la soumission
app.post('/api/exercises', async (req, res) => {
  console.log("📨 Tentative d'enregistrement d'exercice :", req.body.title);
  console.log("Données reçues :", JSON.stringify(req.body, null, 2));

  const { title, description, config_json, creator_id, is_official, visibility, teacher_id } = req.body;

  // 1. Insérer l'exercice
  const { data: exo, error: exoError } = await supabase
    .from('exercises')
    .insert([{ title, description, config_json, creator_id, is_official, visibility }])
    .select()
    .single();

  if (exoError) {
    console.error("❌ ERREUR INSERT EXERCICE :", exoError.message);
    console.error("Détails :", exoError);
    return res.status(400).json({ error: exoError.message });
  }

  // 2. Si c'est un étudiant (donc non officiel), on crée une soumission pour le prof
  if (!is_official && teacher_id) {
    console.log("📤 Création d'une soumission pour le prof :", teacher_id);
    const { error: subError } = await supabase
      .from('exercise_submissions')
      .insert([{
        exercise_id: exo.id,
        student_id: creator_id,
        teacher_id: teacher_id,
        status: 'PENDING'
      }]);

    if (subError) {
      console.error("❌ ERREUR INSERT SUBMISSION :", subError.message);
      return res.status(400).json({ error: subError.message });
    }
  }

  console.log("✅ Exercice et soumission créés avec succès !");
  res.status(201).json(exo);
});



// --- ROUTES HISTORIQUE & VALIDATION ---

// Récupérer les soumissions d'un étudiant (avec les détails de l'exercice)
app.get('/api/submissions/student/:id', async (req, res) => {
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

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// Récupérer les soumissions reçues par un enseignant
app.get('/api/submissions/teacher/:id', requireTeacher, async (req, res) => {
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

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// Récupérer le COMPTEUR de soumissions en attente pour un enseignant (pour notifications)
app.get('/api/submissions/teacher/:id/count', requireTeacher, async (req, res) => {
  const { count, error } = await supabase
    .from('exercise_submissions')
    .select('*', { count: 'exact', head: true })
    .eq('teacher_id', req.params.id)
    .eq('status', 'PENDING');

  if (error) return res.status(400).json({ error: error.message });
  res.json({ count: count || 0 });
});

// Mettre à jour le statut d'une soumission (Valider/Rejeter) - Réservé aux profs
app.patch('/api/submissions/:id', requireTeacher, async (req, res) => {
  const { status, feedback } = req.body;

  // 1. Mettre à jour la soumission
  const { data: sub, error: subError } = await supabase
    .from('exercise_submissions')
    .update({ status, feedback })
    .eq('id', req.params.id)
    .select().single();

  if (subError) return res.status(400).json({ error: subError.message });

  // 2. Si c'est approuvé, on marque l'exercice comme officiel
  if (status === 'APPROVED') {
    await supabase
      .from('exercises')
      .update({ is_official: true, visibility: 'PUBLIC' })
      .eq('id', sub.exercise_id);
  }

  res.json(sub);
});

// ✅ Supprimer une soumission (étudiant ou prof)
app.delete('/api/submissions/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('exercise_submissions')
    .delete()
    .eq('id', req.params.id)
    .select()
    .single();

  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'Soumission supprimée', data });
});

// ✅ Récupérer la progression de TOUS les étudiants (pour le dashboard prof)
app.get('/api/teacher/students-progress', requireTeacher, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select(`
        id, nom, prenom, email, role, ecole,
        progress ( status, completed_at, time_spent, is_saved, exercises ( title ) )
      `)
      .eq('role', 'STUDENT');

    if (error) throw error;

    // Formater pour le frontend
    const stats = data.map(u => {
      // Filtrer les entrées de progression où l'exercice a été supprimé
      const activeProgress = u.progress ? u.progress.filter(p => p.exercises) : [];

      return {
        id: u.id,
        nom: u.nom,
        prenom: u.prenom,
        email: u.email,
        ecole: u.ecole || 'Non spécifiée',
        exosFaits: activeProgress.filter(p => p.status === 'COMPLETED').length,
        totalTime: activeProgress.reduce((acc, p) => acc + (p.time_spent || 0), 0),
        lastActive: activeProgress.length > 0
          ? new Date(Math.max(...activeProgress.map(p => new Date(p.completed_at || 0)))).toLocaleDateString()
          : 'Jamais',
        history: activeProgress.map(p => ({
          nom: p.exercises.title,
          temps: p.time_spent || 0,
          date: p.completed_at ? new Date(p.completed_at).toLocaleDateString() : (p.is_saved ? "Sauvegardé" : "En cours")
        }))
      };
    });

    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- ROUTES STATISTIQUES ---

app.get('/api/stats/users', async (req, res) => {
  try {
    const { count: studentCount } = await supabase.from('users').select('*', { count: 'exact', head: true }).eq('role', 'STUDENT');
    const { count: teacherCount } = await supabase.from('users').select('*', { count: 'exact', head: true }).eq('role', 'TEACHER');

    // Récupérer le nombre de visites
    const { data: visitData } = await supabase.from('site_stats').select('count').eq('id', 'visits').single();

    res.json({
      students: studentCount || 0,
      teachers: teacherCount || 0,
      visits: visitData ? visitData.count : 0
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route pour incrémenter le nombre de visites
app.get('/api/stats/visit', async (req, res) => {
  try {
    // Utilisation d'une fonction RPC Supabase pour incrémenter de façon atomique
    // OU faire un simple update (plus simple ici)
    const { data: current } = await supabase.from('site_stats').select('count').eq('id', 'visits').single();
    const newCount = (current ? current.count : 0) + 1;

    await supabase.from('site_stats').update({ count: newCount }).eq('id', 'visits');

    res.json({ count: newCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/progress', async (req, res) => {
  const { email, official_id, exercise_id, status, is_saved, time_spent } = req.body;

  // Log pour debug
  console.log(`[API] Progress Update: ${email} | Exo: ${official_id || 'N/A'} (UUID: ${exercise_id || 'N/A'}) | Status: ${status} | Saved: ${is_saved} | Time: ${time_spent}s`);

  try {
    // 1. Trouver l'utilisateur
    const { data: user, error: userErr } = await supabase.from('users').select('id').eq('email', email).single();
    if (!user || userErr) return res.status(404).json({ error: "Utilisateur non trouvé avec cet e-mail" });

    let finalExoId = exercise_id;

    // 2. Si c'est un exo natif (1-17), on trouve son UUID dans la table exercises via official_id
    if (official_id) {
      const { data: exo, error: exoErr } = await supabase.from('exercises').select('id').eq('official_id', official_id).single();
      if (exo) {
        finalExoId = exo.id;
      } else {
        console.error(`[API] Exercice official_id=${official_id} non trouvé dans la table exercises.`);
        return res.status(404).json({ error: `Exercice natif #${official_id} manquant dans la base de données.` });
      }
    }

    if (!finalExoId) return res.status(400).json({ error: "ID d'exercice manquant (ni official_id ni exercise_id fournis)." });

    // 3. Préparer l'upsert
    const updateData = {
      user_id: user.id,
      exercise_id: finalExoId
    };

    if (is_saved !== undefined) updateData.is_saved = is_saved;
    if (status !== undefined) updateData.status = status;
    if (time_spent !== undefined) updateData.time_spent = time_spent;

    if (status === 'COMPLETED') {
      updateData.completed_at = new Date().toISOString();
    }

    const { data, error: progError } = await supabase
      .from('progress')
      .upsert(updateData, { onConflict: 'user_id, exercise_id' })
      .select();

    if (progError) throw progError;

    res.json({ success: true, message: "Progression synchronisée !", data: data[0] });

  } catch (err) {
    console.error("❌ Erreur critique API progression :", err.message);
    res.status(500).json({ error: "Erreur serveur lors de la mise à jour de la progression", details: err.message });
  }
});


// --- RÉCUPÉRER LA PROGRESSION D'UN UTILISATEUR ---
app.get('/api/progress/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const { data: user, error: userErr } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (userErr || !user) return res.status(404).json({ error: "Utilisateur non trouvé" });

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

    if (progErr) throw progErr;
    res.json(progress);
  } catch (err) {
    console.error("Erreur historique:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;



