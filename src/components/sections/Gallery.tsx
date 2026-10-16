'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import type { GalleryItem } from '@/types';
import { getGalleryItems } from '@/lib/api/cinema-service';
import { SectionHeader } from '@/components/ui/SectionHeader';

// Asymmetric masonry grid span classes matching reference layout
const MASONRY_SPANS = [
  'col-span-1 md:col-span-2 row-span-2', // Large feature card left
  'col-span-1 md:col-span-1 row-span-1', // Top middle card
  'col-span-1 md:col-span-1 row-span-2', // Tall right card
  'col-span-1 md:col-span-1 row-span-1', // Bottom middle card
  'col-span-1 md:col-span-2 row-span-1', // Wide lower card
  'col-span-1 md:col-span-2 row-span-1', // Wide bottom card
];

export function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    getGalleryItems().then(setItems).catch(() => setItems([]));
  }, []);

  const closeModal = useCallback(() => setActiveItemIndex(null), []);
  
  const stepImage = useCallback(
    (direction: number) => {
      setActiveItemIndex((idx) => {
        if (idx === null) return idx;
        return (idx + direction + items.length) % items.length;
      });
    },
    [items.length]
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

  const activeItem = activeItemIndex !== null ? items[activeItemIndex] : null;

  return (
    <section
      id="gallery"
      className="relative bg-[#060709] border-t border-[#1E2631] py-16 sm:py-24 px-4 sm:px-6 lg:px-10 overflow-hidden"
      aria-label="Gallery"
    >
      <div className="max-w-[1400px] mx-auto space-y-10 sm:space-y-14">
        {/* Section Header */}
        <SectionHeader
          number="08"
          eyebrowText="GALLERY"
          titleWhite="INSIDE"
          titleGold="EVM CINEMAS."
        />

        {/* Asymmetric Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[160px] sm:auto-rows-[200px] gap-4 sm:gap-5 grid-flow-dense">
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveItemIndex(index)}
              className={`group relative overflow-hidden rounded-xl border border-[#1E2631] bg-gradient-to-br from-[#141B26] via-[#0E131C] to-[#0A0D14] transition-all duration-300 hover:border-brand-gold/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold ${
                MASONRY_SPANS[index % MASONRY_SPANS.length]
              }`}
              aria-label={`View ${item.caption || item.alt}`}
            >
              {/* Image element if valid URL provided */}
              <img
                src={item.imageUrl}
                alt={item.alt}
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Abstract Architectural & Cinema Pattern Graphic (Renders seamlessly as design placeholder background) */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25 group-hover:opacity-40 transition-opacity duration-300">
                <svg className="w-full h-full text-brand-gold/30" viewBox="0 0 400 300" fill="none" preserveAspectRatio="xMidYMid slice">
                  <path d="M-50 350 L200 -50 L450 350" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                  <circle cx="200" cy="150" r="90" stroke="currentColor" strokeWidth="0.75" />
                  <circle cx="200" cy="150" r="130" stroke="currentColor" strokeWidth="0.5" strokeDasharray="6 6" />
                  <path d="M0 75 L400 225 M0 225 L400 75" stroke="currentColor" strokeWidth="0.5" />
                </svg>
              </div>

              {/* Gradient Overlay & Content Container */}
              <div className="absolute inset-0 flex flex-col justify-between p-5 text-left bg-gradient-to-t from-[#06080D]/95 via-[#06080D]/50 to-transparent">
                <div className="flex justify-between items-center z-10">
                  <span className="text-[0.55rem] font-bold tracking-[0.25em] uppercase text-brand-cyan/80 bg-black/40 px-2 py-0.5 rounded border border-brand-cyan/20">
                    EVM ARCHITECTURE
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-gold shadow-[0_0_8px_#C9A84C]" />
                </div>

                <div className="z-10">
                  <span className="block text-[0.62rem] font-bold tracking-widest text-brand-gold uppercase mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-cinema-pure-white uppercase tracking-wider line-clamp-2 drop-shadow-md">
                    {item.caption || item.alt}
                  </h3>
                </div>
              </div>

              {/* Hover Glow Accent */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-cyan/10 via-transparent to-brand-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.caption || activeItem.alt}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fade-in"
          onClick={closeModal}
        >
          <button
            ref={closeBtnRef}
            type="button"
            onClick={closeModal}
            aria-label="Close modal"
            className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 text-cinema-pure-white text-xl flex items-center justify-center hover:bg-white/20 transition-colors z-50 border border-white/20"
          >
            &times;
          </button>

          {/* Nav Controls */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              stepImage(-1);
            }}
            aria-label="Previous image"
            className="absolute left-4 sm:left-8 w-11 h-11 rounded-full bg-white/10 text-cinema-pure-white text-lg flex items-center justify-center hover:bg-white/20 transition-colors z-50 border border-white/20"
          >
            &larr;
          </button>

          <figure
            className="max-w-4xl w-full flex flex-col items-center justify-center space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-[#1E2631] bg-[#0A0D14] flex items-center justify-center shadow-2xl">
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
              <img
                src={activeItem.imageUrl}
                alt={activeItem.alt}
                className="relative z-10 w-full h-full object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>

            <figcaption className="text-xs sm:text-sm font-bold tracking-wider uppercase text-cinema-gray-300 text-center">
              {activeItem.caption}
            </figcaption>
          </figure>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              stepImage(1);
            }}
            aria-label="Next image"
            className="absolute right-4 sm:right-8 w-11 h-11 rounded-full bg-white/10 text-cinema-pure-white text-lg flex items-center justify-center hover:bg-white/20 transition-colors z-50 border border-white/20"
          >
            &rarr;
          </button>
        </div>
      )}
    </section>
  );
}
