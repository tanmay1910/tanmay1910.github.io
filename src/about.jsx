/* PRINTZIN — About Us page */
const AboutPage = () => {
  const { nav } = usePZ();
  const { PRODUCTS } = window.PZ_DATA;
  const find = (name) => PRODUCTS.find(p => p.name === name);

  // Curated, photogenic customised products for the galleries
  const heroPics = [
    find('Heart Handle Black Magic Mug'),
    find('Customize Collage Frame'),
    find('Photo Night Lamp'),
  ].filter(Boolean);

  const gallery = [
    find('Round Neck Cotton Biowash T-shirt'),
    find('5 in 1 Women Set'),
    find('Sublimation Tumbler 20 oz With Straw'),
    find('Magic Photo Mirror (White)'),
    find('A4 Photo Frame'),
    find('Polaroid Heart Photo Fridge Magnet'),
    find('Faux Leather Couple Combo Set of 2'),
    find('Magic Mug Regular'),
  ].filter(Boolean);

  const values = [
    { ic: 'sparkle', t: 'Made personal', s: 'Every piece carries your photo, your words, your moment — never off-the-shelf.' },
    { ic: 'shield', t: 'Studio-grade prints', s: 'Vivid, fade-proof sublimation and UV printing that lasts for years.' },
    { ic: 'truck', t: 'Delivered with care', s: 'Gift-wrapped and shipped pan-India, same-day in metro cities.' },
    { ic: 'heart', t: 'Made with love', s: 'A small team that treats every order like a gift for our own family.' },
  ];

  return (
    <div className="pz-about fade-in" data-screen-label="About">
      {/* HERO */}
      <section className="pz-ab-hero">
        <div className="wrap pz-ab-hero-in">
          <div className="pz-ab-hero-copy">
            <span className="eyebrow">Our story</span>
            <h1>We turn your memories into gifts worth keeping.</h1>
            <p>
              Printzin Gifting Solution began with one simple belief — the best gifts
              aren't bought, they're <em>made personal</em>. From a photo mug that brings
              back a holiday to a glowing lamp that holds a face you love, we print emotion
              onto everyday things and deliver it to doorsteps across India.
            </p>
            <div className="pz-ab-hero-cta">
              <button className="btn btn-primary btn-lg" onClick={() => nav('listing', { cat: 'mugs' })}>
                Start personalising <Icon name="arrowRight" size={18} />
              </button>
              <button className="btn btn-ghost btn-lg" onClick={() => nav('contact')}>Talk to us</button>
            </div>
          </div>

          <div className="pz-ab-hero-art">
            {heroPics.map((p, i) => (
              <button key={p.id} className={'pz-ab-hcard pz-ab-hc' + (i + 1)} onClick={() => nav('product', { id: p.id })}>
                <ProductImage product={p} ratio={i === 0 ? '3 / 4' : '1 / 1'} glyph={64} rounded={18} showHint={false} />
                <span className="pz-ab-htag">{p.name.split(' ').slice(0, 2).join(' ')}</span>
              </button>
            ))}
            <span className="pz-ab-blob" />
          </div>
        </div>
      </section>

      {/* STATS BAND */}
      <section className="pz-ab-stats">
        <div className="wrap pz-ab-stats-in">
          {[
            { n: '2 Lakh+', l: 'gifts printed & shipped' },
            { n: '12k+', l: '5-star happy gifters' },
            { n: '10', l: 'curated gifting studios' },
            { n: '4.8★', l: 'average review rating' },
          ].map((s, i) => (
            <div className="pz-ab-stat" key={i}>
              <strong>{s.n}</strong>
              <span>{s.l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* STORY / MISSION */}
      <section className="wrap pz-section pz-ab-story">
        <div className="pz-ab-story-copy">
          <span className="eyebrow">Why Printzin</span>
          <h2>Thoughtful gifting, printed with heart.</h2>
          <p>
            Birthdays, anniversaries, farewells, festivals — the moments that matter
            deserve more than a generic present. We built Printzin so anyone can create
            something genuinely one-of-a-kind in minutes: pick a product, upload a photo,
            add a message, and let our studio handle the rest.
          </p>
          <p>
            From single keepsakes to bulk corporate hampers, every order is printed,
            quality-checked and packed by people who care about how it lands in someone's
            hands. That's the Printzin promise — gifts as unique as the people you love.
          </p>
          <ul className="pz-ab-checks">
            <li><span><Icon name="check" size={14} stroke={3} /></span> Free personalisation on every product</li>
            <li><span><Icon name="check" size={14} stroke={3} /></span> 500+ products across 10 categories</li>
            <li><span><Icon name="check" size={14} stroke={3} /></span> Easy reprints if anything arrives damaged</li>
          </ul>
        </div>
        <button className="pz-ab-story-pic" onClick={() => nav('product', { id: find('Photo Night Lamp').id })}>
          <ProductImage product={find('Photo Night Lamp')} ratio="4 / 5" glyph={80} rounded={22} showHint={false} />
        </button>
      </section>

      {/* GALLERY */}
      <section className="wrap pz-section">
        <div className="pz-sec-head">
          <div>
            <span className="eyebrow">Made for our customers</span>
            <h2>A few favourites, personalised</h2>
          </div>
          <button className="pz-seeall" onClick={() => nav('listing', { cat: 'mugs' })}>Shop everything <Icon name="chevron" size={16} /></button>
        </div>
        <div className="pz-ab-gallery">
          {gallery.map((p, i) => (
            <button key={p.id} className={'pz-ab-gtile' + (i === 0 || i === 5 ? ' tall' : '')} onClick={() => nav('product', { id: p.id })}>
              <ProductImage product={p} ratio={i === 0 || i === 5 ? '3 / 4' : '1 / 1'} glyph={60} rounded={16} showHint={false} />
              <span className="pz-ab-gcap">{p.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* VALUES */}
      <section className="wrap pz-section">
        <div className="pz-sec-head">
          <div><span className="eyebrow">What we stand for</span><h2>Little things, done right</h2></div>
        </div>
        <div className="pz-ab-values">
          {values.map((v, i) => (
            <div className="pz-ab-value" key={i}>
              <span className="pz-ab-vic"><Icon name={v.ic} size={22} /></span>
              <h4>{v.t}</h4>
              <p>{v.s}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="wrap pz-section">
        <div className="pz-ab-cta">
          <div className="pz-ab-cta-copy">
            <span className="eyebrow" style={{ color: 'var(--amber)' }}>Ready when you are</span>
            <h2>Create a gift they'll never forget.</h2>
            <p>It takes two minutes — and lasts a lifetime on their shelf.</p>
          </div>
          <div className="pz-ab-cta-actions">
            <button className="btn btn-amber btn-lg" onClick={() => nav('listing', { cat: 'mugs' })}>Browse gifts <Icon name="arrowRight" size={18} /></button>
            <button className="btn btn-ghost btn-lg" onClick={() => nav('contact')}>Bulk &amp; corporate</button>
          </div>
        </div>
      </section>
    </div>
  );
};
window.AboutPage = AboutPage;
