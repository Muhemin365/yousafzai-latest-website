import React, { useEffect, useRef, useState } from 'react';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/legacy/build/pdf.mjs';
import pdfWorkerUrl from 'pdfjs-dist/legacy/build/pdf.worker.min.mjs?url';
import { ShieldCheck, Leaf, MoonStar, Building2, X, Download, Award } from 'lucide-react';

GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

const CERTS = [
  {
    file: 'ACI HACCP Certificate -YOUSAFZAI AGRI FOODS PVT LTD-2026-2029.pdf',
    title: 'HACCP Certification',
    sub: 'ACI HACCP – Food Safety Management · 2026–2029',
    icon: ShieldCheck,
    seal: '#3F6231',
  },
  {
    file: 'CamScanner 04-30-2026 14.34.pdf',
    title: 'Food Safety Quality System',
    sub: 'Quality Management System Certification · 2026',
    icon: Leaf,
    seal: '#DE510A',
  },
  {
    file: 'IHC Halal Certificate-YOUSAFZAI AGRI FOODS PVT LTD-2026-2029.pdf',
    title: 'Halal Certification',
    sub: 'IHC Halal Certified · 2026–2029',
    icon: MoonStar,
    seal: '#3F6231',
  },
  {
    file: 'Yousafzai Eggs Traders Profile.pdf',
    title: 'Company Profile',
    sub: 'Yousafzai Eggs Traders – Institutional Profile',
    icon: Building2,
    seal: '#3F6231',
  },
];

function CertSeal({ icon: Ic, seal }) {
  return (
    <div className="cert-seal-wrap">
      <svg className="cert-seal" viewBox="0 0 120 120" aria-hidden="true">
        <circle className="seal-ring" cx="60" cy="60" r="55" fill="#ffffff" />
        <circle className="seal-dash" cx="60" cy="60" r="49" fill="none" />
        <circle className="seal-core" cx="60" cy="60" r="33" fill={seal} />
        <circle className="seal-spark" cx="60" cy="60" r="33" fill="none" />
        <path className="seal-notch" d="M 60 0.5 L 60 7" />
      </svg>
      <Ic size={28} strokeWidth={2.4} className="cert-seal-ic" />
    </div>
  );
}

