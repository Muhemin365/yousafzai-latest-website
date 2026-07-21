import { useEffect, useRef, useState } from 'react';
import { useCMSStore } from '../store/useCMSStore';

function FAQItem({ item }) {
  const [open, setOpen] = useState(false);
  const answerRef = useRef(null);
  return (
    <div className={`faq-item ${open ? 'open' : ''}`}>
      <div className="faq-q" onClick={() => setOpen(!open)}>
        {item.q}
        <div className="plus">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </div>
      </div>
      <div className="faq-a" ref={answerRef} style={{ maxHeight: open ? answerRef.current?.scrollHeight : 0 }}>
        <div className="faq-a-inner">{item.a}</div>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const faq = useCMSStore((s) => s.faq);
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
    el.querySelectorAll('.reveal').forEach((e) => observer.observe(e));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section-alt" id="faq" ref={ref}>
      <div className="container">
        <div className="sec-head center reveal" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
          <div className="tag-eyebrow" style={{ justifyContent: 'center' }}>FAQ</div>
          <h2 className="sec-title">Frequently Asked Questions</h2>
        </div>
        <div className="faq-list reveal">
          {faq.map((item, i) => (
            <FAQItem key={i} item={item} />
          ))}
        </div>
      </div>

      <style>{`
        .faq-list { max-width: 780px; margin: 0 auto; text-align: center; }
        .faq-item { border-bottom: 1px solid #EEF1F5; display: flex; flex-direction: column; align-items: center; }
        .faq-q { display: flex; justify-content: center; align-items: center; gap: 16px; padding: 26px 4px; cursor: pointer; font-weight: 600; font-size: 15px; color: #0B2545; }
        .faq-q .plus { width: 26px; height: 26px; border-radius: 50%; background: #F5F7FA; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: transform .35s cubic-bezier(.22,1,.36,1), background .3s; }
        .faq-item.open .plus { background: #C8A24A; }
        .faq-item.open .plus svg { transform: rotate(45deg); color: #071A30; }
        .faq-a { max-height: 0; overflow: hidden; transition: max-height .4s cubic-bezier(.22,1,.36,1); }
        .faq-a-inner { padding: 0 4px 26px; font-size: 13.5px; color: #707888; line-height: 1.75; max-width: 680px; text-align: center; }
      `}</style>
    </section>
  );
}
