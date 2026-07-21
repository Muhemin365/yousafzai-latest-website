import { useEffect, useRef, useState } from 'react';
import { Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { useCMSStore } from '../store/useCMSStore';
import { api } from '../lib/api';

export default function ContactSection() {
  const contact = useCMSStore((s) => s.contact);
  const ref = useRef(null);
  const [form, setForm] = useState({
    companyName: '', industry: 'Hotel / Restaurant / Café',
    contactName: '', jobTitle: '', email: '', phone: '',
    productType: 'Commercial Grade A White', weeklyVolume: 'Under 50',
    deliveryLocation: '', notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitResult(null);
    if (!form.companyName || !form.contactName || !form.email || !form.phone || !form.deliveryLocation) {
      setSubmitResult({ ok: false, msg: 'Please fill in all required fields.' });
      return;
    }
    setSubmitting(true);
    try {
      const res = await api.submitQuote(form);
      setSubmitResult({ ok: true, msg: res.message || 'Quote request submitted successfully!' });
      setForm({
        companyName: '', industry: 'Hotel / Restaurant / Café',
        contactName: '', jobTitle: '', email: '', phone: '',
        productType: 'Commercial Grade A White', weeklyVolume: 'Under 50',
        deliveryLocation: '', notes: '',
      });
    } catch (err) {
      setSubmitResult({ ok: false, msg: err.message || 'Failed to submit. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    el.querySelectorAll('.reveal').forEach((e) => observer.observe(e));
    return () => observer.disconnect();
  }, []);

  const icons = {
    Phone: <path d="M3 5a2 2 0 012-2h3l2 5-2 1a11 11 0 005 5l1-2 5 2v3a2 2 0 01-2 2A16 16 0 013 7V5z" />,
    Mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>,
    MapPin: <><path d="M12 21s7-7.5 7-12a7 7 0 10-14 0c0 4.5 7 12 7 12z" /><circle cx="12" cy="9" r="2.4" /></>,
    Clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></>,
  };

  return (
    <section className="section-alt" id="contact" ref={ref}>
      <div className="container">
        <div className="sec-head reveal">
          <div className="tag-eyebrow">{contact.eyebrow}</div>
          <h2 className="sec-title">{contact.title}</h2>
          <p className="sec-sub">{contact.subtitle}</p>
        </div>
        <div className="contact-grid">
          <div className="contact-info reveal">
            {contact.info.map((item, i) => (
              <div key={i} className="ci-item">
                <div className="ci-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="19" height="19">
                    {icons[item.icon]}
                  </svg>
                </div>
                <div>
                  <div className="ci-label">{item.label}</div>
                  <div className="ci-value">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="form-card reveal">
            <form onSubmit={handleSubmit}>
              {submitResult && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderRadius: 9, fontSize: 13, marginBottom: 16, background: submitResult.ok ? '#F0FDF4' : '#FEF2F2', color: submitResult.ok ? '#166534' : '#B91C1C' }}>
                  {submitResult.ok ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                  {submitResult.msg}
                </div>
              )}
              <div className="form-row">
                <div className="f-group">
                  <label className="f-label">Company Name *</label>
                  <input className="f-input" type="text" placeholder="Your company name" value={form.companyName} onChange={set('companyName')} disabled={submitting} />
                </div>
                <div className="f-group">
                  <label className="f-label">Industry *</label>
                  <select className="f-input" value={form.industry} onChange={set('industry')} disabled={submitting}>
                    <option>Hotel / Restaurant / Café</option>
                    <option>Bakery / Confectionery</option>
                    <option>Retail / Supermarket</option>
                    <option>Food Manufacturer</option>
                    <option>Hospital / Institution</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="f-group">
                  <label className="f-label">Contact Name *</label>
                  <input className="f-input" type="text" placeholder="Full name" value={form.contactName} onChange={set('contactName')} disabled={submitting} />
                </div>
                <div className="f-group">
                  <label className="f-label">Job Title</label>
                  <input className="f-input" type="text" placeholder="e.g. Procurement Manager" value={form.jobTitle} onChange={set('jobTitle')} disabled={submitting} />
                </div>
              </div>
              <div className="form-row">
                <div className="f-group">
                  <label className="f-label">Email *</label>
                  <input className="f-input" type="email" placeholder="you@company.com" value={form.email} onChange={set('email')} disabled={submitting} />
                </div>
                <div className="f-group">
                  <label className="f-label">Phone *</label>
                  <input className="f-input" type="tel" placeholder="+92 XXX XXXXXXX" value={form.phone} onChange={set('phone')} disabled={submitting} />
                </div>
              </div>
              <div className="form-row">
                <div className="f-group">
                  <label className="f-label">Product Type *</label>
                  <select className="f-input" value={form.productType} onChange={set('productType')} disabled={submitting}>
                    <option>Commercial Grade A White</option>
                    <option>Free-Range Brown</option>
                    <option>Certified Organic</option>
                    <option>Processing Grade</option>
                    <option>Mixed / Multiple</option>
                  </select>
                </div>
                <div className="f-group">
                  <label className="f-label">Weekly Volume (trays) *</label>
                  <select className="f-input" value={form.weeklyVolume} onChange={set('weeklyVolume')} disabled={submitting}>
                    <option>Under 50</option>
                    <option>50–199</option>
                    <option>200–499</option>
                    <option>500–1,999</option>
                    <option>2,000+</option>
                  </select>
                </div>
              </div>
              <div className="f-group">
                <label className="f-label">Delivery Location *</label>
                <input className="f-input" type="text" placeholder="City / address for delivery" value={form.deliveryLocation} onChange={set('deliveryLocation')} disabled={submitting} />
              </div>
              <div className="f-group">
                <label className="f-label">Additional Notes</label>
                <textarea className="f-input" placeholder="Special requirements, certifications needed, start date, etc." value={form.notes} onChange={set('notes')} disabled={submitting} />
              </div>
              <button className="btn btn-navy btn-block" data-ripple type="submit" disabled={submitting} style={{ opacity: submitting ? 0.7 : 1, cursor: submitting ? 'not-allowed' : 'pointer' }}>
                <span>{submitting ? 'Submitting...' : 'Submit Quote Request →'}</span>
              </button>
            </form>
            <div className="form-note"><Clock size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} /> You'll receive a formal quotation within 4 business hours. No commitment required.</div>
          </div>
        </div>
      </div>

      <style>{`
        .contact-grid { display: grid; grid-template-columns: .85fr 1.15fr; gap: 48px; }
        .contact-info { display: flex; flex-direction: column; gap: 26px; }
        .ci-item { display: flex; gap: 16px; align-items: flex-start; }
        .ci-icon { width: 44px; height: 44px; border-radius: 12px; background: #F5F7FA; display: flex; align-items: center; justify-content: center; color: #0B2545; flex-shrink: 0; }
        .ci-label { font-size: 11px; color: #707888; text-transform: uppercase; letter-spacing: .06em; font-weight: 600; margin-bottom: 4px; }
        .ci-value { font-size: 14.5px; color: #0B2545; font-weight: 600; }
        .form-card { background: #FFFFFF; border: 1px solid #EEF1F5; border-radius: 32px; padding: 42px; box-shadow: 0 14px 36px rgba(11,37,69,0.10); }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
        .f-group { margin-bottom: 20px; }
        .f-label { display: block; font-size: 12.5px; font-weight: 600; color: #0B2545; margin-bottom: 8px; }
        .f-input { width: 100%; padding: 13px 16px; border: 1.4px solid #DBDFE6; border-radius: 9px; font-size: 13.5px; font-family: 'Inter',sans-serif; color: #1B2230; background: #FFFFFF; transition: border-color .25s, box-shadow .25s; }
        .f-input:focus { outline: none; border-color: #123A6B; box-shadow: 0 0 0 3px rgba(18,58,107,0.1); }
        select.f-input { appearance: none; background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23707888' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 16px center; padding-right: 38px; }
        textarea.f-input { resize: vertical; min-height: 90px; }
        .form-note { font-size: 12px; color: #707888; text-align: center; margin-top: 14px; }
        .btn-block { width: 100%; display: inline-flex; align-items: center; justify-content: center; gap: 8px; font-family: 'Inter',sans-serif; font-weight: 600; font-size: 13.5px; padding: 13px 26px; border-radius: 9px; border: none; cursor: pointer; background: #0B2545; color: #FFFFFF; transition: transform .25s cubic-bezier(.22,1,.36,1), box-shadow .25s cubic-bezier(.22,1,.36,1); }
        .btn-block:hover { transform: translateY(-2px); box-shadow: 0 14px 28px rgba(11,37,69,0.35); }
        @media (max-width: 860px) { .contact-grid { grid-template-columns: 1fr; } .form-row { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}