export default function SceneCertificates() {
  const [active, setActive] = useState(null);
  const [activePages, setActivePages] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [pageError, setPageError] = useState(false);
  const certSectionRef = useRef(null);
  const renderSeq = useRef(0);

  const openDoc = (idx) => setActive(idx);

  useEffect(() => {
    const section = certSectionRef.current;
    if (!section) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) section.classList.add('certs-in'); }),
      { threshold: 0.2 }
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (active === null) { setActivePages([]); setPageError(false); setPageLoading(false); return; }

    const seq = ++renderSeq.current;
    let cancelled = false;
    setPageLoading(true);
    setPageError(false);
    setActivePages([]);

    const url = `${import.meta.env.BASE_URL}certificates/${encodeURIComponent(CERTS[active].file)}`;
    const dpr = Math.min(1.5, Math.max(1, window.devicePixelRatio || 1));

    getDocument(url).promise
      .then(async (pdf) => {
        const page = await pdf.getPage(1);
        return { pdf, page };
      })
      .then(async ({ pdf, page }) => {
        const vp = page.getViewport({ scale: 1 });
        const scale = Math.min(3, (1100 * dpr) / vp.width);
        const outViewport = page.getViewport({ scale });
        const canvas = document.createElement('canvas');
        canvas.width = outViewport.width;
        canvas.height = outViewport.height;
        await page.render({ canvasContext: canvas.getContext('2d'), viewport: outViewport }).promise;
        if (cancelled || seq !== renderSeq.current) return;
        setActivePages([canvas.toDataURL('image/jpeg', 0.92)]);
        setPageLoading(false);
        const rest = Array.from({ length: pdf.numPages - 1 }, (_, i) => i + 2);
        for (const n of rest) {
          if (cancelled || seq !== renderSeq.current) break;
          try {
            const pg = await pdf.getPage(n);
            const pgVp = pg.getViewport({ scale });
            const c = document.createElement('canvas');
            c.width = pgVp.width;
            c.height = pgVp.height;
            await pg.render({ canvasContext: c.getContext('2d'), viewport: pgVp }).promise;
            if (cancelled || seq !== renderSeq.current) return;
            setActivePages((prev) => [...prev, c.toDataURL('image/jpeg', 0.92)]);
          } catch { /* keep whatever rendered */ }
        }
      })
      .catch(() => { if (!cancelled && seq === renderSeq.current) setPageError(true); });

    return () => { cancelled = true; };
  }, [active]);

  useEffect(() => {
    if (active !== null) {
      document.body.style.overflow = 'hidden';
      const onKey = (e) => { if (e.key === 'Escape') setActive(null); };
      window.addEventListener('keydown', onKey);
      return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
    }
  }, [active]);

  return (
    <section className="cert-section" id="certificates" ref={certSectionRef}>
      <div className="container">
        <div className="sec-head center">
          <span className="tag-eyebrow">CERTIFICATIONS // ACCREDITATIONS</span>
          <h2 className="sec-title">Our Certificates &amp; Accreditations</h2>
          <p className="sec-sub">
            Verified documents that back our quality promise — click any badge below to view the full certificate.
          </p>
        </div>

        <div className="cert-stage" >
          <div className="cert-hub">
            <span className="cert-hub-icon"><Award size={30} /></span>
            <strong>Certified</strong>
            <small>click a badge</small>
          </div>

          <div className="cert-orbit">
            {CERTS.map((c, i) => (
              <div
                key={c.file}
                className={`cert-token tok-${i}`}
                onClick={() => openDoc(i)}
                role="button"
                tabIndex={0}
                aria-label={`View ${c.title}`}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openDoc(i); } }}
              >
                <div className="tok-inner">
                  <CertSeal icon={c.icon} seal={c.seal} />
                  <span className="tok-name">{c.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {active !== null && (
        <div className="cert-modal" onClick={() => setActive(null)}>
          <div className="cert-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="cert-modal-head">
              <div>
                <span className="cert-modal-eyebrow">{CERTS[active].sub}</span>
                <strong>{CERTS[active].title}</strong>
              </div>
              <div className="cert-modal-actions">
                <a className="cert-dl" href={`${import.meta.env.BASE_URL}certificates/${encodeURIComponent(CERTS[active].file)}`} target="_blank" rel="noreferrer">
                  <Download size={14} /> Open
                </a>
                <button className="cert-close" onClick={() => setActive(null)} aria-label="Close">
                  <X size={18} />
                </button>
              </div>
            </div>
            <div className="cert-scroll">
              {pageLoading && (
                <div className="cert-loading">
                  <span className="tok-loader big" />
                  <p>Loading certificate…</p>
                </div>
              )}
              {pageError && (
                <div className="cert-error">
                  <p>Certificate content could not be rendered. <a href={`${import.meta.env.BASE_URL}certificates/${encodeURIComponent(CERTS[active].file)}`} target="_blank" rel="noreferrer">Open it in a new tab</a>.</p>
                </div>
              )}
              {!pageLoading && !pageError && activePages.map((src, i) => (
                <img key={i} className="cert-page" src={src} alt={`${CERTS[active].title} — page ${i + 1}`} />
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .cert-section {
          padding: 120px 0 140px;
          position: relative;
          overflow: hidden;
          background: #FBF7F0;
        }

        .cert-stage {
          --cert-size: 148px;
          --ring: 176px;
          width: 560px;
          height: 560px;
          margin: 0 auto;
          position: relative;
        }

        .cert-hub {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 168px;
          height: 168px;
          transform: translate(-50%, -50%);
          z-index: 3;
          background: #ffffff;
          color: #111111;
          border: 3px solid #3F6231;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          box-shadow: 0 24px 60px rgba(63,98,49,0.22);
          text-align: center;
          padding: 20px;
        }

        .cert-hub-icon {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #3F6231;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 6px;
          box-shadow: 0 8px 20px rgba(63,98,49,0.35);
        }

        .cert-hub strong {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 15px;
          letter-spacing: 0.02em;
          color: #111111;
        }

        .cert-hub small {
          font-size: 10px;
          color: #6b7280;
          font-weight: 600;
          letter-spacing: 0.04em;
        }

        /* orbit */
        .cert-orbit {
          position: absolute;
          inset: 0;
          animation: certSpin 26s linear infinite;
        }

        .cert-orbit::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: var(--ring);
          height: var(--ring);
          transform: translate(-50%, -50%);
          border: 2px dashed rgba(63,98,49,0.4);
          border-radius: 50%;
          box-sizing: border-box;
        }

        .cert-token {
          position: absolute;
          top: 50%;
          left: 50%;
          width: var(--cert-size);
          height: var(--cert-size);
          margin: calc(var(--cert-size) / -2) 0 0 calc(var(--cert-size) / -2);
          cursor: pointer;
          background: transparent;
          border: none;
          z-index: 2;
          outline: none;
          -webkit-tap-highlight-color: transparent;
        }

        .cert-token.tok-0 { transform: rotate(0deg) translateX(var(--ring)); }
        .cert-token.tok-1 { transform: rotate(90deg) translateX(var(--ring)); }
        .cert-token.tok-2 { transform: rotate(180deg) translateX(var(--ring)); }
        .cert-token.tok-3 { transform: rotate(270deg) translateX(var(--ring)); }

        .tok-inner {
          width: 100%;
          height: 100%;
          animation: certSpinRev 26s linear infinite;
        }

        .cert-token.tok-0 .tok-inner { animation-delay: 0s; }
        .cert-token.tok-1 .tok-inner { animation-delay: -6.5s; }
        .cert-token.tok-2 .tok-inner { animation-delay: -13s; }
        .cert-token.tok-3 .tok-inner { animation-delay: -19.5s; }

        .cert-seal-wrap {
          width: var(--cert-size);
          height: var(--cert-size);
          position: relative;
          border-radius: 50%;
          box-shadow: 0 12px 30px rgba(63,98,49,0.25);
          transition: transform 0.3s, box-shadow 0.3s;
          background: #ffffff;
        }

        .cert-seal {
          width: 100%;
          height: 100%;
          display: block;
        }

        .seal-ring {
          stroke: #3F6231;
          stroke-width: 2.5;
        }

        .seal-dash {
          stroke: rgba(63,98,49,0.4);
          stroke-width: 1.2;
          stroke-dasharray: 4 7;
        }

        .seal-spark {
          stroke: #F8B44A;
          stroke-width: 2;
          stroke-dasharray: 12 7;
        }

        .seal-notch {
          stroke: rgba(63,98,49,0.6);
          stroke-width: 2;
        }

        .cert-seal-ic {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          color: #ffffff;
          filter: drop-shadow(0 2px 6px rgba(0,0,0,0.28));
        }

        .cert-token:hover .cert-seal-wrap {
          transform: scale(1.07) rotate(-4deg);
          box-shadow: 0 20px 48px rgba(222,81,10,0.35);
        }

        .tok-loader {
          width: 22px;
          height: 22px;
          border: 2.5px solid rgba(63,98,49,0.2);
          border-top-color: #3F6231;
          border-radius: 50%;
          animation: tokSpin 0.8s linear infinite;
        }

        .tok-name {
          display: block;
          text-align: center;
          margin-top: 10px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 11.5px;
          font-weight: 700;
          color: #111111;
          letter-spacing: 0.01em;
          line-height: 1.25;
          text-shadow: 0 1px 2px rgba(255,255,255,0.8);
        }

        .cert-stage:hover .cert-orbit,
        .cert-stage:hover .tok-inner {
          animation-play-state: paused;
        }

        .cert-section.certs-in .cert-stage {
          animation: certIn 0.9s cubic-bezier(.22,1,.36,1) both;
        }

        /* Modal */
        .cert-modal {
          position: fixed;
          inset: 0;
          z-index: 10000;
          background: rgba(10, 14, 18, 0.78);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
          animation: certFade 0.3s ease both;
        }

        .cert-modal-card {
          width: min(960px, calc(100vw - 48px));
          height: 88vh;
          max-height: 920px;
          min-height: 420px;
          background: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 40px 120px rgba(0,0,0,0.45);
          animation: certPop 0.35s cubic-bezier(.22,1,.36,1) both;
        }

        .cert-modal-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          padding: 18px 24px;
          border-bottom: 1px solid rgba(63,98,49,0.2);
        }

        .cert-modal-eyebrow {
          display: block;
          font-family: monospace;
          font-size: 10px;
          color: #DE510A;
          letter-spacing: 0.1em;
          margin-bottom: 4px;
        }

        .cert-modal-head strong {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 18px;
          color: #111111;
        }

        .cert-modal-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .cert-dl {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-family: monospace;
          font-size: 12px;
          font-weight: 700;
          color: #ffffff;
          background: #3F6231;
          padding: 9px 16px;
          border-radius: 8px;
          text-decoration: none;
          transition: background 0.25s;
        }

        .cert-dl:hover { background: #2C4724; }

        .cert-close {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          border: 1px solid rgba(63,98,49,0.3);
          background: #fff;
          color: #111111;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.25s, color 0.25s;
        }

        .cert-close:hover { background: #3F6231; color: #ffffff; }

        .cert-scroll {
          flex: 1;
          overflow-y: auto;
          padding: 22px;
          background: #3c3f43;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .cert-page {
          display: block;
          width: 100%;
          max-width: 880px;
          margin: 0 auto;
          background: #ffffff;
          border: 1px solid #d8dee8;
          border-radius: 6px;
          box-shadow: 0 12px 34px rgba(0,0,0,0.35);
        }

        .cert-loading,
        .cert-error {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 14px;
          color: #e8ecf2;
          text-align: center;
        }

        .cert-loading p { font-size: 14px; color: #c7ced9; margin: 0; }

        .cert-error p { font-size: 14px; color: #ffd9c2; max-width: 420px; margin: 0; }

        .cert-error a { color: #f7a15e; text-decoration: underline; }

        .tok-loader.big {
          width: 34px;
          height: 34px;
          border: 3px solid rgba(255,255,255,0.2);
          border-top-color: #F76B0D;
        }

        @keyframes certSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes certSpinRev {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }

        @keyframes tokSpin { to { transform: rotate(360deg); } }

        @keyframes certFade { from { opacity: 0; } to { opacity: 1; } }

        @keyframes certPop { from { opacity: 0; transform: translateY(30px) scale(0.96); } to { opacity: 1; transform: none; } }

        @keyframes certIn { from { opacity: 0; transform: scale(0.85); } to { opacity: 1; transform: scale(1); } }

        @media (max-width: 700px) {
          .cert-section { padding: 90px 12px 110px; }
          .cert-stage {
            --cert-size: 104px;
            --ring: 132px;
            width: 360px;
            height: 360px;
            margin-top: 30px;
          }
          .cert-hub {
            width: 118px;
            height: 118px;
            padding: 12px;
          }
          .cert-hub-icon {
            width: 40px;
            height: 40px;
            margin-bottom: 2px;
          }
          .cert-hub strong { font-size: 12px; }
          .cert-hub small { font-size: 8.5px; }
          .tok-name { font-size: 10px; margin-top: 7px; }
          .cert-modal { padding: 16px; }
          .cert-modal-card { max-height: 90vh; }
          .cert-modal-head { padding: 14px 16px; }
        }

        @media (max-width: 400px) {
          .cert-stage {
            --cert-size: 88px;
            --ring: 108px;
            width: 300px;
            height: 300px;
          }
        }
      `}</style>
    </section>
  );
}