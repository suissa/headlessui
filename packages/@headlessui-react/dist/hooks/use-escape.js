import{Keys as u}from'../components/keyboard.js';import{useEventListener as i}from'./use-event-listener.js';import{useIsTopLayer as f}from'./use-is-top-layer.js';function a(o,r=typeof document!="undefined"?document.defaultView:null,t){let n=f(o,"escape");i(r,"keydown",e=>{n&&(e.defaultPrevented||e.key===u.Escape&&t(e))})}export{a as useEscape};