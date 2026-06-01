/* PRINTZIN — app shell, routing, cart & state */
const { useState, useEffect, useCallback } = React;

const LS = {
  get: (k, d) => { try { const v = localStorage.getItem('pz_'+k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set: (k, v) => { try { localStorage.setItem('pz_'+k, JSON.stringify(v)); } catch {} },
};

function App() {
  const [view, setView] = useState(() => (window.location.hash === '#admin' ? { name: 'admin', params: {} } : { name: 'home', params: {} }));
  const [, setRev] = useState(0);
  const [cart, setCart] = useState(() => LS.get('cart', []));
  const [wishlist, setWishlist] = useState(() => LS.get('wish', []));
  const [user, setUser] = useState(() => LS.get('user', null));
  const [orders, setOrders] = useState(() => LS.get('orders', []));
  const [lastOrder, setLastOrder] = useState(null);
  const [query, setQuery] = useState('');
  const [coupon, setCoupon] = useState('');
  const [couponMsg, setCouponMsg] = useState(null);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [toastMsg, setToastMsg] = useState(null);

  // expose a global re-render hook so the Supabase loader / admin can refresh the catalog
  useEffect(() => {
    window.__pzRefresh = () => setRev(r => r + 1);
    const onHash = () => { if (window.location.hash === '#admin') setView({ name: 'admin', params: {} }); };
    window.addEventListener('hashchange', onHash);
    return () => { window.removeEventListener('hashchange', onHash); delete window.__pzRefresh; };
  }, []);

  useEffect(() => LS.set('cart', cart), [cart]);
  useEffect(() => LS.set('wish', wishlist), [wishlist]);
  useEffect(() => LS.set('user', user), [user]);
  useEffect(() => LS.set('orders', orders), [orders]);

  const nav = useCallback((name, params = {}) => {
    setView({ name, params });
    if (name === 'search') setQuery(params.q || '');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const toast = useCallback((msg) => {
    setToastMsg(msg);
    clearTimeout(window.__pzToast);
    window.__pzToast = setTimeout(() => setToastMsg(null), 2400);
  }, []);

  const addToCart = useCallback((product, pers = {}, qty = 1) => {
    const key = product.id + '|' + (pers.color||'') + '|' + (pers.size||'') + '|' + (pers.photoName||'') + '|' + (pers.text||'');
    setCart(c => {
      const ex = c.find(i => i.key === key);
      if (ex) return c.map(i => i.key === key ? { ...i, qty: i.qty + qty } : i);
      return [...c, { key, product, pers, qty }];
    });
    toast(`Added “${product.name}” to cart`);
  }, [toast]);

  const setQty = useCallback((key, q) => {
    if (q <= 0) { setCart(c => c.filter(i => i.key !== key)); return; }
    setCart(c => c.map(i => i.key === key ? { ...i, qty: q } : i));
  }, []);
  const removeItem = useCallback((key) => setCart(c => c.filter(i => i.key !== key)), []);

  const toggleWish = useCallback((id) => setWishlist(w => w.includes(id) ? w.filter(x=>x!==id) : [...w, id]), []);

  const login = useCallback((u) => setUser(u), []);
  const logout = useCallback(() => setUser(null), []);

  const applyCoupon = useCallback(() => {
    const code = coupon.trim().toUpperCase();
    if (!code) return;
    if (code === 'PRINTZIN10') { setAppliedCoupon({ code, pct: 10 }); setCouponMsg({ ok: true, text: '🎉 10% off applied!' }); }
    else if (code === 'GIFT50') { setAppliedCoupon({ code, flat: 50 }); setCouponMsg({ ok: true, text: '₹50 off applied!' }); }
    else { setAppliedCoupon(null); setCouponMsg({ ok: false, text: 'Invalid coupon code' }); }
  }, [coupon]);

  // totals
  const subtotal = cart.reduce((s, i) => s + i.product.price * i.qty, 0);
  const mrpTotal = cart.reduce((s, i) => s + i.product.mrp * i.qty, 0);
  const discount = mrpTotal - subtotal;
  let couponAmt = 0;
  if (appliedCoupon) couponAmt = appliedCoupon.pct ? Math.round(subtotal * appliedCoupon.pct / 100) : (appliedCoupon.flat || 0);
  const afterCoupon = subtotal - couponAmt;
  const delivery = afterCoupon >= 599 ? 0 : (afterCoupon > 0 ? 49 : 0);
  const totals = {
    subtotal, discount, coupon: couponAmt, delivery,
    deliverySaved: afterCoupon >= 599 ? 49 : 0,
    total: afterCoupon + delivery,
  };

  const placeOrder = useCallback((details) => {
    const id = 'PZ' + Math.floor(100000 + Math.random() * 899999);
    const order = {
      id, items: cart, total: details.total, address: details.address, slot: details.slot,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    };
    setOrders(o => [order, ...o]);
    setLastOrder(order);
    setCart([]); setAppliedCoupon(null); setCoupon(''); setCouponMsg(null);
    return order;
  }, [cart]);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const ctx = {
    view, nav, cart, cartCount, wishlist, user, orders, lastOrder, query, setQuery, totals,
    addToCart, setQty, removeItem, toggleWish, login, logout, placeOrder, toast,
    coupon, setCoupon, applyCoupon, couponMsg,
  };

  // inject coupon controls into cart summary via context override
  const pages = {
    home: window.HomePage, listing: () => <window.ShopPage mode="listing" />, search: () => <window.ShopPage mode="search" />,
    product: window.ProductPage, cart: window.CartPageWrapped, checkout: window.CheckoutPage, confirm: window.ConfirmPage,
    auth: window.AuthPage, wishlist: window.WishlistPage, account: window.AccountPage,
    admin: window.AdminPage, contact: window.ContactPage, about: window.AboutPage,
  };
  const Page = pages[view.name] || window.HomePage;

  return (
    <window.PZContext.Provider value={ctx}>
      <Header />
      <main className="pz-main">
        <Page />
      </main>
      <Footer />
      {toastMsg && <div className="pz-toast"><Icon name="check" size={18} stroke={3} />{toastMsg}</div>}
    </window.PZContext.Provider>
  );
}

// Cart page needs coupon controls — wrap to pass coupon state from context
window.CartPageWrapped = function () {
  const ctx = usePZ();
  const { cart, nav, totals, coupon, setCoupon, applyCoupon, couponMsg } = ctx;
  if (cart.length === 0) return <window.CartPage />;
  return (
    <div className="wrap pz-cartpage fade-in">
      <h1 className="pz-page-title">Your cart <span>({cart.reduce((s,i)=>s+i.qty,0)} items)</span></h1>
      <div className="pz-cart-grid">
        <div className="pz-cart-lines">
          {cart.map(it => <window.CartLineExport key={it.key} item={it} />)}
          <button className="pz-cart-continue" onClick={()=>nav('home')}><Icon name="chevron" size={15} style={{transform:'rotate(180deg)'}}/> Continue shopping</button>
        </div>
        <window.OrderSummary totals={totals} cta="Proceed to checkout" onCta={()=>nav('checkout')}
          coupon={coupon} setCoupon={setCoupon} applyCoupon={applyCoupon} couponMsg={couponMsg} />
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
