/* PRINTZIN — Cart, Checkout, Razorpay mock, Confirmation */

const persSummary = (pers) => {
  const bits = [];
  if (pers.color) { const c=(window.PZ_DATA.COLORS.find(x=>x.id===pers.color)||{}).name; if(c) bits.push(c); }
  if (pers.size) bits.push('Size ' + pers.size);
  if (pers.photoName) bits.push('Photo: ' + pers.photoName);
  if (pers.text) bits.push('Text: “' + pers.text + '”');
  return bits;
};

/* ============ CART LINE ============ */
const CartLine = ({ item }) => {
  const { setQty, removeItem, nav } = usePZ();
  const p = item.product;
  return (
    <div className="pz-cline">
      <button className="pz-cline-img" onClick={() => nav('product',{id:p.id})}>
        {item.pers.photo ? <img src={item.pers.photo} alt="" className="pz-cline-photo"/> : <ProductImage product={p} glyph={40} showHint={false} rounded={12}/>}
      </button>
      <div className="pz-cline-info">
        <div className="pz-cline-top">
          <button className="pz-cline-name" onClick={() => nav('product',{id:p.id})}>{p.name}</button>
          <button className="pz-cline-del" onClick={() => removeItem(item.key)}><Icon name="trash" size={17}/></button>
        </div>
        {persSummary(item.pers).length > 0 && (
          <div className="pz-cline-pers">
            {persSummary(item.pers).map((b,i)=><span key={i}><Icon name="sparkle" size={11}/>{b}</span>)}
          </div>
        )}
        <div className="pz-cline-bottom">
          <div className="pz-qty sm">
            <button onClick={() => setQty(item.key, item.qty-1)}><Icon name="minus" size={14} stroke={2.6}/></button>
            <span>{item.qty}</span>
            <button onClick={() => setQty(item.key, item.qty+1)}><Icon name="plus" size={14} stroke={2.6}/></button>
          </div>
          <div className="pz-cline-price">
            <strong>{fmt(p.price * item.qty)}</strong>
            {item.qty>1 && <span>{fmt(p.price)} each</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

const OrderSummary = ({ totals, cta, onCta, coupon, setCoupon, applyCoupon, couponMsg }) => (
  <div className="pz-summary">
    <h3>Order summary</h3>
    {setCoupon && (
      <div className="pz-coupon">
        <div className="pz-coupon-in">
          <Icon name="tag" size={17}/>
          <input value={coupon} onChange={e=>setCoupon(e.target.value.toUpperCase())} placeholder="Coupon code"/>
          <button onClick={applyCoupon}>Apply</button>
        </div>
        {couponMsg && <p className={'pz-coupon-msg'+(couponMsg.ok?' ok':' err')}>{couponMsg.text}</p>}
        <div className="pz-coupon-hint">Try <button onClick={()=>{setCoupon('PRINTZIN10');}}>PRINTZIN10</button> for 10% off</div>
      </div>
    )}
    <div className="pz-sum-rows">
      <div><span>Subtotal</span><span>{fmt(totals.subtotal)}</span></div>
      {totals.discount > 0 && <div className="pz-sum-disc"><span>Discount</span><span>-{fmt(totals.discount)}</span></div>}
      {totals.coupon > 0 && <div className="pz-sum-disc"><span>Coupon</span><span>-{fmt(totals.coupon)}</span></div>}
      <div><span>Delivery</span><span>{totals.delivery === 0 ? <em className="pz-free">FREE</em> : fmt(totals.delivery)}</span></div>
    </div>
    <div className="pz-sum-total"><span>Total</span><span>{fmt(totals.total)}</span></div>
    <p className="pz-sum-saved">You save {fmt(totals.discount + totals.coupon + (totals.deliverySaved||0))} on this order 🎉</p>
    <button className="btn btn-primary btn-lg btn-block" onClick={onCta}>{cta} <Icon name="arrowRight" size={18}/></button>
    <div className="pz-sum-trust"><Icon name="lock" size={14}/> Secured by Razorpay · 100% safe</div>
  </div>
);

/* ============ CART PAGE ============ */
const CartPage = () => {
  const { cart, nav, totals } = usePZ();
  if (cart.length === 0) return (
    <div className="wrap pz-empty-page fade-in">
      <span className="pz-empty-ic"><Icon name="cart" size={34}/></span>
      <h2>Your cart is empty</h2>
      <p>Let's fill it with something they'll treasure.</p>
      <button className="btn btn-primary btn-lg" onClick={()=>nav('listing',{cat:'mugs'})}>Start personalising</button>
    </div>
  );
  return (
    <div className="wrap pz-cartpage fade-in">
      <h1 className="pz-page-title">Your cart <span>({cart.reduce((s,i)=>s+i.qty,0)} items)</span></h1>
      <div className="pz-cart-grid">
        <div className="pz-cart-lines">
          {cart.map(it => <CartLine key={it.key} item={it} />)}
          <button className="pz-cart-continue" onClick={()=>nav('home')}><Icon name="chevron" size={15} style={{transform:'rotate(180deg)'}}/> Continue shopping</button>
        </div>
        <OrderSummary totals={totals} cta="Proceed to checkout" onCta={()=>nav('checkout')} />
      </div>
    </div>
  );
};
window.CartPage = CartPage;

/* ============ RAZORPAY MOCK ============ */
const RazorpayModal = ({ amount, email, onClose, onSuccess }) => {
  const [method, setMethod] = React.useState('upi');
  const [stage, setStage] = React.useState('select'); // select | processing | success
  const [upi, setUpi] = React.useState('');
  const methods = [
    { id:'upi', label:'UPI', sub:'GPay, PhonePe, Paytm' },
    { id:'card', label:'Cards', sub:'Visa, Mastercard, RuPay' },
    { id:'nb', label:'Netbanking', sub:'All major banks' },
    { id:'wallet', label:'Wallets', sub:'Paytm, Mobikwik' },
  ];
  const pay = () => {
    setStage('processing');
    setTimeout(() => setStage('success'), 1900);
    setTimeout(() => onSuccess(), 3100);
  };
  return (
    <div className="pz-rzp-backdrop" onClick={stage==='select'?onClose:undefined}>
      <div className="pz-rzp" onClick={e=>e.stopPropagation()}>
        <div className="pz-rzp-head">
          <div className="pz-rzp-merchant">
            <span className="pz-rzp-logo"><Icon name="gift" size={18}/></span>
            <div><strong>Printzin Gifting</strong><span>{email || 'guest@printzin.in'}</span></div>
          </div>
          {stage==='select' && <button className="pz-rzp-close" onClick={onClose}><Icon name="close" size={18}/></button>}
        </div>
        <div className="pz-rzp-amount">
          <span>Amount payable</span><strong>{fmt(amount)}</strong>
        </div>

        {stage==='select' && (
          <div className="pz-rzp-body">
            <div className="pz-rzp-methods">
              {methods.map(m => (
                <button key={m.id} className={'pz-rzp-method'+(method===m.id?' on':'')} onClick={()=>setMethod(m.id)}>
                  <span className="pz-rzp-radio">{method===m.id && <i/>}</span>
                  <div><strong>{m.label}</strong><span>{m.sub}</span></div>
                </button>
              ))}
            </div>
            {method==='upi' && (
              <div className="pz-rzp-field"><input value={upi} onChange={e=>setUpi(e.target.value)} placeholder="yourname@upi"/></div>
            )}
            {method==='card' && (
              <div className="pz-rzp-card">
                <input placeholder="Card number" maxLength={19}/>
                <div><input placeholder="MM / YY" maxLength={7}/><input placeholder="CVV" maxLength={3}/></div>
              </div>
            )}
            <button className="pz-rzp-pay" onClick={pay}>Pay {fmt(amount)}</button>
            <div className="pz-rzp-secure"><Icon name="lock" size={13}/> This is a demo checkout — no real payment is taken</div>
          </div>
        )}

        {stage==='processing' && (
          <div className="pz-rzp-status">
            <div className="pz-spinner"/>
            <strong>Processing payment…</strong>
            <span>Please don't close this window</span>
          </div>
        )}
        {stage==='success' && (
          <div className="pz-rzp-status">
            <div className="pz-rzp-tick"><Icon name="check" size={40} stroke={3}/></div>
            <strong>Payment successful</strong>
            <span>Redirecting to your order…</span>
          </div>
        )}
      </div>
    </div>
  );
};

window.RazorpayModal = RazorpayModal;
window.OrderSummary = OrderSummary;
window.persSummary = persSummary;
window.CartLineExport = CartLine;
