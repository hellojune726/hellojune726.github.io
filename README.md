# Hyeonjun An · Research website

Personal academic website for experimental soft matter physics at UNIST.

- Website: https://hellojune726.github.io/
- Contact: RNWK23@unist.ac.kr
- Hosting: GitHub Pages, from the `main` branch.

## Editing

| File or directory | Purpose |
| --- | --- |
| `index.html` | Research, news, publications, presentations, experience, and contact content |
| `assets/css/site.css` | Layout, responsive styles, light/dark themes, and print styles |
| `assets/js/theme.js` | Theme initialization and appearance controls |
| `assets/js/site.js` | Navigation, publication filters, image viewer, and marathon popup |
| `assets/research/sources.json` | Figure provenance, publication metadata, and conference source notes |
| `assets/research/`, `assets/diagrams/` | Original experimental figures and explanatory diagrams |
| `assets/portrait/`, `assets/illustrations/` | Profile photo and personal illustrations |
| `assets/fonts/` | Pretendard Variable and its SIL Open Font License |
| `assets/cv/` | CV PDFs; the current download is linked from `index.html` |

Reference images and fonts by their asset paths so they can be cached separately and images below the fold can load lazily. Updating an asset file now updates its displayed version; do not embed duplicate base64 copies in the HTML. Preserve experimental image pixels, labels, scale bars, and source credits.

Publication year and online publication year can differ. The PVA paper is cited as *Journal of Colloid and Interface Science* **729**, 141826 (2027; published online in 2026).

The 10 November 2026 APS DSOFT conference entry uses the supplied conference poster and promotional schedule. The event runs 10 a.m.–5 p.m. EST; the schedule identifies Session 4 and the talk title but does not specify an individual talk time. Update the Upcoming entries after the event.

## Validation

Run JavaScript syntax checks:

```sh
node --check assets/js/theme.js
node --check assets/js/site.js
```

Check the page in a browser, including the news-to-presentation link, publication filters followed by internal article links, light/dark appearance, figure enlargement, and popup closing. Verify local asset paths and internal anchors after moving files.

## Backup

The `v0` branch records the original restoration point at commit `a76ca62d665bada8bf67e9cea22655f241056bc6`. Keep that branch fixed when publishing new changes to `main`. Restore from its complete file tree when the original version is requested.
