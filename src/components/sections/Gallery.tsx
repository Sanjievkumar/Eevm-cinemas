'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import type { GalleryItem } from '@/types';
import { getGalleryItems } from '@/lib/api/cinema-service';
import { SectionHeader } from '@/components/ui/SectionHeader';

// Asymmetric masonry grid span classes matching premium cinema gallery layout
const MASONRY_SPANS = [
  'col-span-1 sm:col-span-2 sm:row-span-2 min-h-[240px] sm:min-h-0', // 0: Large feature card (Exterior night)
  'col-span-1 sm:col-span-1 sm:row-span-1 min-h-[220px] sm:min-h-0', // 1: Grand entrance steps
  'col-span-1 sm:col-span-1 sm:row-span-2 min-h-[240px] sm:min-h-0', // 2: Tall Dolby corridor
  'col-span-1 sm:col-span-1 sm:row-span-1 min-h-[220px] sm:min-h-0', // 3: Box office counter
  'col-span-1 sm:col-span-2 sm:row-span-2 min-h-[240px] sm:min-h-0', // 4: Curved screen auditorium
  'col-span-1 sm:col-span-2 sm:row-span-1 min-h-[220px] sm:min-h-0', // 5: Wide luxury stadium seating
  'col-span-1 sm:col-span-1 sm:row-span-1 min-h-[220px] sm:min-h-0', // 6: Gourmet concessions lobby
  'col-span-1 sm:col-span-1 sm:row-span-1 min-h-[220px] sm:min-h-0', // 7: Auditorium seating & acoustics
];

type CategoryFilter = 'all' | 'screen' | 'interior' | 'lobby' | 'exterior';

interface FilterTab {
  id: CategoryFilter;
  label: string;
}

const FILTER_TABS: FilterTab[] = [
  { id: 'all', label: 'ALL VIEWS' },
  { id: 'screen', label: 'DOLBY SCREENS' },
  { id: 'interior', label: 'ARCHITECTURE' },
  { id: 'lobby', label: 'LOBBY & BOX OFFICE' },
  { id: 'exterior', label: 'EXTERIOR' },
];

