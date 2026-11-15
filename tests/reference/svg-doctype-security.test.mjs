import assert from 'node:assert/strict';import {stripDiagramDoctype} from "../../doctype.mjs";
const d='<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';
assert.deepEqual(stripDiagramDoctype('<svg/>'),{text:'<svg/>',stripped:false});assert.deepEqual(stripDiagramDoctype(d+'<svg>&amp;&#123;&#x41;</svg>'),{text:'<svg>&amp;&#123;&#x41;</svg>',stripped:true});
for(const bad of ['<!DOCTYPE svg [<!ENTITY x SYSTEM "file:///etc/passwd">]><svg>&x;</svg>',d+'<svg>&x;</svg>',d+'<!DOCTYPE svg><svg/>',d+'<!ENTITY x "v"><svg/>','<!DOCTYPE svg SYSTEM "http://attacker.invalid/x"><svg/>',d.replace('svg11.dtd','other.dtd')+'<svg/>'])assert.throws(()=>stripDiagramDoctype(bad),/document type|entities/);
console.log('PASS exact known DOCTYPE only; custom entities and additional DTDs rejected');
