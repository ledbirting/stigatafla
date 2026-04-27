/**
 * Copy to `config.js` in this folder. Only staff need the real file in the project.
 * `admin/config.js` is not gitignored (anon key is public; RLS + Auth protect data).
 *
 * From Supabase Dashboard → Settings → API you need:
 *   • Project URL
 *   • anon / public key (safe in browser; protect with Storage RLS + Auth, not with secrecy)
 * Never put the service_role key in the browser.
 *
 * Custom API domain (Dashboard → Custom domains): use that URL as supabaseUrl
 * (e.g. https://media.example.com). The anon/publishable key is still the same
 * project key from Settings → API. Optional: projectRef if you use non-JWT keys.
 */
window.STIGATAFLA_ADMIN_CONFIG = {
  supabaseUrl: "https://YOUR_PROJECT_REF.supabase.co",
  // projectRef: "YOUR_PROJECT_REF", // only if anon key is not a legacy JWT (e.g. sb_publishable_…)
  supabaseAnonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9pb2dhdmdldWdhdG5haGNueHRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyOTQyODEsImV4cCI6MjA4MDg3MDI4MX0.4yFxdwtnWGVoV2RCNtWwFIXgYver5RvzHqLr-U0kEZs",
  bucket: "stigatafla",
  rostersPath: "stigatafla/rosters.json",
  mediaPathPrefix: "stigatafla/media",
};
