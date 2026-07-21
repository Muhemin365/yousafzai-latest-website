import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCMSStore } from '../store/useCMSStore';

function EggTradersHero({ data }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('in'); observer.unobserve(entry.target); } }); },
      { threshold: 0.15 }
    );
    el.querySelectorAll('.et-reveal').forEach((e) => observer.observe(e));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <section className="et-hero">
        <div className="et-hero-bg" />
        <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: 96 }}>
          <div className="et-hero-content">
            <div className="et-reveal">
              <div className="et-eyebrow">{data.eyebrow}</div>
              <h1 className="et-h1">
                {data.h1Line1}{' '}
                <span className="et-h1-highlight">{data.h1Highlight}</span>{' '}
                {data.h1Line2}
              </h1>
              <p className="et-hero-body">{data.body}</p>
              <div className="et-hero-ctas">
                <Link to={data.primaryCta.action} className="et-btn et-btn-primary">{data.primaryCta.label}</Link>
                <Link to={data.secondaryCta.action} className="et-btn et-btn-secondary">{data.secondaryCta.label}</Link>
              </div>
            </div>
            <div className="et-trust-row et-reveal">
              {data.trustItems.map((item, i) => (
                <div key={i} className="et-trust-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16" style={{ color: '#F59E0B' }}>
                    {item.icon === 'ShieldCheck' ? <><path d="M12 2l8 4v6c0 5-3.6 8-8 10-4.4-2-8-5-8-10V6l8-4z" /><path d="M9 12l2 2 4-4" /></> :
                     item.icon === 'CheckCircle2' ? <><circle cx="12" cy="12" r="9" /><path d="M9 12l2 2 4-4" /></> :
                     <><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path d="M9 22V12h6v10" /></>}
                  </svg>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .et-hero { position: relative; min-height: 100vh; display: flex; align-items: center; padding-top: 0; overflow: hidden; }
        .et-hero-bg { position: absolute; inset: 0; background: radial-gradient(120% 100% at 80% 0%, #059669 0%, #0D6B3D 45%, #064E3B 100%); }
        .et-hero-bg::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.07) 1px, transparent 0); background-size: 34px 34px; opacity: .5; }
        .et-hero-content { max-width: 680px; padding: 100px 0 60px; }
        .et-eyebrow { display: inline-flex; align-items: center; gap: 8px; font-size: 11.5px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: #FDE68A; margin-bottom: 18px; }
        .et-eyebrow::before { content: ''; width: 22px; height: 1.6px; background: #FDE68A; }
        .et-h1 { font-family: 'Space Grotesk',sans-serif; font-weight: 600; font-size: clamp(2.4rem,4vw,3.6rem); color: #FFFFFF; line-height: 1.1; letter-spacing: -0.01em; margin-bottom: 24px; }
        .et-h1-highlight { background: linear-gradient(120deg,#FDE68A,#F59E0B); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .et-hero-body { font-size: 16px; color: rgba(255,255,255,0.8); line-height: 1.75; margin-bottom: 36px; max-width: 560px; }
        .et-hero-ctas { display: flex; gap: 16px; margin-bottom: 48px; flex-wrap: wrap; }
        .et-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; font-family: 'Inter',sans-serif; font-weight: 600; font-size: 14px; padding: 14px 28px; border-radius: 10px; cursor: pointer; text-decoration: none; position: relative; overflow: hidden; transition: all .3s; }
        .et-btn-primary { background: linear-gradient(120deg,#D97706,#F59E0B 55%,#FDE68A); color: #064E3B; box-shadow: 0 10px 24px rgba(245,158,11,0.35); }
        .et-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 14px 32px rgba(245,158,11,0.45); }
        .et-btn-secondary { border: 1.5px solid rgba(255,255,255,0.4); color: #FFFFFF; background: rgba(255,255,255,0.08); backdrop-filter: blur(4px); }
        .et-btn-secondary:hover { background: rgba(255,255,255,0.15); border-color: rgba(255,255,255,0.6); }
        .et-trust-row { display: flex; gap: 32px; flex-wrap: wrap; }
        .et-trust-item { display: flex; align-items: center; gap: 8px; font-size: 13.5px; color: rgba(255,255,255,0.75); }
        .et-reveal { opacity: 0; transform: translateY(28px); transition: opacity .8s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1); }
        .et-reveal.in { opacity: 1; transform: translateY(0); }
        @media (max-width: 860px) { .et-hero-content { padding: 80px 0 40px; } .et-hero-body { font-size: 15px; } .et-h1 { font-size: clamp(2rem,5vw,2.8rem); } }
        @media (max-width: 420px) { .et-hero { min-height: 90vh; } .et-hero-content { padding: 60px 0 30px; } .et-hero-ctas { flex-direction: column; } .et-btn { width: 100%; text-align: center; } .et-trust-row { gap: 12px; } .et-trust-item { font-size: 12px; } .et-hero-body { font-size: 14px; margin-bottom: 28px; } }
      `}</style>
    </div>
  );
}

function EggTradersHomeAbout({ data }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('in'); observer.unobserve(entry.target); } }); },
      { threshold: 0.15 }
    );
    el.querySelectorAll('.et-reveal, .et-reveal-stagger').forEach((e) => observer.observe(e));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <section style={{ padding: '120px 0', background: '#FFFFFF' }}>
        <div className="container">
          <div className="et-reveal" style={{ maxWidth: 680, marginBottom: 56 }}>
            <div className="et-eyebrow" style={{ color: '#D97706' }}>{data.eyebrow}</div>
            <h2 className="et-home-section-title">{data.title}</h2>
            <p className="et-home-section-sub">{data.subtitle}</p>
          </div>
          <div className="et-home-about-grid">
            <div className="et-quote-block et-reveal">
              <p className="et-quote-text">{data.quote}</p>
            </div>
            <div className="et-reveal-stagger et-home-features">
              {data.features.map((feature, i) => (
                <div key={i} className="et-home-feature-card">
                  <div className="et-home-feature-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20">
                      {feature.icon === 'Feather' ? <path d="M12 2C8 7 5 11.5 5 15a7 7 0 0014 0c0-3.5-3-8-7-13z" /> :
                       feature.icon === 'TrendingUp' ? <><path d="M22 7l-7 7-4-4-4 4" /><path d="M22 2h-6v6" /></> :
                       <><path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7z" /></>}
                    </svg>
                  </div>
                  <div>
                    <div className="et-home-feature-title">{feature.title}</div>
                    <div className="et-home-feature-body">{feature.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: 48 }} className="et-reveal">
            <Link to="/egg-traders/about" className="btn-navy">Learn More About Us →</Link>
          </div>
        </div>
      </section>

      <style>{`
        .et-home-section-title { font-family: 'Space Grotesk',sans-serif; font-weight: 600; font-size: clamp(1.9rem,3vw,2.7rem); color: #0D6B3D; line-height: 1.18; letter-spacing: -0.01em; }
        .et-home-section-sub { font-size: 15.5px; color: #707888; margin-top: 16px; line-height: 1.75; }
        .et-home-about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
        .et-quote-block { background: linear-gradient(155deg,#0D6B3D,#059669); border-radius: 32px; padding: 48px 44px; color: #FFFFFF; position: relative; overflow: hidden; }
        .et-quote-block::after { content: '"'; position: absolute; top: -30px; right: 18px; font-family: 'Space Grotesk',sans-serif; font-size: 180px; color: rgba(255,255,255,0.06); }
        .et-quote-text { font-family: 'Space Grotesk',sans-serif; font-size: 23px; font-weight: 500; line-height: 1.5; position: relative; z-index: 2; }
        .et-home-features { display: flex; flex-direction: column; gap: 24px; }
        .et-home-feature-card { display: flex; gap: 18px; padding: 22px 0; border-bottom: 1px solid #EEF1F5; }
        .et-home-feature-card:last-child { border-bottom: none; padding-bottom: 0; }
        .et-home-feature-icon { width: 46px; height: 46px; border-radius: 12px; background: #ECFDF5; display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #0D6B3D; }
        .et-home-feature-title { font-weight: 700; font-size: 15px; color: #0D6B3D; margin-bottom: 5px; }
        .et-home-feature-body { font-size: 13.5px; color: #707888; line-height: 1.65; }
        @media (max-width: 860px) { .et-home-about-grid { grid-template-columns: 1fr; } section { padding: 80px 0 !important; } .et-quote-block { padding: 36px 28px; } .et-quote-text { font-size: 19px; } }
        @media (max-width: 420px) { .et-quote-block { padding: 28px 20px; border-radius: 20px; } .et-quote-text { font-size: 17px; } .et-home-feature-card { gap: 14px; padding: 16px 0; } }
      `}</style>
    </div>
  );
}

function EggTradersHomeServices({ data }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('in'); observer.unobserve(entry.target); } }); },
      { threshold: 0.15 }
    );
    el.querySelectorAll('.et-reveal, .et-reveal-stagger').forEach((e) => observer.observe(e));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <section style={{ padding: '120px 0', background: '#F5F7FA' }}>
        <div className="container">
          <div className="et-reveal" style={{ maxWidth: 680, marginBottom: 56 }}>
            <div className="et-eyebrow" style={{ color: '#D97706' }}>Services</div>
            <h2 className="et-home-section-title">How Egg Traders Works</h2>
            <p className="et-home-section-sub">A seamless four-step process that connects farms and buyers with transparency and efficiency.</p>
          </div>
          <div className="et-reveal-stagger et-home-services-grid">
            {data.map((service, i) => (
              <div key={i} className="et-home-service-card">
                <div className="et-home-service-num">{service.num}</div>
                <h3 className="et-home-service-title">{service.title}</h3>
                <p className="et-home-service-body">{service.body}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 48 }} className="et-reveal">
            <Link to="/egg-traders/process" className="btn-navy">View Full Process →</Link>
          </div>
        </div>
      </section>

      <style>{`
        .et-home-services-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 28px; }
        .et-home-service-card { background: #FFFFFF; border-radius: 24px; padding: 36px 28px; box-shadow: 0 2px 10px rgba(0,0,0,0.04); transition: transform .35s, box-shadow .35s; }
        .et-home-service-card:hover { transform: translateY(-6px); box-shadow: 0 14px 36px rgba(13,107,61,0.10); }
        .et-home-service-num { font-family: 'Space Grotesk',sans-serif; font-size: 42px; font-weight: 700; color: #0D6B3D; opacity: 0.12; line-height: 1; margin-bottom: 16px; }
        .et-home-service-title { font-family: 'Space Grotesk',sans-serif; font-weight: 600; font-size: 17px; color: #0D6B3D; margin-bottom: 12px; }
        .et-home-service-body { font-size: 14px; color: #707888; line-height: 1.7; }
        @media (max-width: 1080px) { .et-home-services-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { .et-home-services-grid { grid-template-columns: 1fr; } .et-home-service-card { padding: 28px 22px; } }
        @media (max-width: 420px) { .et-home-service-card { padding: 24px 18px; } .et-home-service-num { font-size: 32px; } .et-home-service-title { font-size: 15px; } .et-home-service-body { font-size: 13px; } }
      `}</style>
    </div>
  );
}

export default function EggTradersHomePage() {
  const eggTraders = useCMSStore((s) => s.eggTraders);

  return (
    <>
      <EggTradersHero data={eggTraders.hero} />
      <EggTradersHomeAbout data={eggTraders.about} />
      <EggTradersHomeServices data={eggTraders.services} />
    </>
  );
}
