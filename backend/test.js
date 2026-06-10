process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // Désactive la vérification SSL (Proxy Entreprise)

const { supabase } = require('./supabaseClient');

async function testerConnexion() {
    console.log("⏳ Tentative de connexion à Supabase...");

    const { data, error } = await supabase.from('users').select('*');

    if (error) {
        console.error("❌ Erreur de connexion :", error.message);
    } else {
        console.log("✅ Connexion réussie ! Voici les données :");
        console.log(data);
    }
}

testerConnexion();
