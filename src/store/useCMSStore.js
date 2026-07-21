import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { defaultContent } from '../data/defaultContent';
import { api } from '../lib/api';

const SECTION_ENDPOINT = {
  hero: 'hero',
  about: 'about',
  products: 'products',
  solutions: 'solutions',
  supplyChain: 'supply-chain',
  whyUs: 'why-us',
  quality: 'quality',
  contact: 'contact',
  company: 'company',
  testimonials: 'testimonials',
  faq: 'faq',
  ourCompanies: 'our-companies',
  eggTraders: 'egg-traders',
};

function deepMerge(defaults, persisted) {
  if (!persisted) return defaults;
  const result = { ...defaults };
  for (const key of Object.keys(persisted)) {
    if (key.startsWith('update') || key === 'apiInitialized') continue;
    const dv = defaults[key];
    const pv = persisted[key];
    const sameType = typeof dv === typeof pv && Array.isArray(dv) === Array.isArray(pv);
    if (!sameType) continue;
    if (Array.isArray(pv)) {
      result[key] = pv.map((item, i) => {
        if (i < dv.length && typeof item === 'object' && typeof dv[i] === 'object') {
          return { ...dv[i], ...item };
        }
        return item;
      });
    } else if (typeof pv === 'object' && pv !== null) {
      result[key] = { ...dv, ...pv };
    } else {
      result[key] = pv;
    }
  }
  return result;
}

async function saveSection(key) {
  const ep = SECTION_ENDPOINT[key];
  if (!ep) return;
  const state = useCMSStore.getState();
  try {
    await api.updateCmsSection(ep, state[key]);
  } catch (err) {
    console.warn(`Failed to save ${key} to API:`, err.message);
  }
}

export const useCMSStore = create(
  persist(
    (set, get) => ({
      ...defaultContent,
      apiInitialized: false,

      initFromApi: async () => {
        if (get().apiInitialized) return;
        try {
          const raw = await api.getCmsAll();
          const data = raw.data || raw;
          const merged = { ...defaultContent };
          for (const key of Object.keys(SECTION_ENDPOINT)) {
            const pv = data[key];
            const dv = merged[key];
            if (pv === null || pv === undefined) continue;
            const sameType = typeof dv === typeof pv && Array.isArray(dv) === Array.isArray(pv);
            if (!sameType) continue;
            if (typeof pv === 'object' && !Array.isArray(pv) && pv !== null) {
              merged[key] = { ...dv, ...pv };
            } else {
              merged[key] = pv;
            }
          }
          set({ ...merged, apiInitialized: true });
        } catch {
          set({ apiInitialized: true });
        }
      },

      updateHero: (data) => {
        set((s) => ({ hero: { ...s.hero, ...data } }));
        saveSection('hero');
      },
      updateAbout: (data) => {
        set((s) => ({ about: { ...s.about, ...data } }));
        saveSection('about');
      },
      updateProducts: (data) => {
        set((s) => ({ products: { ...s.products, ...data } }));
        saveSection('products');
      },
      updateSolutions: (data) => {
        set((s) => ({ solutions: { ...s.solutions, ...data } }));
        saveSection('solutions');
      },
      updateSupplyChain: (data) => {
        set((s) => ({ supplyChain: { ...s.supplyChain, ...data } }));
        saveSection('supplyChain');
      },
      updateDistribution: (data) => {
        set((s) => ({ distribution: { ...s.distribution, ...data } }));
      },
      updateWhyUs: (data) => {
        set((s) => ({ whyUs: { ...s.whyUs, ...data } }));
        saveSection('whyUs');
      },
      updateQuality: (data) => {
        set((s) => ({ quality: { ...s.quality, ...data } }));
        saveSection('quality');
      },
      updateContact: (data) => {
        set((s) => ({ contact: { ...s.contact, ...data } }));
        saveSection('contact');
      },
      updateFooter: (data) => {
        set((s) => ({ footer: { ...s.footer, ...data } }));
      },
      updateCompany: (data) => {
        set((s) => ({ company: { ...s.company, ...data } }));
        saveSection('company');
      },
      updateTestimonials: (testimonials) => {
        set({ testimonials });
        saveSection('testimonials');
      },
      updateFaq: (faq) => {
        set({ faq });
        saveSection('faq');
      },
      updateTeam: (team) => {
        set((s) => ({ about: { ...s.about, team } }));
        saveSection('about');
      },
      updateCertifications: (certs) => {
        set((s) => ({ quality: { ...s.quality, certs } }));
        saveSection('quality');
      },
      updateProductItems: (items) => {
        set((s) => ({ products: { ...s.products, items } }));
        saveSection('products');
      },
      updateProductSpecs: (specs) => {
        set((s) => ({ products: { ...s.products, specs } }));
        saveSection('products');
      },
      updateOurCompanies: (data) => {
        set((s) => ({ ourCompanies: { ...s.ourCompanies, ...data } }));
        saveSection('ourCompanies');
      },
      updateEggTraders: (data) => {
        set((s) => ({ eggTraders: { ...s.eggTraders, ...data } }));
        saveSection('eggTraders');
      },
    }),
    {
      name: 'yousafzai-cms',
      storage: createJSONStorage(() => localStorage),
      merge: (persisted, current) => deepMerge(current, persisted),
      partialize: (state) => {
        const { apiInitialized, ...rest } = state;
        return rest;
      },
    }
  )
);
