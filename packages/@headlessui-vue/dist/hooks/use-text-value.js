import{ref as n}from"vue";import{dom as o}from'../utils/dom.js';import{getTextValue as i}from'../utils/get-text-value.js';function p(a){let t=n(""),r=n("");return()=>{let e=o(a);if(!e)return"";let l=e.innerText;if(t.value===l)return r.value;let u=i(e).trim().toLowerCase();return t.value=l,r.value=u,u}}export{p as useTextValue};
