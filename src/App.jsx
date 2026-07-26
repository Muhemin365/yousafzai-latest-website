import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { FileText, Package, Clock, CheckCircle2 } from 'lucide-react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAuthStore } from './store/useAuthStore';
import { StoryProvider } from './motion/StoryEngine';
import GlobalEnvironment from './motion/GlobalEnvironment';
import Layout from './components/Layout';
import EggTradersLayout from './components/egg-traders/EggTradersLayout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';
import TeamPage from './pages/TeamPage';
import ProcessPage from './pages/ProcessPage';
import QualityPage from './pages/QualityPage';
import ContactPage from './pages/ContactPage';
import EggTradersPage from './pages/EggTradersPage';
import EggTradersAbout from './pages/egg-traders/EggTradersAbout';
import EggTradersProducts from './pages/egg-traders/EggTradersProducts';
import EggTradersProcess from './pages/egg-traders/EggTradersProcess';
import EggTradersQuality from './pages/egg-traders/EggTradersQuality';
import EggTradersContact from './pages/egg-traders/EggTradersContact';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import HeroEditor from './components/admin/HeroEditor';
import TextEditor from './components/admin/TextEditor';
import ProductItemsEditor from './components/admin/ProductItemsEditor';
import SpecsEditor from './components/admin/SpecsEditor';
import CmsArrayEditor from './components/admin/CmsArrayEditor';
import ImageUpload from './components/admin/ImageUpload';
import { useCMSStore } from './store/useCMSStore';

function AdminDashboard() {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Sections', value: '14', icon: FileText },
          { label: 'CMS Items', value: '50+', icon: Package },
          { label: 'Last Build', value: new Date().toLocaleDateString(), icon: Clock },
          { label: 'Status', value: 'Live', icon: CheckCircle2 },
        ].map((stat, i) => (
          <div key={i} style={{ background: '#F5F7FA', borderRadius: 12, padding: 20, textAlign: 'center' }}>
            <div style={{ marginBottom: 8 }}>{stat.icon ? <stat.icon size={24} style={{ color: '#0B2545' }} /> : null}</div>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 22, fontWeight: 700, color: '#0B2545' }}>{stat.value}</div>
            <div style={{ fontSize: 12, color: '#707888', marginTop: 4 }}>{stat.label}</div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 14, color: '#707888' }}>Select a section from the sidebar to edit content. All changes auto-save and update the live site instantly.</p>
    </div>
  );
}

