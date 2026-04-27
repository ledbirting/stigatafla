# Stigatafla + Supabase

## Keys you need (Dashboard → Settings → API)

| Name | Use |
|------|-----|
| **Project URL** | Base URL for the JS client and Storage public URLs. |
| **anon public** key | Used in the browser for Auth + Storage. Safe to expose; protect data with RLS, not by hiding the key. |

**Do not** put the `service_role` key in any HTML/JS that runs in the browser. Reserve it for trusted server code only (if you add a backend later).

## Auth

1. Authentication → Providers → **Email** (enable; configure password or magic link as you prefer).
2. Add at least one user, or allow sign-up if appropriate.

## Storage

1. Create a bucket (e.g. `stigatafla`). The default paths in `admin/config.example.js` are:
   - `stigatafla/rosters.json` — full roster JSON.
   - `stigatafla/media/{teamId}/{playerId}-intro|goal.ext` — graphics.

2. **Public read** (simplest for scoreboard + on-air graphics):  
   Bucket → make public, or add a **SELECT** policy for `public` on `storage.objects` for that bucket.

3. **Write only for signed-in users** (recommended): in SQL or the Storage policy UI, allow **INSERT / UPDATE / DELETE** on `storage.objects` for `bucket_id = 'your-bucket'` when `auth.role() = 'authenticated'`.

   Exact policy syntax depends on your Supabase version; use the policy templates under **Storage** in the dashboard.

4. After the first **Save** from the admin app, copy the **public URL** of `rosters.json` into `stigatafla.config.js` as `rostersUrl` for KR/Keflavík boards to load it.

## JSON shape

Same as before: top-level keys `kr` and `keflavik`, each an array of:

`{ "id", "name", "number" | null, "isStaff"?, "introUrl", "goalUrl", "introStoragePath"?, "goalStoragePath"? }`

Optional `introStoragePath` / `goalStoragePath` are used by the admin UI to remove old files; scoreboards only use the `*Url` fields.
