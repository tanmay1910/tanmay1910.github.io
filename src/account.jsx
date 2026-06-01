/* PRINTZIN — Auth, Wishlist, Account */

const AuthPage = () => {
  const { nav, login } = usePZ();
  const [mode, setMode] = React.useState('login');
  const [f, setF] = React.useState({ name:'', email:'', phone:'', pass:'' });
  const [err, setErr] = React.useState({});
  const set = (k,v) => setF(s=>({...s,[k]:v}));

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (mode==='signup' && !f.name.trim()) er.name='Enter your name';
    if (!/^\S+@\S+\.\S+$/.test(f.email)) er.email='Enter a valid email';
    if (f.pass.length < 4) er.pass='Min 4 characters';
    setErr(er);
    if (Object.keys(er).length) return;
    login({ name: f.name.trim() || f.email.split('@')[0].replace(/^\w/,c=>c.toUpperCase()), email: f.email });
    nav('home');
  };

  return (
    <div className="wrap pz-auth fade-in">
      <div className="pz-auth-card">
        <div className="pz-auth-aside">
          <button className="pz-logo" onClick={()=>nav('home')}>
            <span className="pz-logo-mark"><Icon name="gift" size={20}/></span>
            <span className="pz-logo-txt" style={{color:'#fff'}}>Printzin<span style={{color:'var(--amber)'}}>.</span></span>
          </button>
          <h2>Gifting, made personal.</h2>
          <p>Save your designs, track orders and reorder favourites in a tap.</p>
          <ul className="pz-auth-perks">
            <li><Icon name="check" size={16} stroke={3}/> Faster personalised checkout</li>
            <li><Icon name="check" size={16} stroke={3}/> Order tracking &amp; reprints</li>
            <li><Icon name="check" size={16} stroke={3}/> Exclusive member offers</li>
          </ul>
          <div className="pz-auth-deco"><ProductGlyph type="gift" size={120} color="rgba(255,255,255,.18)"/></div>
        </div>
        <div className="pz-auth-form">
          <div className="pz-auth-tabs">
            <button className={mode==='login'?'on':''} onClick={()=>setMode('login')}>Sign in</button>
            <button className={mode==='signup'?'on':''} onClick={()=>setMode('signup')}>Create account</button>
          </div>
          <form onSubmit={submit}>
            {mode==='signup' && (
              <div className={'pz-co-field'+(err.name?' err':'')}>
                <label>Full name</label>
                <input value={f.name} onChange={e=>set('name',e.target.value)} placeholder="Your name"/>
                {err.name && <i className="pz-co-err">{err.name}</i>}
              </div>
            )}
            <div className={'pz-co-field'+(err.email?' err':'')}>
              <label>Email</label>
              <input value={f.email} onChange={e=>set('email',e.target.value)} placeholder="you@example.com"/>
              {err.email && <i className="pz-co-err">{err.email}</i>}
            </div>
            {mode==='signup' && (
              <div className="pz-co-field">
                <label>Mobile <span>(optional)</span></label>
                <input value={f.phone} onChange={e=>set('phone',e.target.value.replace(/\D/g,'').slice(0,10))} placeholder="10-digit mobile"/>
              </div>
            )}
            <div className={'pz-co-field'+(err.pass?' err':'')}>
              <label>Password</label>
              <input type="password" value={f.pass} onChange={e=>set('pass',e.target.value)} placeholder="••••••••"/>
              {err.pass && <i className="pz-co-err">{err.pass}</i>}
            </div>
            {mode==='login' && <button type="button" className="pz-auth-forgot">Forgot password?</button>}
            <button type="submit" className="btn btn-primary btn-lg btn-block" style={{marginTop:8}}>
              {mode==='login'?'Sign in':'Create account'}
            </button>
          </form>
          <div className="pz-auth-or"><span>or continue with</span></div>
          <div className="pz-auth-social">
            <button onClick={()=>{login({name:'Guest User',email:'guest@printzin.in'});nav('home');}}>Google</button>
            <button onClick={()=>{login({name:'Guest User',email:'guest@printzin.in'});nav('home');}}>Phone OTP</button>
          </div>
          <p className="pz-auth-terms">By continuing you agree to Printzin's Terms &amp; Privacy Policy.</p>
        </div>
      </div>
    </div>
  );
};
window.AuthPage = AuthPage;

const WishlistPage = () => {
  const { wishlist, nav } = usePZ();
  const items = wishlist.map(id => window.PZ_DATA.bySlug(id)).filter(Boolean);
  if (items.length===0) return (
    <div className="wrap pz-empty-page fade-in">
      <span className="pz-empty-ic"><Icon name="heart" size={32}/></span>
      <h2>Your wishlist is empty</h2>
      <p>Tap the heart on any gift to save it for later.</p>
      <button className="btn btn-primary btn-lg" onClick={()=>nav('listing',{cat:'mugs'})}>Browse gifts</button>
    </div>
  );
  return (
    <div className="wrap pz-shop fade-in" style={{paddingTop:24}}>
      <h1 className="pz-page-title">Your wishlist <span>({items.length})</span></h1>
      <div className="pz-grid" style={{marginTop:20}}>{items.map(p=><ProductCard key={p.id} product={p}/>)}</div>
    </div>
  );
};
window.WishlistPage = WishlistPage;

const AccountPage = () => {
  const { user, nav, logout, orders } = usePZ();
  if (!user) { setTimeout(()=>nav('auth'),0); return null; }
  return (
    <div className="wrap pz-account fade-in" style={{paddingTop:24}}>
      <div className="pz-account-head">
        <span className="pz-account-av">{user.name[0]}</span>
        <div><h1>Hi, {user.name.split(' ')[0]} 👋</h1><span>{user.email}</span></div>
        <button className="btn btn-ghost btn-sm" onClick={()=>{logout();nav('home');}}>Sign out</button>
      </div>
      <h3 className="pz-account-sub">Your orders</h3>
      {orders.length===0 ? (
        <div className="pz-account-noorders">
          <p>No orders yet — your gifts will appear here.</p>
          <button className="btn btn-primary" onClick={()=>nav('listing',{cat:'mugs'})}>Start shopping</button>
        </div>
      ) : (
        <div className="pz-account-orders">
          {orders.map(o=>(
            <div className="pz-order" key={o.id}>
              <div className="pz-order-top">
                <div><strong>{o.id}</strong><span>{o.date}</span></div>
                <span className="badge badge-green">Printing</span>
              </div>
              <div className="pz-order-items">
                {o.items.map(it=>(
                  <span className="pz-order-thumb" key={it.key}>
                    {it.pers.photo ? <img src={it.pers.photo} alt=""/> : <ProductImage product={it.product} glyph={24} showHint={false} rounded={8}/>}
                  </span>
                ))}
                <div className="pz-order-info"><strong>{o.items.reduce((s,i)=>s+i.qty,0)} item(s)</strong><span>{o.slot.label}</span></div>
                <strong className="pz-order-total">{fmt(o.total)}</strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
window.AccountPage = AccountPage;
