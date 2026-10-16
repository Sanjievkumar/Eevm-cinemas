import { Hero } from '@/components/sections/Hero';
import { NowShowing } from '@/components/sections/NowShowing';
import { ComingSoon } from '@/components/sections/ComingSoon';
import { MoreThanAMovie } from '@/components/sections/MoreThanAMovie';
import { TwoScreens } from '@/components/sections/TwoScreens';
import { LegacySection } from '@/components/sections/LegacySection';
import { LocationSection } from '@/components/sections/LocationSection';
import { Gallery } from '@/components/sections/Gallery';
import { Contact } from '@/components/sections/Contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <NowShowing />
      <ComingSoon />
      <MoreThanAMovie />
      <TwoScreens />
      <LegacySection />
      <LocationSection />
      <Gallery />
      <Contact />
    </>
  );
}
