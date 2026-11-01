// Strip only diagrams.net's exact, known SVG 1.1 declaration before parsing.
// Never ask an XML parser to resolve a DTD or a non-predefined entity.
const DIAGRAM_DTD='<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';
export function stripDiagramDoctype(text){
 const hasDeclaration=/<!DOCTYPE/i.test(text);
 if(!hasDeclaration){if(/<!ENTITY/i.test(text))throw Error('SVG entity declarations are not supported.');return {text,stripped:false};}
 if(!text.includes(DIAGRAM_DTD))throw Error('SVG must not contain a document type declaration.');
 const cleaned=text.replace(DIAGRAM_DTD,'');
 if(/<!DOCTYPE|<!ENTITY/i.test(cleaned)||/&(?!(?:amp|lt|gt|quot|apos|#\d+|#x[0-9a-f]+);)/i.test(cleaned))throw Error('SVG document types or custom entities are not supported.');
 return {text:cleaned,stripped:true};
}
