export{default as themeDefault}from"../themes/default.module.scss";export{default as themeDark}from"../themes/dark.module.scss";const e=(e,t,n)=>{if(!e||!e.length)return[];if(!t)return e;const o="desc"===n?-1:1,l=-o;return e.sort(((e,n)=>{const s=r(e,t),u=r(n,t);if(!s&&!u)return 0;if(!s&&0!==s)return l;if(!u&&0!==u)return o;if("number"==typeof s&&"number"==typeof u)return s===u?0:s>u?o:l;if("string"==typeof s&&"string"==typeof u){const e=s.localeCompare(u);return 0===e?0:e>0?o:l}return s>u?o:s<u?l:0}))},t=(t,n,o,l)=>{const s=n&&n.query?((e,t)=>e.filter((e=>{for(let n=0;n<t.fields.length;n++){const o=t.fields[n],l=r(e,o);if(l&&-1!==`${l}`.toLowerCase().indexOf(t.query))return!0}return!1})))(t,n):t;if(!s||!s.length)return{items:[],total:0};const u=((e,t)=>{t||(t=e.length);const r=[];for(let n=0,o=e.length;n<o;n+=t)r.push(e.slice(n,n+t));return r})(e(s,o.by,o.order),l.perPage)[l.page-1];return u?{items:u,total:s.length}:{items:[],total:s.length}},r=(e,t)=>t.split(".").reduce(((e,t)=>e[t]),e),n=(e,t,r)=>{const n=t.split(".");return n.reduce(((e,t,o)=>o===n.length-1?(e[t]=r,e[t]):(Object.prototype.hasOwnProperty.call(e,t)||(e[t]={}),e[t])),e)},o=(e,t,r=3,n=2)=>{if(t<=r+n)return l((e=>{const t=[];for(let r=0;r<e;r++)t[r]=r+1;return t})(t));const o=[];for(let l=0;l<n;l++)o.push(l+1),o.push(t-l);for(let l=0;l<Math.ceil(r/2);l++)e-l>1&&o.push(e-l),e+l<t&&o.push(e+l);return l((s=o,s.filter((function(e,t){return s.indexOf(e)===t}))).sort(((e,t)=>e-t)));var s},l=e=>{for(let t=0;t<e.length-1;t++)e[t+1]-e[t]>1&&e.splice(t+1,0,"...");return e=e.map((e=>({value:e,disabled:"..."===e})))};function s(e=[],t=[]){return e.map((e=>(t.filter((e=>"function"==typeof e.render)).forEach((t=>{const o=t.field,l=t.render,s=o.split(".");let u=s.reduce(((e,t,r)=>r===s.length-1?`${e}.$_${t}`:`${e}.${t}`));1===s.length&&(u=`$_${o}`),Object.prototype.hasOwnProperty.call(e,u)||(n(e,u,r(e,o)),n(e,o,l(r(e,o),e)))})),e)))}export{r as dotGet,n as dotSet,t as load,e as orderBy,o as paginate,s as transform};
