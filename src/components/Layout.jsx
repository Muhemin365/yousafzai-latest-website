import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import FooterSection from './FooterSection';

export default function Layout() {
  const [loading, setLoading] = useState(true);
  const [showBackTop, setShowBackTop] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setShowBackTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      const btn = e.target.closest('[data-ripple]');
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  if (loading) {
    return (
      <div id="loader">
        <div className="loader-mark">
          <div className="loader-ring" />
          YOUSAFZAI
        </div>
        <style>{`
          #loader { position: fixed; inset: 0; background: #071A30; z-index: 9999; display: flex; align-items: center; justify-content: center; }
          .loader-mark { font-family: 'Space Grotesk',sans-serif; color: #FFFFFF; font-size: 15px; letter-spacing: .18em; display: flex; flex-direction: column; align-items: center; gap: 18px; }
          .loader-ring { width: 46px; height: 46px; border-radius: 50%; border: 2px solid rgba(255,255,255,.18); border-top-color: #C8A24A; animation: loaderSpin 0.9s linear infinite; }
          @keyframes loaderSpin { to { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="page-enter">
        <Outlet />
      </main>
      <FooterSection />

      <div className={`back-top ${showBackTop ? 'show' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </div>

      <style>{`
        section { padding: 120px 0; position: relative; scroll-margin-top: 100px; }
        .page-enter { animation: pageFadeIn .6s cubic-bezier(.22,1,.36,1) both; }
        @keyframes pageFadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .ripple { position: absolute; border-radius: 50%; background: rgba(255,255,255,0.55); transform: scale(0); animation: rippleAnim .6s ease-out; pointer-events: none; }
        @keyframes rippleAnim { to { transform: scale(3.2); opacity: 0; } }
        .back-top { position: fixed; bottom: 28px; right: 28px; width: 48px; height: 48px; border-radius: 50%; background: #0B2545; color: #FFFFFF; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 14px 36px rgba(11,37,69,0.10); opacity: 0; transform: translateY(10px); transition: opacity .3s, transform .3s; z-index: 300; }
        .back-top.show { opacity: 1; transform: translateY(0); }
        .back-top:hover { background: #C8A24A; color: #071A30; }
        .tag-eyebrow { display: inline-flex; align-items: center; justify-content: center; gap: 8px; font-size: 11.5px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: #C8A24A; margin-bottom: 18px; }
        .tag-eyebrow::before { content: ''; width: 22px; height: 1.6px; background: #C8A24A; }
        .sec-head { text-align: center; margin-left: auto; margin-right: auto; margin-bottom: 56px; background: linear-gradient(135deg,#071A30,#0B2545); border: 1px solid rgba(255,255,255,0.08); border-radius: 24px; padding: 32px 36px; box-shadow: 0 14px 36px rgba(11,37,69,0.15); }
        .sec-head.center { margin-left: auto; margin-right: auto; text-align: center; }
        .sec-title { font-family: 'Space Grotesk',sans-serif; font-weight: 600; font-size: clamp(1.9rem,3vw,2.7rem); color: #FFFFFF; line-height: 1.18; letter-spacing: -0.01em; }
        .sec-sub { font-size: 15.5px; color: rgba(255,255,255,0.7); margin-top: 16px; line-height: 1.75; }
        @media (max-width: 640px) {
          .sec-head { padding: 24px 20px; margin-bottom: 40px; border-radius: 16px; }
          .sec-sub { font-size: 14px; }
          section { padding: 80px 0 !important; scroll-margin-top: 80px; }
        }
        @media (max-width: 420px) {
          .sec-head { padding: 20px 16px; border-radius: 12px; }
          .sec-sub { font-size: 13px; }
          section { padding: 60px 0 !important; }
        }
      `}</style>
    </>
  );
}
