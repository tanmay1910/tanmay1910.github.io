/* PRINTZIN — Contact Us page (form → email via FormSubmit) */
const ContactPage = () => {
  const { nav } = usePZ();

  // Submissions are emailed here. To hide the address in the page source,
  // activate FormSubmit once and swap this for your hashed endpoint id.
  const FORM_ENDPOINT = 'https://formsubmit.co/ajax/gaurip5690@gmail.com';

  const [f, setF] = React.useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [err, setErr] = React.useState({});
  const [status, setStatus] = React.useState('idle'); // idle | sending | sent | error
  const set = (k, v) => setF(s => ({ ...s, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    const er = {};
    if (!f.name.trim()) er.name = 'Please enter your name';
    if (!/^\S+@\S+\.\S+$/.test(f.email)) er.email = 'Enter a valid email';
    if (!f.message.trim()) er.message = 'Please write a message';
    setErr(er);
    if (Object.keys(er).length) return;

    setStatus('sending');
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: f.name, email: f.email, phone: f.phone,
          subject: f.subject || 'New enquiry from Printzin website',
          message: f.message,
          _subject: 'Printzin — new contact enquiry',
          _template: 'table',
        }),
      });
      if (res.ok) { setStatus('sent'); setF({ name: '', email: '', phone: '', subject: '', message: '' }); }
      else setStatus('error');
    } catch (_) { setStatus('error'); }
  };

  return (
    <div className="wrap pz-contact fade-in">
      <div className="pz-contact-head">
        <span className="eyebrow">We'd love to hear from you</span>
        <h1>Get in touch</h1>
        <p>Questions about a gift, bulk orders or a custom idea? Send us a message and our team will get back within one working day.</p>
      </div>

      <div className="pz-contact-grid">
        {/* ---- info rail ---- */}
        <aside className="pz-contact-aside">
          <div className="pz-contact-card">
            <span className="pz-contact-ico"><Icon name="phone" size={20} /></span>
            <div>
              <h4>Call or WhatsApp</h4>
              <a href="https://wa.me/919145474834" target="_blank" rel="noopener">+91 91454 74834</a>
            </div>
          </div>
          <div className="pz-contact-card">
            <span className="pz-contact-ico"><Icon name="mail" size={20} /></span>
            <div>
              <h4>Email us</h4>
              <a href="mailto:gaurip5690@gmail.com">gaurip5690@gmail.com</a>
            </div>
          </div>
          <div className="pz-contact-card">
            <span className="pz-contact-ico"><Icon name="truck" size={20} /></span>
            <div>
              <h4>Delivery</h4>
              <span>Pan-India shipping · 3–6 working days</span>
            </div>
          </div>
          <div className="pz-contact-hours">
            <strong>Support hours</strong>
            <span>Mon–Sat · 10:00 AM – 7:00 PM IST</span>
          </div>
        </aside>

        {/* ---- form ---- */}
        <div className="pz-contact-formwrap">
          {status === 'sent' ? (
            <div className="pz-contact-thanks">
              <span className="pz-contact-check"><Icon name="check" size={34} stroke={3} /></span>
              <h2>Message sent!</h2>
              <p>Thanks for reaching out — we've received your message and will reply to your email shortly.</p>
              <div className="pz-contact-thanks-actions">
                <button className="btn btn-primary" onClick={() => nav('home')}>Back to store</button>
                <button className="btn btn-ghost" onClick={() => setStatus('idle')}>Send another</button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <div className="pz-contact-row">
                <div className={'pz-co-field' + (err.name ? ' err' : '')}>
                  <label>Your name *</label>
                  <input value={f.name} onChange={e => set('name', e.target.value)} placeholder="Full name" />
                  {err.name && <i className="pz-co-err">{err.name}</i>}
                </div>
                <div className={'pz-co-field' + (err.email ? ' err' : '')}>
                  <label>Email *</label>
                  <input type="email" value={f.email} onChange={e => set('email', e.target.value)} placeholder="you@example.com" />
                  {err.email && <i className="pz-co-err">{err.email}</i>}
                </div>
              </div>
              <div className="pz-contact-row">
                <div className="pz-co-field">
                  <label>Mobile <span>(optional)</span></label>
                  <input value={f.phone} onChange={e => set('phone', e.target.value.replace(/\D/g, '').slice(0, 10))} placeholder="10-digit mobile" />
                </div>
                <div className="pz-co-field">
                  <label>Subject <span>(optional)</span></label>
                  <input value={f.subject} onChange={e => set('subject', e.target.value)} placeholder="What's this about?" />
                </div>
              </div>
              <div className={'pz-co-field' + (err.message ? ' err' : '')}>
                <label>Message *</label>
                <textarea rows={5} value={f.message} onChange={e => set('message', e.target.value)} placeholder="Tell us how we can help…" />
                {err.message && <i className="pz-co-err">{err.message}</i>}
              </div>
              {status === 'error' && (
                <div className="pz-contact-formerr">
                  Couldn't send right now. Please email us directly at <a href="mailto:gaurip5690@gmail.com">gaurip5690@gmail.com</a>.
                </div>
              )}
              <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </button>
              <p className="pz-contact-note">We'll only use your details to respond to this enquiry.</p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
window.ContactPage = ContactPage;
