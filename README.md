# Hyeonjun An — academic homepage

The Research section presents Water vapor uptake in hygroscopic liquid, Freezing aqueous solution, Polymer swelling & drying, and Liquid transport in porous materials, in that order. The former Research at a glance section and its overview graphics are omitted. Swelling/drying and porous-material studies have short result summaries. Water uptake includes a clearly identified related published D₂O capillary result. “How the experiment works” is shown for the public WCNR-12 and arXiv studies, with three-step illustrations of D₂O uptake/neutron imaging and water/PVA freezing/X-ray imaging.

No build step or external JavaScript library is required. The photograph, public experimental figures, D₂O uptake/freezing illustrations, and original CV are embedded in `index.html`, so the HTML can also be opened on its own. The `assets` folder provides the original CV PDF, SVG diagrams, and public figure files with source credits.

Poster records contain titles, conferences, and dates only. This package contains no poster PDFs, previews, thumbnails, or images cropped from posters. GPA and funding amounts are omitted from the homepage; submitted journal names remain undisclosed. The attached CV PDF is preserved without changes. Presentation status is as of 8 October 2026.

## Experimental figure sources

- An et al., public preprint arXiv:2606.01251v1, Fig. 1: optical and X-ray comparison of PVA solution and pure-water droplets. Fig. 2: tomographic cross-sections, available in an expandable section.
- Im et al., public preprint arXiv:2511.20571v1, Fig. 2: trapped bubbles, temperature, vacuum comparisons, and measured tip angles.
- An et al., WCNR-12 proceedings (2026), DOI 10.1007/978-3-032-15003-5_27, Fig. 4: H/(H+D) profiles in D₂O-filled open-ended capillaries. CC BY 4.0, https://creativecommons.org/licenses/by/4.0/.

Figures were extracted from the public article PDFs. Surrounding page text was removed and files were converted to WebP; data, panel labels, axes, and scale bars were retained, with no contrast or color editing. Source links and credits appear under every figure and in `assets/research/sources.json`. The arXiv works are identified as public preprints. The WCNR-12 figure is distinguished from ongoing glycerol/PG/DMSO work; CT contrast is described without assigning local composition or phase.

## GitHub Pages update

1. Replace the repository's root `index.html` with this package's `index.html`.
2. Upload the package's `assets` folder, replacing matching files and adding `assets/research`.
3. After GitHub Pages deployment completes, reload the page and check the Research section on desktop and mobile.

Delete old `assets/diagrams/overview-*.svg` files from the repository when applying this update. Keep `assets/previews` and `assets/posters` out of the public site. Remove them if an older upload left them in the repository.

## GitHub Pages 업로드

저장소 최상위의 `index.html`을 교체하고, 이 패키지의 `assets` 폴더도 함께 업로드하세요. 배포가 완료되면 홈페이지를 새로고침하고 PC와 모바일에서 Research 부분을 확인하세요.

Research 소개 순서는 수증기 흡수 → 수용액 동결 → 고분자 팽윤·건조 → 다공성 물질 내 액체 수송입니다. Research at a glance와 해당 개념도 파일은 생략했습니다. GitHub의 기존 `assets/diagrams/overview-*.svg` 파일도 삭제해주세요. Research에서는 공개 논문의 실제 실험 그림을 보여줍니다. PVA·순수한 물 액적의 X-ray 결과와 WCNR-12의 D₂O 모세관 분포 지도를 넣었으며, 그림을 눌러 확대할 수 있습니다. 공개된 WCNR-12·arXiv 연구에는 실험 과정을 세 단계로 설명하는 How the experiment works를 복원했습니다. 고분자 팽윤·다공성 물질 연구의 설명은 짧게 유지했고, PVA 단층영상은 펼쳐 볼 수 있습니다.

포스터는 제목·학회·시기만 공개합니다. 포스터 파일이나 미리보기 이미지를 추가하지 마세요. 홈페이지에서는 GPA와 연구비 금액을 표시하지 않으며, CV는 첨부 원본 그대로 유지했습니다.

## Validation

The extracted figures were visually inspected for complete labels and scales. Embedded image bytes and dimensions, source links, internal anchors, accessibility references, CSS structure, JavaScript syntax, original CV identity, and the title-only poster policy were checked. The page uses responsive CSS, native details/summary controls, reduced-motion support, and a keyboard-accessible image viewer. Actual browser layout and interaction have not been checked in this environment.
