import { useEffect, useRef, useState } from 'react';
import { Clock, CheckCircle2, AlertCircle, Send, Phone, Mail, MapPin, Building2, User, Briefcase, Package, ShieldCheck } from 'lucide-react';
import { useCMSStore } from '../store/useCMSStore';
import { api } from '../lib/api';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const contact = useCMSStore((s) => s.contact);
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);

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
      setSubmitResult({ ok: false, msg: 'Please fill in all required fields marked with *.' });
      return;
    }
    setSubmitting(true);
    try {
      const res = await api.submitQuote(form);
      setSubmitResult({ ok: true, msg: res.message || 'Quote request submitted successfully! We will get back to you within 4 business hours.' });
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
    if (!sectionRef.current) return;

    let ctx = gsap.context(() => {
      // Header Animation
      const hTl = gsap.timeline({
        scrollTrigger: { trigger: '.cnt-header', start: 'top 80%' }
      });
      hTl
        .fromTo('.cnt-eyebrow', { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5 })
        .fromTo('.cnt-heading', { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7 }, '-=0.2')
        .fromTo('.cnt-sub', { y: 15, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5 }, '-=0.3')
        .fromTo('.cnt-divider-line', { scaleX: 0 }, { scaleX: 1, duration: 1, ease: 'power2.inOut' }, '-=0.2');

      // Contact info items stagger
      gsap.fromTo('.cnt-info-card',
        { x: -50, autoAlpha: 0 },
        {
          x: 0, autoAlpha: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: infoRef.current, start: 'top 80%' }
        }
      );

      // Form card slide in
      gsap.fromTo(formRef.current,
        { x: 50, autoAlpha: 0, rotationY: 4 },
        {
          x: 0, autoAlpha: 1, rotationY: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: formRef.current, start: 'top 80%' }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const contactIcons = {
    Phone: <Phone className="cnt-ic" />,
    Mail: <Mail className="cnt-ic" />,
    MapPin: <MapPin className="cnt-ic" />,
    Clock: <Clock className="cnt-ic" />,
  };

  return (
    <section id="contact" ref={sectionRef} className="cnt-section">
      {/* Ambient background */}
      <div className="cnt-bg-grid" />
      <div className="cnt-orb cnt-orb-1" />
      <div className="cnt-orb cnt-orb-2" />

      <div className="cnt-container">
        {/* Header */}
        <div className="cnt-header">
          <span className="cnt-eyebrow">COMMERCIAL_INQUIRIES // B2B_PORTAL</span>
          <h2 className="cnt-heading">{contact.title}</h2>
          <p className="cnt-sub">{contact.subtitle}</p>
          <div className="cnt-divider-line" />
        </div>

        <div className="cnt-layout">
          {/* LEFT: Info Cards & Guarantee */}
          <div ref={infoRef} className="cnt-info-column">
            <div className="cnt-info-list">
              {contact.info.map((item, i) => (
                <div key={i} className="cnt-info-card">
                  <div className="cnt-icon-wrap">
                    {contactIcons[item.icon] || <Phone className="cnt-ic" />}
                  </div>
                  <div className="cnt-info-text">
                    <span className="cnt-info-label">{item.label}</span>
                    <span className="cnt-info-value">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* SLA Guarantee Box */}
            <div className="cnt-sla-box">
              <div className="sla-badge">
                <ShieldCheck size={16} />
                <span>4-HOUR B2B SLA</span>
              </div>
              <h4 className="sla-title">Rapid Commercial Response</h4>
              <p className="sla-desc">
                Submit a quote request and our commercial partnerships team will issue an official B2B quotation within 4 business hours.
              </p>
              <div className="sla-footer">
                <span className="sla-dot" />
                <span>ACTIVE_COMMERCIAL_DESK</span>
              </div>
            </div>
          </div>

          {/* RIGHT: High-Tech Glassmorphism Form */}
          <div ref={formRef} className="cnt-form-card" style={{ visibility: 'hidden' }}>
            <div className="form-card-glow" />

            <div className="form-header-bar">
              <div className="form-title-group">
                <span className="form-eyebrow">REQUEST_B2B_QUOTATION</span>
                <h3 className="form-heading">Commercial Order Quote</h3>
              </div>
              <span className="form-badge">CONFIDENTIAL</span>
            </div>

            {submitResult && (
              <div className={`form-alert ${submitResult.ok ? 'alert-success' : 'alert-error'}`}>
                {submitResult.ok ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                <span>{submitResult.msg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                {/* Company Name */}
                <div className="form-group">
                  <label className="form-label">
                    <Building2 size={13} /> Company Name *
                  </label>
                  <input
                    className="form-input"
                    type="text"
                    placeholder="e.g. Grand Palace Hotel"
                    value={form.companyName}
                    onChange={set('companyName')}
                    disabled={submitting}
                  />
                </div>

                {/* Industry */}
                <div className="form-group">
                  <label className="form-label">
                    <Briefcase size={13} /> Industry *
                  </label>
                  <select className="form-input" value={form.industry} onChange={set('industry')} disabled={submitting}>
                    <option>Hotel / Restaurant / Café</option>
                    <option>Bakery / Confectionery</option>
                    <option>Retail / Supermarket</option>
                    <option>Food Manufacturer</option>
                    <option>Hospital / Institution</option>
                    <option>Other</option>
                  </select>
                </div>

                {/* Contact Name */}
                <div className="form-group">
                  <label className="form-label">
                    <User size={13} /> Contact Name *
                  </label>
                  <input
                    className="form-input"
                    type="text"
                    placeholder="Full name"
                    value={form.contactName}
                    onChange={set('contactName')}
                    disabled={submitting}
                  />
                </div>

                {/* Job Title */}
                <div className="form-group">
                  <label className="form-label">Job Title</label>
                  <input
                    className="form-input"
                    type="text"
                    placeholder="e.g. Procurement Manager"
                    value={form.jobTitle}
                    onChange={set('jobTitle')}
                    disabled={submitting}
                  />
                </div>

                {/* Email */}
                <div className="form-group">
                  <label className="form-label">
                    <Mail size={13} /> Corporate Email *
                  </label>
                  <input
                    className="form-input"
                    type="email"
                    placeholder="name@company.com"
                    value={form.email}
                    onChange={set('email')}
                    disabled={submitting}
                  />
                </div>

                {/* Phone */}
                <div className="form-group">
                  <label className="form-label">
                    <Phone size={13} /> Phone Number *
                  </label>
                  <input
                    className="form-input"
                    type="tel"
                    placeholder="+92 300 1234567"
                    value={form.phone}
                    onChange={set('phone')}
                    disabled={submitting}
                  />
                </div>

                {/* Product Type */}
                <div className="form-group">
                  <label className="form-label">
                    <Package size={13} /> Product Category *
                  </label>
                  <select className="form-input" value={form.productType} onChange={set('productType')} disabled={submitting}>
                    <option>Commercial Grade A White</option>
                    <option>Free-Range Brown</option>
                    <option>Certified Organic</option>
                    <option>Processing Grade / Liquid Whole Egg</option>
                    <option>Mixed / Multiple Categories</option>
                  </select>
                </div>

                {/* Weekly Volume */}
                <div className="form-group">
                  <label className="form-label">Weekly Volume (Trays) *</label>
                  <select className="form-input" value={form.weeklyVolume} onChange={set('weeklyVolume')} disabled={submitting}>
                    <option>Under 50</option>
                    <option>50–199</option>
                    <option>200–499</option>
                    <option>500–1,999</option>
                    <option>2,000+</option>
                  </select>
                </div>
              </div>

              {/* Delivery Location */}
              <div className="form-group">
                <label className="form-label">
                  <MapPin size={13} /> Delivery City / Address *
                </label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="e.g. Mardan, Attock, Peshawar, Lahore"
                  value={form.deliveryLocation}
                  onChange={set('deliveryLocation')}
                  disabled={submitting}
                />
              </div>

              {/* Additional Notes */}
              <div className="form-group">
                <label className="form-label">Special Specifications / Notes</label>
                <textarea
                  className="form-input form-textarea"
                  placeholder="Specify grading requirements, packaging preference, target delivery dates, or custom terms..."
                  value={form.notes}
                  onChange={set('notes')}
                  disabled={submitting}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className={`form-submit-btn ${submitting ? 'btn-submitting' : ''}`}
              >
                <span>{submitting ? 'Transmitting Request...' : 'Submit Commercial Quote Request'}</span>
                <Send size={16} />
              </button>
            </form>

            <div className="form-note">
              <Clock size={13} />
              <span>Response SLA: 4 business hours. Fully confidential B2B processing.</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* ═══════════════════════════════════════
           SECTION BASE
           ═══════════════════════════════════════ */
        .cnt-section {
          background: #060e1a;
          color: #fff;
          padding: 120px 24px 140px;
          position: relative;
          overflow: hidden;
        }

        .cnt-bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px);
          background-size: 50px 50px;
          pointer-events: none;
        }

        .cnt-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
        }

        .cnt-orb-1 {
          width: 550px; height: 550px;
          background: radial-gradient(circle, rgba(200,162,74,0.08), transparent 70%);
          top: 15%; left: -150px;
          animation: cntFloat1 15s ease-in-out infinite alternate;
        }

        .cnt-orb-2 {
          width: 450px; height: 450px;
          background: radial-gradient(circle, rgba(74,140,220,0.06), transparent 70%);
          bottom: 10%; right: -150px;
          animation: cntFloat2 18s ease-in-out infinite alternate;
        }

        @keyframes cntFloat1 {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 40px); }
        }

        @keyframes cntFloat2 {
          0% { transform: translate(0, 0); }
          100% { transform: translate(-50px, -60px); }
        }

        .cnt-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        /* ═══════════════════════════════════════
           HEADER
           ═══════════════════════════════════════ */
        .cnt-header {
          text-align: center;
          max-width: 750px;
          margin: 0 auto 80px;
        }

        .cnt-eyebrow {
          font-family: monospace;
          font-size: 12px;
          letter-spacing: 0.2em;
          color: #c8a24a;
          display: block;
          margin-bottom: 16px;
          visibility: hidden;
        }

        .cnt-heading {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(32px, 4.5vw, 52px);
          font-weight: 700;
          margin: 0 0 18px;
          background: linear-gradient(135deg, #ffffff 0%, #c8a24a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          visibility: hidden;
        }

        .cnt-sub {
          font-size: 16px;
          color: rgba(255,255,255,0.5);
          line-height: 1.7;
          margin: 0 0 28px;
          visibility: hidden;
        }

        .cnt-divider-line {
          width: 70px;
          height: 3px;
          background: linear-gradient(90deg, #c8a24a, #F2E7C9);
          margin: 0 auto;
          transform-origin: center;
          transform: scaleX(0);
          border-radius: 2px;
        }

        /* ═══════════════════════════════════════
           LAYOUT
           ═══════════════════════════════════════ */
        .cnt-layout {
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: 40px;
          align-items: start;
        }

        /* ═══════════════════════════════════════
           LEFT: INFO COLUMN
           ═══════════════════════════════════════ */
        .cnt-info-column {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .cnt-info-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .cnt-info-card {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 22px;
          border-radius: 16px;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.06);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: border-color 0.4s, transform 0.4s;
          visibility: hidden;
        }

        .cnt-info-card:hover {
          border-color: rgba(200,162,74,0.3);
          transform: translateX(6px);
        }

        .cnt-icon-wrap {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(200,162,74,0.1);
          border: 1px solid rgba(200,162,74,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #c8a24a;
          flex-shrink: 0;
        }

        .cnt-ic {
          width: 20px;
          height: 20px;
        }

        .cnt-info-text {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .cnt-info-label {
          font-family: monospace;
          font-size: 10px;
          color: rgba(255,255,255,0.35);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .cnt-info-value {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 15px;
          font-weight: 600;
          color: #fff;
          line-height: 1.4;
        }

        /* SLA Box */
        .cnt-sla-box {
          border-radius: 20px;
          padding: 30px;
          background: linear-gradient(135deg, rgba(200,162,74,0.08) 0%, rgba(10,18,34,0.6) 100%);
          border: 1px solid rgba(200,162,74,0.25);
          backdrop-filter: blur(16px);
          position: relative;
          overflow: hidden;
        }

        .sla-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: monospace;
          font-size: 10px;
          font-weight: 700;
          color: #F2E7C9;
          background: rgba(200,162,74,0.15);
          border: 1px solid rgba(200,162,74,0.3);
          padding: 5px 12px;
          border-radius: 6px;
          margin-bottom: 16px;
        }

        .sla-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 20px;
          font-weight: 700;
          margin: 0 0 10px;
          color: #fff;
        }

        .sla-desc {
          font-size: 14px;
          color: rgba(255,255,255,0.6);
          line-height: 1.65;
          margin: 0 0 20px;
        }

        .sla-footer {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: monospace;
          font-size: 10px;
          color: #4ade80;
          letter-spacing: 0.08em;
        }

        .sla-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #4ade80;
          box-shadow: 0 0 8px rgba(74,222,128,0.6);
        }

        /* ═══════════════════════════════════════
           RIGHT: FORM CARD
           ═══════════════════════════════════════ */
        .cnt-form-card {
          position: relative;
          border-radius: 24px;
          padding: 44px;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 30px 80px rgba(0,0,0,0.4);
        }

        .form-header-bar {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 32px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding-bottom: 20px;
        }

        .form-eyebrow {
          font-family: monospace;
          font-size: 10px;
          color: #c8a24a;
          letter-spacing: 0.15em;
          display: block;
          margin-bottom: 6px;
        }

        .form-heading {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 24px;
          font-weight: 700;
          margin: 0;
          color: #fff;
        }

        .form-badge {
          font-family: monospace;
          font-size: 9px;
          font-weight: 700;
          color: rgba(255,255,255,0.4);
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          padding: 4px 10px;
          border-radius: 4px;
          letter-spacing: 0.1em;
        }

        .form-alert {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 18px;
          border-radius: 10px;
          font-size: 13.5px;
          margin-bottom: 24px;
        }

        .alert-success {
          background: rgba(74,222,128,0.1);
          border: 1px solid rgba(74,222,128,0.25);
          color: #4ade80;
        }

        .alert-error {
          background: rgba(248,113,113,0.1);
          border: 1px solid rgba(248,113,113,0.25);
          color: #f87171;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 12.5px;
          font-weight: 600;
          color: rgba(255,255,255,0.7);
          margin-bottom: 8px;
        }

        .form-input {
          width: 100%;
          padding: 14px 18px;
          border-radius: 10px;
          font-size: 14px;
          font-family: 'Inter', sans-serif;
          color: #fff;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          transition: border-color 0.3s, box-shadow 0.3s, background 0.3s;
          box-sizing: border-box;
        }

        .form-input::placeholder {
          color: rgba(255,255,255,0.25);
        }

        .form-input:focus {
          outline: none;
          background: rgba(255,255,255,0.05);
          border-color: rgba(200,162,74,0.5);
          box-shadow: 0 0 0 3px rgba(200,162,74,0.12);
        }

        select.form-input {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23C8A24A' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 18px center;
          padding-right: 42px;
        }

        select.form-input option {
          background: #0a1628;
          color: #fff;
        }

        .form-textarea {
          resize: vertical;
          min-height: 100px;
          line-height: 1.6;
        }

        .form-submit-btn {
          width: 100%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 15px;
          padding: 16px 32px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          background: linear-gradient(135deg, #c8a24a 0%, #F2E7C9 100%);
          color: #060e1a;
          transition: transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.3s ease;
          box-shadow: 0 10px 30px rgba(200,162,74,0.25);
          margin-top: 10px;
        }

        .form-submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 15px 40px rgba(200,162,74,0.4);
        }

        .btn-submitting {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .form-note {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-family: monospace;
          font-size: 11px;
          color: rgba(255,255,255,0.4);
          margin-top: 20px;
          text-align: center;
        }

        /* ═══════════════════════════════════════
           MOBILE
           ═══════════════════════════════════════ */
        @media (max-width: 900px) {
          .cnt-section {
            padding: 80px 16px;
          }
          .cnt-layout {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .form-grid {
            grid-template-columns: 1fr;
          }
          .cnt-form-card {
            padding: 28px 20px;
          }
        }
      `}</style>
    </section>
  );
}
