/* PRINTZIN — shared components */

const PZContext = React.createContext(null);
window.PZContext = PZContext;
const usePZ = () => React.useContext(window.PZContext);
window.usePZ = usePZ;

const fmt = (n) => '₹' + Number(n).toLocaleString('en-IN');
window.fmt = fmt;

/* ---------- Rating ---------- */
const Stars = ({ value = 5, size = 14 }) => (
  <span style={{ display: 'inline-flex', gap: 1, color: 'var(--star)' }}>
    {[0,1,2,3,4].map(i => (
      <Icon key={i} name="star" size={size}
        style={{ fill: i < Math.round(value) ? 'var(--star)' : 'none', stroke: 'var(--star)', strokeWidth: 1.6 }} />
    ))}
  </span>
);

/* ---------- Placeholder product image ---------- */
const ProductImage = ({ product, ratio = '1 / 1', glyph = 80, rounded = 16, showHint = true }) => {
  const { CATEGORIES } = window.PZ_DATA;
  const cat = CATEGORIES.find(c => c.id === product.cat) || {};
  const [err, setErr] = React.useState(false);
  if (product.image && !err) {
    return (
      <div className="pz-imgph" style={{
        aspectRatio: ratio, background: '#fff', borderRadius: rounded,
        position: 'relative', overflow: 'hidden', display: 'grid', placeItems: 'center',
      }}>
        <img src={product.image} alt={product.name} loading="lazy" onError={() => setErr(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
    );
  }
  return (
    <div className="pz-imgph" style={{
      aspectRatio: ratio, background: cat.tint || 'var(--peach)', borderRadius: rounded,
      position: 'relative', overflow: 'hidden', display: 'grid', placeItems: 'center',
    }}>
      <div style={{ position: 'absolute', inset: 0, opacity: .5,
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,.05) 1px, transparent 0)',
        backgroundSize: '14px 14px' }} />
      <div style={{ display: 'grid', placeItems: 'center', gap: 10, zIndex: 1, padding: 16, textAlign: 'center' }}>
        <ProductGlyph type={cat.icon} size={glyph} color={cat.accent} />
        {showHint && (
          <span style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: '.12em', textTransform: 'uppercase',
            color: cat.accent, opacity: .65 }}>Your photo here</span>
        )}
      </div>
    </div>
  );
};

/* ---------- Product card ---------- */
const ProductCard = ({ product }) => {
  const { nav, toggleWish, wishlist, addToCart } = usePZ();
  const wished = wishlist.includes(product.id);
  return (
    <div className="pz-card fade-in" onClick={() => nav('product', { id: product.id })}>
      <div className="pz-card-img">
        <ProductImage product={product} glyph={74} />
        <div className="pz-card-badges">
          {product.badge && <span className={'badge ' + (product.badge === 'Premium' ? 'badge-amber' : product.badge === 'New' ? 'badge-pink' : 'badge-coral')}>{product.badge}</span>}
          {product.off >= 10 && <span className="badge badge-soft">{product.off}% off</span>}
        </div>
        <button className={'pz-wish' + (wished ? ' on' : '')} onClick={(e) => { e.stopPropagation(); toggleWish(product.id); }} aria-label="wishlist">
          <Icon name="heart" size={18} style={{ fill: wished ? 'var(--coral)' : 'none' }} />
        </button>
        {product.personalizable && (
          <span className="pz-personalize-tag"><Icon name="sparkle" size={13} /> Personalise</span>
        )}
      </div>
      <div className="pz-card-body">
        <h4 className="pz-card-name">{product.name}</h4>
        <div className="pz-card-rate">
          <Stars value={product.rating} size={12} />
          <span>{product.rating.toFixed(1)}</span>
          <span className="pz-card-rev">({product.reviews})</span>
        </div>
        <div className="pz-card-foot">
          <div className="pz-price">
            <span className="pz-price-now">{fmt(product.price)}</span>
            <span className="pz-price-mrp">{fmt(product.mrp)}</span>
          </div>
          <button className="pz-card-add" onClick={(e) => { e.stopPropagation(); addToCart(product, {}, 1); }}>
            <Icon name="plus" size={16} stroke={2.6} /> Add
          </button>
        </div>
      </div>
    </div>
  );
};

