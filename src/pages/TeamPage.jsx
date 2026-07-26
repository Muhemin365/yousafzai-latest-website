import { useEffect, useRef, useState } from 'react';
import PageBanner from '../components/PageBanner';
import { useCMSStore } from '../store/useCMSStore';
import { Award, Briefcase, Mail, UserCheck, ShieldCheck, Clock, Globe } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TeamPage() {
  const about = useCMSStore((s) => s.about);
  const pageRef = useRef(null);
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    if (!pageRef.current) return;

    let ctx = gsap.context(() => {
      // Leadership Section Header
      gsap.fromTo('.lead-header',
        { y: 30, autoAlpha: 0 },
        {
          y: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.lead-header', start: 'top 85%' }
        }
      );

      // Leader Cards Reveal
      gsap.utils.toArray('.leader-card').forEach((card, i) => {
        gsap.fromTo(card,
          { y: 60, autoAlpha: 0, rotationY: i % 2 === 0 ? -5 : 5 },
          {
            y: 0, autoAlpha: 1, rotationY: 0, duration: 0.9, delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 85%' }
          }
        );
      });

      // Operations Header
      gsap.fromTo('.ops-header',
        { y: 30, autoAlpha: 0 },
        {
          y: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.ops-header', start: 'top 85%' }
        }
      );

      // Operations Team Cards Stagger
      gsap.utils.toArray('.ops-card').forEach((card, i) => {
        gsap.fromTo(card,
          { y: 50, autoAlpha: 0 },
          {
            y: 0, autoAlpha: 1, duration: 0.7, delay: (i % 3) * 0.12,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 85%' }
          }
        );
      });

    }, pageRef);

    return () => ctx.revert();
  }, []);

  // 3D tilt on hover
  const handleMouseMove = (e, idx) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, {
      rotationY: x * 6,
      rotationX: y * -4,
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

  return (
    <div ref={pageRef} className="team-page-wrapper">
      <PageBanner
        title="Leadership & Operations"
        subtitle="Meet the experienced executives and agricultural specialists driving Yousafzai Eggs Traders."
      />

      <section className="team-section">
        {/* Ambient background */}
        <div className="team-bg-grid" />
        <div className="team-orb team-orb-1" />
        <div className="team-orb team-orb-2" />

        <div className="team-container">
          {/* Executive Leadership Section */}
          <div className="lead-header">
            <span className="team-eyebrow">EXECUTIVE_GOVERNANCE // LEADERSHIP</span>
            <h2 className="team-sec-title">Board of Directors & Governance</h2>
            <div className="team-divider" />
          </div>

          <div className="leadership-grid">
            {(about.leadership || []).map((leader, i) => (
              <div
                key={i}
                className={`leader-card ${activeCard === `lead-${i}` ? 'card-hover' : ''}`}
                onMouseMove={(e) => handleMouseMove(e, `lead-${i}`)}
                onMouseLeave={handleMouseLeave}
                style={{ visibility: 'hidden' }}
              >
                {/* Glow */}
                <div className="card-glow" />

                {/* Leader Image */}
                <div className="leader-image-wrap">
                  <img src={leader.image} alt={leader.name} loading="lazy" />
                  <div className="image-overlay" />
                  <span className="executive-badge">
                    <ShieldCheck size={12} />
                    <span>EXECUTIVE</span>
                  </span>
                </div>

                {/* Info Content */}
                <div className="leader-info">
                  <div className="leader-title-row">
                    <div>
                      <h3 className="leader-name">{leader.name}</h3>
                      <span className="leader-role">{leader.role}</span>
                    </div>
                  </div>

                  <div className="leader-meta">
                    <div className="meta-item">
                      <Clock size={13} />
                      <span>{leader.experience || '60+ Yrs Legacy'}</span>
                    </div>
                    <div className="meta-item">
                      <Award size={13} />
                      <span>{leader.expertise || 'Poultry & Supply Chain'}</span>
                    </div>
                  </div>

                  <p className="leader-bio">{leader.bio}</p>

                  <div className="leader-social">
                    <a href={leader.linkedin || '#'} aria-label="Profile" className="social-link">
                      <Globe size={15} />
                      <span>Corporate Profile</span>
                    </a>
                    <a href={leader.email ? `mailto:${leader.email}` : '#'} aria-label="Email" className="social-link">
                      <Mail size={15} />
                      <span>Direct Contact</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Operations Team Section */}
          {about.team && about.team.length > 0 && (
            <div className="ops-section">
              <div className="ops-header">
                <span className="team-eyebrow">COMMERCIAL_OPERATIONS // SPECIALISTS</span>
                <h2 className="team-sec-title">Operational Division</h2>
                <div className="team-divider" />
              </div>

              <div className="ops-grid">
                {about.team.map((member, i) => (
                  <div
                    key={i}
                    className={`ops-card ${activeCard === `ops-${i}` ? 'card-hover' : ''}`}
                    onMouseMove={(e) => handleMouseMove(e, `ops-${i}`)}
                    onMouseLeave={handleMouseLeave}
                    style={{ visibility: 'hidden' }}
                  >
                    <div className="card-glow" />
                    <div className="ops-avatar">
                      <UserCheck size={22} />
                    </div>
                    <div className="ops-info">
                      <h4 className="ops-name">{member.name}</h4>
                      <span className="ops-role">{member.role}</span>
                      <p className="ops-bio">{member.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <style>{`
        /* ═══════════════════════════════════════
           SECTION BASE
           ═══════════════════════════════════════ */
        .team-page-wrapper {
          background: #060e1a;
          color: #fff;
          min-height: 100vh;
        }

        .team-section {
          padding: 100px 24px 140px;
          position: relative;
          overflow: hidden;
        }

        .team-bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px);
          background-size: 50px 50px;
          pointer-events: none;
        }

        .team-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
        }

        .team-orb-1 {
          width: 550px; height: 550px;
          background: radial-gradient(circle, rgba(200,162,74,0.08), transparent 70%);
          top: 15%; left: -150px;
          animation: teamFloat1 15s ease-in-out infinite alternate;
        }

        .team-orb-2 {
          width: 450px; height: 450px;
          background: radial-gradient(circle, rgba(74,140,220,0.06), transparent 70%);
          bottom: 10%; right: -150px;
          animation: teamFloat2 18s ease-in-out infinite alternate;
        }

        @keyframes teamFloat1 {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 40px); }
        }

        @keyframes teamFloat2 {
          0% { transform: translate(0, 0); }
          100% { transform: translate(-50px, -60px); }
        }

        .team-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        /* ═══════════════════════════════════════
           HEADERS
           ═══════════════════════════════════════ */
        .lead-header, .ops-header {
          text-align: center;
          max-width: 700px;
          margin: 0 auto 70px;
        }

        .team-eyebrow {
          font-family: monospace;
          font-size: 12px;
          letter-spacing: 0.2em;
          color: #c8a24a;
          display: block;
          margin-bottom: 14px;
        }

        .team-sec-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(32px, 4.5vw, 48px);
          font-weight: 700;
          margin: 0 0 18px;
          background: linear-gradient(135deg, #ffffff 0%, #c8a24a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .team-divider {
          width: 70px;
          height: 3px;
          background: linear-gradient(90deg, #c8a24a, #ffe6a0);
          margin: 0 auto;
          border-radius: 2px;
        }

        /* ═══════════════════════════════════════
           LEADERSHIP GRID
           ═══════════════════════════════════════ */
        .leadership-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 36px;
          margin-bottom: 120px;
        }

        .leader-card {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          transition: border-color 0.5s, box-shadow 0.5s;
          transform-style: preserve-3d;
          display: flex;
          flex-direction: column;
        }

        .leader-card.card-hover {
          border-color: rgba(200,162,74,0.35);
          box-shadow:
            0 30px 80px rgba(0,0,0,0.5),
            0 0 40px rgba(200,162,74,0.05);
        }

        .card-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            500px circle at var(--glow-x, 50%) var(--glow-y, 50%),
            rgba(200,162,74,0.08), transparent 40%
          );
          opacity: 0;
          transition: opacity 0.4s;
          pointer-events: none;
          z-index: 0;
        }

        .leader-card.card-hover .card-glow,
        .ops-card.card-hover .card-glow {
          opacity: 1;
        }

        .leader-image-wrap {
          position: relative;
          height: 280px;
          width: 100%;
          overflow: hidden;
        }

        .leader-image-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94);
        }

        .leader-card.card-hover .leader-image-wrap img {
          transform: scale(1.06);
        }

        .image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 30%, rgba(6,14,26,0.95) 100%);
        }

        .executive-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: monospace;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #ffe6a0;
          background: rgba(200,162,74,0.15);
          border: 1px solid rgba(200,162,74,0.3);
          padding: 5px 12px;
          border-radius: 8px;
          backdrop-filter: blur(8px);
          z-index: 2;
        }

        .leader-info {
          padding: 32px;
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .leader-title-row {
          margin-bottom: 16px;
        }

        .leader-name {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 24px;
          font-weight: 700;
          margin: 0 0 6px;
          color: #fff;
        }

        .leader-role {
          font-family: monospace;
          font-size: 11px;
          color: #c8a24a;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .leader-meta {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: monospace;
          font-size: 11px;
          color: rgba(255,255,255,0.7);
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          padding: 5px 12px;
          border-radius: 6px;
        }

        .meta-item svg {
          color: #c8a24a;
        }

        .leader-bio {
          font-size: 14.5px;
          color: rgba(255,255,255,0.6);
          line-height: 1.65;
          margin: 0 0 28px;
          flex-grow: 1;
        }

        .leader-social {
          display: flex;
          gap: 16px;
          border-top: 1px solid rgba(255,255,255,0.06);
          padding-top: 20px;
          margin-top: auto;
        }

        .social-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: monospace;
          font-size: 11px;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          transition: color 0.3s;
        }

        .social-link:hover {
          color: #c8a24a;
        }

        /* ═══════════════════════════════════════
           OPERATIONS DIVISION GRID
           ═══════════════════════════════════════ */
        .ops-section {
          margin-top: 60px;
        }

        .ops-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }

        .ops-card {
          position: relative;
          border-radius: 20px;
          padding: 30px;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.06);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: border-color 0.4s, box-shadow 0.4s;
          display: flex;
          gap: 20px;
          align-items: flex-start;
        }

        .ops-card.card-hover {
          border-color: rgba(200,162,74,0.3);
          box-shadow: 0 20px 50px rgba(0,0,0,0.4);
        }

        .ops-avatar {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(200,162,74,0.1);
          border: 1px solid rgba(200,162,74,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #c8a24a;
          flex-shrink: 0;
        }

        .ops-info {
          position: relative;
          z-index: 1;
        }

        .ops-name {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 17px;
          font-weight: 700;
          margin: 0 0 4px;
          color: #fff;
        }

        .ops-role {
          font-family: monospace;
          font-size: 10px;
          color: #c8a24a;
          letter-spacing: 0.1em;
          display: block;
          margin-bottom: 10px;
        }

        .ops-bio {
          font-size: 13.5px;
          color: rgba(255,255,255,0.55);
          line-height: 1.6;
          margin: 0;
        }

        /* ═══════════════════════════════════════
           MOBILE
           ═══════════════════════════════════════ */
        @media (max-width: 900px) {
          .team-section { padding: 80px 16px; }
          .leadership-grid { grid-template-columns: 1fr; gap: 28px; }
          .ops-grid { grid-template-columns: 1fr; gap: 20px; }
          .leader-info { padding: 24px; }
          .ops-card { padding: 22px; }
        }
      `}</style>
    </div>
  );
}
