/**
 * Solutions gallery.
 * ---------------------------------------------------------------------------
 * HONESTY NOTE: these are reference images showing common technologies and
 * installation styles — not a portfolio of completed customer installations.
 * If a verified project portfolio becomes available, replace the entries here
 * and update the page copy in `src/pages/Solutions.tsx`.
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

export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  title: string;
  caption: string;
  category: GalleryCategory;
  /** Layout weight in the gallery grid. */
  size?: "wide" | "tall" | "std";
};

export const galleryCategories: GalleryCategory[] = [
  "Rooftop solar",
  "Battery storage",
  "Installation",
  "Metering & monitoring",
  "Larger scale",
  "Electrification",
];

export const galleryItems: GalleryItem[] = [
  {
    id: "rooftops",
    src: asset("/images/rooftop-solar-home.webp"),
    alt: "Solar panel arrays covering the pitched roofs of neighbouring suburban houses under a clear blue sky",
    title: "Rooftop solar across a suburban street",
    caption:
      "Modern all-black panels laid out to follow the roof planes, keeping the streetscape clean and the array easy to service.",
    category: "Rooftop solar",
    size: "wide",
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
  },
  {
    id: "panel-detail",
    src: asset("/images/solar-panel-macro.webp"),
    alt: "Close-up of the cell grid and busbars on the surface of a modern solar panel",
    title: "Panel construction up close",
    caption:
      "Cell spacing, busbars and glass quality vary between modules — a reason specification matters more than panel count alone.",
    category: "Rooftop solar",
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
  },
  {
    id: "roof-array",
    src: asset("/images/solar-panels-roof-rows.webp"),
    alt: "Solar panels covering pitched terracotta-tiled roofs with brick chimneys, seen across neighbouring houses",
    title: "A roof-filling array",
    caption:
      "Where roof area is generous, a larger array can cover daytime loads and still leave surplus for storage or export.",
    category: "Rooftop solar",
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
  },
  {
    id: "ground-mount",
    src: asset("/images/solar-energy-field.webp"),
    alt: "A long row of ground-mounted solar panels set in grass under an overcast sky",
    title: "Ground-mounted arrays",
    caption:
      "Where roof space is unsuitable, ground mounting can achieve better tilt and orientation for the same module count.",
    category: "Rooftop solar",
  },
  {
    id: "metering",
    src: asset("/images/electricity-meter.webp"),
    alt: "A row of electricity meters mounted on a wall in a multi-dwelling building",
    title: "Metering and tariffs",
    caption:
      "A smart meter with the right tariff configuration is what makes self-consumption measurable — and worth optimising.",
    category: "Metering & monitoring",
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
  },
  {
    id: "architecture",
    src: asset("/images/modern-home-1.webp"),
    alt: "Angled view of the clean exterior of a contemporary home with deep eaves and large glazing",
    title: "Design-led homes",
    caption:
      "Good solar design works with architecture: eave shading, roof planes and appliance choices all interact with the system.",
    category: "Rooftop solar",
    size: "tall",
  },
  {
    id: "daylight",
    src: asset("/images/sunlight-window.webp"),
    alt: "Daylight passing through a window and casting a grid of light and shadow across an interior wall",
    title: "Daylight, measured",
    caption:
      "The grid of light on a wall is a reminder of the physics: usable energy arrives in daylight hours, so timing is everything.",
    category: "Metering & monitoring",
  },
  {
    id: "installer-at-work",
    src: asset("/images/hero-rooftop-install.webp"),
    alt: "Solar installer in safety glasses and gloves lifting a solar panel into position on a tiled roof",
    title: "Panels in position",
    caption:
      "Two people, gloves, glasses and a plan — installing panels is a team task with a specific sequence.",
    category: "Installation",
  },
];
