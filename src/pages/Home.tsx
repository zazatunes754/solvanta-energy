import { CtaBand, HomeHero } from "../components/sections/HomeHero";
import {
  AustralianHomes,
  GalleryPreview,
  ProcessSection,
  Proposition,
  StorageAndIndependence,
} from "../components/sections/HomeValue";
import { IncentivesSection, ServicesPreview } from "../components/sections/HomeOffer";
import { CostAndSavings, DecisionPaths, HowSolarWorks } from "../components/sections/HomeLearn";
import { EstimatorPreview, KnowledgePreview } from "../components/sections/HomeEngage";
import { organisationStructuredData, useSeo } from "../hooks/useSeo";
import { site } from "../config/site";

/**
 * Homepage structure — 14 sections, each with a distinct job:
 *   hero → proposition → services → estimator → homes → how it works
 *   → storage → process → incentives → honest numbers → gallery
 *   → knowledge & FAQ → decision paths → closing CTA.
 * Formerly overlapping sections (components, battery, independence, FAQ,
 * pros-and-cons) are merged into their parent sections to keep the page
 * rhythm tight without dropping any of the content.
 */
export default function Home() {
  useSeo({
    title: `${site.brand.name} — ${site.brand.tagline}`,
    description:
      "Solar, battery and hybrid energy systems for Australian homes and businesses. How solar works, what system size fits, transparent estimates with published assumptions, and incentive information verified against official sources.",
    path: "/",
    structuredData: organisationStructuredData(),
  });

  return (
    <>
      <HomeHero />
      <Proposition />
      <ServicesPreview />
      <EstimatorPreview />
      <AustralianHomes />
      <HowSolarWorks />
      <StorageAndIndependence />
      <ProcessSection />
      <IncentivesSection />
      <CostAndSavings />
      <GalleryPreview />
      <KnowledgePreview />
      <DecisionPaths />
      <CtaBand />
    </>
  );
}
