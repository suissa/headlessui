import{computed as y,defineComponent as T,inject as C,nextTick as h,onMounted as K,onUnmounted as N,provide as j,ref as R,watchEffect as L}from"vue";import{useId as w}from'../../hooks/use-id.js';import{useOutsideClick as B}from'../../hooks/use-outside-click.js';import{useResolveButtonType as U}from'../../hooks/use-resolve-button-type.js';import{useTextValue as $}from'../../hooks/use-text-value.js';import{useTrackedPointer as V}from'../../hooks/use-tracked-pointer.js';import{useTreeWalker as H}from'../../hooks/use-tree-walker.js';import{State as D,useOpenClosed as Q,useOpenClosedProvider as _}from'../../internal/open-closed.js';import{Keys as c}from'../../keyboard.js';import{Focus as S,calculateActiveIndex as q}from'../../utils/calculate-active-index.js';import{dom as p}from'../../utils/dom.js';import{Focus as E,FocusableMode as W,focusFrom as J,isFocusableElement as z,restoreFocusIfNecessary as k,sortByDomNode as G}from'../../utils/focus-management.js';import{match as X}from'../../utils/match.js';import{Features as F,render as P}from'../../utils/render.js';var Y=(l=>(l[l.Open=0]="Open",l[l.Closed=1]="Closed",l))(Y||{}),Z=(l=>(l[l.Pointer=0]="Pointer",l[l.Other=1]="Other",l))(Z||{});function ee(i){requestAnimationFrame(()=>requestAnimationFrame(i))}let A=Symbol("MenuContext");function O(i){let M=C(A,null);if(M===null){let l=new Error(`<${i} /> is missing a parent <Menu /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(l,O),l}return M}let Ie=T({name:"Menu",props:{as:{type:[Object,String],default:"template"}},setup(i,{slots:M,attrs:l}){let I=R(1),e=R(null),f=R(null),s=R([]),g=R(""),d=R(null),o=R(1);function t(a=r=>r){let r=d.value!==null?s.value[d.value]:null,u=G(a(s.value.slice()),m=>p(m.dataRef.domRef)),n=r?u.indexOf(r):null;return n===-1&&(n=null),{items:u,activeItemIndex:n}}let v={menuState:I,buttonRef:e,itemsRef:f,items:s,searchQuery:g,activeItemIndex:d,activationTrigger:o,closeMenu:()=>{I.value=1,d.value=null},openMenu:()=>I.value=0,goToItem(a,r,u){let n=t(),m=q(a===S.Specific?{focus:S.Specific,id:r}:{focus:a},{resolveItems:()=>n.items,resolveActiveIndex:()=>n.activeItemIndex,resolveId:b=>b.id,resolveDisabled:b=>b.dataRef.disabled});g.value="",d.value=m,o.value=u!=null?u:1,s.value=n.items},search(a){let u=g.value!==""?0:1;g.value+=a.toLowerCase();let m=(d.value!==null?s.value.slice(d.value+u).concat(s.value.slice(0,d.value+u)):s.value).find(x=>x.dataRef.textValue.startsWith(g.value)&&!x.dataRef.disabled),b=m?s.value.indexOf(m):-1;b===-1||b===d.value||(d.value=b,o.value=1)},clearSearch(){g.value=""},registerItem(a,r){let u=t(n=>[...n,{id:a,dataRef:r}]);s.value=u.items,d.value=u.activeItemIndex,o.value=1},unregisterItem(a){let r=t(u=>{let n=u.findIndex(m=>m.id===a);return n!==-1&&u.splice(n,1),u});s.value=r.items,d.value=r.activeItemIndex,o.value=1}};return B([e,f],(a,r)=>{var u;v.closeMenu(),z(r,W.Loose)||(a.preventDefault(),(u=p(e))==null||u.focus())},y(()=>I.value===0)),j(A,v),_(y(()=>X(I.value,{[0]:D.Open,[1]:D.Closed}))),()=>{let a={open:I.value===0,close:v.closeMenu};return P({ourProps:{},theirProps:i,slot:a,slots:M,attrs:l,name:"Menu"})}}}),ge=T({name:"MenuButton",props:{disabled:{type:Boolean,default:!1},as:{type:[Object,String],default:"button"},id:{type:String,default:()=>`headlessui-menu-button-${w()}`}},setup(i,{attrs:M,slots:l,expose:I}){let e=O("MenuButton");I({el:e.buttonRef,$el:e.buttonRef});function f(o){switch(o.key){case c.Space:case c.Enter:case c.ArrowDown:o.preventDefault(),o.stopPropagation(),e.openMenu(),h(()=>{var t;(t=p(e.itemsRef))==null||t.focus({preventScroll:!0}),e.goToItem(S.First)});break;case c.ArrowUp:o.preventDefault(),o.stopPropagation(),e.openMenu(),h(()=>{var t;(t=p(e.itemsRef))==null||t.focus({preventScroll:!0}),e.goToItem(S.Last)});break}}function s(o){switch(o.key){case c.Space:o.preventDefault();break}}function g(o){i.disabled||(e.menuState.value===0?(e.closeMenu(),h(()=>{var t;return(t=p(e.buttonRef))==null?void 0:t.focus({preventScroll:!0})})):(o.preventDefault(),e.openMenu(),ee(()=>{var t;return(t=p(e.itemsRef))==null?void 0:t.focus({preventScroll:!0})})))}let d=U(y(()=>({as:i.as,type:M.type})),e.buttonRef);return()=>{var r;let o={open:e.menuState.value===0},{id:t,...v}=i,a={ref:e.buttonRef,id:t,type:d.value,"aria-haspopup":"menu","aria-controls":(r=p(e.itemsRef))==null?void 0:r.id,"aria-expanded":e.menuState.value===0,onKeydown:f,onKeyup:s,onClick:g};return P({ourProps:a,theirProps:v,slot:o,attrs:M,slots:l,name:"MenuButton"})}}}),Se=T({name:"MenuItems",props:{as:{type:[Object,String],default:"div"},static:{type:Boolean,default:!1},unmount:{type:Boolean,default:!0},id:{type:String,default:()=>`headlessui-menu-items-${w()}`}},setup(i,{attrs:M,slots:l,expose:I}){let e=O("MenuItems"),f=R(null);I({el:e.itemsRef,$el:e.itemsRef}),H({container:y(()=>p(e.itemsRef)),enabled:y(()=>e.menuState.value===0),accept(t){return t.getAttribute("role")==="menuitem"?NodeFilter.FILTER_REJECT:t.hasAttribute("role")?NodeFilter.FILTER_SKIP:NodeFilter.FILTER_ACCEPT},walk(t){t.setAttribute("role","none")}});function s(t){var v;switch(f.value&&clearTimeout(f.value),t.key){case c.Space:if(e.searchQuery.value!=="")return t.preventDefault(),t.stopPropagation(),e.search(t.key);case c.Enter:if(t.preventDefault(),t.stopPropagation(),e.activeItemIndex.value!==null){let r=e.items.value[e.activeItemIndex.value];(v=p(r.dataRef.domRef))==null||v.click()}e.closeMenu(),k(p(e.buttonRef));break;case c.ArrowDown:return t.preventDefault(),t.stopPropagation(),e.goToItem(S.Next);case c.ArrowUp:return t.preventDefault(),t.stopPropagation(),e.goToItem(S.Previous);case c.Home:case c.PageUp:return t.preventDefault(),t.stopPropagation(),e.goToItem(S.First);case c.End:case c.PageDown:return t.preventDefault(),t.stopPropagation(),e.goToItem(S.Last);case c.Escape:t.preventDefault(),t.stopPropagation(),e.closeMenu(),h(()=>{var a;return(a=p(e.buttonRef))==null?void 0:a.focus({preventScroll:!0})});break;case c.Tab:t.preventDefault(),t.stopPropagation(),e.closeMenu(),h(()=>J(p(e.buttonRef),t.shiftKey?E.Previous:E.Next));break;default:t.key.length===1&&(e.search(t.key),f.value=setTimeout(()=>e.clearSearch(),350));break}}function g(t){switch(t.key){case c.Space:t.preventDefault();break}}let d=Q(),o=y(()=>d!==null?(d.value&D.Open)===D.Open:e.menuState.value===0);return()=>{var u,n;let t={open:e.menuState.value===0},{id:v,...a}=i,r={"aria-activedescendant":e.activeItemIndex.value===null||(u=e.items.value[e.activeItemIndex.value])==null?void 0:u.id,"aria-labelledby":(n=p(e.buttonRef))==null?void 0:n.id,id:v,onKeydown:s,onKeyup:g,role:"menu",tabIndex:0,ref:e.itemsRef};return P({ourProps:r,theirProps:a,slot:t,attrs:M,slots:l,features:F.RenderStrategy|F.Static,visible:o.value,name:"MenuItems"})}}}),Me=T({name:"MenuItem",inheritAttrs:!1,props:{as:{type:[Object,String],default:"template"},disabled:{type:Boolean,default:!1},id:{type:String,default:()=>`headlessui-menu-item-${w()}`}},setup(i,{slots:M,attrs:l,expose:I}){let e=O("MenuItem"),f=R(null);I({el:f,$el:f});let s=y(()=>e.activeItemIndex.value!==null?e.items.value[e.activeItemIndex.value].id===i.id:!1),g=$(f),d=y(()=>({disabled:i.disabled,get textValue(){return g()},domRef:f}));K(()=>e.registerItem(i.id,d)),N(()=>e.unregisterItem(i.id)),L(()=>{e.menuState.value===0&&s.value&&e.activationTrigger.value!==0&&h(()=>{var n,m;return(m=(n=p(f))==null?void 0:n.scrollIntoView)==null?void 0:m.call(n,{block:"nearest"})})});function o(n){if(i.disabled)return n.preventDefault();e.closeMenu(),k(p(e.buttonRef))}function t(){if(i.disabled)return e.goToItem(S.Nothing);e.goToItem(S.Specific,i.id)}let v=V();function a(n){v.update(n)}function r(n){v.wasMoved(n)&&(i.disabled||s.value||e.goToItem(S.Specific,i.id,0))}function u(n){v.wasMoved(n)&&(i.disabled||s.value&&e.goToItem(S.Nothing))}return()=>{let{id:n,disabled:m,...b}=i,x={active:s.value,disabled:m,close:e.closeMenu};return P({ourProps:{id:n,ref:f,role:"menuitem",tabIndex:m===!0?void 0:-1,"aria-disabled":m===!0?!0:void 0,onClick:o,onFocus:t,onPointerenter:a,onMouseenter:a,onPointermove:r,onMousemove:r,onPointerleave:u,onMouseleave:u},theirProps:{...l,...b},slot:x,attrs:l,slots:M,name:"MenuItem"})}}});export{Ie as Menu,ge as MenuButton,Me as MenuItem,Se as MenuItems};
