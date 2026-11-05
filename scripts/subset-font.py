"""Keep the site's current Pretendard glyphs in a small, renamed variable font.

The original font remains available as a fallback for future characters.
Requires fontTools and a Brotli backend, either Python brotli or Node.js.
"""
from pathlib import Path
import hashlib
import json
import shutil
import subprocess

from fontTools import subset
from fontTools.ttLib import TTFont, woff2

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'assets/fonts/PretendardVariable.woff2'
OUTPUT = ROOT / 'assets/fonts/HyeonjunSiteSans.woff2'


def ensure_brotli():
    if woff2.haveBrotli:
        return
    node = shutil.which('node')
    if not node:
        raise RuntimeError('Install fonttools[woff] or make Node.js available.')

    class NodeBrotli:
        MODE_FONT = 2

        @staticmethod
        def run(data, compress=False):
            expression = (
                'z.brotliCompressSync(b,{params:{[z.constants.BROTLI_PARAM_MODE]:z.constants.BROTLI_MODE_FONT}})'
                if compress else 'z.brotliDecompressSync(b)'
            )
            code = "const z=require('node:zlib');const a=[];process.stdin.on('data',c=>a.push(c));process.stdin.on('end',()=>{const b=Buffer.concat(a);process.stdout.write(" + expression + ");});"
            return subprocess.run([node, '-e', code], input=data, capture_output=True, check=True).stdout

        @staticmethod
        def decompress(data):
            return NodeBrotli.run(data)

        @staticmethod
        def compress(data, **kwargs):
            return NodeBrotli.run(data, compress=True)

    woff2.brotli = NodeBrotli
    woff2.haveBrotli = True


def ranges(codes):
    result = []
    for code in sorted(codes):
        if result and code == result[-1][1] + 1:
            result[-1][1] = code
        else:
            result.append([code, code])
    return ', '.join(f'U+{a:X}' if a == b else f'U+{a:X}-{b:X}' for a, b in result)


def main():
    ensure_brotli()
    inputs = [ROOT / 'index.html', *sorted((ROOT / 'assets/js').glob('*.js')), ROOT / 'assets/css/site.css']
    text = ''.join(path.read_text() for path in inputs)
    codes = {ord(c) for c in text if ord(c) >= 32} | set(range(32, 127))
    font = TTFont(SOURCE, recalcTimestamp=False)
    original_cmap = font.getBestCmap()
    codes.intersection_update(original_cmap)
    original_metrics = {c: font['hmtx'][original_cmap[c]] for c in codes}
    original_axes = [(a.axisTag, a.minValue, a.defaultValue, a.maxValue) for a in font['fvar'].axes]
    options = subset.Options()
    options.layout_features = ['*']
    options.name_IDs = ['*']
    options.name_legacy = True
    options.name_languages = ['*']
    options.recalc_timestamp = False
    sub = subset.Subsetter(options=options)
    sub.populate(unicodes=codes)
    sub.subset(font)
    # The upstream font reserves its name. Retain credits and rename this derivative.
    names = {1: 'Hyeonjun Site Sans', 3: 'HyeonjunSiteSans-Subset', 4: 'Hyeonjun Site Sans',
             6: 'HyeonjunSiteSans-Regular', 16: 'Hyeonjun Site Sans', 25: 'HyeonjunSiteSans'}
    for record in font['name'].names:
        if record.nameID in names:
            record.string = names[record.nameID].encode(record.getEncoding())
    font.flavor = 'woff2'
    font.save(OUTPUT)
    check = TTFont(OUTPUT)
    cmap = check.getBestCmap()
    assert set(cmap) >= codes
    assert original_axes == [(a.axisTag, a.minValue, a.defaultValue, a.maxValue) for a in check['fvar'].axes]
    assert all(check['hmtx'][cmap[c]] == original_metrics[c] for c in codes)
    data = OUTPUT.read_bytes()
    report = {'file': str(OUTPUT.relative_to(ROOT)), 'bytes': len(data),
              'original_bytes': SOURCE.stat().st_size, 'unicode_range': ranges(codes),
              'unicode_count': len(codes), 'variable_axes': original_axes,
              'sha256': hashlib.sha256(data).hexdigest(), 'metrics_preserved': True}
    print(json.dumps(report))


if __name__ == '__main__':
    main()
