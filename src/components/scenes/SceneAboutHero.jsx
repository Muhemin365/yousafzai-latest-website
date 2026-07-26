import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';

/* ─────────────────────────────────────────────────────────
   40 high-quality images covering every aspect of the business:
   poultry farms, hens, eggs, packaging, logistics, markets,
   grading, storage, rural farms, industrial processing
   ───────────────────────────────────────────────────────── */
const heroSlides = [
  // Poultry & Hens
  'https://images.unsplash.com/photo-1548550023-2bf3c49b71d9?w=1920&q=80',   // Flock of chickens
  'https://images.unsplash.com/photo-1569288052389-dac9b01c9c05?w=1920&q=80', // Hen close-up
  'https://images.unsplash.com/photo-1612170153139-6f881ff067e0?w=1920&q=80', // Free range hens
  'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&q=80',   // Chickens on grass
  'https://images.unsplash.com/photo-1623239524387-0b57a0eab64e?w=1920&q=80', // Roosters
  'https://images.unsplash.com/photo-1605882174146-a464b70cf691?w=1920&q=80', // Hen in barn
  'https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=1920&q=80', // Poultry flock
  'https://images.unsplash.com/photo-1591197172062-c718f82aba20?w=1920&q=80', // Chickens in field

  // Eggs (raw, cartons, baskets)
  'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=1920&q=80', // Eggs in tray
  'https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?w=1920&q=80', // Eggs carton
  'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=1920&q=80', // Brown eggs basket
  'https://images.unsplash.com/photo-1489726024920-b5ddc1c04b09?w=1920&q=80', // White eggs
  'https://images.unsplash.com/photo-1498654077810-12c21d4d6dc3?w=1920&q=80', // Eggs on straw
  'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=1920&q=80', // Cracked egg cooking
  'https://images.unsplash.com/photo-1607690424560-35d967079aac?w=1920&q=80', // Egg carton open
  'https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?w=1920&q=80', // Eggs in nest

  // Packaging & Processing
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1920&q=80', // Food preparation
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&q=80', // Industrial packaging
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&q=80', // Modern tech lab
  'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=1920&q=80', // Food science

  // Logistics & Distribution
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80', // Warehouse logistics
  'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1920&q=80', // Delivery truck
  'https://images.unsplash.com/photo-1553413077-190dd305871c?w=1920&q=80', // Warehouse interior
  'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=1920&q=80', // Supply chain
  'https://images.unsplash.com/photo-1494412574643-ff11b0a5eb19?w=1920&q=80', // Truck highway

  // Business & Corporate
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&q=80', // Business handshake
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80', // Business documents

  // Quality & Certification
  'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&q=80', // Lab quality
  'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1920&q=80', // Science lab
];


