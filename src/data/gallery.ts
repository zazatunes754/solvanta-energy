/**
 * Solutions gallery.
 * ---------------------------------------------------------------------------
 * HONESTY NOTE: these are reference images showing common technologies and
 * installation styles — not a portfolio of completed customer installations.
 * If a verified project portfolio becomes available, replace the entries here
 * and update the page copy in `src/pages/Solutions.tsx`.
 *
 * Two tiers:
 * - `featured`: premium location-verified Australian photography, shown large
 *   at the top of the gallery with location and licence credits visible.
 * - `reference`: the technical library — equipment, technique and process
 *   shots presented at gallery scale.
 * ---------------------------------------------------------------------------
 */

import { asset } from "../lib/asset";

export type GalleryCategory =
  | "Rooftop solar"
  | "Battery storage"
  | "Installation"
  | "Metering & monitoring"
  | "Larger scale"
  | "Electrification";

export type GalleryTier = "featured" | "reference";

export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  title: string;
  caption: string;
  category: GalleryCategory;
  /** Layout weight in the gallery grid. */
  size?: "wide" | "tall" | "std";
  /** Showcase tier: featured images render large with location credits. */
  tier: GalleryTier;
};

export const galleryCategories: GalleryCategory[] = [
  "Rooftop solar",
  "Battery storage",
  "Installation",
  "Metering & monitoring",
  "Larger scale",
  "Electrification",
];

export const featuredGalleryItems: GalleryItem[] = [
  {
    id: "rooftops",
    src: asset("/images/canberra-solar-street-grid.jpg"),
    alt: "Straight-down aerial view of a Canberra suburban street where most roofs carry photovoltaic solar arrays",
    title: "A street where solar is the norm",
    caption:
      "Suburban Canberra, ACT. Australia leads the world in rooftop solar penetration per capita — and streets like this show what that looks like from above. Photograph: Benlisquare, Wikimedia Commons, CC BY-SA 4.0.",
    category: "Rooftop solar",
    tier: "featured",
  },
  {
    id: "corinda",
    src: asset("/images/brisbane-corinda-queenslander-solar.jpg"),
    alt: "Traditional Queenslander house in Corinda, Brisbane with solar panels mounted across its corrugated iron roof",
    title: "Solar on a classic Queenslander",
    caption:
      "Corinda, Brisbane QLD. Older home styles take solar well — the mounting method changes for corrugated iron, but the design principles do not. Photograph: Kgbo, Wikimedia Commons, CC BY-SA 4.0.",
    category: "Rooftop solar",
    tier: "featured",
  },
  {
    id: "kawana-street",
    src: asset("/images/kawana-pacific-boulevard-array.jpg"),
    alt: "Coastal street at Kawana Waters with solar panels on the roof of a mid-century home among newer houses",
    title: "A coastal roofscape in mix and match",
    caption:
      "Buddina, Kawana Waters QLD. Post-war homes, duplexes and new builds share one street — each roof gets its own array decision. Photograph: -wuppertaler, Wikimedia Commons, CC BY 4.0.",
    category: "Rooftop solar",
    tier: "featured",
  },
  {
    id: "canberra-hero",
    src: asset("/images/canberra-solar-suburb-hero.jpg"),
    alt: "Angled aerial view over a Canberra suburb with solar arrays across tiled and metal roof planes",
    title: "Arrays following the roof planes",
    caption:
      "Canberra, ACT. Layout follows the existing roof geometry — multiple planes, setbacks and hips, each treated on its own merits. Photograph: Benlisquare, Wikimedia Commons, CC BY-SA 4.0.",
    category: "Rooftop solar",
    tier: "featured",
  },
  {
    id: "sydney-commercial",
    src: asset("/images/sydney-commercial-rooftop-solar.jpg"),
    alt: "Commercial rooftop solar array in inner Sydney with city high-rises behind it",
    title: "Commercial solar, inner city",
    caption:
      "Cumberland Street, Sydney NSW. Commercial roofs with long daytime loads are where self-consumed solar does its best work. Photograph: -wuppertaler, Wikimedia Commons, CC BY 4.0.",
    category: "Larger scale",
    tier: "featured",
  },
  {
    id: "kawana-metal-roof",
    src: asset("/images/kawana-pacific-boulevard-metal-roof.jpg"),
    alt: "White beachside house at Kawana Waters with solar panels on its low-pitch corrugated metal roof",
    title: "Low-pitch metal, beachside air",
    caption:
      "Buddina, Kawana Waters QLD. Corrugated metal on a low pitch is common near the coast — mounting, drainage and corrosion resistance are the design questions here. Photograph: -wuppertaler, Wikimedia Commons, CC BY 4.0.",
    category: "Rooftop solar",
    tier: "featured",
  },
  {
    id: "solar-car-park",
    src: asset("/images/castle-plaza-commercial-solar-car-park.jpg"),
    alt: "Large solar car park shade structure covered in photovoltaic panels at a shopping centre in Adelaide",
    title: "Solar shade over a car park",
    caption:
      "Castle Plaza, Edwardstown SA. Car park canopies turn unused paved land into shaded parking and generation at the same time. Photograph: Flicker02, Wikimedia Commons, CC BY-SA 4.0.",
    category: "Larger scale",
    tier: "featured",
  },
];

