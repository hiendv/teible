import{dotGet as t,paginate as e,themeDefault as a,transform as r,load as i}from"teible";export*from"teible";import{Octicon as s,triangleDown as n,triangleUp as o,threeBars as l}from"octicons-vue";const c={i18n:{messages:{en:{teible:{showing:"Showing",total:"of {count} records",last:"the last record",empty:"No records",filter:"Filter records"}}}},methods:{t(t,e){return this.$root&&this.$root.$tc&&this.$root.$te&&this.$root.$te(t)?this.$root.$tc(t,e):this.localize(t,e)}},computed:{localize(){return(e,a)=>{const r=this.$options.i18n;if(!r||!r.messages)return e;const i=r.messages.en,s=t(i,e);return s?a?s.replace("{count}",a):s:e}}}};var u,d,p={exports:{}};u=p,d=function(){function t(t,e){return null!=e&&t instanceof e}var e,a,r;try{e=Map}catch(o){e=function(){}}try{a=Set}catch(o){a=function(){}}try{r=Promise}catch(o){r=function(){}}function i(s,o,l,c,u){"object"==typeof o&&(l=o.depth,c=o.prototype,u=o.includeNonEnumerable,o=o.circular);var d=[],p=[],m="undefined"!=typeof Buffer;return void 0===o&&(o=!0),void 0===l&&(l=1/0),function s(l,f){if(null===l)return null;if(0===f)return l;var h,b;if("object"!=typeof l)return l;if(t(l,e))h=new e;else if(t(l,a))h=new a;else if(t(l,r))h=new r((function(t,e){l.then((function(e){t(s(e,f-1))}),(function(t){e(s(t,f-1))}))}));else if(i.__isArray(l))h=[];else if(i.__isRegExp(l))h=new RegExp(l.source,n(l)),l.lastIndex&&(h.lastIndex=l.lastIndex);else if(i.__isDate(l))h=new Date(l.getTime());else{if(m&&Buffer.isBuffer(l))return h=Buffer.allocUnsafe?Buffer.allocUnsafe(l.length):new Buffer(l.length),l.copy(h),h;t(l,Error)?h=Object.create(l):void 0===c?(b=Object.getPrototypeOf(l),h=Object.create(b)):(h=Object.create(c),b=c)}if(o){var g=d.indexOf(l);if(-1!=g)return p[g];d.push(l),p.push(h)}for(var _ in t(l,e)&&l.forEach((function(t,e){var a=s(e,f-1),r=s(t,f-1);h.set(a,r)})),t(l,a)&&l.forEach((function(t){var e=s(t,f-1);h.add(e)})),l){var y;b&&(y=Object.getOwnPropertyDescriptor(b,_)),y&&null==y.set||(h[_]=s(l[_],f-1))}if(Object.getOwnPropertySymbols){var v=Object.getOwnPropertySymbols(l);for(_=0;_<v.length;_++){var $=v[_];(!(D=Object.getOwnPropertyDescriptor(l,$))||D.enumerable||u)&&(h[$]=s(l[$],f-1),D.enumerable||Object.defineProperty(h,$,{enumerable:!1}))}}if(u){var x=Object.getOwnPropertyNames(l);for(_=0;_<x.length;_++){var D,S=x[_];(D=Object.getOwnPropertyDescriptor(l,S))&&D.enumerable||(h[S]=s(l[S],f-1),Object.defineProperty(h,S,{enumerable:!1}))}}return h}(s,l)}function s(t){return Object.prototype.toString.call(t)}function n(t){var e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),e}return i.clonePrototype=function(t){if(null===t)return null;var e=function(){};return e.prototype=t,new e},i.__objToStr=s,i.__isDate=function(t){return"object"==typeof t&&"[object Date]"===s(t)},i.__isArray=function(t){return"object"==typeof t&&"[object Array]"===s(t)},i.__isRegExp=function(t){return"object"==typeof t&&"[object RegExp]"===s(t)},i.__getRegExpFlags=n,i}(),u.exports&&(u.exports=d);var m=p.exports;function f(t,e,a,r,i,s,n,o){var l,c="function"==typeof t?t.options:t;if(e&&(c.render=e,c.staticRenderFns=a,c._compiled=!0),r&&(c.functional=!0),s&&(c._scopeId="data-v-"+s),n?(l=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),i&&i.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(n)},c._ssrRegister=l):i&&(l=o?function(){i.call(this,(c.functional?this.parent:this).$root.$options.shadowRoot)}:i),l)if(c.functional){c._injectStyles=l;var u=c.render;c.render=function(t,e){return l.call(e),u(t,e)}}else{var d=c.beforeCreate;c.beforeCreate=d?[].concat(d,l):[l]}return{exports:t,options:c}}const h={};var b=f({name:"DataTableBody",components:{DataTableCell:{functional:!0,props:{item:{type:Object,required:!0},column:{type:Object,required:!0},index:{type:Number,required:!0}},render(e,{props:a,data:r}){if(a.column.field){let i=t(a.item,a.column.field);return a.column.scopedSlots&&"function"==typeof a.column.scopedSlots.default?e("td",r,a.column.scopedSlots.default({value:i,item:a.item,column:a.column})):("string"!=typeof i&&(i=JSON.stringify(i)),e("td",r,i))}return a.column.scopedSlots&&"function"==typeof a.column.scopedSlots.default?e("td",r,a.column.scopedSlots.default(a)):e("td",r,a.column.children)}}},inject:["$theme"],props:{items:{type:Array,required:!0},columns:{type:Array,required:!0},click:{type:Function,required:!0},hover:{type:Function,required:!0}},computed:{theme(){return this.$theme()}}},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("tbody",t._l(t.items,(function(e,r){var i;return a("tr",{key:r,class:(i={},i[t.theme.datatable__row]=!0,i[t.theme["datatable__row--odd"]]=r%2==1,i),attrs:{"data-elm":"row","data-odd":r%2==1},on:{click:function(a){return t.click(a,e,r)},mouseenter:function(a){return t.hover(a,e,r)},mouseleave:function(a){return t.hover(a,e,r,!0)}}},t._l(t.columns,(function(i,s){var n;return a("data-table-cell",t._b({key:s,class:(n={},n[t.theme.datatable__cell]=!0,n[t.theme["datatable__cell--last-column"]]=s===t.columns.length-1,n[t.theme["datatable__cell--last-row"]]=r===t.items.length-1,n),attrs:{item:e,column:i,index:r,"data-elm":"cell","data-last-column":s===t.columns.length-1,"data-last-row":r===t.items.length-1}},"data-table-cell",i.attrs,!1))})),1)})),0)}),[],!1,(function(t){for(let e in h)this[e]=h[e]}),null,null,null);b.options.__file="src/DataTableBody.vue";var g=b.exports;const _=t=>{if(t)return t.charAt(0).toUpperCase()+t.slice(1)};const y={name:"DataTableHead",components:{DataTableHeadContent:{functional:!0,props:{column:{type:Object,required:!0},active:{type:Boolean,required:!0},sortDesc:{type:Boolean,required:!0},theme:{type:Object,required:!0}},render(t,{props:e}){const a=e.theme;if(e.column.scopedSlots&&e.column.scopedSlots.header)return t("span",{on:{click(t){t.stopPropagation()}}},e.column.scopedSlots.header(e));const r=[t("span",{attrs:{"data-elm":"column-text",class:a["datatable__column-text"]}},_(e.column.label||e.column.field))];var i,c;return e.column.sortable&&r.push(t(s,{props:{icon:(e.column,i=e.active,c=e.sortDesc,i?c?n:o:l),className:a["datatable__column-icon"]}})),r}}},inject:["$theme"],provide(){return{$theme:this.$theme}},props:{columns:{type:Array,required:!0},sortBy:{type:String,default:""},sortDesc:{type:Boolean,default:!1}},computed:{theme(){return this.$theme()}},methods:{isActive(t){return!!t.sortable&&this.isSortedBy(t.field)},isSortedBy(t){return this.sortBy===t},updateSort(t,e){t&&e&&(this.isSortedBy(t)?this.$emit("update:sortDesc",!this.sortDesc):this.$emit("update:sortBy",t))}}},v={};var $=f(y,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",{class:t.theme.datatable__head,attrs:{"data-elm":"head"}},[t.columns.length?a("tr",t._l(t.columns,(function(e,r){var i;return a("th",t._b({key:e.field+e.label,class:(i={},i[t.theme.datatable__column]=!0,i[t.theme["datatable__column--custom"]]=e.scopedSlots&&e.scopedSlots.header,i[t.theme["datatable__column--sortable"]]=e.sortable,i[t.theme["datatable__column--active"]]=t.isActive(e),i[t.theme["datatable__column--last"]]=r===t.columns.length-1,i[e.staticClass]=e.staticClass,i[e.dynamicClass]=e.dynamicClass,i),attrs:{scope:"col","data-elm":"column","data-custom":e.scopedSlots&&e.scopedSlots.header,"data-sortable":e.sortable,"data-active":t.isActive(e),"data-last":r===t.columns.length-1},on:{click:function(a){return a.preventDefault(),t.updateSort(e.field,e.sortable)}}},"th",e.attrs,!1),[a("data-table-head-content",{attrs:{column:e,active:t.isActive(e),"sort-desc":t.sortDesc,theme:t.theme}})],1)})),0):t._e()])}),[],!1,(function(t){for(let e in v)this[e]=v[e]}),null,null,null);$.options.__file="src/DataTableHead.vue";var x=$.exports;const D={};var S=f({name:"DataTablePagination",mixins:[c],inject:["$theme"],props:{total:{type:Number,required:!0},perPage:{type:Number,required:!0},page:{type:Number,required:!0},eachSide:{type:Number,required:!0}},computed:{pages(){return e(this.page,this.totalPages,3,this.eachSide)},totalPages(){return Math.ceil(this.total/(this.perPage||1))},reachedFirst(){return 1===this.page},reachedLast(){return this.page>=this.totalPages},theme(){return this.$theme()},from(){return(this.page-1)*this.perPage+1},to(){const t=this.page*this.perPage;return this.total<t?this.total:t}},methods:{isActive(t){return!t.disabled&&this.page===t.value},load(t,e){e||t<1||t>this.totalPages||this.$emit("update:page",t)}}},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("nav",{class:t.theme.datatable__pagination,attrs:{"data-elm":"pagination"}},[t.total?a("span",{class:t.theme.datatable__ptext,attrs:{"data-elm":"ptext"}},[t._v(" "+t._s(t.t("teible.showing"))+" "),a("span",{domProps:{textContent:t._s(t.from===t.to&&t.to===t.total?t.t("teible.last"):t.from+" – "+t.to)}}),t._v(" "+t._s(t.t("teible.total",t.total))+" ")]):a("span",{class:t.theme.datatable__ptext,attrs:{"data-elm":"ptext"}},[t._v(t._s(t.t("teible.empty")))]),a("a",{class:[t.theme.datatable__plink,t.theme.datatable__pprevious],attrs:{disabled:t.reachedFirst,href:"#","aria-label":"Previous","data-elm":"plink","data-previous":""},on:{click:function(e){return e.preventDefault(),t.load(t.page-1)}}},[a("span",{attrs:{"aria-hidden":"true"}},[t._v("«")])]),a("a",{class:[t.theme.datatable__plink,t.theme.datatable__pnext],attrs:{disabled:t.reachedLast,href:"#","aria-label":"Next","data-elm":"plink","data-pnext":""},on:{click:function(e){return e.preventDefault(),t.load(t.page+1)}}},[a("span",{attrs:{"aria-hidden":"true"}},[t._v("»")])]),a("ul",{class:t.theme.datatable__plist,attrs:{"data-elm":"plist"}},t._l(t.pages,(function(e,r){var i;return a("li",{key:r,class:t.theme.datatable__pitem,attrs:{"data-elm":"pitem"}},[a("a",{class:(i={},i[t.theme.datatable__plink]=!0,i[t.theme["datatable__plink--active"]]=t.isActive(e),i),attrs:{disabled:e.disabled,href:"#","data-elm":"plink","data-active":t.isActive(e)},on:{click:function(a){return a.preventDefault(),t.load(e.value,e.disabled)}}},[t._v(t._s(e.value))])])})),0)])}),[],!1,(function(t){for(let e in D)this[e]=D[e]}),null,null,null);S.options.__file="src/DataTablePagination.vue";var B=S.exports;const C={};var w=f({name:"DataTableFilter",mixins:[c],inject:["$theme"],props:{filter:{type:String,required:!0}},computed:{theme(){return this.$theme()}},methods:{update(t){this.$emit("update:filter",t)},clear(){this.$emit("update:filter","")}}},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{class:t.theme.datatable__filter,attrs:{"data-elm":"filter"}},[a("input",{class:t.theme.datatable__input,attrs:{type:"text",placeholder:t.t("teible.filter"),"data-elm":"input"},domProps:{value:t.filter},on:{input:function(e){return t.update(e.target.value)}}}),t.filter?a("div",{class:t.theme.datatable__clear,attrs:{"data-elm":"clear"},on:{click:function(e){return e.stopPropagation(),t.clear.apply(null,arguments)}}},[a("a",{class:t.theme.datatable__x,attrs:{href:"#","data-elm":"x"},on:{click:function(e){return e.stopPropagation(),e.preventDefault(),t.clear.apply(null,arguments)}}},[t._v("×")])]):t._e()])}),[],!1,(function(t){for(let e in C)this[e]=C[e]}),null,null,null);w.options.__file="src/DataTableFilter.vue";var P=w.exports;const j={inject:["$theme"],props:{active:{type:Boolean,default:!0}},computed:{theme(){return this.$theme()}}},O={};var N=f(j,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("transition",{attrs:{name:"datatable"}},[a("div",{directives:[{name:"show",rawName:"v-show",value:t.active,expression:"active"}],class:t.theme.datatable__loading,attrs:{"data-elm":"loading"}},[t._t("default",(function(){return[a("svg",{attrs:{viewBox:"0 0 105 105",xmlns:"http://www.w3.org/2000/svg",fill:"#fff",width:"40px"}},[a("circle",{attrs:{cx:"12.5",cy:"12.5",r:"12.5"}},[a("animate",{attrs:{attributeName:"fill-opacity",begin:"0s",dur:"1s",values:"1;.2;1",calcMode:"linear",repeatCount:"indefinite"}})]),a("circle",{attrs:{cx:"12.5",cy:"52.5",r:"12.5","fill-opacity":".5"}},[a("animate",{attrs:{attributeName:"fill-opacity",begin:"100ms",dur:"1s",values:"1;.2;1",calcMode:"linear",repeatCount:"indefinite"}})]),a("circle",{attrs:{cx:"52.5",cy:"12.5",r:"12.5"}},[a("animate",{attrs:{attributeName:"fill-opacity",begin:"300ms",dur:"1s",values:"1;.2;1",calcMode:"linear",repeatCount:"indefinite"}})]),a("circle",{attrs:{cx:"52.5",cy:"52.5",r:"12.5"}},[a("animate",{attrs:{attributeName:"fill-opacity",begin:"600ms",dur:"1s",values:"1;.2;1",calcMode:"linear",repeatCount:"indefinite"}})]),a("circle",{attrs:{cx:"92.5",cy:"12.5",r:"12.5"}},[a("animate",{attrs:{attributeName:"fill-opacity",begin:"800ms",dur:"1s",values:"1;.2;1",calcMode:"linear",repeatCount:"indefinite"}})]),a("circle",{attrs:{cx:"92.5",cy:"52.5",r:"12.5"}},[a("animate",{attrs:{attributeName:"fill-opacity",begin:"400ms",dur:"1s",values:"1;.2;1",calcMode:"linear",repeatCount:"indefinite"}})]),a("circle",{attrs:{cx:"12.5",cy:"92.5",r:"12.5"}},[a("animate",{attrs:{attributeName:"fill-opacity",begin:"700ms",dur:"1s",values:"1;.2;1",calcMode:"linear",repeatCount:"indefinite"}})]),a("circle",{attrs:{cx:"52.5",cy:"92.5",r:"12.5"}},[a("animate",{attrs:{attributeName:"fill-opacity",begin:"500ms",dur:"1s",values:"1;.2;1",calcMode:"linear",repeatCount:"indefinite"}})]),a("circle",{attrs:{cx:"92.5",cy:"92.5",r:"12.5"}},[a("animate",{attrs:{attributeName:"fill-opacity",begin:"200ms",dur:"1s",values:"1;.2;1",calcMode:"linear",repeatCount:"indefinite"}})])])]}))],2)])}),[],!1,(function(t){for(let e in O)this[e]=O[e]}),null,null,null);N.options.__file="src/Loading.vue";const k={name:"DataTable",components:{DataTableBody:g,DataTableHead:x,DataTablePagination:B,DataTableFilter:P,Loading:N.exports},mixins:[c],provide(){return{$theme:()=>this.theme}},props:{items:{type:[Array,Function],required:!0},page:{type:Number,default:1},perPage:{type:Number,default:10},sortBy:{type:String,default:""},sortDesc:{type:Boolean,default:!1},filter:{type:String,default:""},theme:{type:Object,default:()=>a},disableFiltering:{type:Boolean,default:!1},disableLoader:{type:Boolean,default:!1},pagination:{type:Array,default:()=>["bottom"]},paginationSide:{type:Number,default:2},rowClick:{type:Function,default:(t,e,a)=>{}},rowHover:{type:Function,default:(t,e,a)=>{}}},data(){return{actualItems:[],vnodes:[],total:0,p:this.page,options:{sortBy:this.sortBy,sortDesc:this.sortDesc,filter:this.filter},loading:!1,staticClass:""}},computed:{paginationTop(){return this.pagination.indexOf("top")>-1},paginationBottom(){return this.pagination.indexOf("bottom")>-1},func(){return this.items instanceof Function},identifier(){return this.disableFiltering?`by:${this.sorting.by}|order:${this.sorting.order}|page:${this.p}|per_page:${this.perPage}`:`by:${this.sorting.by}|order:${this.sorting.order}|filter:${this.options.filter}|page:${this.p}|per_page:${this.perPage}`},columns(){return this.vnodes.map((t=>{const{componentOptions:{Ctor:{options:{props:e}},propsData:a,children:r},data:{scopedSlots:i,attrs:s,class:n,staticClass:o}}=t,{field:l,label:c,sortable:u,filterable:d,render:p}=((t,e)=>{const a={};for(const r in t)void 0===e[r]?"function"!=typeof t[r].default?a[r]=t[r].default:a[r]=t[r].default():a[r]=e[r];return a})(e,a);return{field:l,label:c,sortable:u,filterable:d,render:p,scopedSlots:i,children:r,attrs:s,dynamicClass:n,staticClass:o}}))},filterable(){return this.columns.filter((t=>t.filterable)).map((t=>t.field)).filter((t=>t))},filtering(){return this.disableFiltering?{query:""}:{query:this.options.filter,fields:this.filterable}},paging(){return{page:this.p,perPage:this.perPage}},sorting(){return{by:this.options.sortBy,order:this.options.sortDesc?"desc":"asc"}},transformed(){return this.func?[]:this.transform(m(this.items,!1))}},watch:{items:"loadItems",identifier:"loadItems",sortBy:{immediate:!0,handler(t){this.$set(this.options,"sortBy",t)}},sortDesc:{immediate:!0,handler(t){this.$set(this.options,"sortDesc",t)}},filter:{immediate:!0,handler(t){this.$set(this.options,"filter",t),this.p=1}},"options.sortBy"(t){this.$emit("update:sortBy",t)},"options.sortDesc"(t){this.$emit("update:sortDesc",t)},"options.filter"(t){this.$emit("update:filter",t)},p(t){this.$emit("update:page",t)},page:{immediate:!0,handler(t){t!==this.p&&(this.p=t)}}},created(){this.loadClass(),this.loadSlots(),this.loadItems()},methods:{transform(t){return r(t,this.columns)},loadSlots(){this.vnodes=this.$slots.default?this.$slots.default.filter((t=>t.componentOptions)):[]},loadClass(){this.staticClass=this.$vnode.data.staticClass},loadItems(){if(this.func)return this.loading=!0,void Promise.resolve(this.items(this.filtering,this.sorting,this.paging)).then((t=>{this.actualItems=this.transform(t.items),this.total=t.total})).then((()=>{this.loading=!1})).catch((()=>{this.loading=!1})).finally(this.ping);if(!this.items)return this.actualItems=[],this.total=0,this.ping();const t=i(this.transformed,this.filtering,this.sorting,this.paging);return this.actualItems=t.items,this.total=t.total,this.ping()},reloadItems(){if(1===this.p)return this.loadItems();this.p=1},ping(){this.$emit("loaded",{items:this.actualItems,total:this.total})}}},T={};var q=f(k,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{class:[t.theme.datatable,t.staticClass]},[a("div",{class:t.theme.datatable__wrapper,attrs:{"data-elm":"wrapper"}},[t.disableFiltering?t._e():a("data-table-filter",{attrs:{filter:t.options.filter},on:{"update:filter":function(e){return t.$set(t.options,"filter",e)}}}),t.paginationTop?a("data-table-pagination",{attrs:{"per-page":t.perPage,page:t.p,total:t.total,"each-side":t.paginationSide},on:{"update:page":function(e){t.p=e}}}):t._e(),a("div",{class:t.theme.datatable__screen,attrs:{"data-elm":"screen"}},[t.disableLoader?t._e():a("loading",{attrs:{active:t.loading}},[t._t("loader")],2),a("table",{class:t.theme.datatable__content,attrs:{cellspacing:"0",cellpadding:"0","data-elm":"content"}},[a("data-table-head",{attrs:{columns:t.columns,"sort-by":t.options.sortBy,"sort-desc":t.options.sortDesc},on:{"update:sortBy":function(e){return t.$set(t.options,"sortBy",e)},"update:sort-by":function(e){return t.$set(t.options,"sortBy",e)},"update:sortDesc":function(e){return t.$set(t.options,"sortDesc",e)},"update:sort-desc":function(e){return t.$set(t.options,"sortDesc",e)}}}),a("data-table-body",{attrs:{columns:t.columns,items:t.actualItems,click:t.rowClick,hover:t.rowHover}})],1)],1),t.paginationBottom?a("data-table-pagination",{attrs:{"per-page":t.perPage,page:t.p,total:t.total,"each-side":t.paginationSide},on:{"update:page":function(e){t.p=e}}}):t._e()],1)])}),[],!1,(function(t){for(let e in T)this[e]=T[e]}),null,null,null);q.options.__file="src/DataTable.vue";var E=q.exports,F={name:"DataColumn",props:{label:{type:String,required:!0},field:{type:String,default:""},sortable:{type:Boolean,default:!0},filterable:{type:Boolean,default:!0},render:{type:Function}}};export default E;export{F as DataColumn,E as DataTable};
