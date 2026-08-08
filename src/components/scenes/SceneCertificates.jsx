import React, { useEffect, useRef, useState } from 'react';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/legacy/build/pdf.mjs';
import pdfWorkerUrl from 'pdfjs-dist/legacy/build/pdf.worker.min.mjs?url';
import { Award, X, Download } from 'lucide-react';

GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

const CERTS = [
  {
    file: 'ACI HACCP Certificate -YOUSAFZAI AGRI FOODS PVT LTD-2026-2029.pdf',
    title: 'HACCP Certification',
    sub: 'ACI HACCP – Food Safety Management · 2026–2029',
  },
  {
    file: 'CamScanner 04-30-2026 14.34.pdf',
    title: 'Food Safety Quality System',
    sub: 'Quality Management System Certification · 2026',
  },
  {
    file: 'IHC Halal Certificate-YOUSAFZAI AGRI FOODS PVT LTD-2026-2029.pdf',
    title: 'Halal Certification',
    sub: 'IHC Halal Certified · 2026–2029',
  },
  {
    file: 'Yousafzai Eggs Traders Profile.pdf',
    title: 'Company Profile',
    sub: 'Yousafzai Eggs Traders – Institutional Profile',
  },
];

export default function SceneCertificates() {
  const [active, setActive] = useState(null);
  const [thumbs, setThumbs] = useState({});
  const [errored, setErrored] = useState({});
  const certSectionRef = useRef(null);
  const served = useRef(false);

  const openDoc = (idx) => {
    setActive(idx);
  };

  useEffect(() => {
    if (served.current) return;
    served.current = true;

    let cancelled = false;
    CERTS.forEach((c, idx) => {
      const url = `${import.meta.env.BASE_URL}certificates/${encodeURIComponent(c.file)}`;
      getDocument(url).promise
        .then((pdf) => pdf.getPage(1))
        .then((page) => {
          const vp = page.getViewport({ scale: 1 });
          const scale = Math.min(2, 320 / vp.width);
          const outViewport = page.getViewport({ scale });
          const canvas = document.createElement('canvas');
          canvas.width = outViewport.width;
          canvas.height = outViewport.height;
          return page.render({ canvasContext: canvas.getContext('2d'), viewport: outViewport }).promise.then(() => canvas.toDataURL('image/jpeg', 0.82));
        })
        .then((dataUrl) => {
          if (cancelled) return;
          setThumbs((prev) => ({ ...prev, [idx]: dataUrl }));
        })
        .catch(() => {
          if (cancelled) return;
          setErrored((prev) => ({ ...prev, [idx]: true }));
        });
    });

    return () => { cancelled = true; };
  }, []);

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
            Verified documents that back our quality promise — hover or click any badge below to view the full certificate.
          </p>
        </div>

        <div className="cert-stage" >
          <div className="cert-hub">
            <span className="cert-hub-icon"><Award size={30} /></span>
            <strong>Certified</strong>
            <small>hover / click a badge</small>
          </div>

          <div className="cert-orbit">
            {CERTS.map((c, i) => (
              <div
                key={c.file}
                className={`cert-token tok-${i}`}
                onClick={() => openDoc(i)}
                onMouseEnter={() => openDoc(i)}
                role="button"
                tabIndex={0}
                aria-label={`View ${c.title}`}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openDoc(i); } }}
              >
                <div className="tok-inner">
                  <div className="tok-thumb">
                    {thumbs[i] ? (
                      <img src={thumbs[i]} alt={c.title} />
                    ) : errored[i] ? (
                      <Award size={26} />
                    ) : (
                      <span className="tok-loader" />
                    )}
                  </div>
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
            <iframe
              className="cert-frame"
              src={`${import.meta.env.BASE_URL}certificates/${encodeURIComponent(CERTS[active].file)}`}
              title={CERTS[active].title}
            />
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
          background: #3F6231;
          color: #ffffff;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          box-shadow: 0 24px 60px rgba(63,98,49,0.4);
          text-align: center;
          padding: 20px;
        }

        .cert-hub-icon {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: rgba(255,255,255,0.14);
          border: 1.5px solid rgba(255,255,255,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 6px;
        }

        .cert-hub strong {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 15px;
          letter-spacing: 0.02em;
        }

        .cert-hub small {
          font-size: 10px;
          opacity: 0.85;
          font-weight: 600;
          letter-spacing: 0.04em;
        }

        /* orbit */
        .cert-orbit {
          position: absolute;
          inset: 0;
          animation: certSpin 26s linear infinite;
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

        .tok-thumb {
          width: var(--cert-size);
          height: var(--cert-size);
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid #3F6231;
          box-shadow: 0 12px 30px rgba(63,98,49,0.3);
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #DE510A;
          transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
        }

        .cert-token:hover .tok-thumb {
          border-color: #DE510A;
          transform: scale(1.06);
          box-shadow: 0 18px 46px rgba(222,81,10,0.35);
        }

        .tok-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
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
          width: min(960px, 100%);
          height: min(88vh, 100%);
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

        .cert-frame {
          flex: 1;
          width: 100%;
          border: none;
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