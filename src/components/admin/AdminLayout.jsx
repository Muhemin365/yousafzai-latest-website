import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { Menu, X } from 'lucide-react';

const navItems = [
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
  { type: 'divider' },
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
    <div className="flex flex-col md:flex-row min-h-screen bg-[#F5F7FA]">
      {/* Mobile Topbar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-navy text-white">
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" stroke="#F1E4C3" strokeWidth="1.6" width="24" height="24">
            <path d="M12 2C8 7 5 11.5 5 15a7 7 0 0014 0c0-3.5-3-8-7-13z" />
          </svg>
          <span className="font-display font-bold text-[15px]">Admin</span>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white">
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`${mobileMenuOpen ? 'flex' : 'hidden'} md:flex flex-col flex-shrink-0 bg-navy text-white transition-all duration-300 ${collapsed ? 'w-16' : 'w-full md:w-[260px]'}`}>
        <div className="hidden md:flex items-center gap-[10px] p-[20px_16px] border-b border-white/10">
          <svg viewBox="0 0 24 24" fill="none" stroke="#F1E4C3" strokeWidth="1.6" width="28" height="28" className="shrink-0">
            <path d="M12 2C8 7 5 11.5 5 15a7 7 0 0014 0c0-3.5-3-8-7-13z" />
          </svg>
          {!collapsed && <span className="font-display font-bold text-[15px] whitespace-nowrap">Admin Panel</span>}
        </div>
        
        <div className="flex-1 py-3 overflow-y-auto overflow-x-hidden">
          {navItems.map((item, i) =>
            item.type === 'divider' ? (
              <div key={`div-${i}`} className="h-px bg-white/10 my-2 mx-4" />
            ) : (
              <div
                key={item.key}
                onClick={() => {
                  setActiveSection(item.key);
                  setMobileMenuOpen(false);
                }}
                className={`px-4 py-2.5 cursor-pointer text-[13px] transition-all whitespace-nowrap overflow-hidden text-ellipsis
                  ${activeSection === item.key ? 'bg-gold/15 border-l-[3px] border-gold text-gold font-semibold' : 'border-l-[3px] border-transparent text-white/65 hover:text-white hover:bg-white/5'}
                `}
              >
                {collapsed ? item.label[0] : item.label}
              </div>
            )
          )}
        </div>
        
        <div className="p-4 border-t border-white/10 relative">
          {!collapsed && (
            <div className="text-[12px] text-white/50 mb-2 truncate">
              {user?.email}
            </div>
          )}
          <button
            onClick={() => { logout(); navigate('/admin/login', { replace: true }); }}
            className="w-full py-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-[6px] text-[12px] cursor-pointer transition-colors"
          >
            {collapsed ? 'L' : 'Logout'}
          </button>
        </div>
        
        {/* Collapse toggle (desktop only) */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex absolute top-6 -right-3 w-6 h-6 bg-white border border-gray-200 rounded-full items-center justify-center text-navy shadow-sm cursor-pointer z-10"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" style={{ transform: collapsed ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}>
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      </div>

      <div className="flex-1 bg-white md:m-3 md:rounded-xl md:shadow-sm overflow-hidden flex flex-col">
        <div className="flex-1 overflow-auto p-4 md:p-8">
          {children}
        </div>
      </div>

    </div>
  );
}
