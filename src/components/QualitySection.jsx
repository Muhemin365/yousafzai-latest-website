import { useEffect, useRef } from 'react';
import { useCMSStore } from '../store/useCMSStore';
import { ShieldCheck, CheckCircle2, Star, Activity } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function QualitySection() {
  const quality = useCMSStore((s) => s.quality);
  const testimonials = useCMSStore((s) => s.testimonials);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    let ctx = gsap.context(() => {
      // Header reveals
      gsap.fromTo('.q-head',
        { y: 30, autoAlpha: 0 },
        {
          y: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.q-head', start: 'top 85%' }
        }
      );

      // Traceability progress line animation
      gsap.fromTo('.trace-fill-line',
        { scaleX: 0 },
        {
          scaleX: 1, duration: 1.8, ease: 'power2.inOut',
          scrollTrigger: { trigger: '.trace-console', start: 'top 80%' }
        }
      );

      // Certifications grid cards reveal
      gsap.utils.toArray('.q-cert-card').forEach((card, i) => {
        gsap.fromTo(card,
          { y: 40, autoAlpha: 0 },
          {
            y: 0, autoAlpha: 1, duration: 0.7, delay: i * 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 85%' }
          }
        );
      });

      // Testimonials reveal
      gsap.utils.toArray('.q-test-card').forEach((card, i) => {
        gsap.fromTo(card,
          { y: 50, autoAlpha: 0 },
          {
            y: 0, autoAlpha: 1, duration: 0.8, delay: i * 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 85%' }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="q-page-wrapper">
      {/* Background Orbs */}
      <div className="q-bg-grid" />
      <div className="q-orb q-orb-1" />
      <div className="q-orb q-orb-2" />

      {/* Main Section */}
      <section id="quality" className="q-section">
        <div className="container">
          {/* Header */}
          <div className="q-head">
            <span className="q-eyebrow">{quality.eyebrow || 'QUALITY_ASSURANCE // COMPLIANCE'}</span>
            <h2 className="q-heading">{quality.title || 'Uncompromised Quality & Compliance'}</h2>
            <p className="q-sub">{quality.subtitle}</p>
          </div>

          {/* Batch Traceability Console */}
          <div className="trace-console">
            <div className="trace-header">
              <div className="trace-title-group">
                <Activity size={18} className="text-gold" />
                <div>
                  <h3 className="trace-main-title">{quality.batch.title}</h3>
                  <span className="trace-main-sub">{quality.batch.subtitle}</span>
                </div>
              </div>
              <div className="trace-batch-badge">
                <span>BATCH_ID:</span> <strong>{quality.batch.id}</strong>
              </div>
            </div>

            {/* Traceability Flow Steps */}
            <div className="trace-steps-container">
              <div className="trace-bg-line" />
              <div className="trace-fill-line" />

              <div className="trace-steps-grid">
                {quality.batch.steps.map((step, i) => (
                  <div key={i} className="trace-step-item">
                    <div className="step-dot-wrap">
                      <CheckCircle2 size={20} className="step-check-icon" />
                    </div>
                    <span className="step-title">{step.title}</span>
                    <span className="step-time">{step.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Certifications Grid */}
          <div className="q-cert-section">
            <div className="q-head center-head">
              <span className="q-eyebrow">VERIFIED CERTIFICATIONS</span>
              <h3 className="q-subheading">National & International Compliance Standards</h3>
            </div>

            <div className="q-cert-grid">
              {quality.certs.map((cert, i) => (
                <div key={i} className="q-cert-card" style={{ visibility: 'hidden' }}>
                  <div className="cert-card-glow" />
                  <div className="cert-icon-box">
                    <ShieldCheck size={22} />
                  </div>
                  <div className="cert-details">
                    <h4 className="cert-title">{cert.name}</h4>
                    <p className="cert-desc">{cert.body}</p>
                    <span className="cert-status-tag">{cert.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="q-test-section">
        <div className="container">
          <div className="q-head center-head">
            <span className="q-eyebrow">CLIENT TESTIMONIALS</span>
            <h2 className="q-heading">Trusted by Commercial Buyers</h2>
            <p className="q-sub">Hear what major egg distributors, hotels, bakeries, and commercial buyers say about our quality.</p>
          </div>

          <div className="q-test-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="q-test-card" style={{ visibility: 'hidden' }}>
                <div className="test-stars-row">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} size={14} className="star-filled" />
                  ))}
                </div>
                <p className="test-quote-text">"{t.text}"</p>
                <div className="test-user-row">
                  <div className="test-avatar">{t.initials}</div>
                  <div className="test-user-info">
                    <span className="test-name">{t.name}</span>
                    <span className="test-role">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
           QUALITY PAGE ROOT
           â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
        .q-page-wrapper {
          background: #FBF7F0;
          color: #111111;
          position: relative;
          overflow: hidden;
        }

        .q-bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(20,20,20,0.012) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20,20,20,0.012) 1px, transparent 1px);
          background-size: 50px 50px;
          pointer-events: none;
        }

        .q-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
        }

        .q-orb-1 {
          width: 550px; height: 550px;
          background: radial-gradient(circle, rgba(222,81,10,0.12), transparent 70%);
          top: 10%; right: -150px;
        }

        .q-orb-2 {
          width: 450px; height: 450px;
          background: radial-gradient(circle, rgba(255,230,160,0.08), transparent 70%);
          bottom: 20%; left: -150px;
        }

        .q-section {
          padding: 100px 24px 80px;
          position: relative;
          z-index: 2;
        }

        .q-head {
          text-align: left;
          max-width: 750px;
          margin-bottom: 50px;
        }

        .q-head.center-head {
          text-align: center;
          margin: 0 auto 50px;
        }

        .q-eyebrow {
          font-family: monospace;
          font-size: 11px;
          letter-spacing: 0.18em;
          color: #DE510A;
          display: block;
          margin-bottom: 12px;
        }

        .q-heading {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(32px, 4.2vw, 48px);
          font-weight: 700;
          margin: 0 0 16px;
          background: linear-gradient(135deg, #111111 0%, #B9320D 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .q-subheading {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 24px;
          font-weight: 700;
          color: #111111;
          margin: 0;
        }

        .q-sub {
          font-size: 16px;
          color: rgba(20,20,20,0.6);
          line-height: 1.7;
          margin: 0;
        }

        /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
           TRACEABILITY CONSOLE (GOLDEN THEME)
           â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
        .trace-console {
          background: #DE510A;
          border: 1px solid rgba(222,81,10,0.3);
          border-radius: 24px;
          padding: 36px;
          backdrop-filter: blur(20px);
          margin-bottom: 80px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.4);
        }

        .trace-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 24px;
          border-bottom: 1px solid rgba(20,20,20,0.08);
          margin-bottom: 40px;
        }

        .trace-title-group {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .text-gold { color: #DE510A; }

        .trace-main-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 18px;
          font-weight: 700;
          margin: 0 0 4px;
          color: #111111;
        }

        .trace-main-sub {
          font-size: 13px;
          color: rgba(20,20,20,0.5);
        }

        .trace-batch-badge {
          font-family: monospace;
          font-size: 12px;
          color: #B9320D;
          background: rgba(222,81,10,0.15);
          border: 1px solid rgba(222,81,10,0.35);
          padding: 8px 16px;
          border-radius: 8px;
        }

        .trace-steps-container {
          position: relative;
          padding: 20px 0;
        }

        .trace-bg-line {
          position: absolute;
          top: 42px;
          left: 8%; right: 8%;
          height: 3px;
          background: #DE510A;
          z-index: 1;
        }

        .trace-fill-line {
          position: absolute;
          top: 42px;
          left: 8%; right: 8%;
          height: 3px;
          background: linear-gradient(90deg, #DE510A, #F2E7C9);
          z-index: 1;
          transform-origin: left;
          box-shadow: 0 0 12px rgba(222,81,10,0.6);
        }

        .trace-steps-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 16px;
          position: relative;
          z-index: 2;
        }

        .trace-step-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .step-dot-wrap {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: #111111;
          border: 2px solid #DE510A;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 14px;
          box-shadow: 0 0 16px rgba(222,81,10,0.4);
        }

        .step-check-icon {
          color: #DE510A;
        }

        .step-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 13.5px;
          font-weight: 700;
          color: #111111;
          margin-bottom: 4px;
        }

        .step-time {
          font-family: monospace;
          font-size: 11px;
          color: rgba(20,20,20,0.5);
        }

        /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
           CERTIFICATIONS GRID
           â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
        .q-cert-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .q-cert-card {
          position: relative;
          background: #DE510A;
          border: 1px solid rgba(20,20,20,0.08);
          border-radius: 20px;
          padding: 28px 24px;
          display: flex;
          gap: 18px;
          align-items: flex-start;
          backdrop-filter: blur(16px);
          transition: border-color 0.4s, transform 0.4s;
        }

        .q-cert-card:hover {
          border-color: rgba(222,81,10,0.5);
          transform: translateY(-4px);
        }

        .cert-icon-box {
          width: 46px;
          height: 46px;
          border-radius: 12px;
          background: rgba(222,81,10,0.12);
          border: 1px solid rgba(222,81,10,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #DE510A;
          flex-shrink: 0;
        }

        .cert-details {
          display: flex;
          flex-direction: column;
        }

        .cert-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 16px;
          font-weight: 700;
          margin: 0 0 6px;
          color: #111111;
        }

        .cert-desc {
          font-size: 13px;
          color: rgba(20,20,20,0.6);
          line-height: 1.6;
          margin: 0 0 12px;
        }

        .cert-status-tag {
          font-family: monospace;
          font-size: 10px;
          font-weight: 700;
          color: #B9320D;
          background: rgba(222,81,10,0.15);
          border: 1px solid rgba(222,81,10,0.3);
          padding: 3px 10px;
          border-radius: 6px;
          align-self: flex-start;
        }

        /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
           TESTIMONIALS SECTION
           â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
        .q-test-section {
          padding: 100px 24px 140px;
          background: #FBF7F0;
          border-top: 1px solid rgba(20,20,20,0.06);
          position: relative;
          z-index: 2;
        }

        .q-test-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }

        .q-test-card {
          background: #DE510A;
          border: 1px solid rgba(20,20,20,0.08);
          border-radius: 24px;
          padding: 36px 28px;
          display: flex;
          flex-direction: column;
          backdrop-filter: blur(16px);
          transition: border-color 0.4s, transform 0.4s;
        }

        .q-test-card:hover {
          border-color: rgba(222,81,10,0.4);
          transform: translateY(-6px);
        }

        .test-stars-row {
          display: flex;
          gap: 4px;
          margin-bottom: 20px;
        }

        .star-filled {
          color: #f59e0b;
          fill: #f59e0b;
        }

        .test-quote-text {
          font-size: 15px;
          color: rgba(20,20,20,0.75);
          line-height: 1.7;
          margin: 0 0 28px;
          flex-grow: 1;
          font-style: italic;
        }

        .test-user-row {
          display: flex;
          align-items: center;
          gap: 14px;
          padding-top: 20px;
          border-top: 1px solid rgba(20,20,20,0.08);
        }

        .test-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(222,81,10,0.15);
          border: 1px solid rgba(222,81,10,0.3);
          color: #B9320D;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .test-user-info {
          display: flex;
          flex-direction: column;
        }

        .test-name {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 14.5px;
          font-weight: 700;
          color: #111111;
        }

        .test-role {
          font-size: 12px;
          color: rgba(20,20,20,0.5);
        }

        /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
           RESPONSIVE
           â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
        @media (max-width: 1080px) {
          .q-cert-grid { grid-template-columns: repeat(2, 1fr); }
          .q-test-grid { grid-template-columns: repeat(2, 1fr); }
          .trace-steps-grid { grid-template-columns: repeat(3, 1fr); gap: 24px; }
          .trace-bg-line, .trace-fill-line { display: none; }
        }

        @media (max-width: 700px) {
          .q-cert-grid { grid-template-columns: 1fr; }
          .q-test-grid { grid-template-columns: 1fr; }
          .trace-steps-grid { grid-template-columns: 1fr; gap: 20px; }
          .trace-header { flex-direction: column; align-items: flex-start; gap: 14px; }
        }
      `}</style>
    </div>
  );
}