/* ---------- Header ---------- */
const Header = () => {
  const { nav, cartCount, view, query, setQuery, user, wishlist } = usePZ();
  const { CATEGORIES } = window.PZ_DATA;
  const [q, setQ] = React.useState(query || '');
  React.useEffect(() => { setQ(query || ''); }, [query]);
  const submit = (e) => { e.preventDefault(); nav('search', { q }); };
  return (
    <header className="pz-header">
      <div className="pz-topstrip">
        <div className="wrap pz-topstrip-in">
          <span><Icon name="gift" size={15} /> Gifts as unique as the people you love</span>
          <span className="pz-topstrip-mid"><Icon name="sparkle" size={14} /> Free personalisation on every order</span>
          <a className="pz-topstrip-help" href="tel:+919145474834"><Icon name="phone" size={14} /> Help: +91 91454 74834</a>
        </div>
      </div>

      <div className="pz-mainbar">
        <div className="wrap pz-mainbar-in">
          <button className="pz-logo" onClick={() => nav('home')} aria-label="Printzin home">
            <span className="pz-logo-mark"><Icon name="gift" size={22} /></span>
            <span className="pz-logo-txt">Printzin<span className="pz-logo-dot">.</span></span>
          </button>

          <form className="pz-search" onSubmit={submit}>
            <Icon name="search" size={19} />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search mugs, frames, hampers…" />
            <button type="submit" className="pz-search-btn">Search</button>
          </form>

          <div className="pz-actions">
            <button className="pz-act" onClick={() => nav(user ? 'account' : 'auth')}>
              <Icon name="user" size={21} />
              <span>{user ? user.name.split(' ')[0] : 'Sign in'}</span>
            </button>
            <button className="pz-act" onClick={() => nav('wishlist')}>
              <span className="pz-act-ic"><Icon name="heart" size={21} />{wishlist.length > 0 && <i className="pz-dot">{wishlist.length}</i>}</span>
              <span>Wishlist</span>
            </button>
            <button className="pz-act" onClick={() => nav('cart')}>
              <span className="pz-act-ic"><Icon name="cart" size={21} />{cartCount > 0 && <i className="pz-dot">{cartCount}</i>}</span>
              <span>Cart</span>
            </button>
          </div>
        </div>
      </div>

      <nav className="pz-catnav">
        <div className="wrap pz-catnav-in no-sb">
          <button className={'pz-catlink' + (view.name === 'home' ? ' active' : '')} onClick={() => nav('home')}>
            <Icon name="sparkle" size={15} /> All Gifts
          </button>
          {CATEGORIES.map(c => (
            <button key={c.id} className={'pz-catlink' + (view.params?.cat === c.id ? ' active' : '')} onClick={() => nav('listing', { cat: c.id })}>
              {c.name}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
};

/* ---------- Footer ---------- */
const Footer = () => {
  const { nav } = usePZ();
  const { CATEGORIES } = window.PZ_DATA;
  return (
    <footer className="pz-footer">
      <div className="wrap">
        <div className="pz-footer-top">
          <div className="pz-footer-brand">
            <button className="pz-logo" onClick={() => nav('home')}>
              <span className="pz-logo-mark"><Icon name="gift" size={20} /></span>
              <span className="pz-logo-txt" style={{ color: '#fff' }}>Printzin<span style={{ color: 'var(--amber)' }}>.</span></span>
            </button>
            <p>Personalised gifts, printed with love and delivered to doorsteps across India. Every gift tells your story.</p>
            <div className="pz-social">
              <a href="#" onClick={e=>e.preventDefault()}><Icon name="instagram" size={18} /></a>
              <a href="#" onClick={e=>e.preventDefault()}><Icon name="heart" size={18} /></a>
              <a href="#" onClick={e=>e.preventDefault()}><Icon name="gift" size={18} /></a>
            </div>
          </div>
          <div className="pz-footer-col">
            <h5>Shop</h5>
            {CATEGORIES.slice(0,6).map(c => <a key={c.id} href="#" onClick={(e)=>{e.preventDefault();nav('listing',{cat:c.id});}}>{c.name}</a>)}
          </div>
          <div className="pz-footer-col">
            <h5>Company</h5>
            <a href="#" onClick={(e)=>{e.preventDefault();nav('about');}}>About Printzin</a>
            <a href="#" onClick={e=>e.preventDefault()}>How printing works</a>
            <a href="#" onClick={e=>e.preventDefault()}>Bulk & corporate</a>
            <a href="#" onClick={e=>e.preventDefault()}>Careers</a>
          </div>
          <div className="pz-footer-col">
            <h5>Support</h5>
            <a href="#" onClick={e=>e.preventDefault()}>Track your order</a>
            <a href="#" onClick={e=>e.preventDefault()}>Delivery & returns</a>
            <a href="#" onClick={e=>e.preventDefault()}>FAQs</a>
            <a href="#" onClick={(e)=>{e.preventDefault();nav('contact');}}>Contact us</a>
          </div>
        </div>
        <div className="pz-footer-bottom">
          <span>© 2026 Printzin Gifting Solution. Made with <Icon name="heart" size={12} style={{fill:'var(--coral)',stroke:'var(--coral)'}}/> in India.</span>
          <span className="pz-footer-pay">Secure payments by <strong>Razorpay</strong> · UPI · Cards · Netbanking</span>
          <a href="#" className="pz-footer-admin" onClick={(e)=>{e.preventDefault();nav('admin');}}>Admin</a>
        </div>
      </div>
    </footer>
  );
};

Object.assign(window, { Stars, ProductImage, ProductCard, Header, Footer });
