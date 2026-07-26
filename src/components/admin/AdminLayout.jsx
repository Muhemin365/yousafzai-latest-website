import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { Menu, X, ShieldCheck, LogOut, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

const mainNavItems = [
  { label: 'Dashboard', key: 'dashboard' },
  { label: 'Hero Section', key: 'hero' },
  { label: 'About Section', key: 'about' },
  { label: 'Products', key: 'products' },
  { label: 'Solutions', key: 'solutions' },
  { label: 'Supply Chain', key: 'supplyChain' },
  { label: 'Why Us', key: 'whyUs' },
  { label: 'Quality/Certs', key: 'quality' },
  { label: 'Testimonials', key: 'testimonials' },
  { label: 'FAQ', key: 'faq' },
  { label: 'Contact Info', key: 'contact' },
  { label: 'Company Info', key: 'company' },
  { label: 'Our Companies', key: 'ourCompanies' },
];

const eggTradersNavItems = [
  { label: 'ET Company', key: 'eggTradersCompany' },
  { label: 'ET Hero', key: 'eggTradersHero' },
  { label: 'ET About', key: 'eggTradersAbout' },
  { label: 'ET Services', key: 'eggTradersServices' },
  { label: 'ET Products', key: 'eggTradersProducts' },
  { label: 'ET Solutions', key: 'eggTradersSolutions' },
  { label: 'ET Process', key: 'eggTradersProcess' },
  { label: 'ET Quality', key: 'eggTradersQuality' },
  { label: 'ET Contact', key: 'eggTradersContact' },
];

export default function AdminLayout({ activeSection, setActiveSection, children }) {
  const logout = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.user);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="admin-root">
      {/* Mobile Topbar */}
      <div className="admin-mobile-bar">
        <div className="mobile-brand">
          <ShieldCheck size={20} className="text-gold" />
          <span className="mobile-title">Yousafzai CMS</span>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="mobile-toggle">
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`admin-sidebar ${mobileMenuOpen ? 'mobile-open' : ''} ${collapsed ? 'is-collapsed' : ''}`}>
        {/* Brand Header */}
        <div className="sidebar-header">
          <div className="brand-logo">
            <ShieldCheck size={22} />
          </div>
          {!collapsed && (
            <div className="brand-text">
              <span className="brand-title">YOUSAFZAI</span>
              <span className="brand-sub">CMS EXECUTIVE</span>
            </div>
          )}
        </div>

        {/* Navigation list */}
        <div className="sidebar-nav">
          {!collapsed && <span className="nav-group-label">PRIMARY WEBSITE</span>}
          {mainNavItems.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                setActiveSection(item.key);
                setMobileMenuOpen(false);
              }}
              className={`nav-item ${activeSection === item.key ? 'is-active' : ''}`}
            >
              <span className="nav-indicator" />
              <span className="nav-text">{collapsed ? item.label[0] : item.label}</span>
            </button>
          ))}

          {!collapsed && <span className="nav-group-label" style={{ marginTop: '20px' }}>EGG TRADERS PLATFORM</span>}
          {eggTradersNavItems.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                setActiveSection(item.key);
                setMobileMenuOpen(false);
              }}
              className={`nav-item ${activeSection === item.key ? 'is-active' : ''}`}
            >
              <span className="nav-indicator" />
              <span className="nav-text">{collapsed ? item.label[0] : item.label}</span>
            </button>
          ))}
        </div>

        {/* User Profile & Logout */}
        <div className="sidebar-footer">
          {!collapsed && (
            <div className="user-profile">
              <span className="user-email">{user?.email || 'admin@yousafzaigroup.com'}</span>
              <span className="user-role">SUPER_ADMIN</span>
            </div>
          )}
          <button
            onClick={() => {
              logout();
              navigate('/admin/login', { replace: true });
            }}
            className="logout-btn"
          >
            <LogOut size={15} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>

        {/* Collapse toggle button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="collapse-btn"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main">
        {/* Top Header Bar */}
        <header className="main-header">
          <div className="header-left">
            <span className="header-eyebrow">CMS_SECTION</span>
            <h1 className="header-title">{activeSection.toUpperCase()}</h1>
          </div>
          <div className="header-right">
            <Link to="/" target="_blank" className="live-site-btn">
              <ExternalLink size={14} />
              <span>View Live Website</span>
            </Link>
          </div>
        </header>

        {/* Section Content */}
        <div className="main-content-body">
          {children}
        </div>
      </main>

      <style>{`
        /* ═══════════════════════════════════════
           ADMIN ROOT
           ═══════════════════════════════════════ */
        .admin-root {
          display: flex;
          min-height: 100vh;
          background: #060e1a;
          color: #fff;
          font-family: 'Inter', sans-serif;
        }

        /* ═══════════════════════════════════════
           MOBILE BAR
           ═══════════════════════════════════════ */
        .admin-mobile-bar {
          display: none;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          background: rgba(10,18,34,0.95);
          border-bottom: 1px solid rgba(255,255,255,0.08);
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .mobile-brand {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .mobile-title {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 16px;
        }

        .mobile-toggle {
          background: none;
          border: none;
          color: #fff;
          cursor: pointer;
        }

        /* ═══════════════════════════════════════
           SIDEBAR
           ═══════════════════════════════════════ */
        .admin-sidebar {
          width: 260px;
          flex-shrink: 0;
          background: rgba(10,18,34,0.95);
          border-right: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(20px);
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 0;
          height: 100vh;
          transition: width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          z-index: 40;
        }

        .admin-sidebar.is-collapsed {
          width: 70px;
        }

        .sidebar-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 24px 20px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        .brand-logo {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(200,162,74,0.12);
          border: 1px solid rgba(200,162,74,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #c8a24a;
          flex-shrink: 0;
        }

        .brand-text {
          display: flex;
          flex-direction: column;
        }

        .brand-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.01em;
        }

        .brand-sub {
          font-family: monospace;
          font-size: 9px;
          color: #c8a24a;
          letter-spacing: 0.12em;
        }

        .sidebar-nav {
          flex-grow: 1;
          padding: 20px 12px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .nav-group-label {
          font-family: monospace;
          font-size: 9px;
          color: rgba(255,255,255,0.35);
          letter-spacing: 0.15em;
          padding: 0 12px;
          margin-bottom: 8px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 14px;
          border-radius: 10px;
          border: none;
          background: transparent;
          color: rgba(255,255,255,0.6);
          font-size: 13px;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          transition: all 0.25s;
          text-align: left;
          width: 100%;
          position: relative;
        }

        .nav-indicator {
          width: 4px;
          height: 16px;
          border-radius: 2px;
          background: transparent;
          transition: background 0.25s;
        }

        .nav-item:hover {
          color: #fff;
          background: rgba(255,255,255,0.04);
        }

        .nav-item.is-active {
          color: #ffe6a0;
          background: rgba(200,162,74,0.12);
          border: 1px solid rgba(200,162,74,0.25);
          font-weight: 600;
        }

        .nav-item.is-active .nav-indicator {
          background: #c8a24a;
          box-shadow: 0 0 8px rgba(200,162,74,0.6);
        }

        .sidebar-footer {
          padding: 18px 16px;
          border-top: 1px solid rgba(255,255,255,0.08);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .user-profile {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .user-email {
          font-size: 12px;
          color: rgba(255,255,255,0.8);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .user-role {
          font-family: monospace;
          font-size: 9px;
          color: #4ade80;
          letter-spacing: 0.1em;
        }

        .logout-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 9px;
          border-radius: 8px;
          background: rgba(248,113,113,0.1);
          border: 1px solid rgba(248,113,113,0.25);
          color: #f87171;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s;
        }

        .logout-btn:hover {
          background: rgba(248,113,113,0.2);
        }

        .collapse-btn {
          position: absolute;
          top: 24px;
          right: -12px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #0a1628;
          border: 1px solid rgba(200,162,74,0.4);
          color: #c8a24a;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 10px rgba(0,0,0,0.3);
          transition: transform 0.25s;
        }

        /* ═══════════════════════════════════════
           MAIN CONTENT
           ═══════════════════════════════════════ */
        .admin-main {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
          background: #060e1a;
        }

        .main-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 36px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          background: rgba(10,18,34,0.5);
          backdrop-filter: blur(12px);
        }

        .header-eyebrow {
          font-family: monospace;
          font-size: 10px;
          color: #c8a24a;
          letter-spacing: 0.15em;
          display: block;
          margin-bottom: 4px;
        }

        .header-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 22px;
          font-weight: 700;
          margin: 0;
          color: #fff;
        }

        .live-site-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: monospace;
          font-size: 12px;
          color: #c8a24a;
          background: rgba(200,162,74,0.1);
          border: 1px solid rgba(200,162,74,0.25);
          padding: 8px 16px;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.25s;
        }

        .live-site-btn:hover {
          background: #c8a24a;
          color: #060e1a;
          box-shadow: 0 0 16px rgba(200,162,74,0.3);
        }

        .main-content-body {
          flex-grow: 1;
          padding: 36px;
          overflow-y: auto;
        }

        /* ═══════════════════════════════════════
           RESPONSIVE
           ═══════════════════════════════════════ */
        @media (max-width: 900px) {
          .admin-root { flex-direction: column; }
          .admin-mobile-bar { display: flex; }
          .admin-sidebar {
            display: none;
            width: 100%;
            height: auto;
            position: fixed;
            inset: 60px 0 0 0;
            background: #0a1628;
          }
          .admin-sidebar.mobile-open { display: flex; }
          .collapse-btn { display: none; }
          .main-header { padding: 20px; }
          .main-content-body { padding: 20px; }
        }
      `}</style>
    </div>
  );
}
