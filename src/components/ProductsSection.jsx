import { useEffect, useRef, useState } from 'react';
import { useCMSStore } from '../store/useCMSStore';

export default function ProductsSection() {
  const products = useCMSStore((s) => s.products);
  const [brokenImgs, setBrokenImgs] = useState(new Set());
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    el.querySelectorAll('.reveal, .reveal-stagger').forEach((e) => observer.observe(e));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="products" ref={ref}>
      <div className="container">
        <div className="sec-head reveal">
          <div className="tag-eyebrow">{products.eyebrow}</div>
          <h2 className="sec-title">{products.title}</h2>
          <p className="sec-sub">{products.subtitle}</p>
        </div>
        <div className="product-grid reveal-stagger">
          {products.items.map((item, i) => (
            <div key={i} className="product-card">
               <div className="product-top" style={{ background: `linear-gradient(145deg,${item.gradient.includes('from-navy') ? '#0B2545,#123A6B' : item.gradient.includes('from-amber') ? '#4F3A22,#7A5A33' : item.gradient.includes('from-green') ? '#1F5E3A,#2F7D4E' : '#3A3A52,#52527A'}` }}>
                 <span className="p-badge">{item.badge}</span>
                {item.image && !brokenImgs.has(i) ? (
                    <img src={item.image} alt={item.name} className="p-image" onError={() => setBrokenImgs((prev) => new Set(prev).add(i))} />
                  ) : (
                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" width="46" height="46">
                     {item.icon === 'Feather' ? <path d="M12 2C8 7 5 11.5 5 15a7 7 0 0014 0c0-3.5-3-8-7-13z" /> :
                      <><rect x="4" y="8" width="16" height="11" rx="1.5" /><path d="M8 8V6a4 4 0 018 0v2" /></>}
                   </svg>
                 )}
               </div>
              <div className="product-body">
                <div className="p-name">{item.name}</div>
                <div className="p-desc">{item.description}</div>
                <div className="p-tags">
                  <span className={`p-tag ${i % 2 === 0 ? 'gold' : ''}`}>{item.tags[0]}</span>
                  <span className="p-tag">{item.tags[1]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="spec-table-wrap reveal">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Grade</th>
                <th>Available Sizes</th>
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
                  <td><span className={`status-pill status-${spec.statusClass}`}>{spec.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .product-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 22px; }
        .product-card { background: #FFFFFF; border-radius: 24px; overflow: hidden; border: 1px solid #EEF1F5; transition: transform .4s cubic-bezier(.22,1,.36,1), box-shadow .4s cubic-bezier(.22,1,.36,1); }
        .product-card:hover { transform: translateY(-6px); box-shadow: 0 14px 36px rgba(11,37,69,0.10); }
        .product-top { height: 128px; display: flex; align-items: center; justify-content: center; position: relative; }
        .product-top svg { width: 46px; height: 46px; color: #F1E4C3; }
        .product-top .p-image { width: 100%; height: 100%; object-fit: cover; }
        .product-top .p-badge { position: absolute; top: 12px; right: 12px; font-size: 10px; font-weight: 700; letter-spacing: .04em; background: rgba(255,255,255,0.16); color: #FFFFFF; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; z-index: 1; }
        .product-body { padding: 22px 20px; }
        .p-name { font-weight: 700; font-size: 14.5px; color: #0B2545; margin-bottom: 8px; }
        .p-desc { font-size: 12.5px; color: #707888; line-height: 1.6; margin-bottom: 14px; min-height: 62px; }
        .p-tags { display: flex; gap: 6px; flex-wrap: wrap; }
        .p-tag { font-size: 10.5px; font-weight: 600; padding: 4px 10px; border-radius: 20px; background: #F5F7FA; color: #444C5C; }
        .p-tag.gold { background: #F1E4C3; color: #9C7B2E; }
        .spec-table-wrap { margin-top: 56px; border-radius: 24px; overflow: hidden; border: 1px solid #EEF1F5; box-shadow: 0 2px 10px rgba(11,37,69,0.06); }
        table { width: 100%; border-collapse: collapse; background: #FFFFFF; }
        thead th { background: #0B2545; color: #FFFFFF; font-size: 11px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; padding: 16px 20px; text-align: center; }
        tbody td { padding: 16px 20px; font-size: 13.5px; color: #444C5C; border-bottom: 1px solid #EEF1F5; text-align: center; }
        tbody tr:last-child td { border-bottom: none; }
        tbody tr:hover td { background: #F5F7FA; }
        .status-pill { font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 20px; display: inline-block; }
        .status-stock { background: #E6F4EA; color: #1F7A3D; }
        .status-limited { background: #F1E4C3; color: #9C7B2E; }
        @media (max-width: 1080px) { .product-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 860px) { .product-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}
