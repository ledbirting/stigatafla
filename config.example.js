/**
 * (Optional) You can set the public rosters URL here and load this file after
 * stigatafla.config.js to override, or edit stigatafla.config.js directly.
 *
 * Supabase — for scoreboard you only need the public URL of rosters.json after upload:
 *   Dashboard → Storage → your bucket → rosters file → "Get public URL"
 *
 * For the admin app (admin/config.js), you need from Dashboard → Settings → API:
 *   • Project URL
 *   • anon public key  (NOT the service_role key — never in the browser)
 */
window.STIGATAFLA_CONFIG = {
  rostersUrl: "",
};
