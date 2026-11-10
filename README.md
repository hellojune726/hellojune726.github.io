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
| `assets/fonts/` | Small site-specific font subset, original Pretendard Variable fallback, and SIL Open Font License |
| `assets/cv/` | CV PDFs; the current download is linked from `index.html` |
| `scripts/subset-font.py` | Regenerate the variable font subset while preserving glyph metrics and license credits |

Reference images and fonts by their asset paths so they can be cached separately and images below the fold can load lazily. When replacing an asset, update its URL version in HTML or CSS; also update the stylesheet or script URL version when changing those files. Do not embed duplicate base64 copies in the HTML. Preserve experimental image pixels, labels, scale bars, and source credits.

Publication year and online publication year can differ. The PVA paper is cited as *Journal of Colloid and Interface Science* **729**, 141826 (2027; published online in 2026).

The 10 November 2026 APS DSOFT oral presentation is listed as completed. Its supplied promotional schedule is retained in `assets/conferences/` as a historical record and opens in the image viewer.

## Font maintenance

`HyeonjunSiteSans.woff2` contains the current site's glyphs, including the Korean name, at 40,756 bytes. Its glyph metrics and variable weight axis match the original 2,057,688-byte font. The original `PretendardVariable.woff2` remains the CSS fallback for future characters. The subset uses a distinct internal font name to respect Pretendard's reserved font name; retain the original license and credits.

After adding characters, optionally regenerate the subset from the repository root:

```sh
python scripts/subset-font.py
```

The script requires `fontTools` and either Python Brotli or Node.js. It prints the resulting size, SHA-256, and Unicode range. Copy that range into the subset's `unicode-range` in `assets/css/site.css`, version the updated font URL, and refresh the stylesheet URL version in `index.html`. Then check that the browser loads the subset and preserves the layout.

## Validation

Run JavaScript syntax checks:

```sh
node --check assets/js/theme.js
node --check assets/js/site.js
```

Check the page at mobile and desktop widths, including menu dismissal by outside click, keyboard focus, Escape, and desktop resize; keyboard navigation from Skip to content; news-to-presentation links; publication filters followed by internal article links; system/light/dark appearance; figure enlargement; popup closing; and the CV download. Verify local asset paths, unique IDs, and internal anchors after moving files.

## Backup

The `v0` branch records the original restoration point at commit `a76ca62d665bada8bf67e9cea22655f241056bc6`. Keep that branch fixed when publishing new changes to `main`. Restore from its complete file tree when the original version is requested.
