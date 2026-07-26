import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * SYSTEM 02: Visual Environment
 * This wrapper guarantees one continuous digital ecosystem for the entire website.
 * It prevents the user from feeling like they are scrolling through separate sections.
 */
export default function GlobalEnvironment({ children }) {
  const envRef = useRef(null);

  useEffect(() => {
    // Subtle ambient light breathing effect
    const ctx = gsap.context(() => {
      gsap.to('.ambient-glow', {
        opacity: 0.8,
        scale: 1.05,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      
      // Extremely slow blueprint drift
      gsap.to('.blueprint-grid', {
        backgroundPosition: '100px 100px',
        duration: 40,
        repeat: -1,
        ease: 'none',
      });
    }, envRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={envRef} className="global-environment">
      {/* 1. Deep corporate background */}
      <div className="bg-base" />

      {/* 2. One continuous blueprint grid */}
      <div className="blueprint-grid" />

      {/* 3. Soft ambient lighting that responds to scroll later */}
      <div className="ambient-glow" />

      {/* 4. Page content (Chapters) */}
      <main className="story-content">
        {children}
      </main>
    </div>
  );
}
