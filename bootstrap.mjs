import Editor from './Editor.js';
const editor=new Editor(document.getElementById('container'));
editor.setConfig({allowInitialUserOverride:false,extensions:[],noDefaultExtensions:true,userExtensions:[]});
window.codiSvgEditor=editor;
function fitCompactDrawing() {
  if (!editor.isReady || innerWidth > 900 || !editor.workarea.clientWidth) return;
  editor.zoomChanged(window, 'canvas');
}
window.codiFitCompactDrawing=fitCompactDrawing;
editor.init().then(() => {
  editor.svgCanvas.getSvgRoot().style.touchAction='none';
  // SVG-Edit registers both touchend and click on these grouped tools. A
  // finger tap should select the shown tool once, then open alternatives on a second tap.
  for (const group of document.querySelectorAll('se-flyingbutton')) {
    group.addEventListener('touchend',event=>event.stopImmediatePropagation(),{capture:true});
    const style=document.createElement('style');
    style.textContent='@media (pointer:coarse) { .handle { pointer-events:none } }';
    group.shadowRoot.append(style);
  }
  const observer=new ResizeObserver(fitCompactDrawing);
  observer.observe(editor.workarea);
  window.addEventListener('pagehide',()=>observer.disconnect(),{once:true});
});
const nativeClick=HTMLAnchorElement.prototype.click;
HTMLAnchorElement.prototype.click=function(){if(this.hasAttribute('download')){window.parent.postMessage({type:'codi-svg-download-blocked'},location.origin);return;}return nativeClick.call(this);};
