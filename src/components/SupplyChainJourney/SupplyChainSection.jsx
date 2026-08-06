import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { stages } from './StageData';

gsap.registerPlugin(ScrollTrigger);

export default function SupplyChainSection() {
  const containerRef = useRef(null);
  
  // Track active stage by index (0 to 4)
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  // Check for mobile fallback
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Create ScrollTriggers for each stage block
    const stageBlocks = gsap.utils.toArray('.stage-block');
    
    let ctx = gsap.context(() => {
      stageBlocks.forEach((block, index) => {
        ScrollTrigger.create({
          trigger: block,
          start: 'top center+=100', // When the top of the block hits slightly below center
          end: 'bottom center-=100',
          onToggle: (self) => {
            if (self.isActive) {
              setActiveStageIndex(index);
            }
          }
        });
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="sc-journey-wrapper" style={{ position: 'relative' }}>
      
      <div className={`journey-layout ${isMobile ? 'mobile' : 'desktop'}`}>
        
        {/* STICKY VISUAL SCENE */}
        <div className="journey-visual">
          <div className="sticky-container">
            {stages.map((stage, idx) => {
              const isActive = idx === activeStageIndex;
              return (
                <div 
                  key={stage.id} 
                  className={`visual-slide ${isActive ? 'active' : ''}`}
                >
                  <img src={stage.image} alt={stage.title} />
                  <div className="visual-overlay" />
                </div>
              );
            })}
          </div>
        </div>

        {/* SCROLLABLE STORY CONTENT */}
        <div className="journey-content">
          <div className="story-intro">
            <div className="tag-eyebrow">SUPPLY CHAIN</div>
            <h2 className="sec-title">The Live Journey of an Egg</h2>
            <p className="sec-sub">Follow our guide through precision, reliability, and trust at every stage.</p>
          </div>

          <div className="stages-list">
            {stages.map((stage, i) => {
              const isActive = i === activeStageIndex;
              return (
                <div key={stage.id} className={`stage-block ${isActive ? 'active' : ''}`}>
                  <div className="stage-num">0{i + 1}</div>
                  <h3 className="stage-title">{stage.title}</h3>
                  <p className="stage-desc">{stage.description}</p>
                  <div className="stage-stat">{stage.stats}</div>
                </div>
              );
            })}
          </div>
          
          <div style={{ height: '40vh' }} />
        </div>
      </div>

      <style>{`
        .sc-journey-wrapper {
          background: #FBF7F0;
          color: #111111;
        }

        .journey-layout.desktop {
          display: flex;
          align-items: flex-start;
          position: relative;
        }

        .journey-visual {
          width: 50%;
        }
        
        .journey-layout.desktop .journey-visual {
          position: sticky;
          top: 0;
          height: 100vh;
          overflow: hidden;
          background: #FBF7F0;
        }

        .sticky-container {
          position: relative;
          width: 100%;
          height: 100%;
        }

        /* Image Crossfade Transitions */
        .visual-slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          transform: scale(0.95);
          transition: opacity 0.8s ease-in-out, transform 8s ease-out;
          pointer-events: none;
        }
        
        .visual-slide.active {
          opacity: 1;
          transform: scale(1);
          z-index: 2;
        }

        .visual-slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .visual-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(63,98,49,0.1) 0%, rgba(185,50,13,0.35) 100%);
          mix-blend-mode: multiply;
        }
        
        /* Gradient fade between left and right sides */
        .journey-visual::after {
          content: '';
          position: absolute;
          top: 0; right: 0; bottom: 0;
          width: 80px;
          background: linear-gradient(to right, transparent, transparent);
          z-index: 3;
        }

        .journey-content {
          width: 50%;
          padding: 140px 80px 140px 80px;
        }

        .story-intro {
          margin-bottom: 150px;
        }
        .story-intro .sec-title {
          font-size: 48px;
          line-height: 1.1;
          margin: 16px 0;
          color: #111111;
        }
        .story-intro .sec-sub {
          color: rgba(20,20,20,0.72);
        }

        .stages-list {
          display: flex;
          flex-direction: column;
          gap: 150px;
        }

        .stage-block {
          opacity: 0.3;
          transform: translateX(20px);
          transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
          border-left: 4px solid transparent;
          padding-left: 32px;
        }
        .stage-block.active {
          opacity: 1;
          transform: translateX(0);
          border-left-color: #DE510A;
        }

        .stage-num {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: #DE510A;
          margin-bottom: 12px;
        }
        .stage-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 16px;
          color: #111111;
        }
        .stage-desc {
          font-size: 18px;
          color: rgba(20,20,20,0.72);
          line-height: 1.6;
          margin-bottom: 24px;
        }
        .stage-stat {
          display: inline-block;
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #ffffff;
          background: #3F6231;
          padding: 6px 16px;
          border-radius: 20px;
        }

        /* Mobile Layout */
        .journey-layout.mobile {
          flex-direction: column;
        }
        .journey-layout.mobile .journey-visual {
          width: 100%;
          height: 60vh;
          position: sticky;
          top: 0;
          z-index: 10;
        }
        .journey-layout.mobile .journey-content {
          width: 100%;
          padding: 60px 24px;
          position: relative;
          z-index: 11;
          background: #FBF7F0;
        }
        .journey-layout.mobile .stages-list {
          gap: 60px;
        }
        .journey-layout.mobile .stage-block {
          opacity: 1;
          transform: translateX(0);
          border-left-color: #B9320D;
        }
      `}</style>
    </div>
  );
}
