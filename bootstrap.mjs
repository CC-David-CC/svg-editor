import Editor from './Editor.js';
const editor=new Editor(document.getElementById('container'));
editor.setConfig({allowInitialUserOverride:false,extensions:[],noDefaultExtensions:true,userExtensions:[]});
window.codiSvgEditor=editor;editor.init();
const nativeClick=HTMLAnchorElement.prototype.click;
HTMLAnchorElement.prototype.click=function(){if(this.hasAttribute('download')){window.parent.postMessage({type:'codi-svg-download-blocked'},location.origin);return;}return nativeClick.call(this);};
