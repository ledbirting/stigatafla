/**
 * Load match rosters JSON from a public URL (e.g. Supabase Storage).
 * When STIGATAFLA_CONFIG.rostersUrl is missing, load() resolves to null (use embedded default).
 */
(function (global) {
  var TEAM_KEYS = ["kr", "keflavik"];

  function normalize(raw) {
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
    var out = {};
    var has = false;
    for (var i = 0; i < TEAM_KEYS.length; i++) {
      var k = TEAM_KEYS[i];
      if (Object.prototype.hasOwnProperty.call(raw, k)) {
        out[k] = Array.isArray(raw[k]) ? raw[k] : [];
        has = true;
      }
    }
    return has ? out : null;
  }

  function load() {
    var cfg = global.STIGATAFLA_CONFIG;
    if (!cfg || !cfg.rostersUrl || String(cfg.rostersUrl).trim() === "") {
      return Promise.resolve(null);
    }
    return fetch(cfg.rostersUrl, { cache: "no-store" }).then(function (res) {
      if (!res.ok) throw new Error("Rosters HTTP " + res.status);
      return res.json();
    });
  }

  global.StigataflaRosterLoader = {
    normalize: normalize,
    load: load,
  };
})(typeof window !== "undefined" ? window : this);
