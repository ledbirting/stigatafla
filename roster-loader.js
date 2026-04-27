/**
 * Load match rosters JSON from a public URL (e.g. Supabase Storage).
 * When STIGATAFLA_CONFIG.rostersUrl is missing, load() resolves to null (use embedded default).
 *
 * JSON shape (same file the admin saves and both scoreboards read):
 * {
 *   "version"?: number,     // optional; ignored by the scoreboard
 *   "kr": Player[],
 *   "keflavik": Player[]
 * }
 *
 * Player (unknown / wrong types are coerced; bad entries are skipped):
 * {
 *   "id": string,             // required for stable slot order; fallback "p_row_<index>" if missing
 *   "name": string,
 *   "number": number | null,  // squad number; null for staff / no number
 *   "isStaff": boolean,
 *   "introUrl": string,       // public URL for intro image/video; "" if none
 *   "goalUrl": string,        // goal celebration media; "" if none
 *   "introStoragePath"?: string,  // optional (admin metadata; scoreboard ignores)
 *   "goalStoragePath"?: string
 * }
 */
(function (global) {
  var TEAM_KEYS = ["kr", "keflavik"];

  /**
   * Align with admin normalisation so saved rosters.json always works on KR + Keflavík boards.
   */
  function normalizePlayer(p, rowIndex) {
    if (p == null || typeof p !== "object" || Array.isArray(p)) return null;
    var idRaw = p.id;
    var id = idRaw != null && String(idRaw).trim() !== "" ? String(idRaw) : "p_row_" + rowIndex;
    var num = p.number;
    if (num === "" || num == null) num = null;
    else {
      num = Number(num);
      if (isNaN(num)) num = null;
    }
    return {
      id: id,
      name: p.name == null ? "" : String(p.name),
      number: num,
      isStaff: !!p.isStaff,
      introUrl: p.introUrl ? String(p.introUrl) : "",
      goalUrl: p.goalUrl ? String(p.goalUrl) : "",
    };
  }

  function normalize(raw) {
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
    var out = {};
    var has = false;
    for (var i = 0; i < TEAM_KEYS.length; i++) {
      var k = TEAM_KEYS[i];
      if (Object.prototype.hasOwnProperty.call(raw, k)) {
        has = true;
        var src = Array.isArray(raw[k]) ? raw[k] : [];
        var list = [];
        for (var r = 0; r < src.length; r++) {
          var pl = normalizePlayer(src[r], r);
          if (pl) list.push(pl);
        }
        out[k] = list;
      }
    }
    if (!has) return null;
    for (var j = 0; j < TEAM_KEYS.length; j++) {
      var key = TEAM_KEYS[j];
      if (out[key] === undefined) out[key] = [];
    }
    return out;
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
