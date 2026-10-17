import { useMemo, useState } from "react";
import {
  featuredGalleryItems,
  galleryCategories,
  galleryItems,
  referenceGalleryItems,
  type GalleryCategory,
} from "../data/gallery";
import { Lightbox } from "../components/ui/Lightbox";
import { Callout, SectionHeading } from "../components/ui/primitives";
import { Media } from "../components/ui/Media";
import { site } from "../config/site";
import { CtaBand } from "../components/sections/HomeHero";
import { useSeo } from "../hooks/useSeo";

export default function Solutions() {
  useSeo({
    title: "Solutions gallery — solar technologies and installation styles",
    description:
      "A reference gallery of rooftop solar, home batteries, switchboard work, metering and larger-scale generation — with honest labels explaining what each image shows.",
    path: "/solutions",
  });

  const [filter, setFilter] = useState<GalleryCategory | "All">("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const featuredVisible = useMemo(
    () =>
      filter === "All"
        ? featuredGalleryItems
        : featuredGalleryItems.filter((item) => item.category === filter),
    [filter],
  );
  const referenceVisible = useMemo(
    () =>
      filter === "All"
        ? referenceGalleryItems
        : referenceGalleryItems.filter((item) => item.category === filter),
    [filter],
  );
  /** One lightbox across both tiers; featured images come first. */
  const visible = useMemo(() => [...featuredVisible, ...referenceVisible], [featuredVisible, referenceVisible]);

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__inner">
          <p className="eyebrow">Solutions gallery</p>
          <h1>What solar, storage and electrification look like in practice.</h1>
          <p className="lede">
            A visual reference for the technologies we design around: rooftop arrays, wall-mounted
            batteries, switchboard work, metering and the larger-scale generation that shapes the
            market you buy from.
          </p>
          <div className="page-hero__meta">
            <span>{galleryItems.length} reference images</span>
            <span>Filter by technology</span>
            <span>Click any image to enlarge</span>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="gallery-title">
        <div className="container">
          <div className="stack" style={{ gap: "var(--space-5)" }}>
            <Callout title="These are reference images, not our portfolio" tone="info">
              <p>
                The images below illustrate typical technologies, layouts and installation
                situations. They are not photographs of Solvanta customer installations, and we do
                not present them as case studies or as evidence of completed work.{" "}
                {site.company.teamIntro ||
                  "When a verified project portfolio is available it will be published here with the property owner's permission."}
              </p>
            </Callout>
          </div>

          <div style={{ marginTop: "var(--space-7)" }}>
            <SectionHeading
              eyebrow="Featured photographs"
              title={<span id="gallery-title">Location-verified systems worth a closer look.</span>}
              lede="Real Australian rooftops with the place they sit on written down — the settings, roof types and scales the design work has to handle."
            />
          </div>

          <div className="showcase" style={{ marginTop: "var(--space-6)" }}>
            {featuredVisible.map((item, index) => (
              <button
                type="button"
                key={item.id}
                className={`showcase__item${filter === "All" && index === 0 ? " showcase__item--lead" : ""}`}
                onClick={() => setLightboxIndex(index)}
              >
                <div className="showcase__media">
                  <Media
                    src={item.src}
                    alt={item.alt}
                    sizes={filter === "All" && index === 0 ? "(min-width: 1000px) 90vw, 100vw" : "(min-width: 1000px) 50vw, 100vw"}
                  />
                </div>
                <span className="showcase__caption">
                  <span className="gallery__cat">{item.category}</span>
                  <span className="showcase__title">{item.title}</span>
                  <span className="gallery__note">{item.caption}</span>
                </span>
              </button>
            ))}
          </div>

          <div style={{ marginTop: "var(--space-8)" }}>
            <SectionHeading
              eyebrow="Technical reference"
              title={<span id="reference-title">Equipment, technique and process.</span>}
              lede="The detail shots behind the design decisions — filter by the part of the system you are weighing up."
            />
            <div className="tabs" role="group" aria-label="Filter images by category" style={{ marginTop: "var(--space-5)" }}>
              <button
                type="button"
                className="tab"
                aria-pressed={filter === "All"}
                onClick={() => setFilter("All")}
              >
                All ({galleryItems.length})
              </button>
              {galleryCategories.map((category) => {
                const count = galleryItems.filter((item) => item.category === category).length;
                if (count === 0) return null;
                return (
                  <button
                    type="button"
                    className="tab"
                    key={category}
                    aria-pressed={filter === category}
                    onClick={() => setFilter(category)}
                  >
                    {category} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          <div className="gallery" style={{ marginTop: "var(--space-6)" }}>
            {referenceVisible.map((item, index) => (
              <button
                type="button"
                key={item.id}
                className={`gallery__item gallery__item--${item.size ?? "std"}`}
                onClick={() => setLightboxIndex(featuredVisible.length + index)}
              >
                <Media src={item.src} alt={item.alt} />
                <span className="gallery__caption">
                  <span className="gallery__cat">{item.category}</span>
                  <span className="gallery__title">{item.title}</span>
                  <span className="gallery__note">{item.caption}</span>
                </span>
              </button>
            ))}
          </div>

          {visible.length === 0 && (
            <div className="result-empty" style={{ marginTop: "var(--space-6)" }}>
              <p>No images in this category yet. Choose another filter to see more.</p>
            </div>
          )}
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="gallery-notes">
        <div className="container">
          <SectionHeading
            eyebrow="Reading the gallery"
            title={<span id="gallery-notes">Three things these images should tell you</span>}
            lede="Aesthetics matter less than the decisions behind them — but the decisions are visible if you know where to look."
          />
          <div className="grid-3" style={{ marginTop: "var(--space-6)" }}>
            <div className="value-block">
              <h3>Layout follows the roof, not a template</h3>
              <p>
                Arrays are shaped around vents, valleys and shading rather than forced into a
                rectangle. A neat layout is usually easier to service and less likely to be
                compromised by a late change.
              </p>
            </div>
            <div className="value-block">
              <h3>Storage placement is a design decision</h3>
              <p>
                Battery location affects temperature, ventilation, cable runs and clearance
                compliance. A garage wall beside the switchboard is common for good reasons — but it
                is not the only option.
              </p>
            </div>
            <div className="value-block">
              <h3>The electrical work is the invisible half</h3>
              <p>
                Switchboard capacity, protection and isolation are what make the rest safe. It is the
                least photogenic part of an installation and the part that is hardest to fix later.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="glossary-title">
        <div className="container">
          <SectionHeading
            eyebrow="Component glossary"
            title={<span id="glossary-title">The parts behind the pictures.</span>}
            lede="Captions name components; this is what each one actually does — useful when two quotes disagree about specifications, and when they agree on price."
          />
          <div className="grid-2" style={{ marginTop: "var(--space-6)" }}>
            <div className="value-block">
              <h3>Solar module (the panel)</h3>
              <p>
                Converts sunlight into DC electricity. Wattage, cell technology and build quality
                vary between modules, and total system output depends on all of them — plus layout,
                orientation and how the inverter is matched.
              </p>
            </div>
            <div className="value-block">
              <h3>Mounting system</h3>
              <p>
                Rails, clamps, roof hooks or ballast. This is what holds the array against wind and
                weather; how roof penetrations are flashed and sealed is decided here, and it is
                among the least visible quality differences between quotes.
              </p>
            </div>
            <div className="value-block">
              <h3>Inverter</h3>
              <p>
                Converts panel DC into household AC. String, hybrid or micro-inverter — and in a
                hybrid, the unit that couples array, battery and grid. It is usually the first major
                component to need attention or replacement.
              </p>
            </div>
            <div className="value-block">
              <h3>Battery</h3>
              <p>
                Stores energy for later use. Capacity in kilowatt hours says how much it can hold;
                power in kilowatts says how fast it can deliver. Two different numbers — a large
                battery with modest power may not run the appliances you have in mind.
              </p>
            </div>
            <div className="value-block">
              <h3>Switchboard</h3>
              <p>
                The building's distribution point. Circuit capacity, protection devices, isolation
                and the new solar circuits all land here. The state and age of the switchboard
                constrains what can be installed before anything reaches the roof.
              </p>
            </div>
            <div className="value-block">
              <h3>Metering</h3>
              <p>
                Measures electricity imported from and exported to the grid. A smart meter configured
                for solar is what makes exports visible, enables time-of-use decisions and keeps
                billing accurate.
              </p>
            </div>
            <div className="value-block">
              <h3>Monitoring</h3>
              <p>
                The reporting layer: generation, consumption and battery flows over time. It is both
                a reassurance tool and the first diagnostic when something changes — which is why a
                system without working monitoring is only half installed.
              </p>
            </div>
            <div className="value-block">
              <h3>System design and approvals</h3>
              <p>
                Layout drawings, string plans, network applications and compliance documentation. On
                a solar job, "planning" means design and connection approval — not town planning —
                and it happens before anyone books an installation date.
              </p>
            </div>
          </div>
        </div>
      </section>

      {site.features.lightbox && lightboxIndex !== null && (
        <Lightbox
          items={visible}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}

      <CtaBand
        title="Want a layout designed for your actual roof?"
        body="Send us a photo of the roof and the switchboard, and we will tell you what is possible before anyone sets foot on site."
      />
    </>
  );
}
