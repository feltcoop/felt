import{S as e,i as t,s,e as n,c as a,a as r,d as c,b as l,f as o,D as h,E as u,l as i,F as p,G as d,H as f,I as $,k as m,n as g,J as v,K as b,v as _,r as k,L as E,t as w,g as x,M as y,h as N,j as A,m as I,o as j,w as z,N as D,O as F}from"../chunks/vendor-c5e4856b.js";import{s as M}from"../chunks/devmode-5d969eda.js";import{g as V}from"../chunks/icons-a1dcbb58.js";function q(e){let t,s,i;return{c(){t=n("button"),this.h()},l(e){t=a(e,"BUTTON",{class:!0}),r(t).forEach(c),this.h()},h(){l(t,"class","svelte-1ur7zc2")},m(n,a){o(n,t,a),s||(i=h(t,"click",e[3]),s=!0)},p:u,d(e){e&&c(t),s=!1,i()}}}function K(e){let t,s,n,a=e[1]&&q(e);return{c(){a&&a.c(),t=i()},l(e){a&&a.l(e),t=i()},m(r,c){a&&a.m(r,c),o(r,t,c),s||(n=h(window,"keydown",e[2]),s=!0)},p(e,[s]){e[1]?a?a.p(e,s):(a=q(e),a.c(),a.m(t.parentNode,t)):a&&(a.d(1),a=null)},i:u,o:u,d(e){a&&a.d(e),e&&c(t),s=!1,n()}}}function L(e,t,s){let n,a=u,r=()=>(a(),a=p(c,(e=>s(1,n=e))),c);e.$$.on_destroy.push((()=>a()));let{devmode:c}=t;r();return e.$$set=e=>{"devmode"in e&&r(s(0,c=e.devmode))},[c,n,e=>{"`"===e.key&&d(c,n=!n,n)},()=>d(c,n=!n,n)]}class O extends e{constructor(e){super(),t(this,e,L,K,s,{devmode:0})}}const T={subscribe:e=>(()=>{const e=f("__svelte__");return{page:{subscribe:e.page.subscribe},navigating:{subscribe:e.navigating.subscribe},get preloading(){return console.error("stores.preloading is deprecated; use stores.navigating instead"),{subscribe:e.navigating.subscribe}},session:e.session}})().page.subscribe(e)};function B(e,t,s){const n=e.slice();return n[7]=t[s],n}function G(e){let t,s;return{c(){t=n("div"),s=w("/"),this.h()},l(e){t=a(e,"DIV",{class:!0});var n=r(t);s=x(n,"/"),n.forEach(c),this.h()},h(){l(t,"class","separator svelte-392eor")},m(e,n){o(e,t,n),v(t,s)},p:u,d(e){e&&c(t)}}}function H(e){let t,s,h,u=e[7].name+"";return{c(){t=n("a"),s=w(u),this.h()},l(e){t=a(e,"A",{href:!0});var n=r(t);s=x(n,u),n.forEach(c),this.h()},h(){l(t,"href",h=e[7].path),y(t,"selected",e[7].path===e[0])},m(e,n){o(e,t,n),v(t,s)},p(e,n){2&n&&u!==(u=e[7].name+"")&&N(s,u),2&n&&h!==(h=e[7].path)&&l(t,"href",h),3&n&&y(t,"selected",e[7].path===e[0])},d(e){e&&c(t)}}}function J(e){let t;function s(e,t){return"space"===e[7].type?H:G}let n=s(e),a=n(e);return{c(){a.c(),t=i()},l(e){a.l(e),t=i()},m(e,s){a.m(e,s),o(e,t,s)},p(e,r){n===(n=s(e))&&a?a.p(e,r):(a.d(1),a=n(e),a&&(a.c(),a.m(t.parentNode,t)))},d(e){a.d(e),e&&c(t)}}}function S(e){let t,s,h;const u=e[4].default,i=$(u,e,e[3],null);let p=e[1],d=[];for(let n=0;n<p.length;n+=1)d[n]=J(B(e,p,n));return{c(){t=n("div"),i&&i.c(),s=m();for(let e=0;e<d.length;e+=1)d[e].c();this.h()},l(e){t=a(e,"DIV",{class:!0});var n=r(t);i&&i.l(n),s=g(n);for(let t=0;t<d.length;t+=1)d[t].l(n);n.forEach(c),this.h()},h(){l(t,"class","path svelte-392eor")},m(e,n){o(e,t,n),i&&i.m(t,null),v(t,s);for(let s=0;s<d.length;s+=1)d[s].m(t,null);h=!0},p(e,[s]){if(i&&i.p&&(!h||8&s)&&b(i,u,e,e[3],s,null,null),3&s){let n;for(p=e[1],n=0;n<p.length;n+=1){const a=B(e,p,n);d[n]?d[n].p(a,s):(d[n]=J(a),d[n].c(),d[n].m(t,null))}for(;n<d.length;n+=1)d[n].d(1);d.length=p.length}},i(e){h||(_(i,e),h=!0)},o(e){k(i,e),h=!1},d(e){e&&c(t),i&&i.d(e),E(d,e)}}}function U(e,t,s){let n,{$$slots:a={},$$scope:r}=t,{path:c}=t,{selected_path:l=null}=t;const o=new Map;return e.$$set=e=>{"path"in e&&s(2,c=e.path),"selected_path"in e&&s(0,l=e.selected_path),"$$scope"in e&&s(3,r=e.$$scope)},e.$$.update=()=>{4&e.$$.dirty&&s(1,n=(e=>{if(o.has(e))return o.get(e);let t=[];const s=(e=>e.split("/").filter((e=>e&&"."!==e&&".."!==e)))(e),n=s[s.length-1];let a="";for(const r of s)a+="/",a+=r,t.push({type:"space",name:r,path:a}),r!==n&&t.push({type:"spacer",path:a});return o.set(e,t),t})(c))},[l,n,c,r,a]}class C extends e{constructor(e){super(),t(this,e,U,S,s,{path:2,selected_path:0})}}function P(e){let t,s;return{c(){t=n("a"),s=w(V),this.h()},l(e){t=a(e,"A",{href:!0,class:!0});var n=r(t);s=x(n,V),n.forEach(c),this.h()},h(){l(t,"href","/"),l(t,"class","heart svelte-13rzpvv")},m(e,n){o(e,t,n),v(t,s)},p:u,d(e){e&&c(t)}}}function Q(e){let t,s;return{c(){t=n("a"),s=w("Felt.dev"),this.h()},l(e){t=a(e,"A",{href:!0,class:!0});var n=r(t);s=x(n,"Felt.dev"),n.forEach(c),this.h()},h(){l(t,"href","/"),l(t,"class","selected")},m(e,n){o(e,t,n),v(t,s)},p:u,d(e){e&&c(t)}}}function R(e){let t;function s(e,t){return"/"===e[0].path?Q:P}let n=s(e),a=n(e);return{c(){a.c(),t=i()},l(e){a.l(e),t=i()},m(e,s){a.m(e,s),o(e,t,s)},p(e,r){n===(n=s(e))&&a?a.p(e,r):(a.d(1),a=n(e),a&&(a.c(),a.m(t.parentNode,t)))},d(e){a.d(e),e&&c(t)}}}function W(e){let t,s;return t=new C({props:{path:e[0].path,selected_path:e[0].path,$$slots:{default:[R]},$$scope:{ctx:e}}}),{c(){A(t.$$.fragment)},l(e){I(t.$$.fragment,e)},m(e,n){j(t,e,n),s=!0},p(e,[s]){const n={};1&s&&(n.path=e[0].path),1&s&&(n.selected_path=e[0].path),3&s&&(n.$$scope={dirty:s,ctx:e}),t.$set(n)},i(e){s||(_(t.$$.fragment,e),s=!0)},o(e){k(t.$$.fragment,e),s=!1},d(e){z(t,e)}}}function X(e,t,s){let n;return D(e,T,(e=>s(0,n=e))),[n]}class Y extends e{constructor(e){super(),t(this,e,X,W,s,{})}}function Z(e){let t,s,h,u,i,p,d,f,E;u=new Y({});const w=e[2].default,x=$(w,e,e[1],null);return f=new O({props:{devmode:e[0]}}),{c(){t=n("link"),s=m(),h=n("nav"),A(u.$$.fragment),i=m(),p=n("main"),x&&x.c(),d=m(),A(f.$$.fragment),this.h()},l(e){const n=F('[data-svelte="svelte-19xe511"]',document.head);t=a(n,"LINK",{rel:!0,href:!0}),n.forEach(c),s=g(e),h=a(e,"NAV",{class:!0});var l=r(h);I(u.$$.fragment,l),l.forEach(c),i=g(e),p=a(e,"MAIN",{class:!0});var o=r(p);x&&x.l(o),o.forEach(c),d=g(e),I(f.$$.fragment,e),this.h()},h(){l(t,"rel","shortcut icon"),l(t,"href","/favicon.png"),l(h,"class","svelte-1quez3k"),l(p,"class","svelte-1quez3k")},m(e,n){v(document.head,t),o(e,s,n),o(e,h,n),j(u,h,null),o(e,i,n),o(e,p,n),x&&x.m(p,null),o(e,d,n),j(f,e,n),E=!0},p(e,[t]){x&&x.p&&(!E||2&t)&&b(x,w,e,e[1],t,null,null)},i(e){E||(_(u.$$.fragment,e),_(x,e),_(f.$$.fragment,e),E=!0)},o(e){k(u.$$.fragment,e),k(x,e),k(f.$$.fragment,e),E=!1},d(e){c(t),e&&c(s),e&&c(h),z(u),e&&c(i),e&&c(p),x&&x.d(e),e&&c(d),z(f,e)}}}function ee(e,t,s){let{$$slots:n={},$$scope:a}=t;const r=M(!1);return e.$$set=e=>{"$$scope"in e&&s(1,a=e.$$scope)},[r,a,n]}export default class extends e{constructor(e){super(),t(this,e,ee,Z,s,{})}}