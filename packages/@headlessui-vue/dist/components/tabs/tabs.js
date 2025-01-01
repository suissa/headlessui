import{Fragment as z,computed as c,defineComponent as D,h as H,inject as A,onMounted as M,onUnmounted as K,provide as N,ref as h,watch as _,watchEffect as J}from"vue";import{useId as $}from'../../hooks/use-id.js';import{useResolveButtonType as Q}from'../../hooks/use-resolve-button-type.js';import{FocusSentinel as V}from'../../internal/focus-sentinel.js';import{Hidden as X}from'../../internal/hidden.js';import{Keys as I}from'../../keyboard.js';import{dom as o}from'../../utils/dom.js';import{Focus as y,FocusResult as C,focusIn as R,sortByDomNode as O}from'../../utils/focus-management.js';import{match as F}from'../../utils/match.js';import{microTask as Y}from'../../utils/micro-task.js';import{getOwnerDocument as Z}from'../../utils/owner.js';import{Features as q,omit as ee,render as L}from'../../utils/render.js';var te=(i=>(i[i.Forwards=0]="Forwards",i[i.Backwards=1]="Backwards",i))(te||{}),le=(s=>(s[s.Less=-1]="Less",s[s.Equal=0]="Equal",s[s.Greater=1]="Greater",s))(le||{});let U=Symbol("TabsContext");function k(a){let v=A(U,null);if(v===null){let i=new Error(`<${a} /> is missing a parent <TabGroup /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(i,k),i}return v}let j=Symbol("TabsSSRContext"),me=D({name:"TabGroup",emits:{change:a=>!0},props:{as:{type:[Object,String],default:"template"},selectedIndex:{type:[Number],default:null},defaultIndex:{type:[Number],default:0},vertical:{type:[Boolean],default:!1},manual:{type:[Boolean],default:!1}},inheritAttrs:!1,setup(a,{slots:v,attrs:i,emit:s}){var P;let l=h((P=a.selectedIndex)!=null?P:a.defaultIndex),n=h([]),d=h([]),S=c(()=>a.selectedIndex!==null),b=c(()=>S.value?a.selectedIndex:l.value);function m(t){var T;let e=O(r.tabs.value,o),u=O(r.panels.value,o),f=e.filter(p=>{var x;return!((x=o(p))!=null&&x.hasAttribute("disabled"))});if(t<0||t>e.length-1){let p=F(l.value===null?0:Math.sign(t-l.value),{[-1]:()=>1,[0]:()=>F(Math.sign(t),{[-1]:()=>0,[0]:()=>0,[1]:()=>1}),[1]:()=>0}),x=F(p,{[0]:()=>e.indexOf(f[0]),[1]:()=>e.indexOf(f[f.length-1])});x!==-1&&(l.value=x),r.tabs.value=e,r.panels.value=u}else{let p=e.slice(0,t),G=[...e.slice(t),...p].find(W=>f.includes(W));if(!G)return;let B=(T=e.indexOf(G))!=null?T:r.selectedIndex.value;B===-1&&(B=r.selectedIndex.value),l.value=B,r.tabs.value=e,r.panels.value=u}}let r={selectedIndex:c(()=>{var t,e;return(e=(t=l.value)!=null?t:a.defaultIndex)!=null?e:null}),orientation:c(()=>a.vertical?"vertical":"horizontal"),activation:c(()=>a.manual?"manual":"auto"),tabs:n,panels:d,setSelectedIndex(t){b.value!==t&&s("change",t),S.value||m(t)},registerTab(t){var u;if(n.value.includes(t))return;let e=n.value[l.value];if(n.value.push(t),n.value=O(n.value,o),!S.value){let f=(u=n.value.indexOf(e))!=null?u:l.value;f!==-1&&(l.value=f)}},unregisterTab(t){let e=n.value.indexOf(t);e!==-1&&n.value.splice(e,1)},registerPanel(t){d.value.includes(t)||(d.value.push(t),d.value=O(d.value,o))},unregisterPanel(t){let e=d.value.indexOf(t);e!==-1&&d.value.splice(e,1)}};N(U,r);let w=h({tabs:[],panels:[]}),g=h(!1);M(()=>{g.value=!0}),N(j,c(()=>g.value?null:w.value));let E=c(()=>a.selectedIndex);return M(()=>{_([E],()=>{var t;return m((t=a.selectedIndex)!=null?t:a.defaultIndex)},{immediate:!0})}),J(()=>{if(!S.value||b.value==null||r.tabs.value.length<=0)return;let t=O(r.tabs.value,o);t.some((u,f)=>o(r.tabs.value[f])!==o(u))&&r.setSelectedIndex(t.findIndex(u=>o(u)===o(r.tabs.value[b.value])))}),()=>{let t={selectedIndex:l.value};return H(z,[n.value.length<=0&&H(V,{onFocus:()=>{for(let e of n.value){let u=o(e);if((u==null?void 0:u.tabIndex)===0)return u.focus(),!0}return!1}}),L({theirProps:{...i,...ee(a,["selectedIndex","defaultIndex","manual","vertical","onChange"])},ourProps:{},slot:t,slots:v,attrs:i,name:"TabGroup"})])}}}),pe=D({name:"TabList",props:{as:{type:[Object,String],default:"div"}},setup(a,{attrs:v,slots:i}){let s=k("TabList");return()=>{let l={selectedIndex:s.selectedIndex.value},n={role:"tablist","aria-orientation":s.orientation.value};return L({ourProps:n,theirProps:a,slot:l,attrs:v,slots:i,name:"TabList"})}}}),xe=D({name:"Tab",props:{as:{type:[Object,String],default:"button"},disabled:{type:[Boolean],default:!1},id:{type:String,default:()=>`headlessui-tabs-tab-${$()}`}},setup(a,{attrs:v,slots:i,expose:s}){let l=k("Tab"),n=h(null);s({el:n,$el:n}),M(()=>l.registerTab(n)),K(()=>l.unregisterTab(n));let d=A(j),S=c(()=>{if(d.value){let e=d.value.tabs.indexOf(a.id);return e===-1?d.value.tabs.push(a.id)-1:e}return-1}),b=c(()=>{let e=l.tabs.value.indexOf(n);return e===-1?S.value:e}),m=c(()=>b.value===l.selectedIndex.value);function r(e){var f;let u=e();if(u===C.Success&&l.activation.value==="auto"){let T=(f=Z(n))==null?void 0:f.activeElement,p=l.tabs.value.findIndex(x=>o(x)===T);p!==-1&&l.setSelectedIndex(p)}return u}function w(e){let u=l.tabs.value.map(T=>o(T)).filter(Boolean);if(e.key===I.Space||e.key===I.Enter){e.preventDefault(),e.stopPropagation(),l.setSelectedIndex(b.value);return}switch(e.key){case I.Home:case I.PageUp:return e.preventDefault(),e.stopPropagation(),r(()=>R(u,y.First));case I.End:case I.PageDown:return e.preventDefault(),e.stopPropagation(),r(()=>R(u,y.Last))}if(r(()=>F(l.orientation.value,{vertical(){return e.key===I.ArrowUp?R(u,y.Previous|y.WrapAround):e.key===I.ArrowDown?R(u,y.Next|y.WrapAround):C.Error},horizontal(){return e.key===I.ArrowLeft?R(u,y.Previous|y.WrapAround):e.key===I.ArrowRight?R(u,y.Next|y.WrapAround):C.Error}}))===C.Success)return e.preventDefault()}let g=h(!1);function E(){var e;g.value||(g.value=!0,!a.disabled&&((e=o(n))==null||e.focus({preventScroll:!0}),l.setSelectedIndex(b.value),Y(()=>{g.value=!1})))}function P(e){e.preventDefault()}let t=Q(c(()=>({as:a.as,type:v.type})),n);return()=>{var p,x;let e={selected:m.value,disabled:(p=a.disabled)!=null?p:!1},{id:u,...f}=a,T={ref:n,onKeydown:w,onMousedown:P,onClick:E,id:u,role:"tab",type:t.value,"aria-controls":(x=o(l.panels.value[b.value]))==null?void 0:x.id,"aria-selected":m.value,tabIndex:m.value?0:-1,disabled:a.disabled?!0:void 0};return L({ourProps:T,theirProps:f,slot:e,attrs:v,slots:i,name:"Tab"})}}}),Ie=D({name:"TabPanels",props:{as:{type:[Object,String],default:"div"}},setup(a,{slots:v,attrs:i}){let s=k("TabPanels");return()=>{let l={selectedIndex:s.selectedIndex.value};return L({theirProps:a,ourProps:{},slot:l,attrs:i,slots:v,name:"TabPanels"})}}}),ye=D({name:"TabPanel",props:{as:{type:[Object,String],default:"div"},static:{type:Boolean,default:!1},unmount:{type:Boolean,default:!0},id:{type:String,default:()=>`headlessui-tabs-panel-${$()}`},tabIndex:{type:Number,default:0}},setup(a,{attrs:v,slots:i,expose:s}){let l=k("TabPanel"),n=h(null);s({el:n,$el:n}),M(()=>l.registerPanel(n)),K(()=>l.unregisterPanel(n));let d=A(j),S=c(()=>{if(d.value){let r=d.value.panels.indexOf(a.id);return r===-1?d.value.panels.push(a.id)-1:r}return-1}),b=c(()=>{let r=l.panels.value.indexOf(n);return r===-1?S.value:r}),m=c(()=>b.value===l.selectedIndex.value);return()=>{var t;let r={selected:m.value},{id:w,tabIndex:g,...E}=a,P={ref:n,id:w,role:"tabpanel","aria-labelledby":(t=o(l.tabs.value[b.value]))==null?void 0:t.id,tabIndex:m.value?g:-1};return!m.value&&a.unmount&&!a.static?H(X,{as:"span","aria-hidden":!0,...P}):L({ourProps:P,theirProps:E,slot:r,attrs:v,slots:i,features:q.Static|q.RenderStrategy,visible:m.value,name:"TabPanel"})}}});export{xe as Tab,me as TabGroup,pe as TabList,ye as TabPanel,Ie as TabPanels};