function AdminApp() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [section, setSection] = useState('dashboard');
  const about = useCMSStore((s) => s.about);
  const updateAbout = useCMSStore((s) => s.updateAbout);
  const products = useCMSStore((s) => s.products);
  const updateProducts = useCMSStore((s) => s.updateProducts);
  const updateProductItems = useCMSStore((s) => s.updateProductItems);
  const updateProductSpecs = useCMSStore((s) => s.updateProductSpecs);
  const quality = useCMSStore((s) => s.quality);
  const updateQuality = useCMSStore((s) => s.updateQuality);
  const contact = useCMSStore((s) => s.contact);
  const updateContact = useCMSStore((s) => s.updateContact);
  const company = useCMSStore((s) => s.company);
  const updateCompany = useCMSStore((s) => s.updateCompany);
  const testimonials = useCMSStore((s) => s.testimonials);
  const updateTestimonials = useCMSStore((s) => s.updateTestimonials);
  const faq = useCMSStore((s) => s.faq);
  const updateFaq = useCMSStore((s) => s.updateFaq);
  const solutions = useCMSStore((s) => s.solutions);
  const updateSolutions = useCMSStore((s) => s.updateSolutions);
  const supplyChain = useCMSStore((s) => s.supplyChain);
  const updateSupplyChain = useCMSStore((s) => s.updateSupplyChain);
  const whyUs = useCMSStore((s) => s.whyUs);
  const updateWhyUs = useCMSStore((s) => s.updateWhyUs);
  const ourCompanies = useCMSStore((s) => s.ourCompanies);
  const updateOurCompanies = useCMSStore((s) => s.updateOurCompanies);
  const eggTraders = useCMSStore((s) => s.eggTraders);
  const updateEggTraders = useCMSStore((s) => s.updateEggTraders);

  if (!isAuthenticated) return <Navigate to="/admin/login" />;

  const renderEditor = () => {
    switch (section) {
      case 'dashboard': return <AdminDashboard />;
      case 'hero': return <HeroEditor />;
      case 'about': return (
        <TextEditor
          data={about}
          onUpdate={updateAbout}
          fields={[
            { key: 'eyebrow', label: 'Eyebrow' },
            { key: 'title', label: 'Title' },
            { key: 'subtitle', label: 'Subtitle' },
            { key: 'quote', label: 'Quote', type: 'textarea', rows: 3 },
            { key: 'quoteFooter', label: 'Quote Footer' },
          ]}
        />
      );
      case 'products': return (
        <div>
          <TextEditor
            data={products}
            onUpdate={updateProducts}
            fields={[
              { key: 'eyebrow', label: 'Eyebrow' },
              { key: 'title', label: 'Title' },
              { key: 'subtitle', label: 'Subtitle', type: 'textarea', rows: 2 },
            ]}
          />
          <div style={{ marginTop: 28, paddingTop: 24, borderTop: '1.5px solid #EEF1F5' }}>
            <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 16, fontWeight: 700, color: '#0B2545', margin: '0 0 16px' }}>Product Items</h3>
            <ProductItemsEditor items={products.items} onUpdate={updateProductItems} />
          </div>
          <SpecsEditor specs={products.specs} onUpdate={updateProductSpecs} />
        </div>
      );
      case 'quality': return (
        <TextEditor
          data={quality}
          onUpdate={updateQuality}
          fields={[
            { key: 'eyebrow', label: 'Eyebrow' },
            { key: 'title', label: 'Title' },
            { key: 'subtitle', label: 'Subtitle', type: 'textarea', rows: 2 },
          ]}
        />
      );
      case 'contact': return (
        <TextEditor
          data={contact}
          onUpdate={updateContact}
          fields={[
            { key: 'eyebrow', label: 'Eyebrow' },
            { key: 'title', label: 'Title' },
            { key: 'subtitle', label: 'Subtitle', type: 'textarea', rows: 2 },
          ]}
        />
      );
      case 'company': return (
        <TextEditor
          data={company}
          onUpdate={updateCompany}
          fields={[
            { key: 'name', label: 'Company Name' },
            { key: 'sub', label: 'Sub Label' },
            { key: 'tagline', label: 'Tagline', type: 'textarea', rows: 2 },
          ]}
        />
      );
      case 'solutions': return (
        <TextEditor
          data={solutions}
          onUpdate={updateSolutions}
          fields={[
            { key: 'eyebrow', label: 'Eyebrow' },
            { key: 'title', label: 'Title' },
            { key: 'subtitle', label: 'Subtitle', type: 'textarea', rows: 2 },
          ]}
        />
      );
      case 'supplyChain': return (
        <TextEditor
          data={supplyChain}
          onUpdate={updateSupplyChain}
          fields={[
            { key: 'eyebrow', label: 'Eyebrow' },
            { key: 'title', label: 'Title' },
            { key: 'subtitle', label: 'Subtitle', type: 'textarea', rows: 2 },
          ]}
        />
      );
      case 'whyUs': return (
        <TextEditor
          data={whyUs}
          onUpdate={updateWhyUs}
          fields={[
            { key: 'eyebrow', label: 'Eyebrow' },
            { key: 'title', label: 'Title' },
          ]}
        />
      );
      case 'testimonials': return (
        <div>
          {testimonials.map((t, i) => (
            <div key={i} style={{ marginBottom: 16, padding: 16, background: '#F5F7FA', borderRadius: 8 }}>
              <input value={t.text} onChange={(e) => { const s = [...testimonials]; s[i] = { ...s[i], text: e.target.value }; updateTestimonials(s); }} style={{ ...inputStyle, marginBottom: 8 }} placeholder="Quote text" />
              <div style={{ display: 'flex', gap: 8 }}>
                <input value={t.name} onChange={(e) => { const s = [...testimonials]; s[i] = { ...s[i], name: e.target.value }; updateTestimonials(s); }} style={{ ...inputStyle, flex: 1 }} placeholder="Name" />
                <input value={t.role} onChange={(e) => { const s = [...testimonials]; s[i] = { ...s[i], role: e.target.value }; updateTestimonials(s); }} style={{ ...inputStyle, flex: 1 }} placeholder="Role" />
              </div>
            </div>
          ))}
        </div>
      );
      case 'faq': return (
        <div>
          {faq.map((item, i) => (
            <div key={i} style={{ marginBottom: 16, padding: 16, background: '#F5F7FA', borderRadius: 8 }}>
              <input value={item.q} onChange={(e) => { const s = [...faq]; s[i] = { ...s[i], q: e.target.value }; updateFaq(s); }} style={{ ...inputStyle, marginBottom: 8 }} placeholder="Question" />
              <textarea value={item.a} onChange={(e) => { const s = [...faq]; s[i] = { ...s[i], a: e.target.value }; updateFaq(s); }} rows={2} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Answer" />
            </div>
          ))}
        </div>
      );
      case 'ourCompanies': return (
        <div>
          <TextEditor
            data={ourCompanies}
            onUpdate={updateOurCompanies}
            fields={[
              { key: 'eyebrow', label: 'Eyebrow' },
              { key: 'title', label: 'Title' },
              { key: 'subtitle', label: 'Subtitle', type: 'textarea', rows: 2 },
            ]}
          />
          <div style={{ marginTop: 28, paddingTop: 24, borderTop: '1.5px solid #EEF1F5' }}>
            <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 16, fontWeight: 700, color: '#0B2545', margin: '0 0 16px' }}>Companies</h3>
            {ourCompanies.companies.map((company, i) => (
              <div key={i} style={{ marginBottom: 16, padding: 16, background: '#F5F7FA', borderRadius: 8 }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  <input value={company.name} onChange={(e) => { const s = [...ourCompanies.companies]; s[i] = { ...s[i], name: e.target.value }; updateOurCompanies({ companies: s }); }} style={{ ...inputStyle, flex: 1 }} placeholder="Company name" />
                  <input value={company.color} onChange={(e) => { const s = [...ourCompanies.companies]; s[i] = { ...s[i], color: e.target.value }; updateOurCompanies({ companies: s }); }} style={{ ...inputStyle, width: 100 }} placeholder="Color hex" />
                </div>
                <input value={company.tagline} onChange={(e) => { const s = [...ourCompanies.companies]; s[i] = { ...s[i], tagline: e.target.value }; updateOurCompanies({ companies: s }); }} style={{ ...inputStyle, marginBottom: 8 }} placeholder="Tagline" />
                <textarea value={company.description} onChange={(e) => { const s = [...ourCompanies.companies]; s[i] = { ...s[i], description: e.target.value }; updateOurCompanies({ companies: s }); }} rows={2} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Description" />
                <div style={{ display: 'flex', gap: 8 }}>
                  <input value={company.url} onChange={(e) => { const s = [...ourCompanies.companies]; s[i] = { ...s[i], url: e.target.value }; updateOurCompanies({ companies: s }); }} style={{ ...inputStyle, flex: 1 }} placeholder="URL (e.g. /egg-traders)" />
                </div>
              </div>
            ))}
          </div>
        </div>
      );
      case 'eggTradersCompany': return (
        <TextEditor
          data={eggTraders.company}
          onUpdate={(data) => updateEggTraders({ company: { ...eggTraders.company, ...data } })}
          fields={[
            { key: 'name', label: 'Company Name' },
            { key: 'sub', label: 'Subtitle' },
            { key: 'tagline', label: 'Tagline', type: 'textarea', rows: 2 },
          ]}
        />
      );
      case 'eggTradersHero': return (
        <div>
          <TextEditor
            data={{ eyebrow: eggTraders.hero.eyebrow, h1Line1: eggTraders.hero.h1Line1, h1Highlight: eggTraders.hero.h1Highlight, h1Line2: eggTraders.hero.h1Line2, body: eggTraders.hero.body }}
            onUpdate={(data) => updateEggTraders({ hero: { ...eggTraders.hero, ...data } })}
            fields={[
              { key: 'eyebrow', label: 'Eyebrow' },
              { key: 'h1Line1', label: 'H1 Line 1' },
              { key: 'h1Highlight', label: 'H1 Highlight' },
              { key: 'h1Line2', label: 'H1 Line 2' },
              { key: 'body', label: 'Body', type: 'textarea', rows: 3 },
            ]}
          />
          <h4 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 600, color: '#0B2545', margin: '20px 0 12px' }}>CTA Buttons</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <div><label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#444C5C', marginBottom: 4 }}>Primary CTA Label</label>
              <input value={eggTraders.hero.primaryCta?.label || ''} onChange={(e) => updateEggTraders({ hero: { ...eggTraders.hero, primaryCta: { ...eggTraders.hero.primaryCta, label: e.target.value } } })} style={inputStyle} /></div>
            <div><label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#444C5C', marginBottom: 4 }}>Primary CTA Action</label>
              <input value={eggTraders.hero.primaryCta?.action || ''} onChange={(e) => updateEggTraders({ hero: { ...eggTraders.hero, primaryCta: { ...eggTraders.hero.primaryCta, action: e.target.value } } })} style={inputStyle} /></div>
            <div><label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#444C5C', marginBottom: 4 }}>Secondary CTA Label</label>
              <input value={eggTraders.hero.secondaryCta?.label || ''} onChange={(e) => updateEggTraders({ hero: { ...eggTraders.hero, secondaryCta: { ...eggTraders.hero.secondaryCta, label: e.target.value } } })} style={inputStyle} /></div>
            <div><label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#444C5C', marginBottom: 4 }}>Secondary CTA Action</label>
              <input value={eggTraders.hero.secondaryCta?.action || ''} onChange={(e) => updateEggTraders({ hero: { ...eggTraders.hero, secondaryCta: { ...eggTraders.hero.secondaryCta, action: e.target.value } } })} style={inputStyle} /></div>
          </div>
          <h4 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 600, color: '#0B2545', margin: '20px 0 12px' }}>Trust Items</h4>
          <CmsArrayEditor items={eggTraders.hero.trustItems} onUpdate={(items) => updateEggTraders({ hero: { ...eggTraders.hero, trustItems: items } })}
            fields={[{ key: 'icon', label: 'Icon Name' }, { key: 'text', label: 'Text' }]} itemLabel="Trust Item" defaults={{ icon: 'ShieldCheck', text: '' }} />
          <h4 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 600, color: '#0B2545', margin: '20px 0 12px' }}>Stats</h4>
          <CmsArrayEditor items={eggTraders.hero.stats} onUpdate={(stats) => updateEggTraders({ hero: { ...eggTraders.hero, stats: stats } })}
            fields={[{ key: 'value', label: 'Value' }, { key: 'suffix', label: 'Suffix' }, { key: 'label', label: 'Label' }]} itemLabel="Stat" defaults={{ value: '', suffix: '+', label: '' }} />
        </div>
      );
      case 'eggTradersAbout': return (
        <div>
          <TextEditor data={{ eyebrow: eggTraders.about.eyebrow, title: eggTraders.about.title, subtitle: eggTraders.about.subtitle, quote: eggTraders.about.quote, quoteFooter: eggTraders.about.quoteFooter }}
            onUpdate={(data) => updateEggTraders({ about: { ...eggTraders.about, ...data } })}
            fields={[{ key: 'eyebrow', label: 'Eyebrow' }, { key: 'title', label: 'Title' }, { key: 'subtitle', label: 'Subtitle', type: 'textarea', rows: 2 }, { key: 'quote', label: 'Quote', type: 'textarea', rows: 2 }, { key: 'quoteFooter', label: 'Quote Footer' }]} />
          <h4 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 600, color: '#0B2545', margin: '20px 0 12px' }}>Paragraphs</h4>
          <CmsArrayEditor items={eggTraders.about.paragraphs?.map((p) => ({ text: p }))} onUpdate={(items) => updateEggTraders({ about: { ...eggTraders.about, paragraphs: items.map(i => i.text) } })}
            fields={[{ key: 'text', label: 'Paragraph', type: 'textarea', rows: 3 }]} itemLabel="Paragraph" defaults={{ text: '' }} />
          <h4 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 600, color: '#0B2545', margin: '20px 0 12px' }}>Features</h4>
          <CmsArrayEditor items={eggTraders.about.features} onUpdate={(features) => updateEggTraders({ about: { ...eggTraders.about, features: features } })}
            fields={[{ key: 'icon', label: 'Icon Name' }, { key: 'title', label: 'Title' }, { key: 'body', label: 'Body', type: 'textarea', rows: 2 }]} itemLabel="Feature" defaults={{ icon: 'Feather', title: '', body: '' }} />
          <h4 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 600, color: '#0B2545', margin: '20px 0 12px' }}>Team</h4>
          <CmsArrayEditor items={eggTraders.about.team} onUpdate={(team) => updateEggTraders({ about: { ...eggTraders.about, team: team } })}
            fields={[{ key: 'initials', label: 'Initials' }, { key: 'name', label: 'Name' }, { key: 'role', label: 'Role' }, { key: 'bio', label: 'Bio', type: 'textarea', rows: 2 }]} itemLabel="Team Member" defaults={{ initials: '', name: '', role: '', bio: '' }} />
        </div>
      );
      case 'eggTradersServices': return (
        <CmsArrayEditor items={eggTraders.services} onUpdate={(services) => updateEggTraders({ services: services })}
          fields={[{ key: 'num', label: 'Number' }, { key: 'title', label: 'Title' }, { key: 'body', label: 'Body', type: 'textarea', rows: 2 }]}
          itemLabel="Service" defaults={{ num: '', title: '', body: '' }} />
      );
      case 'eggTradersProducts': return (
        <div>
          <TextEditor data={{ eyebrow: eggTraders.products.eyebrow, title: eggTraders.products.title, subtitle: eggTraders.products.subtitle }}
            onUpdate={(data) => updateEggTraders({ products: { ...eggTraders.products, ...data } })}
            fields={[{ key: 'eyebrow', label: 'Eyebrow' }, { key: 'title', label: 'Title' }, { key: 'subtitle', label: 'Subtitle', type: 'textarea', rows: 2 }]} />
          <h4 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 600, color: '#0B2545', margin: '20px 0 12px' }}>Product Items</h4>
          <CmsArrayEditor items={eggTraders.products.items} onUpdate={(items) => updateEggTraders({ products: { ...eggTraders.products, items: items } })}
            fields={[{ key: 'name', label: 'Name' }, { key: 'badge', label: 'Badge' }, { key: 'description', label: 'Description', type: 'textarea', rows: 2 }, { key: 'image', label: 'Image' }]}
            itemLabel="Product" defaults={{ badge: 'New', name: '', description: '', tags: ['', ''], image: '' }} />
          <h4 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 600, color: '#0B2545', margin: '20px 0 12px' }}>Specifications</h4>
          <SpecsEditor specs={eggTraders.products.specs} onUpdate={(specs) => updateEggTraders({ products: { ...eggTraders.products, specs: specs } })} />
        </div>
      );
      case 'eggTradersSolutions': return (
        <div>
          <TextEditor data={{ eyebrow: eggTraders.solutions.eyebrow, title: eggTraders.solutions.title, subtitle: eggTraders.solutions.subtitle }}
            onUpdate={(data) => updateEggTraders({ solutions: { ...eggTraders.solutions, ...data } })}
            fields={[{ key: 'eyebrow', label: 'Eyebrow' }, { key: 'title', label: 'Title' }, { key: 'subtitle', label: 'Subtitle', type: 'textarea', rows: 2 }]} />
          <h4 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 600, color: '#0B2545', margin: '20px 0 12px' }}>Tiers</h4>
          <CmsArrayEditor items={eggTraders.solutions.tiers} onUpdate={(tiers) => updateEggTraders({ solutions: { ...eggTraders.solutions, tiers: tiers } })}
            fields={[{ key: 'badge', label: 'Badge' }, { key: 'name', label: 'Name' }, { key: 'desc', label: 'Description' }, { key: 'featured', label: 'Featured', type: 'select', options: [{ value: true, label: 'Yes' }, { value: false, label: 'No' }] }]}
            itemLabel="Tier" defaults={{ badge: '', name: '', desc: '', featured: false, features: [] }} />
        </div>
      );
      case 'eggTradersProcess': return (
        <div>
          <TextEditor data={{ eyebrow: eggTraders.process.eyebrow, title: eggTraders.process.title, subtitle: eggTraders.process.subtitle }}
            onUpdate={(data) => updateEggTraders({ process: { ...eggTraders.process, ...data } })}
            fields={[{ key: 'eyebrow', label: 'Eyebrow' }, { key: 'title', label: 'Title' }, { key: 'subtitle', label: 'Subtitle', type: 'textarea', rows: 2 }]} />
          <h4 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 600, color: '#0B2545', margin: '20px 0 12px' }}>Steps</h4>
          <CmsArrayEditor items={eggTraders.process.steps} onUpdate={(steps) => updateEggTraders({ process: { ...eggTraders.process, steps: steps } })}
            fields={[{ key: 'num', label: 'Number' }, { key: 'icon', label: 'Icon Name' }, { key: 'title', label: 'Title' }, { key: 'body', label: 'Body', type: 'textarea', rows: 2 }]}
            itemLabel="Step" defaults={{ num: '', icon: '', title: '', body: '' }} />
        </div>
      );
      case 'eggTradersQuality': return (
        <div>
          <TextEditor data={{ eyebrow: eggTraders.quality.eyebrow, title: eggTraders.quality.title, subtitle: eggTraders.quality.subtitle }}
            onUpdate={(data) => updateEggTraders({ quality: { ...eggTraders.quality, ...data } })}
            fields={[{ key: 'eyebrow', label: 'Eyebrow' }, { key: 'title', label: 'Title' }, { key: 'subtitle', label: 'Subtitle', type: 'textarea', rows: 2 }]} />
          <h4 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 600, color: '#0B2545', margin: '20px 0 12px' }}>Batch Trace</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <div><label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#444C5C', marginBottom: 4 }}>Batch ID</label>
              <input value={eggTraders.quality.batch?.id || ''} onChange={(e) => updateEggTraders({ quality: { ...eggTraders.quality, batch: { ...eggTraders.quality.batch, id: e.target.value } } })} style={inputStyle} /></div>
            <div><label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#444C5C', marginBottom: 4 }}>Batch Title</label>
              <input value={eggTraders.quality.batch?.title || ''} onChange={(e) => updateEggTraders({ quality: { ...eggTraders.quality, batch: { ...eggTraders.quality.batch, title: e.target.value } } })} style={inputStyle} /></div>
          </div>
          <CmsArrayEditor items={eggTraders.quality.batch?.steps} onUpdate={(steps) => updateEggTraders({ quality: { ...eggTraders.quality, batch: { ...eggTraders.quality.batch, steps: steps } } })}
            fields={[{ key: 'title', label: 'Step Title' }, { key: 'time', label: 'Time' }]} itemLabel="Batch Step" defaults={{ title: '', time: '' }} />
          <h4 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 600, color: '#0B2545', margin: '20px 0 12px' }}>Certifications</h4>
          <CmsArrayEditor items={eggTraders.quality.certs} onUpdate={(certs) => updateEggTraders({ quality: { ...eggTraders.quality, certs: certs } })}
            fields={[{ key: 'icon', label: 'Icon Name' }, { key: 'name', label: 'Name' }, { key: 'body', label: 'Body', type: 'textarea', rows: 2 }, { key: 'status', label: 'Status' }]} itemLabel="Certification" defaults={{ icon: '', name: '', body: '', status: 'Active' }} />
          <h4 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 600, color: '#0B2545', margin: '20px 0 12px' }}>Testimonials</h4>
          <CmsArrayEditor items={eggTraders.quality.testimonials} onUpdate={(testimonials) => updateEggTraders({ quality: { ...eggTraders.quality, testimonials: testimonials } })}
            fields={[{ key: 'initials', label: 'Initials' }, { key: 'name', label: 'Name' }, { key: 'role', label: 'Role' }, { key: 'text', label: 'Text', type: 'textarea', rows: 2 }]} itemLabel="Testimonial" defaults={{ initials: '', name: '', role: '', text: '' }} />
        </div>
      );
      case 'eggTradersContact': return (
        <div>
          <TextEditor data={{ eyebrow: eggTraders.contact.eyebrow, title: eggTraders.contact.title, subtitle: eggTraders.contact.subtitle }}
            onUpdate={(data) => updateEggTraders({ contact: { ...eggTraders.contact, ...data } })}
            fields={[{ key: 'eyebrow', label: 'Eyebrow' }, { key: 'title', label: 'Title' }, { key: 'subtitle', label: 'Subtitle', type: 'textarea', rows: 2 }]} />
          <h4 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 600, color: '#0B2545', margin: '20px 0 12px' }}>Contact Info</h4>
          <CmsArrayEditor items={eggTraders.contact.info} onUpdate={(info) => updateEggTraders({ contact: { ...eggTraders.contact, info: info } })}
            fields={[{ key: 'icon', label: 'Icon Name' }, { key: 'label', label: 'Label' }, { key: 'value', label: 'Value' }]} itemLabel="Info Item" defaults={{ icon: '', label: '', value: '' }} />
        </div>
      );
      default: return <p style={{ color: '#707888' }}>Select a section to edit</p>;
    }
  };

  return (
    <AdminLayout activeSection={section} setActiveSection={setSection}>
      {renderEditor()}
    </AdminLayout>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px 14px',
  border: '1.4px solid #DBDFE6',
  borderRadius: 8,
  fontSize: 13,
  fontFamily: "'Inter',sans-serif",
  color: '#1B2230',
  background: '#FFFFFF',
};

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <BrowserRouter>
      <StoryProvider>
        <GlobalEnvironment>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/process" element={<ProcessPage />} />
              <Route path="/quality" element={<QualityPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Route>
            <Route element={<EggTradersLayout />}>
              <Route path="/egg-traders" element={<EggTradersPage />} />
              <Route path="/egg-traders/about" element={<EggTradersAbout />} />
              <Route path="/egg-traders/products" element={<EggTradersProducts />} />
              <Route path="/egg-traders/process" element={<EggTradersProcess />} />
              <Route path="/egg-traders/quality" element={<EggTradersQuality />} />
              <Route path="/egg-traders/contact" element={<EggTradersContact />} />
            </Route>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminApp />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </GlobalEnvironment>
      </StoryProvider>
    </BrowserRouter>
  );
}
