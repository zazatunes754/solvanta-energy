# Asset sources and licensing

Every image on the site is a real photograph, downloaded into `public/images/`
and served locally (no hot-linking). Sources, licences and credits are
documented below.

## Photography — Pexels licence

All photographs are from [Pexels](https://www.pexels.com) and are used under
the [Pexels licence](https://www.pexels.com/license/), which allows free use,
including commercial use, without attribution. Credits are recorded here anyway
so the source of every file can be traced and re-verified.

Files were downloaded from the Pexels image CDN and requested in WebP format
(`&fm=webp`), then visually reviewed before use. Images that did not fit the
site's tone or accuracy standards were rejected and deleted — nothing in the
table below is a placeholder.

| File (in `public/images/`) | Subject | Pexels photo | Photographer | Photo page |
| --- | --- | --- | --- | --- |
| `rooftop-solar-home.webp` | Rooftop solar across suburban houses (Belgium) | 12224996 | Budget Bizar | https://www.pexels.com/photo/solar-panels-installed-on-roofs-12224996/ |
| `hero-rooftop-install.webp` | Installer lifting a panel into position | 9875418 | Kindel Media | https://www.pexels.com/photo/a-man-installing-solar-panel-9875418/ |
| `home-battery-wall.webp` | Residential battery/inverter equipment mounted on a wall | 37929911 | Magda Ehlers | https://www.pexels.com/photo/high-efficiency-residential-power-inverter-setup-37929911/ |
| `install-crew-panels.webp` | Technician working on roof-mounted panels with tools | 30285845 | Pexels User (contributor handle) | https://www.pexels.com/photo/technician-installing-solar-panels-on-rooftop-30285845/ |
| `electricity-meter.webp` | Row of electricity meters on a wall | 11924298 | Connor Scott McManus | https://www.pexels.com/photo/row-of-electricity-meters-11924298/ |
| `sunlight-window.webp` | Daylight through a window casting a grid of shadows | 35523270 | Letícia Alvares | https://www.pexels.com/photo/sunlight-casting-window-shadows-on-wall-indoors-35523270/ |
| `solar-farm-aerial.webp` | Aerial view directly above a solar farm | 9893731 | Tom Fisk | https://www.pexels.com/photo/directly-above-solar-farm-9893731/ |
| `ev-charging-home.webp` | Electric vehicle plugged into a charger | 9799743 | Kindel Media | https://www.pexels.com/photo/charging-of-a-vehicle-i-9799743/ |
| `modern-home-1.webp` | Contemporary home exterior with large glazing | 19344325 | Mido Makasardi | https://www.pexels.com/photo/exterior-of-a-building-19344325/ |
| `electrician-work.webp` | Technician working on wiring inside an electrical control panel | 33694019 | Bulat843 | https://www.pexels.com/photo/technician-working-on-electrical-control-panel-33694019/ |
| `solar-panel-macro.webp` | Close-up of the cell grid and busbars of a solar panel | 8853509 | Los Muertos Crew | https://www.pexels.com/photo/close-up-photo-of-a-solar-panel-8853509/ |
| `solar-panels-roof-rows.webp` | Solar panels on tiled roofs with chimneys | 38021376 | Lena Netkach | https://www.pexels.com/photo/solar-panels-on-tiled-roofs-in-residential-area-38021376/ |
| `solar-energy-field.webp` | Row of ground-mounted panels in a grassy field | 13989282 | Tom Fisk | https://www.pexels.com/photo/blue-tile-floors-on-grass-13989282/ |
| `social-card.jpg` | Social sharing image (1.91:1 crop of photo 12224996) | 12224996 | Budget Bizar | https://www.pexels.com/photo/solar-panels-installed-on-roofs-12224996/ |

## Site artwork

| File | Description | Licensing |
| --- | --- | --- |
| `public/favicon.svg` | Original vector "sun over horizon" mark drawn for this project | Original work — © the site owner |
| `src/components/ui/SocialIcons.tsx` | Facebook, Instagram, LinkedIn and YouTube glyphs | Path data from [Simple Icons](https://simpleicons.org) — CC0 1.0 |

## What is deliberately *not* here

- **No portfolio photography presented as our work.** The solutions gallery is
  labelled as reference imagery, not completed customer installations
  (`src/data/gallery.ts` and the solutions page carry this note).
- **No team photos, logos or branding of real businesses** on any page.
- **No AI-generated imagery.**

## Re-downloading an image

Pexels image URLs follow the pattern
`https://images.pexels.com/photos/{id}/pexels-photo-{id}.jpeg?auto=compress&cs=tinysrgb&w=1600&fm=webp`.
For example, to refresh the hero image:

```powershell
Invoke-WebRequest -Uri "https://images.pexels.com/photos/12224996/pexels-photo-12224996.jpeg?auto=compress&cs=tinysrgb&w=1600&fm=webp" -OutFile "public\images\rooftop-solar-home.webp"
```

After replacing any image, check the `alt` text (in `src/data/gallery.ts`,
`src/data/services.ts`, `src/data/articles.ts` and the page components) still
describes the photo accurately — accessibility depends on it.

## Fonts

The site loads **Fraunces**, **Manrope** and **JetBrains Mono** from Google
Fonts (all under the SIL Open Font License). If you prefer zero
third-party requests at runtime, self-host the font files and update the
`<link>` tags in `index.html` — the font stack in
`src/styles/tokens.css` already falls back to system fonts.
