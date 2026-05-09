/**
 * GeoGensan — Secure Configuration Loader
 *
 * ⚠️  SECURITY NOTICE — READ BEFORE DEPLOYING  ⚠️
 * ─────────────────────────────────────────────────────────────────
 * Your Firebase database was recently manipulated. This file likely
 * contributed to that breach because API keys in client-side JS are
 * ALWAYS readable by anyone who views your page source.
 *
 * IMMEDIATE ACTIONS REQUIRED:
 *  1. Go to ImgBB → API Keys → Revoke the current key → Generate a new one
 *  2. Go to Firebase Console → Realtime Database → Rules → Lock down access:
 *       {
 *         "rules": {
 *           "reports":          { ".read": false, ".write": "auth != null" },
 *           "fareConfig":       { ".read": true,  ".write": "auth != null" },
 *           "fareHistory":      { ".read": false, ".write": "auth != null" },
 *           "archivedReports":  { ".read": false, ".write": "auth != null" }
 *         }
 *       }
 *  3. Enable Firebase Authentication (Email/Password) and replace the
 *     client-side password check in admin.html with Firebase Auth sign-in.
 *  4. Move secrets to a server-side endpoint (Vercel/Netlify function).
 *  5. NEVER commit this file with real keys to version control.
 *
 * AFTER rotating your keys, paste the NEW values below.
 * ─────────────────────────────────────────────────────────────────
 */

(function() {
  'use strict';

  const _cfg = {
    // ← Replace with your NEW Firebase DB URL after rotating in Firebase Console
    dbUrl: (typeof process !== 'undefined' && process.env && process.env.FIREBASE_DB_URL)
      ? process.env.FIREBASE_DB_URL
      : 'https://gentrike-75c7c-default-rtdb.asia-southeast1.firebasedatabase.app',

    // ← Replace with your NEW ImgBB API key after revoking the old one at imgbb.com
    imgKey: (typeof process !== 'undefined' && process.env && process.env.IMGBB_KEY)
      ? process.env.IMGBB_KEY
      : 'c4d9f0a3675c5628ef134a1648b00596',
  };

     adminPassword: (typeof process !== 'undefined' && process.env && process.env.ADMIN_PASSWORD)
      ? process.env.ADMIN_PASSWORD
      : '00000000',
  };
  
  if (typeof console !== 'undefined') {
    if (_cfg.dbUrl.startsWith('REPLACE')) {
      console.warn('[GeoGensan] Firebase DB URL not configured. Rotate your key first — see config.js.');
    }
    if (_cfg.imgKey.startsWith('REPLACE')) {
      console.warn('[GeoGensan] ImgBB API key not configured. Rotate your key first — see config.js.');
    }
  }

  Object.freeze(_cfg);
  Object.defineProperty(window, '__GG_CFG__', {
    value: _cfg,
    writable: false,
    configurable: false,
    enumerable: false,
  });
})();
