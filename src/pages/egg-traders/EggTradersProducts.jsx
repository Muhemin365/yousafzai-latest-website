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
                  <div className="et-product-top" style={{ background: i === 0 ? 'linear-gradient(145deg,#0D6B3D,#059669)' : i === 1 ? 'linear-gradient(145deg,#4F3A22,#7A5A33)' : i === 2 ? 'linear-gradient(145deg,#1F5E3A,#2F7D4E)' : 'linear-gradient(145deg,#3A3A52,#52527A)' }}>
                    <span className="et-p-badge">{item.badge}</span>
                    {item.image && !brokenImgs.has(i) ? (
                      <img src={item.image} alt={item.name} className="et-p-image" onError={() => setBrokenImgs((prev) => new Set(prev).add(i))} />
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" width="46" height="46" style={{ color: '#FDE68A' }}>
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
          .et-product-card { background: #FFFFFF; border-radius: 24px; overflow: hidden; border: 1px solid #EEF1F5; transition: transform .4s, box-shadow .4s; }
          .et-product-card:hover { transform: translateY(-6px); box-shadow: 0 14px 36px rgba(13,107,61,0.10); }
          .et-product-top { height: 128px; display: flex; align-items: center; justify-content: center; position: relative; }
          .et-product-top .et-p-image { width: 100%; height: 100%; object-fit: cover; }
          .et-p-badge { position: absolute; top: 12px; right: 12px; font-size: 10px; font-weight: 700; letter-spacing: .04em; background: rgba(255,255,255,0.16); color: #FFFFFF; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; z-index: 1; }
          .et-product-body { padding: 22px 20px; }
          .et-p-name { font-weight: 700; font-size: 14.5px; color: #0D6B3D; margin-bottom: 8px; }
          .et-p-desc { font-size: 12.5px; color: #707888; line-height: 1.6; margin-bottom: 14px; min-height: 62px; }
          .et-p-tags { display: flex; gap: 6px; flex-wrap: wrap; }
          .et-p-tag { font-size: 10.5px; font-weight: 600; padding: 4px 10px; border-radius: 20px; background: #ECFDF5; color: #0D6B3D; }
          .et-spec-wrap { margin-top: 56px; border-radius: 24px; overflow: hidden; border: 1px solid #EEF1F5; box-shadow: 0 2px 10px rgba(0,0,0,0.06); }
          table { width: 100%; border-collapse: collapse; background: #FFFFFF; }
          thead th { background: #0D6B3D; color: #FFFFFF; font-size: 11px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; padding: 16px 20px; text-align: left; }
          tbody td { padding: 16px 20px; font-size: 13.5px; color: #444C5C; border-bottom: 1px solid #EEF1F5; }
          tbody tr:last-child td { border-bottom: none; }
          tbody tr:hover td { background: #F5F7FA; }
          .et-status-pill { font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 20px; display: inline-block; }
          .et-status-stock { background: #ECFDF5; color: #0D6B3D; }
          .et-status-limited { background: #FEF3C7; color: #D97706; }
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
