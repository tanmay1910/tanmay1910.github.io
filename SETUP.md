# Printzin — Admin & Supabase setup

Your store now has an **admin panel** for adding/editing products online. It works in two modes:

- **Demo mode** (default, no setup): the admin panel works, but changes live only in your browser. Good for trying it out.
- **Live mode** (after the steps below): a real login + database, so products you add show up for **every visitor**, permanently.

You reach the admin panel at the **"Admin"** link in the website footer, or by adding **`#admin`** to the URL
(e.g. `https://yourname.github.io/your-repo/#admin`).

---

## Go live with Supabase (free) — about 15 minutes

### 1. Create a project
1. Go to **https://supabase.com** → sign up (free) → **New project**.
2. Pick a name + a database password (save it). Wait ~2 min for it to spin up.

### 2. Create the products table
Open **SQL Editor** (left sidebar) → **New query** → paste this and click **Run**:

```sql
create table products (
  id text primary key,
  name text not null,
  cat text not null,
  price numeric not null,
  mrp numeric,
  code text,
  blurb text,
  image text,
  rating numeric default 4.6,
  reviews int default 120,
  personalizable boolean default true,
  bestseller boolean default false,
  badge text,
  colors jsonb default '["coral","black","white"]'::jsonb,
  sizes jsonb,
  created_at timestamptz default now()
);

-- security: anyone can READ products; only signed-in admins can change them
alter table products enable row level security;

create policy "public read"  on products for select using (true);
create policy "admin insert" on products for insert to authenticated with check (true);
create policy "admin update" on products for update to authenticated using (true);
create policy "admin delete" on products for delete to authenticated using (true);
```

### 3. Create your admin login
1. Left sidebar → **Authentication** → **Users** → **Add user** → **Create new user**.
2. Enter the email + password you want to log in with. Tick **"Auto Confirm User"**.
   (This is the account you'll use on the `#admin` screen.)

### 4. Copy your keys into the site
1. Left sidebar → **Project Settings** → **API**.
2. Copy **Project URL** and the **anon public** key.
3. Open `src/supabase-config.js` and paste them in:

```js
window.PZ_SUPABASE = {
  url:     'https://xxxx.supabase.co',   // your Project URL
  anonKey: 'eyJhbGciOi...',              // your anon public key
};
```
> The anon key is **safe to publish** — row-level security (step 2) is what protects your data.

### 5. (Optional) Image uploads
To upload product images from the admin form (instead of pasting URLs):
1. Left sidebar → **Storage** → **New bucket** → name it exactly **`product-images`** → tick **Public bucket** → create.
2. That's it — the upload button in the admin form will now work.
   (You can always just paste an image URL instead.)

### 6. Deploy & seed
1. Push everything to GitHub and enable **Pages** (Settings → Pages → branch `main`, root).
2. Open your live site → footer **Admin** → sign in with the account from step 3.
3. Click **"Seed built-in catalog"** once to push the 86 starter products into your database.
4. From now on, **Add product** / **Edit** / **Delete** all save to the database and show for everyone.

---

## Notes
- The site loads products from Supabase if connected; otherwise it falls back to the built-in catalog, so it never shows an empty store.
- "Demo mode" banner in the admin panel = keys not added yet.
- Keep `src/supabase-config.js` — it's the only file you edit to connect.

---

## Contact Us page → email

The **Contact us** page (footer link) sends submissions to **gaurip5690@gmail.com** using
[FormSubmit.co](https://formsubmit.co) — free, no account needed.

**One-time activation (required):**
1. Deploy the site, open the **Contact us** page, and send one test message.
2. FormSubmit emails **gaurip5690@gmail.com** an activation link — click it once to confirm.
3. From then on, every submission lands in that inbox automatically.

To change the destination email, edit `FORM_ENDPOINT` near the top of `src/contact.jsx`.
(Optional: to hide the address from the page source, register the email on formsubmit.co and
swap in the hashed endpoint id they give you.)
