/* PRINTZIN — Checkout + Confirmation */

const CheckoutPage = () => {
  const { cart, nav, totals, user, placeOrder } = usePZ();
  const [form, setForm] = React.useState({
    name: user ? user.name : '', phone: '', email: user ? user.email : '',
    pincode: '', address: '', city: '', state: '', landmark: '',
  });
  const [slot, setSlot] = React.useState('std');
  const [errors, setErrors] = React.useState({});
  const [showRzp, setShowRzp] = React.useState(false);

  React.useEffect(() => { window.scrollTo({top:0}); }, []);
  if (cart.length === 0) { setTimeout(()=>nav('home'),0); return null; }

  const set = (k,v) => setForm(f => ({ ...f, [k]: v }));
  const slots = [
    { id:'std', label:'Standard delivery', sub:'2–4 days', price:0 },
    { id:'same', label:'Same-day delivery', sub:'Order before 3 PM · metros', price:149 },
    { id:'mid', label:'Midnight surprise', sub:'11 PM – 12 AM delivery', price:249 },
  ];
  const slotPrice = slots.find(s=>s.id===slot).price;
  const grandTotal = totals.total + slotPrice;

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!/^\d{10}$/.test(form.phone)) e.phone = '10-digit mobile';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Valid email';
    if (!/^\d{6}$/.test(form.pincode)) e.pincode = '6-digit pincode';
    if (!form.address.trim()) e.address = 'Required';
    if (!form.city.trim()) e.city = 'Required';
    if (!form.state.trim()) e.state = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onPay = () => {
    if (!validate()) {
      const first = document.querySelector('.pz-co-field.err input, .pz-co-field.err textarea');
      if (first) first.focus();
      return;
    }
    setShowRzp(true);
  };

  const onSuccess = () => {
    setShowRzp(false);
    const order = placeOrder({ address: form, slot: slots.find(s=>s.id===slot), total: grandTotal });
    nav('confirm', { id: order.id });
  };

  const F = (k, label, opts={}) => (
    <div className={'pz-co-field'+(errors[k]?' err':'')+(opts.full?' full':'')}>
      <label>{label}{opts.opt && <span> (optional)</span>}</label>
      {opts.area
        ? <textarea rows={2} value={form[k]} onChange={e=>set(k,e.target.value)} placeholder={opts.ph}/>
        : <input value={form[k]} onChange={e=>set(k, opts.num ? e.target.value.replace(/\D/g,'').slice(0,opts.num):e.target.value)} placeholder={opts.ph}/>}
      {errors[k] && <i className="pz-co-err">{errors[k]}</i>}
    </div>
  );

  return (
    <div className="wrap pz-checkout fade-in">
      <div className="pz-crumb">
        <button onClick={()=>nav('cart')}>Cart</button><Icon name="chevron" size={13}/><span>Checkout</span>
      </div>
      <h1 className="pz-page-title">Checkout</h1>

      <div className="pz-checkout-grid">
        <div className="pz-checkout-main">
          {/* ADDRESS */}
          <section className="pz-co-card">
            <div className="pz-co-step"><span className="pz-co-num">1</span><h3>Delivery address</h3></div>
            <div className="pz-co-form">
              {F('name','Full name',{ph:'Recipient name'})}
              {F('phone','Mobile number',{ph:'10-digit mobile',num:10})}
              {F('email','Email',{ph:'you@example.com'})}
              {F('pincode','Pincode',{ph:'6-digit',num:6})}
              {F('address','Flat / House / Street',{ph:'Address line',area:true,full:true})}
              {F('city','City',{ph:'City'})}
              {F('state','State',{ph:'State'})}
              {F('landmark','Landmark',{ph:'Nearby landmark',opt:true,full:true})}
            </div>
          </section>

          {/* DELIVERY */}
          <section className="pz-co-card">
            <div className="pz-co-step"><span className="pz-co-num">2</span><h3>Delivery speed</h3></div>
            <div className="pz-slots">
              {slots.map(s => (
                <button key={s.id} className={'pz-slot'+(slot===s.id?' on':'')} onClick={()=>setSlot(s.id)}>
                  <span className="pz-rzp-radio">{slot===s.id && <i/>}</span>
                  <div className="pz-slot-meta"><strong>{s.label}</strong><span>{s.sub}</span></div>
                  <span className="pz-slot-price">{s.price===0?'FREE':fmt(s.price)}</span>
                </button>
              ))}
            </div>
          </section>

          {/* PAYMENT */}
          <section className="pz-co-card">
            <div className="pz-co-step"><span className="pz-co-num">3</span><h3>Payment</h3></div>
            <div className="pz-pay-method">
              <div className="pz-pay-rzp">
                <span className="pz-pay-rzp-logo">Razorpay</span>
                <div><strong>Pay securely with Razorpay</strong><span>UPI · Credit/Debit Cards · Netbanking · Wallets</span></div>
                <Icon name="shield" size={22}/>
              </div>
              <div className="pz-pay-icons">
                {['UPI','VISA','RuPay','Mastercard','Paytm'].map(x=><span key={x}>{x}</span>)}
              </div>
            </div>
          </section>
        </div>

        <div className="pz-checkout-side">
          <div className="pz-co-items">
            <h3>{cart.reduce((s,i)=>s+i.qty,0)} items</h3>
            <div className="pz-co-itemlist no-sb">
              {cart.map(it => (
                <div className="pz-co-item" key={it.key}>
                  <span className="pz-co-item-img">{it.pers.photo ? <img src={it.pers.photo} alt=""/> : <ProductImage product={it.product} glyph={26} showHint={false} rounded={9}/>}<i>{it.qty}</i></span>
                  <span className="pz-co-item-name">{it.product.name}</span>
                  <span className="pz-co-item-price">{fmt(it.product.price*it.qty)}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="pz-summary embedded">
            <div className="pz-sum-rows">
              <div><span>Subtotal</span><span>{fmt(totals.subtotal)}</span></div>
              {totals.discount>0 && <div className="pz-sum-disc"><span>Product discount</span><span>-{fmt(totals.discount)}</span></div>}
              {totals.coupon>0 && <div className="pz-sum-disc"><span>Coupon</span><span>-{fmt(totals.coupon)}</span></div>}
              <div><span>Delivery</span><span>{slotPrice===0?<em className="pz-free">FREE</em>:fmt(slotPrice)}</span></div>
            </div>
            <div className="pz-sum-total"><span>Total</span><span>{fmt(grandTotal)}</span></div>
            <button className="btn btn-primary btn-lg btn-block" onClick={onPay}><Icon name="lock" size={17}/> Pay {fmt(grandTotal)}</button>
            <div className="pz-sum-trust"><Icon name="lock" size={14}/> 256-bit secure · Razorpay</div>
          </div>
        </div>
      </div>

      {showRzp && <RazorpayModal amount={grandTotal} email={form.email} onClose={()=>setShowRzp(false)} onSuccess={onSuccess} />}
    </div>
  );
};
window.CheckoutPage = CheckoutPage;

/* ============ CONFIRMATION ============ */
const ConfirmPage = () => {
  const { nav, lastOrder } = usePZ();
  React.useEffect(() => { window.scrollTo({top:0}); }, []);
  const o = lastOrder;
  if (!o) { setTimeout(()=>nav('home'),0); return null; }
  return (
    <div className="wrap pz-confirm fade-in">
      <div className="pz-confirm-card">
        <div className="pz-confirm-burst">
          <div className="pz-confirm-tick"><Icon name="check" size={48} stroke={3}/></div>
          <span className="conf-c c1"/><span className="conf-c c2"/><span className="conf-c c3"/><span className="conf-c c4"/><span className="conf-c c5"/>
        </div>
        <h1>Order confirmed! 🎉</h1>
        <p>Thank you, {o.address.name.split(' ')[0]}! We've started printing your gift with love.</p>
        <div className="pz-confirm-meta">
          <div><span>Order ID</span><strong>{o.id}</strong></div>
          <div><span>Paid</span><strong>{fmt(o.total)}</strong></div>
          <div><span>Delivery</span><strong>{o.slot.label}</strong></div>
        </div>

        <div className="pz-confirm-track">
          {['Order placed','Printing','Out for delivery','Delivered'].map((s,i)=>(
            <div className={'pz-track-step'+(i===0?' done':i===1?' active':'')} key={s}>
              <span className="pz-track-dot">{i===0?<Icon name="check" size={13} stroke={3}/>:i+1}</span>
              <span className="pz-track-label">{s}</span>
            </div>
          ))}
        </div>

        <div className="pz-confirm-items">
          {o.items.map(it=>(
            <div className="pz-confirm-item" key={it.key}>
              <span>{it.pers.photo ? <img src={it.pers.photo} alt=""/> : <ProductImage product={it.product} glyph={28} showHint={false} rounded={10}/>}</span>
              <div><strong>{it.product.name}</strong>{persSummary(it.pers).length>0 && <small>{persSummary(it.pers).join(' · ')}</small>}</div>
              <span className="pz-confirm-item-q">×{it.qty}</span>
            </div>
          ))}
        </div>

        <div className="pz-confirm-cta">
          <button className="btn btn-primary btn-lg" onClick={()=>nav('home')}>Continue shopping</button>
          <button className="btn btn-ghost btn-lg" onClick={()=>nav('account')}>View my orders</button>
        </div>
        <p className="pz-confirm-mail">A confirmation has been sent to {o.address.email}</p>
      </div>
    </div>
  );
};
window.ConfirmPage = ConfirmPage;
