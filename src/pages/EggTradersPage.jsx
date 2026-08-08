import { Link } from 'react-router-dom';
import { useCMSStore } from '../store/useCMSStore';
import { ShieldCheck, CheckCircle2, ArrowRight, Truck, Thermometer, Feather, TrendingUp, Package, Home } from 'lucide-react';

const heroEggBg = 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=1920&q=80';

const featIcons = {
  Feather,
  TrendingUp,
  Package,
};

const trustIcons = {
  ShieldCheck,
  CheckCircle2,
  Truck,
  Thermometer,
  Home,
};

function CalMaineHero({ data }) {
  return (
    <header className="cm-hero">
      <div className="cm-hero-bg">
        <img src={data.backgroundImage || heroEggBg} alt="Fresh eggs" />
        <div className="cm-hero-overlay" />
      </div>

      <div className="cm-hero-copy">
        <span className="cm-eyebrow">{data.eyebrow || 'POULTRY & EGG TRADING MARKETPLACE'}</span>
        <h1 className="cm-title">
          {data.h1Line1 || 'Direct Farm-Fresh'}{' '}
          <em>{data.h1Highlight || 'Egg Supply &amp; Trading'}</em>{' '}
          {data.h1Line2 || 'Network'}
        </h1>
        <p className="cm-body">{data.body}</p>

        <div className="cm-market-rate">
          <span className="cm-rate-dot" />
          DAILY EGG MARKET RATE &mdash; MARDAN: PKR 285/DOZ &bull; ATTOCK: PKR 288/DOZ
        </div>

        <div className="cm-cta-row">
          <Link to={data.primaryCta.action} className="cm-btn cm-btn-blue">
            {data.primaryCta.label || 'Start Trading'} <ArrowRight size={16} />
          </Link>
          <Link to={data.secondaryCta.action} className="cm-btn cm-btn-orange">
            {data.secondaryCta.label || 'How It Works'}
          </Link>
        </div>

        <div className="cm-trust-row">
          {data.trustItems.map((t, i) => {
            const Icon = trustIcons[t.icon] || ShieldCheck;
            return (
              <span key={i}>{Icon ? <Icon size={15} /> : null}{t.text}</span>
            );
          })}
        </div>
      </div>

      <div className="cm-stats-grid">
        {data.stats.map((s, i) => (
          <div key={i} className="cm-stat">
            <strong>{s.value}{s.suffix}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>

      <style>{`
        .cm-hero {
          position: relative;
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 64px;
          align-items: center;
          max-width: 1240px;
          margin: 0 auto;
          padding: 120px 32px 96px;
          background: #ffffff;
          overflow: hidden;
        }
        .cm-hero-bg { position: absolute; inset: 0; z-index: 0; }
        .cm-hero-bg img { width: 100%; height: 100%; object-fit: cover; }
        .cm-hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(90deg, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.78) 45%, rgba(255,255,255,0.35) 100%);
        }
        .cm-hero-copy { position: relative; z-index: 2; }
        .cm-stats-grid {
          position: relative; z-index: 2;
          display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
        }
        .cm-eyebrow {
          display: inline-block;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 12px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase;
          color: #0047BB; background: rgba(185,217,235,0.7);
          border: 1px solid rgba(0,71,187,0.35);
          padding: 7px 16px; border-radius: 30px; margin-bottom: 26px;
        }
        .cm-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(36px, 4.6vw, 54px); font-weight: 700; line-height: 1.08;
          letter-spacing: -0.02em; color: #001b4d; margin: 0 0 22px;
        }
        .cm-title em { font-style: normal; color: #F76B0D; }
        .cm-body { font-size: 17px; color: #2c333a; line-height: 1.7; margin: 0 0 28px; max-width: 560px; }
        .cm-market-rate {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: monospace; font-size: 12px; font-weight: 600; color: #349F93;
          background: rgba(255,255,255,0.85); border: 1px solid rgba(52,159,147,0.45);
          padding: 8px 18px; border-radius: 8px; margin-bottom: 30px;
        }
        .cm-rate-dot {
          width: 8px; height: 8px; border-radius: 50%; background: #F76B0D;
          box-shadow: 0 0 8px #F76B0D; animation: cmPulse 1.5s infinite;
        }
        @keyframes cmPulse { 0%,100% { opacity: 1; } 50% { opacity: 0.35; } }
        .cm-cta-row { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 32px; }
        .cm-btn {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 15px;
          padding: 15px 30px; border-radius: 10px; text-decoration: none;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .cm-btn:hover { transform: translateY(-3px); }
        .cm-btn-blue { background: #0047BB; color: #ffffff; box-shadow: 0 10px 28px rgba(0,71,187,0.35); }
        .cm-btn-blue:hover { box-shadow: 0 16px 38px rgba(0,71,187,0.45); }
        .cm-btn-orange { background: #F76B0D; color: #ffffff; box-shadow: 0 10px 28px rgba(247,107,13,0.3); }
        .cm-btn-orange:hover { box-shadow: 0 16px 38px rgba(247,107,13,0.4); }
        .cm-trust-row { display: flex; gap: 22px; flex-wrap: wrap; }
        .cm-trust-row span {
          display: inline-flex; align-items: center; gap: 7px;
          font-size: 12.5px; font-weight: 600; color: #1f2530;
          background: rgba(255,255,255,0.6); padding: 6px 12px; border-radius: 8px;
        }
        .cm-trust-row svg { color: #349F93; }
        .cm-stat {
          background: rgba(255,255,255,0.92); border: 1px solid #e3e9f2;
          border-top: 4px solid #0047BB; border-radius: 12px;
          padding: 20px 22px; display: flex; flex-direction: column; gap: 4px;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .cm-stat:hover { transform: translateY(-4px); box-shadow: 0 14px 30px rgba(0,71,187,0.15); }
        .cm-stat strong { font-family: 'Space Grotesk', sans-serif; font-size: 28px; font-weight: 700; color: #0047BB; }
        .cm-stat span { font-size: 12.5px; color: #5a6470; }
        @media (max-width: 900px) {
          .cm-hero { grid-template-columns: 1fr; padding: 90px 20px 70px; }
        }
        @media (max-width: 560px) {
          .cm-hero { padding: 80px 16px 56px; gap: 40px; }
          .cm-stats-grid { grid-template-columns: 1fr; }
          .cm-title { font-size: clamp(30px, 8vw, 40px); }
          .cm-body { font-size: 16px; }
          .cm-cta-row .cm-btn { width: 100%; justify-content: center; }
          .cm-market-rate { font-size: 10.5px; flex-wrap: wrap; }
        }
      `}</style>
    </header>
  );
}

function CalMaineAbout({ data }) {
  return (
    <section className="cm-about">
      <div className="cm-about-inner">
        <div className="cm-about-copy">
          <span className="cm-eyebrow">{data.eyebrow || 'OUR COMMITMENT TO QUALITY'}</span>
          <h2 className="cm-about-title">{data.title || 'The Smarter Way to Trade Eggs'}</h2>
          <p className="cm-about-sub">{data.subtitle}</p>

          <blockquote className="cm-quote">
            &ldquo;{data.quote}&rdquo;
            <footer>&mdash; {data.quoteFooter || 'Our Mission'}</footer>
          </blockquote>
        </div>

        <div className="cm-feats-col">
          {data.features.map((feat, i) => {
            const Icon = featIcons[feat.icon] || ShieldCheck;
            return (
              <div key={i} className="cm-feat-card">
                <div className="cm-feat-icon-box">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="cm-feat-title">{feat.title}</h3>
                  <p className="cm-feat-body">{feat.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .cm-about {
          background: linear-gradient(180deg, #B9D9EB 0%, #D0DEBB 100%);
          padding: 96px 32px 110px;
        }
        .cm-about-inner {
          max-width: 1240px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 56px; align-items: center;
        }
        .cm-about-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(28px, 3.4vw, 40px); font-weight: 700; color: #001b4d; margin: 0 0 16px;
        }
        .cm-about-sub { font-size: 16px; color: #3a4650; line-height: 1.7; margin: 0 0 30px; }
        .cm-quote {
          margin: 0; padding: 28px 32px;
          background: #ffffff; border-left: 5px solid #0047BB;
          border-radius: 12px; box-shadow: 0 18px 40px rgba(0,20,60,0.12);
          font-size: 16px; color: #2c333a; line-height: 1.7; font-style: italic;
        }
        .cm-quote footer {
          font-family: monospace; font-size: 12px; font-weight: 700;
          color: #F76B0D; letter-spacing: 0.08em;
        }
        .cm-feats-col { display: flex; flex-direction: column; gap: 20px; }
        .cm-feat-card {
          display: flex; gap: 18px; padding: 22px 24px;
          background: #ffffff; border-radius: 14px;
          border: 1px solid rgba(0,71,187,0.15); box-shadow: 0 10px 26px rgba(0,20,60,0.08);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .cm-feat-card:hover { transform: translateX(6px); box-shadow: 0 18px 38px rgba(0,20,60,0.14); }
        .cm-feat-icon-box {
          width: 48px; height: 48px; border-radius: 12px; flex-shrink: 0;
          background: #0047BB; color: #ffffff;
          display: flex; align-items: center; justify-content: center;
        }
        .cm-feat-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 17px; font-weight: 700; color: #001b4d; margin: 0 0 6px;
        }
        .cm-feat-body { font-size: 14px; color: #4a525b; line-height: 1.6; margin: 0; }
        @media (max-width: 900px) {
          .cm-about-inner { grid-template-columns: 1fr; }
          .cm-about { padding: 76px 20px 90px; }
        }
        @media (max-width: 480px) {
          .cm-about { padding: 56px 16px 70px; }
          .cm-quote { padding: 22px 20px; }
          .cm-feat-card { padding: 20px 18px; }
        }
      `}</style>
    </section>
  );
}

export default function EggTradersHomePage() {
  const eggTraders = useCMSStore((s) => s.eggTraders);

  return (
    <>
      <CalMaineHero data={eggTraders.hero} />
      <CalMaineAbout data={eggTraders.about} />
    </>
  );
}