export const referenceGalleryItems: GalleryItem[] = [
  {
    id: "canberra-backyards",
    src: asset("/images/canberra-solar-homes-aerial.jpg"),
    alt: "Top-down aerial view of four Canberra homes with rooftop solar arrays and backyard swimming pools",
    title: "Different houses, different designs",
    caption:
      "Canberra, ACT. Tile and metal roofs, small and large arrays, each sized to the household's consumption rather than the block's boundaries.",
    category: "Rooftop solar",
    tier: "reference",
  },
  {
    id: "kawana",
    src: asset("/images/kawana-residential-solar.jpg"),
    alt: "Two-storey modern home at Kawana Waters, Sunshine Coast, with solar panels across its upper roof",
    title: "Two-storey home, coastal sun",
    caption:
      "Kawana Waters, QLD. Second-storey roofs often get the cleanest sun — and the wind loads to go with it.",
    category: "Rooftop solar",
    tier: "reference",
  },
  {
    id: "solar-car-park-aerial",
    src: asset("/images/australian-commercial-solar-car-park-aerial.jpg"),
    alt: "Aerial view of a long solar car park shade structure made of photovoltaic panels in Australia",
    title: "Car park canopy from above",
    caption:
      "A commercial solar shade structure in Australia — the same modules, tilt and spacing logic as a ground-mount array, raised one storey.",
    category: "Larger scale",
    tier: "reference",
  },
  {
    id: "battery-wall",
    src: asset("/images/home-battery-wall.webp"),
    alt: "Two modular home battery units mounted on a wall below an inverter and beside a switchboard in a garage",
    title: "Modular battery beside the switchboard",
    caption:
      "Stacked battery modules with the inverter above — a tidy layout that keeps cable runs short and clearances compliant.",
    category: "Battery storage",
    size: "tall",
    tier: "reference",
  },
  {
    id: "panel-detail",
    src: asset("/images/solar-panel-macro.webp"),
    alt: "Close-up of the cell grid and busbars on the surface of a modern solar panel",
    title: "Panel construction up close",
    caption:
      "Cell spacing, busbars and glass quality vary between modules — a reason specification matters more than panel count alone.",
    category: "Rooftop solar",
    tier: "reference",
  },
  {
    id: "install-crew",
    src: asset("/images/install-crew-panels.webp"),
    alt: "Installer kneeling on a metal roof wiring a solar panel with hand tools and cable coiled nearby",
    title: "Wiring and clamping on the roof",
    caption:
      "Mounting hardware, cable management and torque settings on the roof determine long-term reliability far more than they are talked about.",
    category: "Installation",
    size: "wide",
    tier: "reference",
  },
  {
    id: "roof-array",
    src: asset("/images/solar-panels-roof-rows.webp"),
    alt: "Solar panels covering pitched terracotta-tiled roofs with brick chimneys, seen across neighbouring houses",
    title: "A roof-filling array",
    caption:
      "Where roof area is generous, a larger array can cover daytime loads and still leave surplus for storage or export.",
    category: "Rooftop solar",
    tier: "reference",
  },
  {
    id: "electrician",
    src: asset("/images/electrician-work.webp"),
    alt: "Technician's hands working on wiring with a tool inside an open electrical control cabinet",
    title: "Switchboard work",
    caption:
      "Switchboard capacity, circuit protection and correct isolation are part of every installation — not optional extras.",
    category: "Installation",
    size: "tall",
    tier: "reference",
  },
  {
    id: "aerial-farm",
    src: asset("/images/solar-farm-aerial.webp"),
    alt: "Aerial photograph looking down on long rows of solar panels built across open ground",
    title: "Utility-scale generation",
    caption:
      "Large-scale solar shapes the wholesale market that sits behind your feed-in tariff — the reason export rates move.",
    category: "Larger scale",
    size: "wide",
    tier: "reference",
  },
  {
    id: "ground-mount",
    src: asset("/images/solar-energy-field.webp"),
    alt: "A long row of ground-mounted solar panels set in grass under an overcast sky",
    title: "Ground-mounted arrays",
    caption:
      "Where roof space is unsuitable, ground mounting can achieve better tilt and orientation for the same module count.",
    category: "Larger scale",
    tier: "reference",
  },
  {
    id: "metering",
    src: asset("/images/australian-battery-switchboard.jpg"),
    alt: "Australian residential switchboard upgraded to integrate a solar inverter and home battery storage",
    title: "Switchboard, upgraded",
    caption:
      "Residential switchboard integrating grid supply, a rooftop solar inverter and battery storage — the electrical work behind every storage system, and one of the parts hardest to retrofit later. Photograph: DezzignProtect, Wikimedia Commons, CC BY-SA 4.0.",
    category: "Metering & monitoring",
    size: "tall",
    tier: "reference",
  },
  {
    id: "ev-charging",
    src: asset("/images/ev-charging-home.webp"),
    alt: "Close-up of a charging cable plugged into the charge port of an electric vehicle",
    title: "Solar and electric vehicles",
    caption:
      "Charging during the middle of the day turns generation into kilometres rather than low-value exports.",
    category: "Electrification",
    size: "wide",
    tier: "reference",
  },
  {
    id: "canberra-rooftops",
    src: asset("/images/canberra-solar-rooftops-aerial.jpg"),
    alt: "Aerial view of adjacent Canberra homes whose roofs all carry different solar array layouts",
    title: "Neighbouring arrays compared",
    caption:
      "Canberra, ACT. Four similar houses, four different layouts — each shaped by orientation, shade and consumption rather than a template.",
    category: "Rooftop solar",
    tier: "reference",
  },
  {
    id: "daylight",
    src: asset("/images/sunlight-window.webp"),
    alt: "Daylight passing through a window and casting a grid of light and shadow across an interior wall",
    title: "Daylight, measured",
    caption:
      "The grid of light on a wall is a reminder of the physics: usable energy arrives in daylight hours, so timing is everything.",
    category: "Metering & monitoring",
    tier: "reference",
  },
  {
    id: "installer-at-work",
    src: asset("/images/hero-rooftop-install.webp"),
    alt: "Solar installer in safety glasses and gloves lifting a solar panel into position on a tiled roof",
    title: "Panels in position",
    caption:
      "Two people, gloves, glasses and a plan — installing panels is a team task with a specific sequence.",
    category: "Installation",
    tier: "reference",
  },
];

/** All items, featured first — the order visitors see with no filter applied. */
export const galleryItems: GalleryItem[] = [...featuredGalleryItems, ...referenceGalleryItems];
