import{dom as u}from'./dom.js';import{env as o}from'./env.js';function m(n){var r,e;return o.isServer?null:n?"ownerDocument"in n?n.ownerDocument:"value"in n?(e=(r=u(n))==null?void 0:r.ownerDocument)!=null?e:document:null:document}export{m as getOwnerDocument};
