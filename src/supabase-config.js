/* ============================================================
   PRINTZIN — Supabase connection settings
   ------------------------------------------------------------
   Paste the two values from your Supabase project here.
   Find them in: Supabase Dashboard → Project Settings → API
     • Project URL   → url
     • anon public   → anonKey   (this key is SAFE to ship publicly)

   Until you fill these in, the site runs on the built-in
   static catalog and the admin panel stays in "demo" mode.
   ============================================================ */
window.PZ_SUPABASE = {
  url:     'YOUR_SUPABASE_URL',      // e.g. https://abcd1234.supabase.co
  anonKey: 'YOUR_SUPABASE_ANON_KEY', // long string starting with "eyJ..."
};
