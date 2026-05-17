

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
      : '7416acef89ebb625100b3bf7a580770a',

    // ← Admin panel password. Change this to something strong.
    // NOTE: This is client-side only — visible in source. Use Firebase Auth in production.
    adminPassword: (typeof process !== 'undefined' && process.env && process.env.ADMIN_PASSWORD)
      ? process.env.ADMIN_PASSWORD
      : '00011000',
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
