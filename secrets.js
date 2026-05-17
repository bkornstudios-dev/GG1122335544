// api/config.js — Vercel Serverless Function
// Serves non-secret runtime config to the browser.
// Secrets are stored in Vercel Environment Variables (never in source code).
//
// HOW TO SET ENV VARS IN VERCEL:
//   Dashboard → Your Project → Settings → Environment Variables
//   Add: FIREBASE_DB_URL, IMGBB_KEY, FIREBASE_API_KEY, FIREBASE_PROJECT_ID
//   (No ADMIN_EMAIL needed — manage admin users in Firebase Console → Authentication)
//
// This endpoint is public (no auth needed) — it only exposes what the
// browser already needs to function. The real protection is Firebase
// Security Rules (restrict who can read/write data) and Firebase Auth
// (restrict who can access the admin panel).

export default function handler(req, res) {
  // Only allow GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Refuse to serve if critical vars are missing — fail loudly in dev
  const dbUrl      = process.env.FIREBASE_DB_URL;
  const imgKey     = process.env.IMGBB_KEY;
  const fbApiKey   = process.env.FIREBASE_API_KEY;
  const fbProject  = process.env.FIREBASE_PROJECT_ID || 'gentrike-75c7c';
  if (!dbUrl || !imgKey || !fbApiKey) {
    console.error('[GeoGensan] Missing environment variables. Set FIREBASE_DB_URL, IMGBB_KEY, FIREBASE_API_KEY in Vercel.');
    return res.status(500).json({ error: 'Server misconfiguration — environment variables not set.' });
  }

  // Cache for 5 minutes (env vars don't change at runtime)
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
  res.setHeader('Content-Type', 'application/json');

  return res.status(200).json({
    dbUrl,
    imgKey,
    firebaseAuthConfig: {
      apiKey:     fbApiKey,
      authDomain: `${fbProject}.firebaseapp.com`,
      projectId:  fbProject,
      databaseURL: dbUrl,
    },
  });
}
