import { Hero } from '@/components/sections/Hero';
import { NowShowing } from '@/components/sections/NowShowing';
import { MoreThanAMovie } from '@/components/sections/MoreThanAMovie';
import { TwoScreens } from '@/components/sections/TwoScreens';
import { LegacySection } from '@/components/sections/LegacySection';
import { FounderSection } from '@/components/sections/FounderSection';
import { Gallery } from '@/components/sections/Gallery';
import { Contact } from '@/components/sections/Contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <NowShowing />
      <MoreThanAMovie />
      <TwoScreens />
      <LegacySection />
      <FounderSection />
      <Gallery />
      <Contact />
    </>
  );
}