export default function SceneAboutHero() {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const lineRef = useRef(null);
  const stampRef = useRef(null);
  const statsRef = useRef(null);
  const ctaRef = useRef(null);
  const overlayRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [nextSlide, setNextSlide] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Continuous slideshow — cycles through all 40 images
  const advanceSlide = useCallback(() => {
    setIsTransitioning(true);
    const next = (currentSlide + 1) % heroSlides.length;
    setNextSlide(next);

    // Wait for the crossfade, then swap
    setTimeout(() => {
      setCurrentSlide(next);
      setNextSlide((next + 1) % heroSlides.length);
      setIsTransitioning(false);
    }, 1200);
  }, [currentSlide]);

  useEffect(() => {
    const interval = setInterval(advanceSlide, 4000);
    return () => clearInterval(interval);
  }, [advanceSlide]);

  // Entry animations
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.set([contentRef.current, stampRef.current, statsRef.current, ctaRef.current], { autoAlpha: 0, y: 30 });
      gsap.set(lineRef.current, { scaleX: 0 });

      const tl = gsap.timeline({ delay: 0.5 });
      tl.to(overlayRef.current, { opacity: 0.6, duration: 1.5 })
        .to(lineRef.current, { scaleX: 1, duration: 1, ease: 'power2.inOut' }, '-=0.8')
        .to(contentRef.current, { autoAlpha: 1, y: 0, duration: 1, ease: 'power2.out' }, '-=0.5')
        .to(statsRef.current, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.4')
        .to(ctaRef.current, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.4')
        .to(stampRef.current, { autoAlpha: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }, '-=0.3');
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      style={{
        height: '100vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: 0,
      }}
    >
      {/* === CONTINUOUS BG SLIDESHOW (2 layers for crossfade) === */}
      <div
        key={'bg-' + currentSlide}
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url("${heroSlides[currentSlide]}")`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.35, zIndex: 0,
          animation: 'heroKenBurns 12s ease-in-out infinite alternate',
        }}
      />
      <div
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url("${heroSlides[nextSlide]}")`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: isTransitioning ? 0.35 : 0,
          transition: 'opacity 1.2s ease-in-out',
          zIndex: 0,
        }}
      />

      {/* Dark gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'linear-gradient(to bottom, rgba(7,16,31,0.72) 0%, rgba(7,16,31,0.35) 50%, rgba(7,16,31,0.82) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Blueprint Grid Overlay */}
      <div
        ref={overlayRef}
        style={{
          position: 'absolute', inset: 0,
          backgroundImage:
            'linear-gradient(to right, rgba(100, 210, 255, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(100, 210, 255, 0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          pointerEvents: 'none', zIndex: 1, opacity: 0,
        }}
      />

      {/* Blueprint Coordinates */}
      <div style={{
        position: 'absolute', top: '12%', left: '8%',
        fontFamily: 'monospace', fontSize: '11px', color: '#64d2ff', opacity: 0.5, zIndex: 2,
      }}>
        SEC-01 // MARDAN, KPK, PAKISTAN
      </div>

      {/* Slide counter */}
      <div style={{
        position: 'absolute', top: '12%', right: '8%',
        fontFamily: 'monospace', fontSize: '11px', color: 'rgba(200,162,74,0.6)', zIndex: 2,
      }}>
        {String(currentSlide + 1).padStart(2, '0')} / {heroSlides.length}
      </div>

      {/* === MAIN CONTENT === */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 20px', maxWidth: '800px' }}>
        <div ref={contentRef}>
          {/* Eyebrow */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            fontSize: '12px', letterSpacing: '0.15em', color: '#c8a24a',
            fontFamily: 'monospace', marginBottom: '20px', textTransform: 'uppercase',
          }}>
            <span style={{ width: '24px', height: '1.5px', background: '#c8a24a', display: 'inline-block' }} />
            About Yousafzai Eggs Traders & Poultry Farms
            <span style={{ width: '24px', height: '1.5px', background: '#c8a24a', display: 'inline-block' }} />
          </div>

          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(32px, 5.5vw, 68px)',
            fontWeight: 700, letterSpacing: '-0.02em',
            margin: '0 0 16px 0', textTransform: 'uppercase', color: '#ffffff', lineHeight: 1.1,
          }}>
            Engineered for<br />
            <span style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #c8a24a 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Quality & Trust</span>
          </h1>

          {/* Gold Drafting Line */}
          <div ref={lineRef} style={{
            height: '2px', background: 'linear-gradient(to right, transparent, #c8a24a, transparent)',
            width: '320px', margin: '0 auto', transformOrigin: 'center',
          }} />

          <p style={{
            marginTop: '24px', fontSize: '17px', color: 'rgba(255,255,255,0.75)',
            maxWidth: '620px', lineHeight: 1.75, margin: '24px auto 0',
          }}>
            Since 1960, Yousafzai Eggs Traders has been a trusted name in Pakistan's poultry and egg distribution industry.
            With over six decades of experience, we connect certified farms to hotels, retailers, manufacturers, and institutions
            across KPK, Punjab, and Sindh — delivering fresh, Halal-certified eggs with full traceability.
          </p>
        </div>

        {/* Stats Row */}
        <div ref={statsRef} style={{
          display: 'flex', justifyContent: 'center', gap: '50px', marginTop: '40px', flexWrap: 'wrap',
        }}>
          {[
            { value: '60+', label: 'Years of Experience' },
            { value: '500K+', label: 'Eggs Traded Weekly' },
            { value: '3', label: 'Provinces Covered' },
            { value: '100%', label: 'Halal Certified' },
          ].map((stat, idx) => (
            <div key={idx} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '28px', fontWeight: 700, color: '#c8a24a',
                fontFamily: "'Space Grotesk', sans-serif",
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '11px', color: 'rgba(255,255,255,0.5)',
                fontFamily: 'monospace', letterSpacing: '0.08em', marginTop: '4px',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div ref={ctaRef} style={{ marginTop: '36px' }}>
          <button
            className="primary-btn"
            onClick={() => {
              const el = document.getElementById('scene-chairman');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              padding: '14px 36px', fontSize: '15px', backgroundColor: 'transparent',
              color: '#c8a24a', border: '1px solid #c8a24a', fontWeight: 600, cursor: 'pointer',
              letterSpacing: '0.08em', fontFamily: 'monospace', transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => { e.target.style.backgroundColor = '#c8a24a'; e.target.style.color = '#07101f'; }}
            onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#c8a24a'; }}
          >
            EXPLORE OUR HERITAGE ↓
          </button>
        </div>
      </div>

      {/* Progress bar at bottom */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px',
        background: 'rgba(255,255,255,0.08)', zIndex: 3,
      }}>
        <div
          key={'progress-' + currentSlide}
          style={{
            height: '100%', background: '#c8a24a',
            animation: 'slideProgress 4s linear',
            width: '100%',
          }}
        />
      </div>

      {/* Established 1960 Stamp */}
      <div
        ref={stampRef}
        style={{
          position: 'absolute', bottom: '14%', right: '8%',
          border: '2px solid rgba(200, 162, 74, 0.5)', padding: '10px 20px',
          borderRadius: '4px', transform: 'rotate(-12deg)',
          fontFamily: 'monospace', color: '#c8a24a', fontSize: '13px',
          letterSpacing: '0.1em', backgroundColor: 'rgba(7, 16, 31, 0.85)', zIndex: 2,
        }}
      >
        EST. 1960 // REG. C955423
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes heroKenBurns {
          0% { transform: scale(1); }
          100% { transform: scale(1.08); }
        }
        @keyframes slideProgress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </section>
  );
}
