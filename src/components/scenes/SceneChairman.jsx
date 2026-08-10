import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCMSStore } from '../../store/useCMSStore';
import brandLogo from '../../assets/logo.svg';

gsap.registerPlugin(ScrollTrigger);

export default function SceneChairman() {
  const chairman = useCMSStore((s) => s.aboutScenes?.chairman) || {};
  const containerRef = useRef(null);
  const frameRef = useRef(null);

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
        color: '#111111',
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
            border: '1px solid rgba(222, 81, 10, 0.4)',
            padding: '16px',
            backgroundColor: 'rgba(222, 81, 10, 0.25)',
            overflow: 'hidden',
          }}
        >
          <div style={{
            background: 'linear-gradient(160deg, #3F6231 0%, #2C4724 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '44px 18px',
            minHeight: '360px',
          }}>
            <img
              src={brandLogo}
              alt="Yousafzai Agri Foods brand logo"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
          {/* Gold Seal */}
          <div style={{
            position: 'absolute', bottom: '30px', right: '30px', width: '60px', height: '60px',
            borderRadius: '50%', border: '2px double rgba(222, 81, 10, 0.9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '8px', color: '#B9320D', fontFamily: 'monospace', transform: 'rotate(15deg)',
            backgroundColor: '#DE510A', zIndex: 3,
          }}>
            {chairman.seal || 'YEG_SEAL'}
          </div>
        </div>

        {/* Message */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div className="quote-line" style={{ fontSize: '12px', letterSpacing: '0.15em', color: '#DE510A', fontFamily: 'monospace' }}>
            {chairman.eyebrow || 'CHAIRMAN_STATEMENT // FOUNDER_MESSAGE'}
          </div>

          <h2 className="quote-line" style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: '400', fontFamily: 'Georgia, serif', lineHeight: '1.4', fontStyle: 'italic', margin: 0 }}>
            {chairman.quote}
          </h2>

          <div className="quote-line" style={{ borderTop: '1px solid rgba(20,20,20,0.1)', paddingTop: '20px' }}>
            <p style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>{chairman.name || 'Chairman'}</p>
            <p style={{ margin: '5px 0 0 0', fontSize: '13px', color: 'rgba(20,20,20,0.5)', fontFamily: 'monospace' }}>{chairman.role || 'CHAIRMAN & FOUNDER'}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