export function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    getGalleryItems().then(setItems).catch(() => setItems([]));
  }, []);

  const displayItems = useMemo(() => {
    if (activeCategory === 'all') return items;
    return items.filter((item) => item.category === activeCategory);
  }, [items, activeCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: items.length };
    items.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, [items]);

  const closeModal = useCallback(() => setActiveItemIndex(null), []);

  const stepImage = useCallback(
    (direction: number) => {
      setActiveItemIndex((idx) => {
        if (idx === null || displayItems.length === 0) return idx;
        return (idx + direction + displayItems.length) % displayItems.length;
      });
    },
    [displayItems.length]
  );

  useEffect(() => {
    if (activeItemIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') stepImage(1);
      if (e.key === 'ArrowLeft') stepImage(-1);
    };
    document.addEventListener('keydown', handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [activeItemIndex, closeModal, stepImage]);

  const activeItem = activeItemIndex !== null ? displayItems[activeItemIndex] : null;

  return (
    <section
      id="gallery"
      className="relative bg-[#07090E] border-t border-[#1E2631] py-16 sm:py-24 px-4 sm:px-6 lg:px-10 overflow-hidden"
      aria-label="Gallery"
    >
      {/* Ambient Cinematic Lighting */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[380px] pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(ellipse 65% 50% at 50% 0%, rgba(201, 168, 76, 0.25) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-10 right-10 w-[600px] h-[450px] pointer-events-none opacity-15"
        style={{
          background: 'radial-gradient(ellipse 60% 60% at 75% 75%, rgba(0, 216, 246, 0.22) 0%, transparent 75%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(rgba(201, 168, 76, 0.4) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto space-y-8 sm:space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <SectionHeader
            number="08"
            eyebrowText="GALLERY"
            titleWhite="INSIDE"
            titleGold="EVM CINEMAS."
          />

          {/* Interactive Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            {FILTER_TABS.map((tab) => {
              const count = categoryCounts[tab.id] || 0;
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveCategory(tab.id);
                    setActiveItemIndex(null);
                  }}
                  className={`group relative inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-[0.68rem] sm:text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-brand-gold via-[#D8B458] to-brand-gold text-black shadow-[0_0_20px_rgba(201,168,76,0.35)] border border-brand-gold'
                      : 'bg-[#0E131C]/90 text-cinema-gray-300 border border-[#222C3A] hover:border-brand-gold/60 hover:text-white hover:bg-[#141B26]'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`inline-flex items-center justify-center min-w-[18px] h-[18px] px-1.5 rounded-full text-[0.6rem] font-black leading-none ${
                      isActive
                        ? 'bg-black/25 text-black'
                        : 'bg-white/10 text-cinema-gray-400 group-hover:bg-brand-gold/20 group-hover:text-brand-gold'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Grid */}
        <div
          className={
            activeCategory === 'all'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[180px] sm:auto-rows-[220px] gap-4 sm:gap-5 grid-flow-dense'
              : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[260px] sm:auto-rows-[300px] gap-5'
          }
        >
          {displayItems.map((item, index) => {
            const spanClass =
              activeCategory === 'all'
                ? MASONRY_SPANS[index % MASONRY_SPANS.length]
                : displayItems.length === 1
                ? 'col-span-1 sm:col-span-2 lg:col-span-3 auto-rows-[380px]'
                : '';

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveItemIndex(index)}
                className={`group relative overflow-hidden rounded-2xl border border-[#222B38] bg-[#0A0D14] transition-all duration-500 hover:border-brand-gold/90 hover:shadow-[0_0_35px_rgba(201,168,76,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold ${spanClass}`}
                aria-label={`View ${item.caption || item.alt}`}
              >
                {/* Fallback pattern */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
                  <svg className="w-full h-full text-brand-gold/30" viewBox="0 0 400 300" fill="none" preserveAspectRatio="xMidYMid slice">
                    <path d="M-50 350 L200 -50 L450 350" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                    <circle cx="200" cy="150" r="90" stroke="currentColor" strokeWidth="0.75" />
                    <circle cx="200" cy="150" r="130" stroke="currentColor" strokeWidth="0.5" strokeDasharray="6 6" />
                  </svg>
                </div>

                {/* High-Vibrancy Image Element */}
                <img
                  src={item.imageUrl}
                  alt={item.alt}
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                  }}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out brightness-[1.08] contrast-[1.08] saturate-[1.12] group-hover:scale-108 group-hover:brightness-[1.15] group-hover:contrast-[1.12]"
                />

                {/* Top Pill Bar with Category Badge */}
                <div className="absolute top-0 inset-x-0 p-3.5 sm:p-4 flex justify-between items-center z-10 bg-gradient-to-b from-[#06080D]/70 via-[#06080D]/20 to-transparent pointer-events-none">
                  <span className="text-[0.6rem] font-bold tracking-[0.22em] uppercase text-brand-cyan bg-[#070A0F]/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-brand-cyan/30 shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                    {item.category === 'screen'
                      ? 'DOLBY SCREEN'
                      : item.category === 'exterior'
                      ? 'FACADE'
                      : item.category === 'lobby'
                      ? 'LOBBY'
                      : 'ARCHITECTURE'}
                  </span>
                  <div className="flex items-center gap-1.5 bg-[#070A0F]/80 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shadow-[0_0_8px_#C9A84C] group-hover:scale-125 transition-transform" />
                    <span className="text-[0.55rem] font-bold tracking-wider text-cinema-gray-300">
                      EVM
                    </span>
                  </div>
                </div>

                {/* Center Hover Magnify Indicator */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-10">
                  <div className="w-12 h-12 rounded-full bg-[#070A0F]/85 backdrop-blur-md border border-brand-gold text-brand-gold flex items-center justify-center shadow-[0_0_25px_rgba(201,168,76,0.4)] transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <svg className="w-5 h-5 text-brand-gold" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                    </svg>
                  </div>
                </div>

                {/* Bottom Scrim & Typography (Only covers bottom portion to leave photo clear) */}
                <div className="absolute bottom-0 inset-x-0 pt-16 pb-4 sm:pb-5 px-4 sm:px-5 bg-gradient-to-t from-[#06080D] via-[#06080D]/75 to-transparent z-10 pointer-events-none text-left">
                  <span className="block text-[0.6rem] font-bold tracking-[0.2em] text-brand-gold uppercase mb-1 drop-shadow">
                    {item.category.toUpperCase()}
                  </span>
                  <h3 className="text-xs sm:text-sm md:text-base font-bold text-cinema-pure-white uppercase tracking-wider line-clamp-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] group-hover:text-brand-gold transition-colors duration-200">
                    {item.caption || item.alt}
                  </h3>
                </div>

                {/* Glowing Border Inset Accent */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 group-hover:ring-brand-gold/40 pointer-events-none transition-all duration-300" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.caption || activeItem.alt}
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fade-in"
          onClick={closeModal}
        >
          {/* Top Bar Controls */}
          <div className="absolute top-4 sm:top-6 inset-x-4 sm:inset-x-8 flex items-center justify-between z-50 pointer-events-none">
            <div className="pointer-events-auto flex items-center gap-3 bg-[#0C1017]/90 backdrop-blur-md border border-[#222B38] px-4 py-2 rounded-full shadow-2xl">
              <span className="text-xs font-black tracking-widest text-brand-gold uppercase">
                {String((activeItemIndex ?? 0) + 1).padStart(2, '0')} / {String(displayItems.length).padStart(2, '0')}
              </span>
              <span className="w-1 h-1 rounded-full bg-cinema-gray-500" />
              <span className="text-[0.65rem] font-bold tracking-wider text-brand-cyan uppercase">
                {activeItem.category}
              </span>
            </div>

            <button
              ref={closeBtnRef}
              type="button"
              onClick={closeModal}
              aria-label="Close modal"
              className="pointer-events-auto w-11 h-11 rounded-full bg-[#0C1017]/90 backdrop-blur-md text-cinema-pure-white text-xl flex items-center justify-center hover:bg-brand-gold hover:text-black hover:border-brand-gold transition-all duration-200 z-50 border border-[#222B38] shadow-2xl"
            >
              &times;
            </button>
          </div>

          {/* Nav Controls: Prev */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              stepImage(-1);
            }}
            aria-label="Previous image"
            className="absolute left-3 sm:left-8 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0C1017]/90 backdrop-blur-md text-cinema-pure-white text-lg flex items-center justify-center hover:bg-brand-gold hover:text-black hover:border-brand-gold hover:shadow-[0_0_20px_rgba(201,168,76,0.35)] transition-all duration-200 z-50 border border-[#222B38]"
          >
            &larr;
          </button>

          {/* Modal Figure */}
          <figure
            className="max-w-5xl w-full flex flex-col items-center justify-center space-y-4 px-2 sm:px-0 pt-12 pb-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] max-h-[75vh] w-full rounded-2xl overflow-hidden border border-[#242E3D] bg-[#0A0D14] flex items-center justify-center shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
              {/* Fallback Graphic */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-[#141B26] via-[#0E131C] to-[#0A0D14]">
                <div className="w-16 h-16 rounded-full bg-brand-gold/10 border border-brand-gold/40 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(201,168,76,0.2)]">
                  <svg className="w-8 h-8 text-brand-gold" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  </svg>
                </div>
                <span className="text-xl sm:text-2xl font-black text-brand-gold uppercase tracking-wider mb-2 drop-shadow-md">
                  {activeItem.caption || activeItem.alt}
                </span>
                <span className="text-xs text-brand-cyan uppercase tracking-widest font-semibold border border-brand-cyan/30 px-3 py-1 rounded-full bg-brand-cyan/10">
                  EVM CINEMAS GALLERY &middot; {activeItem.category}
                </span>
              </div>

              {/* Crystal Clear Lightbox Image */}
              <img
                src={activeItem.imageUrl}
                alt={activeItem.alt}
                className="relative z-10 w-full h-full object-contain brightness-[1.05] contrast-[1.06] saturate-[1.08]"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>

            <figcaption className="text-center space-y-1">
              <h4 className="text-sm sm:text-base font-bold tracking-wider uppercase text-cinema-pure-white">
                {activeItem.caption || activeItem.alt}
              </h4>
              <p className="text-[0.68rem] tracking-widest uppercase text-cinema-gray-400">
                EVM CINEMAS &middot; FORT KOCHI &middot; PRESS ESC TO CLOSE OR &larr; &rarr; TO NAVIGATE
              </p>
            </figcaption>
          </figure>

          {/* Nav Controls: Next */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              stepImage(1);
            }}
            aria-label="Next image"
            className="absolute right-3 sm:right-8 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0C1017]/90 backdrop-blur-md text-cinema-pure-white text-lg flex items-center justify-center hover:bg-brand-gold hover:text-black hover:border-brand-gold hover:shadow-[0_0_20px_rgba(201,168,76,0.35)] transition-all duration-200 z-50 border border-[#222B38]"
          >
            &rarr;
          </button>
        </div>
      )}
    </section>
  );
}
