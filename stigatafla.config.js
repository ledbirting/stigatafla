/**
 * Public scoreboard config (KR + Keflavík load this file).
 * Must match the object path you upload in admin (see admin/config → bucket + rostersPath).
 *
 * Public URL pattern:
 *   {supabase or custom host}/storage/v1/object/public/{bucket}/{objectKey}
 * Example: bucket "stigatafla", key "stigatafla/rosters.json" →
 *   .../object/public/stigatafla/stigatafla/rosters.json
 */
window.STIGATAFLA_CONFIG = {
  rostersUrl:
    "https://media.zapp.is/storage/v1/object/public/stigatafla/stigatafla/rosters.json",
};
