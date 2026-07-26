import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SceneVisionMission() {
  const containerRef = useRef(null);
  const visionCardRef = useRef(null);
  const missionCardRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // Background subtle scale effect
      gsap.fromTo(bgRef.current,
        { scale: 1 },
        {
          scale: 1.1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        }
      );

      // Vision Card Animation (Slide in from Left)
      gsap.fromTo(visionCardRef.current,
        { x: -100, autoAlpha: 0, rotationY: -10 },
        {
          x: 0,
          autoAlpha: 1,
          rotationY: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
          }
        }
      );

      // Mission Card Animation (Slide in from Right)
      gsap.fromTo(missionCardRef.current,
        { x: 100, autoAlpha: 0, rotationY: 10 },
        {
          x: 0,
          autoAlpha: 1,
          rotationY: 0,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.2, // slightly delayed behind Vision
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
          }
        }
      );

      // Stagger list items inside Mission
      gsap.fromTo('.mission-list li',
        { y: 20, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 50%',
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Hover Glow Effect
  const handleMouseMove = (e, ref) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ref.current.style.setProperty('--mouse-x', `${x}px`);
    ref.current.style.setProperty('--mouse-y', `${y}px`);
    
    // Slight 3D tilt effect
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -3; // Max 3 deg tilt
    const rotateY = ((x - centerX) / centerX) * 3;
    
    gsap.to(ref.current, {
      rotationX: rotateX,
      rotationY: rotateY,
      transformPerspective: 1000,
      ease: 'power2.out',
      duration: 0.4
    });
  };

  const handleMouseLeave = (ref) => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      rotationX: 0,
      rotationY: 0,
      ease: 'power3.out',
      duration: 0.6
    });
  };

  return (
    <section
      ref={containerRef}
      className="sc-vision-wrapper"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '120px 20px',
        color: '#ffffff',
        overflow: 'hidden'
      }}
    >
      {/* Background Image & Overlay */}
      <div 
        ref={bgRef}
        style={{
          position: 'absolute',
          inset: -50, // Slightly larger to allow scale effect
          backgroundImage: 'url("https://images.unsplash.com/photo-1508680415307-e160e15777bd?w=1920&q=80")', // Dramatic cinematic sunrise / industry
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0
        }}
      />
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at center, rgba(7,16,31,0.7) 0%, rgba(7,16,31,0.95) 100%)',
        zIndex: 1
      }} />

      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', marginBottom: '80px' }}>
        <span style={{ fontSize: '12px', letterSpacing: '0.15em', color: '#c8a24a', fontFamily: 'monospace' }}>
          STRATEGIC_DIRECTION // VALUES
        </span>
        <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: '700', fontFamily: "'Space Grotesk', sans-serif", margin: '10px 0 0 0' }}>
          Vision & Mission
        </h2>
      </div>

      <div className="vm-layout">
        
        {/* Vision Card */}
        <div 
          ref={visionCardRef}
          className="vm-card vision-card"
          onMouseMove={(e) => handleMouseMove(e, visionCardRef)}
          onMouseLeave={() => handleMouseLeave(visionCardRef)}
        >
          <div className="card-glow" />
          <div className="card-content">
            <div className="card-header">
              <span className="card-eyebrow">OUR_VISION</span>
              <div className="card-marker">[TARGET_LOCKED]</div>
            </div>
            
            <h3 className="card-title">Transforming the Value Chain</h3>
            <p className="card-desc">
              To become a leading Eggs-food company in Pakistan and international markets by providing high-quality egg products, including liquid and processed eggs, with global standards.
            </p>
          </div>
        </div>

        {/* Mission Card */}
        <div 
          ref={missionCardRef}
          className="vm-card mission-card"
          onMouseMove={(e) => handleMouseMove(e, missionCardRef)}
          onMouseLeave={() => handleMouseLeave(missionCardRef)}
        >
          <div className="card-glow" />
          <div className="card-content">
            <div className="card-header">
              <span className="card-eyebrow">OUR_MISSION</span>
              <div className="card-marker">[EXECUTION_PLAN]</div>
            </div>
            
            <h3 className="card-title">Quality & Value Creation</h3>
            
            <ul className="mission-list">
              <li>
                <div className="list-icon">
                  <div className="dot" />
                </div>
                <span>Supply fresh & hygienic eggs</span>
              </li>
              <li>
                <div className="list-icon">
                  <div className="dot" />
                </div>
                <span>Maintain strict quality control & food safety</span>
              </li>
              <li>
                <div className="list-icon">
                  <div className="dot" />
                </div>
                <span>Expand into value-added egg products like liquid eggs</span>
              </li>
              <li>
                <div className="list-icon">
                  <div className="dot" />
                </div>
                <span>Build long-term trust with clients & partners</span>
              </li>
            </ul>
          </div>
        </div>

      </div>

      <style>{`
        .sc-vision-wrapper {
          --card-bg: rgba(20, 30, 48, 0.4);
          --card-border: rgba(200, 162, 74, 0.2);
          --glow-color: rgba(200, 162, 74, 0.15);
        }

        .sc-vision-wrapper .vm-layout {
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 40px;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        .sc-vision-wrapper .vm-card {
          position: relative;
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: 12px;
          padding: 50px;
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          overflow: hidden;
          box-shadow: 0 30px 60px rgba(0,0,0,0.4);
          transform-style: preserve-3d;
        }

        /* Hover Glow Effect */
        .sc-vision-wrapper .card-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
            var(--glow-color), 
            transparent 40%
          );
          opacity: 0;
          transition: opacity 0.5s;
          pointer-events: none;
          z-index: 0;
        }

        .sc-vision-wrapper .vm-card:hover .card-glow {
          opacity: 1;
        }
        
        .sc-vision-wrapper .vm-card:hover {
          border-color: rgba(200, 162, 74, 0.4);
        }

        .sc-vision-wrapper .card-content {
          position: relative;
          z-index: 1;
          transform: translateZ(30px); /* Pushes content out slightly for 3D effect */
        }

        .sc-vision-wrapper .vision-card {
          flex: 1.1;
          margin-bottom: 80px;
        }

        .sc-vision-wrapper .mission-card {
          flex: 1;
          margin-top: 80px;
          margin-left: -60px; /* Slight overlap */
          background: rgba(10, 18, 32, 0.6); /* Slightly darker */
        }

        .sc-vision-wrapper .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .sc-vision-wrapper .card-eyebrow {
          font-family: monospace;
          font-size: 13px;
          color: #c8a24a;
          letter-spacing: 0.1em;
        }

        .sc-vision-wrapper .card-marker {
          font-family: monospace;
          font-size: 10px;
          color: rgba(255,255,255,0.2);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 4px 8px;
          border-radius: 4px;
        }

        .sc-vision-wrapper .card-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 32px;
          font-weight: 700;
          margin: 0 0 20px 0;
          line-height: 1.2;
        }

        .sc-vision-wrapper .card-desc {
          font-size: 18px;
          color: rgba(255,255,255,0.8);
          line-height: 1.7;
          margin: 0;
        }

        .sc-vision-wrapper .mission-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .sc-vision-wrapper .mission-list li {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          font-size: 16px;
          color: rgba(255,255,255,0.85);
          line-height: 1.6;
        }

        .sc-vision-wrapper .list-icon {
          flex-shrink: 0;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: rgba(200, 162, 74, 0.1);
          border: 1px solid rgba(200, 162, 74, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 2px;
        }

        .sc-vision-wrapper .list-icon .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #c8a24a;
          box-shadow: 0 0 10px #c8a24a;
        }

        /* Mobile Layout */
        @media (max-width: 900px) {
          .sc-vision-wrapper .vm-layout {
            flex-direction: column;
            gap: 30px;
          }
          
          .sc-vision-wrapper .vision-card,
          .sc-vision-wrapper .mission-card {
            flex: none;
            margin: 0;
            width: 100%;
          }

          .sc-vision-wrapper .vm-card {
            padding: 30px;
          }

          .sc-vision-wrapper .card-title {
            font-size: 26px;
          }
          
          .sc-vision-wrapper .card-desc {
            font-size: 16px;
          }
        }
      `}</style>
    </section>
  );
}
