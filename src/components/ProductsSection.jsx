import { useEffect, useRef, useState } from 'react';
import { useCMSStore } from '../store/useCMSStore';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ProductsSection() {
  const products = useCMSStore((s) => s.products);
  const [brokenImgs, setBrokenImgs] = useState(new Set());
  const [activeCard, setActiveCard] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    let ctx = gsap.context(() => {

      // Header stagger
      const hTl = gsap.timeline({
        scrollTrigger: { trigger: '.prod-header', start: 'top 80%' }
      });
      hTl
        .fromTo('.prod-eyebrow', { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5 })
        .fromTo('.prod-title', { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7 }, '-=0.2')
        .fromTo('.prod-sub', { y: 15, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5 }, '-=0.3')
        .fromTo('.prod-divider', { scaleX: 0 }, { scaleX: 1, duration: 1, ease: 'power2.inOut' }, '-=0.2');

      // Product cards staggered reveal
      gsap.utils.toArray('.prod-card').forEach((card, i) => {
        gsap.fromTo(card,
          { y: 80, autoAlpha: 0, rotationX: 4 },
          {
            y: 0, autoAlpha: 1, rotationX: 0,
            duration: 0.9,
            delay: i * 0.12,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%' }
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 3D tilt handler
  const handleMouseMove = (e, idx) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, {
      rotationY: x * 8,
      rotationX: y * -5,
      transformPerspective: 1000,
      ease: 'power2.out',
      duration: 0.4,
    });
    card.style.setProperty('--glow-x', `${(x + 0.5) * 100}%`);
    card.style.setProperty('--glow-y', `${(y + 0.5) * 100}%`);
    setActiveCard(idx);
  };

  const handleMouseLeave = (e) => {
    gsap.to(e.currentTarget, { rotationY: 0, rotationX: 0, ease: 'power3.out', duration: 0.6 });
    setActiveCard(null);
  };

  const gradientMap = {
    'from-navy to-navy-2': 'linear-gradient(135deg, #FBF7F0, #B9320D)',
    'from-amber-800 to-amber-600': 'linear-gradient(135deg, #6B4C1E, #A67C3D)',
    'from-green-800 to-green-600': 'linear-gradient(135deg, #1A5E3A, #2C8C54)',
    'from-indigo-800 to-indigo-600': 'linear-gradient(135deg, #B9320D, #DE510A)',
  };

  return (
    <section id="products" ref={sectionRef} className="prod-section">

      {/* Ambient effects */}
      <div className="prod-bg-grid" />
      <div className="prod-orb prod-orb-1" />
      <div className="prod-orb prod-orb-2" />

      <div className="prod-container">

        {/* Header */}
        <div className="prod-header">
          <span className="prod-eyebrow">{products.eyebrow || 'PRODUCT_CATALOG'}</span>
          <h2 className="prod-title">{products.title}</h2>
          <p className="prod-sub">{products.subtitle}</p>
          <div className="prod-divider" />
        </div>

        {/* Product Grid */}
        <div className="prod-grid">
          {products.items.map((item, i) => (
            <div
              key={i}
              className={`prod-card ${activeCard === i ? 'card-hover' : ''}`}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={handleMouseLeave}
              style={{ visibility: 'hidden' }}
            >
              {/* Hover glow */}
              <div className="prod-card-glow" />

              {/* Image */}
              <div className="prod-card-img" style={{ background: gradientMap[item.gradient] || 'linear-gradient(135deg, #FBF7F0, #B9320D)' }}>
                {item.image && !brokenImgs.has(i) ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    onError={() => setBrokenImgs((prev) => new Set(prev).add(i))}
                  />
                ) : (
                  <div className="prod-fallback-icon">🥚</div>
                )}
                <div className="prod-img-overlay" />
                <span className="prod-badge">{item.badge}</span>
              </div>

              {/* Info */}
              <div className="prod-card-info">
                <h3 className="prod-card-name">{item.name}</h3>
                <p className="prod-card-desc">{item.description}</p>
                <div className="prod-tags">
                  {item.tags.map((tag, t) => (
                    <span key={t} className={`prod-tag ${t === 0 ? 'tag-gold' : ''}`}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
           SECTION
           â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
        .prod-section {
          background: #FBF7F0;
          color: #111111;
          padding: 100px 24px 120px;
          position: relative;
          overflow: hidden;
        }

        .prod-bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(20,20,20,0.012) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20,20,20,0.012) 1px, transparent 1px);
          background-size: 50px 50px;
          pointer-events: none;
        }

        .prod-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
        }

        .prod-orb-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(222,81,10,0.08), transparent 70%);
          top: 20%; right: -200px;
        }

        .prod-orb-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(74,120,200,0.06), transparent 70%);
          bottom: 10%; left: -150px;
        }

        .prod-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
           HEADER
           â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
        .prod-header {
          text-align: center;
          max-width: 750px;
          margin: 0 auto 70px;
        }

        .prod-eyebrow {
          font-family: monospace;
          font-size: 12px;
          letter-spacing: 0.2em;
          color: #DE510A;
          display: block;
          margin-bottom: 16px;
          visibility: hidden;
        }

        .prod-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(32px, 4.5vw, 52px);
          font-weight: 700;
          margin: 0 0 18px;
          background: linear-gradient(135deg, #111111 0%, #B9320D 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          visibility: hidden;
        }

        .prod-sub {
          font-size: 16px;
          color: rgba(20,20,20,0.5);
          line-height: 1.7;
          margin: 0 0 28px;
          visibility: hidden;
        }

        .prod-divider {
          width: 70px;
          height: 3px;
          background: linear-gradient(90deg, #DE510A, #F2E7C9);
          margin: 0 auto;
          transform-origin: center;
          transform: scaleX(0);
          border-radius: 2px;
        }

        /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
           PRODUCT GRID
           â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
        .prod-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 28px;
          margin-bottom: 80px;
        }

        .prod-card {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          background: #FFFFFF;
          border: 1px solid rgba(63,98,49,0.45);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: border-color 0.5s, box-shadow 0.5s;
          transform-style: preserve-3d;
          cursor: pointer;
        }

        .prod-card.card-hover {
          border-color: rgba(222,81,10,0.3);
          box-shadow:
            0 30px 70px rgba(0,0,0,0.12),
            0 0 40px rgba(222,81,10,0.08);
        }

        /* Hover glow */
        .prod-card-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            500px circle at var(--glow-x, 50%) var(--glow-y, 50%),
            rgba(222,81,10,0.07), transparent 40%
          );
          opacity: 0;
          transition: opacity 0.4s;
          pointer-events: none;
          z-index: 0;
        }

        .prod-card.card-hover .prod-card-glow {
          opacity: 1;
        }

        /* Image */
        .prod-card-img {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .prod-card-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94);
        }

        .prod-card.card-hover .prod-card-img img {
          transform: scale(1.08);
        }

        .prod-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 40%, rgba(63,98,49,0.6) 100%);
          pointer-events: none;
        }

        .prod-fallback-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          font-size: 48px;
        }

        .prod-badge {
          position: absolute;
          top: 14px;
          right: 14px;
          font-family: monospace;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          background: rgba(222,81,10,0.15);
          color: #B9320D;
          padding: 5px 14px;
          border-radius: 8px;
          border: 1px solid rgba(222,81,10,0.25);
          backdrop-filter: blur(8px);
          z-index: 2;
        }

        /* Info */
        .prod-card-info {
          padding: 28px;
          position: relative;
          z-index: 1;
        }

        .prod-card-name {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 18px;
          font-weight: 700;
          margin: 0 0 10px;
          color: #111111;
        }

        .prod-card-desc {
          font-size: 13.5px;
          color: rgba(20,20,20,0.55);
          line-height: 1.65;
          margin: 0 0 18px;
          min-height: 60px;
        }

        .prod-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .prod-tag {
          font-family: monospace;
          font-size: 10px;
          font-weight: 600;
          padding: 5px 12px;
          border-radius: 6px;
          background: #FFFFFF;
          border: 1px solid rgba(63,98,49,0.45);
          color: rgba(20,20,20,0.6);
          letter-spacing: 0.04em;
        }

        .prod-tag.tag-gold {
          background: rgba(222,81,10,0.1);
          border-color: rgba(222,81,10,0.2);
          color: #DE510A;
        }


        /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
           MOBILE
           â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
        @media (max-width: 1080px) {
          .prod-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 700px) {
          .prod-section { padding: 80px 16px; }
          .prod-grid { grid-template-columns: 1fr; gap: 20px; }
          .prod-card-img { height: 180px; }
          .prod-card-info { padding: 22px; }
        }
      `}</style>
    </section>
  );
}
