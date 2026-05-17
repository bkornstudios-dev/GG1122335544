

(function() {
  'use strict';

  // SECURITY NOTE:
  // - dbUrl and imgKey are low-sensitivity runtime config (Firebase DB URL is not secret by itself;
  //   access is controlled by Firebase Security Rules).
  // - Admin authentication is handled by Firebase Authentication — no password stored here.
  // - NEVER add secrets (service account keys, private API keys) to this file.

  const _cfg = {
    // Firebase Realtime Database URL. Set via environment variable in production.
    dbUrl: (typeof process !== 'undefined' && process.env && process.env.FIREBASE_DB_URL)
      ? process.env.FIREBASE_DB_URL
      : 'https://gentrike-75c7c-default-rtdb.asia-southeast1.firebasedatabase.app',

    // ImgBB API key for photo uploads. Set via environment variable in production.
    imgKey: (typeof process !== 'undefined' && process.env && process.env.IMGBB_KEY)
      ? process.env.IMGBB_KEY
      : 'ed85317c7081b6e97d7eac253bd81b76',

    // Firebase project config for Authentication (safe to expose — access controlled by Firebase rules).
    // Get these from Firebase Console → Project Settings → Your apps → Web app → SDK setup.
    firebaseAuthConfig: {
      apiKey:            'AIzaSyDsosOgn6JGhveWvm4vTuzECwRV6yDHYb8',
      authDomain:        'gentrike-75c7c.firebaseapp.com',
      projectId:         'gentrike-75c7c',
      databaseURL:       'https://gentrike-75c7c-default-rtdb.asia-southeast1.firebasedatabase.app',
    },

    // Admin email — set in Firebase Console → Authentication → Add user.


  if (typeof console !== 'undefined') {
    if (_cfg.firebaseAuthConfig.apiKey === 'AIzaSyDsosOgn6JGhveWvm4vTuzECwRV6yDHYb8') {
      console.warn('[GeoGensan] Firebase Auth not configured. Add your web API key to config.js → firebaseAuthConfig.');
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
