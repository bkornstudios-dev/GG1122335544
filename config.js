// config.js — browser-side loader
// Fetches runtime config from the Vercel serverless function /api/config
// NO secrets are stored here. This file is safe to commit and deploy publicly.

(async function () {
  'use strict';

  try {
    const res = await fetch('/secrets');
    if (!res.ok) throw new Error(`Config fetch failed: HTTP ${res.status}`);
    const cfg = await res.json();

    Object.freeze(cfg);
    Object.defineProperty(window, '__GG_CFG__', {
      value: cfg,
      writable: false,
      configurable: false,
      enumerable: false,
    });

    // Signal that config is ready — admin.html and main.html wait for this
    window.dispatchEvent(new Event('gg-config-ready'));

  } catch (err) {
    console.error('[GeoGensan] Failed to load config:', err);
    window.dispatchEvent(new CustomEvent('gg-config-error', { detail: err.message }));
  }
})();
