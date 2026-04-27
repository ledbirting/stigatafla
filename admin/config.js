/**
 * Leikmennastillingar: Supabase client (Auth + Storage).
 * Not used by the public scoreboard page.
 * Project URL and anon key: Supabase → Project Settings → API.
 */
window.STIGATAFLA_ADMIN_CONFIG = {
  supabaseUrl: "https://media.zapp.is",
  supabaseAnonKey:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9pb2dhdmdldWdhdG5haGNueHRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyOTQyODEsImV4cCI6MjA4MDg3MDI4MX0.4yFxdwtnWGVoV2RCNtWwFIXgYver5RvzHqLr-U0kEZs",
  bucket: "stigatafla",
  rostersPath: "stigatafla/rosters.json",
  mediaPathPrefix: "stigatafla/media",
};
