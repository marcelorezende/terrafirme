# TerraFirme

Visual identity, website, and the **Network Channels** interaction-graph for
**TerraFirme** — a restoration-science initiative mapping and restoring the
ecosystem networks of the Cantabrian Mixed Forests, and home of *The Future
Farmer*.

> Every living thing is a node. Restoration is rebuilding the edges.

---

## Quick start

These pages use a small client-side runtime and load a few components over
`fetch`, so **serve the folder over HTTP** rather than opening files directly
(`file://` blocks the component fetches).

```bash
# from inside this folder
python3 -m http.server 8000
# then open http://localhost:8000/
```

Or just push to **GitHub Pages** (Settings → Pages → deploy from branch) and
open the site root — `index.html` redirects to the homepage.

---

## Structure

```
terrafirme-website/
├── index.html                          → redirects to the homepage
├── TerraFirme Website.dc.html          Homepage (hero, projects, station, tiers)
├── about.dc.html                       Vision & objectives
├── methodology.dc.html                 Priority-node methodology
├── contact.dc.html                     Contact
├── The Grove - Network Channels.dc.html  Interactive species-interaction graph
├── base_code.html                      Self-contained build of the graph (offline)
├── TFFF Patreon Post.dc.html           Paid-post package mock-up
├── TerraFirme - Living Network.dc.html Brand guideline (chosen direction)
├── TerraFirme Identity.dc.html         Identity board (two directions explored)
├── grove-network.js                    Network dataset (species + channels)
├── support.js                          Component runtime
├── image-slot.js · browser-window.jsx · ios-frame.jsx   UI components
├── assets/                             Photography + preview image
└── data/                               Source iNaturalist export (CSV + columns)
```

## Network Channels

`The Grove - Network Channels.dc.html` (and its single-file build
`base_code.html`) render an ecosystem graph where **every node is a species**
and **every edge is a "channel"** — a described interaction. Interactions are
**community-validated to research grade** exactly the way iNaturalist validates
species IDs (≥4 agreements, ≥2/3 consensus). The seed network maps **53 nodes /
57 channels** drawn from **273 observations of 175 taxa** at The Grove (Matela),
including the farmer agent **Eichner** and harmonized metadata on every node.

Edit `grove-network.js` to add species or channels; the graph and validation
engine update automatically.

## Data & attribution

`data/observations-750583.csv` is an export from the iNaturalist project
**`thegrove`** (observer: *marcelo_rezende*, Matela, Portugal). Observation
records are licensed **CC-BY-NC** by their authors. See
`data/observations-README.txt` for column definitions.

## License

Content, design and code in this repository: **CC-BY-NC 4.0**.
Attribution: *TerraFirme · The Future Farmer (2026)*.
See `LICENSE`.

## Links

- Community: https://www.patreon.com/cw/thefuturefarmer
