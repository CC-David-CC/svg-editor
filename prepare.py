#!/usr/bin/env python3
import json,pathlib,re
HERE=pathlib.Path(__file__).resolve().parent;root=HERE/'node_modules/svgedit/dist/editor'
if not (root/'Editor.js').is_file():raise SystemExit('Run npm ci --ignore-scripts in apps/system/svg-editor first.')
(root/'codi.html').write_text('<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="svgedit.css"></head><body style="margin:0"><div id="container" style="width:100%;height:100vh"></div><script type="module" src="codi-bootstrap.mjs"></script></body></html>')
(root/'codi-bootstrap.mjs').write_bytes((HERE/'bootstrap.mjs').read_bytes())
safe=re.compile(r'^(?:[a-zA-Z0-9_@+-][a-zA-Z0-9_@+.-]*/)*[a-zA-Z0-9_@+-][a-zA-Z0-9_@+.-]*$');extensions={'.js','.mjs','.css','.html','.json','.txt','.svg','.png','.gif','.woff','.woff2','.ttf'}
assets=['node_modules/svgedit/dist/editor/'+str(p.relative_to(root)) for p in root.rglob('*') if p.is_file() and p.suffix in extensions and safe.fullmatch(str(p.relative_to(root))) and not p.name.endswith('.map') and '/tests/' not in str(p)]
assets.append('node_modules/svgedit/LICENSE-MIT.txt');(HERE/'app.json').write_text(json.dumps({'assets':sorted(assets)},indent=2)+'\n');print('Prepared SVG-edit',len(assets),'assets')
