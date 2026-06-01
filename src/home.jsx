/* PRINTZIN — Home page */
const HomePage = () => {
  const { nav } = usePZ();
  const { CATEGORIES, PRODUCTS } = window.PZ_DATA;
  const bestsellers = PRODUCTS.filter(p => p.bestseller).slice(0, 8);
  const trending = PRODUCTS.filter(p => p.badge === 'Trending' || p.badge === 'New').slice(0, 4);

  return (
    <div className="pz-home fade-in">
      {/* HERO */}
      <section className="pz-hero">
        <div className="wrap pz-hero-in">
          <div className="pz-hero-copy">
            <span className="pz-hero-eyebrow"><Icon name="sparkle" size={15} /> Personalised &amp; printed gifts</span>
            <h1>Gifts as <span className="pz-hl">one-of-a-kind</span><br/>as the people you love.</h1>
            <p>Upload a photo, add a message, and we'll print it onto mugs, frames, tees &amp; more — beautifully made and delivered across India.</p>
            <div className="pz-hero-cta">
              <button className="btn btn-primary btn-lg" onClick={() => nav('listing', { cat: 'mugs' })}>Start personalising <Icon name="arrowRight" size={18} /></button>
              <button className="btn btn-ghost btn-lg" onClick={() => nav('listing', { cat: 'combos' })}>Shop combos</button>
            </div>
            <div className="pz-hero-trust">
              <div><strong>4.8★</strong><span>12k+ reviews</span></div>
              <div className="pz-hero-sep" />
              <div><strong>2 Lakh+</strong><span>gifts printed</span></div>
              <div className="pz-hero-sep" />
              <div><strong>Same-day</strong><span>metro delivery</span></div>
            </div>
          </div>
          <div className="pz-hero-art">
            <div className="pz-hero-card pz-hc1">
              <ProductImage product={PRODUCTS[0]} ratio="3 / 4" glyph={70} rounded={20} />
              <span className="pz-hero-tag"><Icon name="sparkle" size={12}/> Photo Mug</span>
            </div>
            <div className="pz-hero-card pz-hc2">
              <ProductImage product={PRODUCTS.find(p=>p.cat==='frames')} ratio="1 / 1" glyph={56} rounded={18} />
              <span className="pz-hero-tag">Frame</span>
            </div>
            <div className="pz-hero-card pz-hc3">
              <ProductImage product={PRODUCTS.find(p=>p.cat==='led')} ratio="1 / 1" glyph={54} rounded={18} />
              <span className="pz-hero-tag">LED Lamp</span>
            </div>
            <div className="pz-hero-blob" />
            <div className="pz-hero-confetti c1" /><div className="pz-hero-confetti c2" /><div className="pz-hero-confetti c3" /><div className="pz-hero-confetti c4" />
          </div>
        </div>
      </section>

      {/* VALUE STRIP */}
      <section className="wrap">
        <div className="pz-values">
          {[
            { ic: 'sparkle', t: 'Free personalisation', s: 'Photo + text on every product' },
            { ic: 'truck', t: 'Fast delivery', s: 'Same-day in metro cities' },
            { ic: 'shield', t: 'Quality promise', s: 'Vivid, fade-proof prints' },
            { ic: 'refresh', t: 'Easy reprints', s: 'Damaged in transit? We redo it' },
          ].map((v,i) => (
            <div className="pz-value" key={i}>
              <span className="pz-value-ic"><Icon name={v.ic} size={22} /></span>
              <div><strong>{v.t}</strong><span>{v.s}</span></div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="wrap pz-section">
        <div className="pz-sec-head">
          <div>
            <span className="eyebrow">Browse the studio</span>
            <h2>What will you print today?</h2>
          </div>
          <button className="pz-seeall" onClick={() => nav('listing', { cat: 'mugs' })}>View all <Icon name="chevron" size={16} /></button>
        </div>
        <div className="pz-cats">
          {CATEGORIES.map(c => (
            <button key={c.id} className="pz-cat" onClick={() => nav('listing', { cat: c.id })} style={{ '--ct': c.tint, '--ca': c.accent }}>
              <div className="pz-cat-art"><ProductGlyph type={c.icon} size={56} color={c.accent} /></div>
              <strong>{c.name}</strong>
              <span>{c.tag}</span>
            </button>
          ))}
        </div>
      </section>

      {/* PERSONALISE BANNER */}
      <section className="wrap pz-section">
        <div className="pz-personalise-banner">
          <div className="pz-pb-copy">
            <span className="eyebrow" style={{ color: 'var(--amber)' }}>How it works</span>
            <h2>Three steps to a gift they'll never forget</h2>
            <div className="pz-steps">
              {[
                { n: '1', t: 'Pick a product', s: 'Mug, frame, tee, cushion & more' },
                { n: '2', t: 'Upload & customise', s: 'Add your photo and a personal message' },
                { n: '3', t: 'We print & deliver', s: 'Studio-quality print at your doorstep' },
              ].map(s => (
                <div className="pz-step" key={s.n}>
                  <span className="pz-step-n">{s.n}</span>
                  <div><strong>{s.t}</strong><span>{s.s}</span></div>
                </div>
              ))}
            </div>
            <button className="btn btn-amber btn-lg" onClick={() => nav('listing', { cat: 'mugs' })}>Personalise a gift <Icon name="arrowRight" size={18} /></button>
          </div>
          <div className="pz-pb-art">
            <div className="pz-pb-mock">
              <ProductImage product={PRODUCTS[0]} ratio="1 / 1" glyph={90} rounded={20} />
            </div>
            <div className="pz-pb-upload">
              <Icon name="upload" size={20} /><span>drop_your_photo.jpg</span><i className="pz-pb-check"><Icon name="check" size={13} stroke={3} /></i>
            </div>
          </div>
        </div>
      </section>

      {/* BESTSELLERS */}
      <section className="wrap pz-section">
        <div className="pz-sec-head">
          <div>
            <span className="eyebrow">Loved by gifters</span>
            <h2>Bestselling personalised gifts</h2>
          </div>
          <button className="pz-seeall" onClick={() => nav('listing', { cat: 'mugs' })}>Shop all <Icon name="chevron" size={16} /></button>
        </div>
        <div className="pz-grid">
          {bestsellers.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* OFFER STRIP */}
      <section className="wrap pz-section">
        <div className="pz-offer">
          <div className="pz-offer-side pz-offer-coral">
            <span className="badge badge-amber">Combo deal</span>
            <h3>Gift combos from {fmt(549)}</h3>
            <p>Wallets, pens &amp; more, gift-wrapped &amp; ready.</p>
            <button className="btn btn-dark" onClick={() => nav('listing', { cat: 'combos' })}>Shop combos</button>
          </div>
          <div className="pz-offer-side pz-offer-amber">
            <span className="badge badge-coral">New in</span>
            <h3>Glow LED photo lamps</h3>
            <p>Turn memories into warm light for any room.</p>
            <button className="btn btn-dark" onClick={() => nav('listing', { cat: 'led' })}>Light it up</button>
          </div>
        </div>
      </section>

      {/* TRENDING */}
      <section className="wrap pz-section">
        <div className="pz-sec-head">
          <div><span className="eyebrow">Fresh &amp; trending</span><h2>New this season</h2></div>
        </div>
        <div className="pz-grid">{trending.map(p => <ProductCard key={p.id} product={p} />)}</div>
      </section>

      {/* TESTIMONIALS */}
      <section className="wrap pz-section">
        <div className="pz-sec-head"><div><span className="eyebrow">Happy gifters</span><h2>What people are saying</h2></div></div>
        <div className="pz-testis">
          {[
            { n: 'Aarohi M.', g: 'Mumbai', t: 'The magic mug blew my husband away on our anniversary. Print quality is gorgeous!', p: 'Couple Magic Mug Set' },
            { n: 'Rohit S.', g: 'Bengaluru', t: 'Ordered 20 custom tees for our team offsite. Delivered in 2 days, perfect prints.', p: 'Custom Print Tee' },
            { n: 'Neha & Kabir', g: 'Delhi', t: 'The LED photo lamp is the prettiest thing in our living room now. So thoughtful.', p: 'Rotating LED Lamp' },
          ].map((r,i) => (
            <div className="pz-testi" key={i}>
              <Stars value={5} size={15} />
              <p>"{r.t}"</p>
              <div className="pz-testi-foot">
                <span className="pz-testi-av">{r.n[0]}</span>
                <div><strong>{r.n}</strong><span>{r.g} · {r.p}</span></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
window.HomePage = HomePage;
