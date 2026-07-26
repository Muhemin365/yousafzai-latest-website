import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SceneChairman() {
  const containerRef = useRef(null);
  const frameRef = useRef(null);
  const sweepRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Quiet, formal reveal
      gsap.fromTo(frameRef.current,
        { scale: 0.98, autoAlpha: 0 },
        {
          duration: 1.5,
          scale: 1,
          autoAlpha: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Reveal quote lines
      gsap.fromTo('.quote-line',
        { autoAlpha: 0, y: 15 },
        {
          duration: 1,
          autoAlpha: 1,
          y: 0,
          stagger: 0.25,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Slow warm light sweep across portrait
      gsap.fromTo(sweepRef.current,
        { left: '-150%' },
        { left: '150%', duration: 4, repeat: -1, repeatDelay: 8, ease: 'power2.inOut' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '100px 20px',
        color: '#ffffff',
      }}
    >
      <div
        style={{
          maxWidth: '1000px',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr',
          gap: '60px',
          alignItems: 'center',
        }}
      >
        {/* Portrait */}
        <div
          ref={frameRef}
          style={{
            position: 'relative',
            border: '1px solid rgba(200, 162, 74, 0.3)',
            padding: '16px',
            backgroundColor: 'rgba(21, 21, 21, 0.4)',
            overflow: 'hidden',
          }}
        >
          <div
            ref={sweepRef}
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              width: '50%',
              background: 'linear-gradient(to right, transparent, rgba(200, 162, 74, 0.15), transparent)',
              transform: 'skewX(-25deg)',
              pointerEvents: 'none',
              zIndex: 2,
            }}
          />
          <img
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=450&h=550&fit=crop"
            alt="Chairman"
            style={{ width: '100%', display: 'block', border: '1px solid rgba(255,255,255,0.05)' }}
          />
          {/* Gold Seal */}
          <div style={{
            position: 'absolute', bottom: '30px', right: '30px', width: '60px', height: '60px',
            borderRadius: '50%', border: '2px double rgba(200, 162, 74, 0.8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '8px', color: '#c8a24a', fontFamily: 'monospace', transform: 'rotate(15deg)',
            backgroundColor: '#151515', zIndex: 3,
          }}>
            YEG_SEAL
          </div>
        </div>

        {/* Message */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div className="quote-line" style={{ fontSize: '12px', letterSpacing: '0.15em', color: '#c8a24a', fontFamily: 'monospace' }}>
            CHAIRMAN_STATEMENT // FOUNDER_MESSAGE
          </div>

          <h2 className="quote-line" style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: '400', fontFamily: 'Georgia, serif', lineHeight: '1.4', fontStyle: 'italic', margin: 0 }}>
            "At Yousafzai Eggs Traders, we believe in quality, trust, and innovation. Our goal is not only to supply eggs but to transform the poultry industry by introducing modern processing solutions."
          </h2>

          <div className="quote-line" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
            <p style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>Chairman</p>
            <p style={{ margin: '5px 0 0 0', fontSize: '13px', color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace' }}>CHAIRMAN & FOUNDER</p>
          </div>
        </div>
      </div>
    </section>
  );
}
