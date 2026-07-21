import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function CTASection() {
  const ref = useRef(null);

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
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref}>
      <div className="container">
        <div className="cta-band reveal">
          <div className="cta-left">
            <h2 className="cta-title">Ready for predictable, certified egg supply?</h2>
            <p className="cta-sub">Get a formal B2B quotation in 4 business hours, or speak with our partnerships team about the right tier for your business.</p>
          </div>
          <div className="cta-actions">
            <Link to="/contact" className="btn btn-gold" data-ripple><span>Request a Quote</span></Link>
            <Link to="/contact" className="btn btn-outline" data-ripple><span>Talk to Us</span></Link>
          </div>
        </div>
      </div>

      <style>{`
        .cta-band { background: linear-gradient(135deg,#071A30,#0B2545); border-radius: 32px; padding: 70px 60px; display: flex; flex-direction: column; text-align: center; justify-content: center; align-items: center; gap: 30px; position: relative; overflow: hidden; }
        .cta-band::before { content: ''; position: absolute; width: 420px; height: 420px; border-radius: 50%; background: radial-gradient(circle, rgba(200,162,74,0.22), transparent 70%); top: -160px; right: -100px; pointer-events: none; }
        .cta-left { position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; }
        .cta-title { font-family: 'Space Grotesk',sans-serif; font-size: clamp(1.7rem,2.6vw,2.3rem); font-weight: 600; color: #FFFFFF; margin-bottom: 12px; max-width: 700px; text-align: center; }
        .cta-sub { font-size: 14.5px; color: rgba(255,255,255,0.65); max-width: 500px; margin: 0 auto; text-align: center; }
        .cta-actions { display: flex; gap: 14px; position: relative; z-index: 2; justify-content: center; }
        @media (max-width: 860px) { .cta-band { padding: 50px 32px; gap: 24px; } }
      `}</style>
    </section>
  );
}
