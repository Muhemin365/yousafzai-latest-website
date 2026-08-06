import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCMSStore } from '../store/useCMSStore';

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const containerRef = useRef(null);
  const cta = useCMSStore((s) => s.cta);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.cta-animate', 
        { y: 40, autoAlpha: 0 },
        { 
          y: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out", stagger: 0.2,
          scrollTrigger: { trigger: '.cta-band', start: 'top 85%', once: true }
        }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="cta-section-wrapper">
      <div className="container">
        <div className="cta-band">
          <div className="cta-bg-grid" />
          <div className="cta-glow-orb" />

          <div className="cta-left cta-animate">
            <span className="cta-eyebrow">{cta?.eyebrow || 'READY_TO_PARTNER // B2B_SUPPLY'}</span>
            <h2 className="cta-title">{cta?.title || 'Ready for predictable, certified egg supply?'}</h2>
            <p className="cta-sub">{cta?.sub || 'Get a formal B2B quotation in 4 business hours, or speak with our commercial partnerships team about dedicated supply contracts.'}</p>
          </div>

          <div className="cta-actions cta-animate">
            <Link to={cta?.primaryCta?.action || '/contact'} className="btn-cta-primary">
              <span>{cta?.primaryCta?.label || 'Request a Quote'}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="18" height="18" className="btn-arrow">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link to={cta?.secondaryCta?.action || '/contact'} className="btn-cta-secondary">
              <span>{cta?.secondaryCta?.label || 'Talk to Us'}</span>
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .cta-section-wrapper {
          padding: 40px 0 100px;
          background: #FBF7F0;
        }

        .cta-band {
          background: #3F6231;
          border: 1px solid rgba(255,255,255,0.2);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 28px;
          padding: 80px 60px;
          display: flex;
          flex-direction: column;
          text-align: center;
          justify-content: center;
          align-items: center;
          gap: 32px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(63,98,49,0.4);
        }

        .cta-bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }

        .cta-glow-orb {
          position: absolute;
          width: 550px;
          height: 550px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(85,129,63,0.45), transparent 70%);
          top: -220px;
          right: -150px;
          pointer-events: none;
          animation: pulseGlow 8s infinite alternate ease-in-out;
        }
        
        @keyframes pulseGlow {
          0% { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(1.2); opacity: 1; }
        }

        .cta-left {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .cta-eyebrow {
          font-family: monospace;
          font-size: 11px;
          letter-spacing: 0.2em;
          color: #FBF7F0;
          margin-bottom: 14px;
        }

        .cta-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2rem, 3.5vw, 3rem);
          font-weight: 700;
          background: linear-gradient(135deg, #ffffff 0%, #FBF7F0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 16px;
          max-width: 760px;
          text-align: center;
          line-height: 1.2;
        }

        .cta-sub {
          font-size: 16px;
          color: rgba(255,255,255,0.88);
          max-width: 560px;
          margin: 0 auto;
          text-align: center;
          line-height: 1.65;
        }
        
        .cta-actions {
          display: flex;
          gap: 16px;
          position: relative;
          z-index: 2;
          justify-content: center;
        }
        
        .btn-cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 15px;
          padding: 16px 32px;
          border-radius: 12px;
          background: linear-gradient(135deg, #B9320D 0%, #B9320D 100%);
          color: #ffffff;
          text-decoration: none;
          transition: transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.3s ease;
          box-shadow: 0 10px 30px rgba(63,98,49,0.35);
        }

        .btn-cta-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 40px rgba(63,98,49,0.45);
        }

        .btn-cta-secondary {
          display: inline-flex;
          align-items: center;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          font-size: 15px;
          padding: 16px 30px;
          border-radius: 12px;
          background: rgba(255,255,255,0.12);
          border: 1.5px solid rgba(255,255,255,0.45);
          color: #ffffff;
          text-decoration: none;
          transition: background 0.3s, border-color 0.3s, transform 0.3s;
        }

        .btn-cta-secondary:hover {
          background: rgba(255,255,255,0.2);
          border-color: #FBF7F0;
          transform: translateY(-3px);
        }

        .btn-arrow {
          transition: transform 0.3s ease;
        }

        .btn-cta-primary:hover .btn-arrow {
          transform: translateX(4px);
        }
        
        @media (max-width: 860px) {
          .cta-band { padding: 50px 24px; gap: 24px; }
          .cta-actions { flex-direction: column; width: 100%; }
          .btn-cta-primary, .btn-cta-secondary { width: 100%; justify-content: center; }
        }
      `}</style>
    </section>
  );
}
