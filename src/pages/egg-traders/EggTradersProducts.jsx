import { useEffect, useRef, useState } from 'react';
import { useCMSStore } from '../../store/useCMSStore';
import EggTradersPageBanner from '../../components/egg-traders/EggTradersPageBanner';

export default function EggTradersProducts() {
  const products = useCMSStore((s) => s.eggTraders.products);
  const [brokenImgs, setBrokenImgs] = useState(new Set());
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { entry.target.classList.add('in'); observer.unobserve(entry.target); }
        });
      },
      { threshold: 0.15 }
    );
    el.querySelectorAll('.reveal, .reveal-stagger').forEach((e) => observer.observe(e));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <EggTradersPageBanner title="Products" subtitle="Browse verified egg products from our network of audited poultry farms — available for direct procurement through the Egg Traders platform." />
      <div ref={ref}>
        <section className="section-alt">
          <div className="container">
            <div className="sec-head reveal">
              <div className="tag-eyebrow">{products.eyebrow}</div>
              <h2 className="sec-title">{products.title}</h2>
              <p className="sec-sub">{products.subtitle}</p>
            </div>
            <div className="et-product-grid reveal-stagger">
              {products.items.map((item, i) => (
                <div key={i} className="et-product-card">
                  <div className="et-product-top" style={{ background: i === 0 ? 'linear-gradient(145deg,#0B2545,#173E72)' : i === 1 ? 'linear-gradient(145deg,#3B2F1E,#7A5A33)' : i === 2 ? 'linear-gradient(145deg,#0F2A4A,#1E5E8C)' : 'linear-gradient(145deg,#1A1A38,#3A3A66)' }}>
                    <span className="et-p-badge">{item.badge}</span>
                    {item.image && !brokenImgs.has(i) ? (
                      <img src={item.image} alt={item.name} className="et-p-image" onError={() => setBrokenImgs((prev) => new Set(prev).add(i))} />
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" width="46" height="46" style={{ color: '#F2E7C9' }}>
                        <path d="M12 2C8 7 5 11.5 5 15a7 7 0 0014 0c0-3.5-3-8-7-13z" />
                      </svg>
                    )}
                  </div>
                  <div className="et-product-body">
                    <div className="et-p-name">{item.name}</div>
                    <div className="et-p-desc">{item.description}</div>
                    <div className="et-p-tags">
                      {item.tags.map((tag, j) => (
                        <span key={j} className="et-p-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="et-spec-wrap reveal">
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Grade</th>
                    <th>Sizes</th>
                    <th>Min. Order</th>
                    <th>Lead Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {products.specs.map((spec, i) => (
                    <tr key={i}>
                      <td><strong>{spec.name}</strong></td>
                      <td>{spec.grade}</td>
                      <td>{spec.sizes}</td>
                      <td>{spec.moq}</td>
                      <td>{spec.lead}</td>
                      <td><span className={`et-status-pill et-status-${spec.statusClass}`}>{spec.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <style>{`
          .et-product-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 22px; }
          .et-product-card { background: rgba(255,255,255,0.03); border-radius: 24px; overflow: hidden; border: 1px solid rgba(255,255,255,0.08); backdrop-filter: blur(12px); transition: transform .4s, box-shadow .4s, border-color .4s; }
          .et-product-card:hover { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(0,0,0,0.4); border-color: rgba(200,162,74,0.35); }
          .et-product-top { height: 128px; display: flex; align-items: center; justify-content: center; position: relative; }
          .et-product-top .et-p-image { width: 100%; height: 100%; object-fit: cover; }
          .et-p-badge { position: absolute; top: 12px; right: 12px; font-size: 10px; font-weight: 700; letter-spacing: .04em; background: rgba(200,162,74,0.2); border: 1px solid rgba(200,162,74,0.4); color: #F2E7C9; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; z-index: 1; }
          .et-product-body { padding: 22px 20px; }
          .et-p-name { font-weight: 700; font-size: 14.5px; color: #FFFFFF; margin-bottom: 8px; }
          .et-p-desc { font-size: 12.5px; color: rgba(255,255,255,0.6); line-height: 1.6; margin-bottom: 14px; min-height: 62px; }
          .et-p-tags { display: flex; gap: 6px; flex-wrap: wrap; }
          .et-p-tag { font-size: 10.5px; font-weight: 600; padding: 4px 10px; border-radius: 20px; background: rgba(200,162,74,0.12); border: 1px solid rgba(200,162,74,0.2); color: #E5C87A; }
          .et-spec-wrap { margin-top: 56px; border-radius: 24px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 2px 10px rgba(0,0,0,0.4); }
          table { width: 100%; border-collapse: collapse; background: rgba(255,255,255,0.02); }
          thead th { background: #0B2545; color: #F2E7C9; font-size: 11px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; padding: 16px 20px; text-align: left; border-bottom: 1px solid rgba(200,162,74,0.25); }
          tbody td { padding: 16px 20px; font-size: 13.5px; color: rgba(255,255,255,0.72); border-bottom: 1px solid rgba(255,255,255,0.07); }
          tbody tr:last-child td { border-bottom: none; }
          tbody tr:hover td { background: rgba(255,255,255,0.04); }
          .et-status-pill { font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 20px; display: inline-block; }
          .et-status-stock { background: rgba(127,182,242,0.15); color: #7FB6F2; }
          .et-status-limited { background: rgba(245,158,11,0.15); color: #F5B75E; }
          @media (max-width: 1080px) { .et-product-grid { grid-template-columns: repeat(2,1fr); } }
          @media (max-width: 640px) {
            .et-product-grid { grid-template-columns: 1fr; }
            .et-spec-wrap { overflow-x: auto; }
            table { min-width: 600px; }
            .et-product-body { padding: 18px 16px; }
            .et-p-name { font-size: 13.5px; }
            .et-p-desc { font-size: 12px; min-height: auto; }
          }
          @media (max-width: 420px) { .et-product-top { height: 100px; } }
        `}</style>
      </div>
    </>
  );
}
