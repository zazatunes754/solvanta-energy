import { CtaBand, HomeHero } from "../components/sections/HomeHero";
import {
  AustralianHomes,
  GalleryPreview,
  Independence,
  ProcessSection,
  Proposition,
} from "../components/sections/HomeValue";
import {
  BatterySection,
  IncentivesSection,
  ServicesPreview,
} from "../components/sections/HomeOffer";
import {
  ComponentGuide,
  CostAndSavings,
  DecisionPaths,
  HowSolarWorks,
  ProsAndCons,
} from "../components/sections/HomeLearn";
import {
  EstimatorPreview,
  FaqPreview,
  KnowledgePreview,
} from "../components/sections/HomeEngage";
import { organisationStructuredData, useSeo } from "../hooks/useSeo";
import { site } from "../config/site";

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
      <ComponentGuide />
      <BatterySection />
      <Independence />
      <ProcessSection />
      <IncentivesSection />
      <CostAndSavings />
      <ProsAndCons />
      <GalleryPreview />
      <KnowledgePreview />
      <FaqPreview />
      <DecisionPaths />
      <CtaBand />
    </>
  );
}
