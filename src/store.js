/* ============================================================
   PRINTZIN — data store (Supabase-backed, static fallback)
   ------------------------------------------------------------
   Responsibilities:
     • create the Supabase client (if configured)
     • normalise product rows to the catalog shape
     • load live products and swap them into window.PZ_DATA
     • admin CRUD: save / delete / seed
     • admin auth: signIn / signOut / session
   Loads as a normal script AFTER data.js and the Supabase CDN.
   ============================================================ */
(function () {
  const cfg = (window.PZ_SUPABASE || {});
  const configured =
    !!cfg.url && !!cfg.anonKey &&
    !cfg.url.includes('YOUR_') && !cfg.anonKey.includes('YOUR_');

  let client = null;
  if (configured && window.supabase && window.supabase.createClient) {
    try { client = window.supabase.createClient(cfg.url, cfg.anonKey); }
    catch (e) { console.warn('[PZ] Supabase init failed:', e.message); }
  }

  /* Keep a pristine copy of the bundled catalog for seeding. */
  const STATIC_PRODUCTS = (window.PZ_DATA && window.PZ_DATA.PRODUCTS)
    ? window.PZ_DATA.PRODUCTS.map(p => ({ ...p }))
    : [];

  /* Map a DB row OR an admin form object into the catalog shape. */
  function normalize(o) {
    const price = Number(o.price) || 0;
    const mrp = Number(o.mrp) || Math.round(price * 1.25);
    let colors = o.colors;
    if (typeof colors === 'string') {
      colors = colors.split(',').map(s => s.trim()).filter(Boolean);
    }
    if (!Array.isArray(colors) || !colors.length) colors = ['coral', 'black', 'white'];
    let sizes = o.sizes;
    if (typeof sizes === 'string') {
      sizes = sizes.split(',').map(s => s.trim()).filter(Boolean);
    }
    if (!Array.isArray(sizes) || !sizes.length) sizes = null;
    return {
      id: o.id || ('p' + Date.now() + Math.floor(Math.random() * 1000)),
      name: (o.name || '').trim(),
      cat: o.cat || 'mugs',
      price,
      mrp,
      off: price && mrp ? Math.round((1 - price / mrp) * 100) : 0,
      code: o.code || null,
      blurb: o.blurb || '',
      image: o.image || null,
      rating: o.rating ? Number(o.rating) : 4.6,
      reviews: o.reviews ? Number(o.reviews) : 120,
      personalizable: o.personalizable !== false && o.personalizable !== 'false',
      bestseller: !!o.bestseller && o.bestseller !== 'false',
      badge: o.badge || null,
      colors,
      sizes,
    };
  }

  /* Row shape written to the `products` table (drops computed `off`). */
  function toRow(p) {
    const n = normalize(p);
    return {
      id: n.id, name: n.name, cat: n.cat, price: n.price, mrp: n.mrp,
      code: n.code, blurb: n.blurb, image: n.image, rating: n.rating,
      reviews: n.reviews, personalizable: n.personalizable,
      bestseller: n.bestseller, badge: n.badge,
      colors: n.colors, sizes: n.sizes,
    };
  }

  async function loadProducts() {
    if (!client) return null;
    const { data, error } = await client
      .from('products').select('*').order('created_at', { ascending: true });
    if (error) { console.warn('[PZ] load products:', error.message); return null; }
    if (!data) return null;
    return data.map(normalize);
  }

  async function saveProduct(form) {
    if (!client) return { error: 'Not connected to Supabase.' };
    const { error } = await client.from('products').upsert(toRow(form));
    return { error: error ? error.message : null };
  }

  async function deleteProduct(id) {
    if (!client) return { error: 'Not connected to Supabase.' };
    const { error } = await client.from('products').delete().eq('id', id);
    return { error: error ? error.message : null };
  }

  async function seedFromStatic() {
    if (!client) return { error: 'Not connected to Supabase.', count: 0 };
    const rows = STATIC_PRODUCTS.map(toRow);
    const { error } = await client.from('products').upsert(rows);
    return { error: error ? error.message : null, count: rows.length };
  }

  /* Optional: upload an image file to the `product-images` storage bucket. */
  async function uploadImage(file) {
    if (!client) return { error: 'Not connected to Supabase.', url: null };
    const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
    const path = 'p_' + Date.now() + '_' + Math.floor(Math.random() * 1e4) + '.' + ext;
    const { error } = await client.storage.from('product-images')
      .upload(path, file, { cacheControl: '3600', upsert: false });
    if (error) return { error: error.message, url: null };
    const { data } = client.storage.from('product-images').getPublicUrl(path);
    return { error: null, url: data.publicUrl };
  }

  /* ---- auth ---- */
  async function signIn(email, password) {
    if (!client) return { error: 'Not connected to Supabase.' };
    const { error } = await client.auth.signInWithPassword({ email, password });
    return { error: error ? error.message : null };
  }
  async function signOut() { if (client) await client.auth.signOut(); }
  async function getSession() {
    if (!client) return null;
    const { data } = await client.auth.getSession();
    return data.session || null;
  }

  window.PZ_STORE = {
    configured, client,
    normalize, loadProducts, saveProduct, deleteProduct,
    seedFromStatic, uploadImage,
    signIn, signOut, getSession,
    staticProducts: STATIC_PRODUCTS,
  };

  /* ---- bootstrap: swap live products in, then refresh the UI ---- */
  if (client) {
    loadProducts().then(prods => {
      if (prods && prods.length) {
        window.PZ_DATA.PRODUCTS = prods;
        if (window.__pzRefresh) window.__pzRefresh();
      }
    }).catch(() => {});
  }
})();
