var vueteible=function(t){"use strict";var a=function(t,e,a,n){var r,i=e&&e.query?(r=e,t.filter(function(t){for(var e=0;e<r.fields.length;e++){var a=r.fields[e],n=l(t,a);if(n&&-1!==(""+n).toLowerCase().indexOf(r.query))return!0}return!1})):t;if(!i||!i.length)return{items:[],total:0};var o=function(t,e){e||(e=t.length);for(var a=[],n=0,r=t.length;n<r;n+=e)a.push(t.slice(n,n+e));return a}(function(t,i,e){if(!t||!t.length)return[];var o="desc"===e?-1:1,s=-o;return t.sort(function(t,e){var a=l(t,i),n=l(e,i);if(!a&&!n)return 0;if(!a&&0!==a)return s;if(!n&&0!==n)return o;if("number"==typeof a&&"number"==typeof n)return a===n?0:n<a?o:s;if("string"!=typeof a||"string"!=typeof n)return n<a?o:a<n?s:0;var r=a.localeCompare(n);return 0===r?0:0<r?o:s})}(i,a.by,a.order),n.perPage)[n.page-1];return o?{items:o,total:i.length}:{items:[],total:i.length}},l=function(t,e){return e.split(".").reduce(function(t,e){return t[e]},t)},r=function(t,e,n){var r=e.split(".");return r.reduce(function(t,e,a){return a===r.length-1?t[e]=n:t.hasOwnProperty(e)||(t[e]={}),t[e]},t)},o=function(t){for(var e=0;e<t.length-1;e++)1<t[e+1]-t[e]&&t.splice(e+1,0,"...");return t=t.map(function(t){return{value:t,disabled:"..."===t}})};var e=function(t,e,a,n,r,i,o,s,l,u){"boolean"!=typeof o&&(l=s,s=o,o=!1);var c,d="function"==typeof a?a.options:a;if(t&&t.render&&(d.render=t.render,d.staticRenderFns=t.staticRenderFns,d._compiled=!0,r&&(d.functional=!0)),n&&(d._scopeId=n),i?(c=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),e&&e.call(this,l(t)),t&&t._registeredComponents&&t._registeredComponents.add(i)},d._ssrRegister=c):e&&(c=o?function(){e.call(this,u(this.$root.$options.shadowRoot))}:function(t){e.call(this,s(t))}),c)if(d.functional){var p=d.render;d.render=function(t,e){return c.call(e),p(t,e)}}else{var f=d.beforeCreate;d.beforeCreate=f?[].concat(f,c):[c]}return a},n={name:"DataTableBody",components:{DataTableCell:{functional:!0,props:{item:{type:Object,required:!0},column:{type:Object,required:!0}},render:function(t,e){var a=e.props,n=e.data;if(a.column.field){var r=l(a.item,a.column.field);return"string"!=typeof r&&(r=JSON.stringify(r)),a.column.scopedSlots&&"function"==typeof a.column.scopedSlots.default?t("td",n,a.column.scopedSlots.default({value:r,item:a.item,column:a.column})):t("td",n,r)}return a.column.scopedSlots&&"function"==typeof a.column.scopedSlots.default?t("td",n,a.column.scopedSlots.default(a)):t("td",n,a.column.children)}}},props:{items:{type:Array,required:!0},columns:{type:Array,required:!0}}},i=function(){var r=this,t=r.$createElement,i=r._self._c||t;return i("tbody",r._l(r.items,function(a,n){return i("tr",{key:n,class:["datatable__row",{"datatable__row--odd":n%2==1,"datatable__row--last":n===r.items.length-1}]},r._l(r.columns,function(t,e){return i("data-table-cell",r._b({key:e,class:["datatable__cell",{"datatable__cell--last-column":e===r.columns.length-1,"datatable__cell--last-row":n===r.items.length-1}],attrs:{item:a,column:t}},"data-table-cell",t.attrs,!1))}),1)}),0)},s=(i._withStripped=!0,e({render:i,staticRenderFns:[]},void 0,n,void 0,!1,void 0,void 0,void 0)),u={functional:!0,props:{icon:{type:Object,required:!0,validator:function(t){return t.attrs instanceof Function&&t.path instanceof Function}},scale:{type:Number,default:1},className:{type:String,default:null},label:{type:String,default:null}},render:function(t,e){var a=e.props,n=a.icon,r={scale:a.scale,class:a.className,label:a.label};return t("svg",{attrs:n.attrs(r)},[t("path",{attrs:n.path()})])}};var c=function(i,a,n,t,e){var r=function(t){var e=function(e){for(var t=arguments,a=[],n=arguments.length-1;0<n--;)a[n]=t[n+1];for(var r,i=0,o=a.length;i<o;i++)r=a[i],Object.keys(r).forEach(function(t){"__proto__"!==t&&(e[t]=r[t])});return e}({scale:1,label:null,class:null},t||{});return o({version:"1.1",width:a,height:n,viewBox:"0 0 "+a+" "+n},e)},o=function(t,e){e.label?t["aria-label"]=e.label:t["aria-hidden"]=!0,e.class?t.class="octicon octicon-"+i+" "+e.class:t.class="octicon octicon-"+i;var a=0===e.scale?0:parseFloat(e.scale)||1,n=a*parseInt(t.width),r=a*parseInt(t.height);return t.width=Number(n.toFixed(2)),t.height=Number(r.toFixed(2)),t},s=function(e){return Object.keys(e).map(function(t){return t+'="'+e[t]+'"'}).join(" ").trim()};return{name:i,path:function(){return t},keywords:function(){return e},attrs:function(t){return r(t)},html:function(t){return"<svg "+s(this.attrs(t))+"><path "+s(this.path())+"/></svg>"}}},d=c("triangle-down",12,16,{"fill-rule":"evenodd",d:"M0 5l6 6 6-6H0z"},["arrow","point","direction"]),p=c("triangle-up",12,16,{"fill-rule":"evenodd",d:"M12 11L6 5l-6 6h12z"},["arrow","point","direction"]),f=c("three-bars",12,16,{"fill-rule":"evenodd",d:"M11.41 9H.59C0 9 0 8.59 0 8c0-.59 0-1 .59-1H11.4c.59 0 .59.41.59 1 0 .59 0 1-.59 1h.01zm0-4H.59C0 5 0 4.59 0 4c0-.59 0-1 .59-1H11.4c.59 0 .59.41.59 1 0 .59 0 1-.59 1h.01zM.59 11H11.4c.59 0 .59.41.59 1 0 .59 0 1-.59 1H.59C0 13 0 12.59 0 12c0-.59 0-1 .59-1z"},["hamburger","menu","dropdown"]),h={name:"DataTableHead",components:{DataTableHeadContent:{functional:!0,props:{column:{type:Object,required:!0},active:{type:Boolean,required:!0},sortDesc:{type:Boolean,required:!0}},render:function(t,e){var a=e.props;if(a.column.scopedSlots&&a.column.scopedSlots.header)return t("span",{on:{click:function(t){t.stopPropagation()}}},a.column.scopedSlots.header(a));var n,r,i=[t("span",{attrs:{class:"datatable__column-text"}},function(t){if(t)return t.charAt(0).toUpperCase()+t.slice(1)}(a.column.label||a.column.field))];return a.column.sortable&&i.push(t(u,{props:{icon:(a.column,n=a.active,r=a.sortDesc,n?r?d:p:f),className:"datatable__column-icon"}})),i}}},props:{columns:{type:Array,required:!0},sortBy:{type:String,default:""},sortDesc:{type:Boolean,default:!1}},methods:{isActive:function(t){return!!t.sortable&&this.isSortedBy(t.field)},isSortedBy:function(t){return this.sortBy===t},updateSort:function(t,e){t&&e&&(this.isSortedBy(t)?this.$emit("update:sortDesc",!this.sortDesc):this.$emit("update:sortBy",t))}}},m=function(){var a=this,t=a.$createElement,n=a._self._c||t;return n("thead",{staticClass:"datatable__head"},[a.columns.length?n("tr",a._l(a.columns,function(e,t){return n("th",a._b({key:e.field+e.label,class:["datatable__column",{"datatable__column--custom":e.scopedSlots&&e.scopedSlots.header,"datatable__column--sortable":e.sortable,"datatable__column--active":a.isActive(e),"datatable__column--last":t===a.columns.length-1},e.staticClass,e.dynamicClass],attrs:{scope:"col"},on:{click:function(t){return t.preventDefault(),a.updateSort(e.field,e.sortable)}}},"th",e.attrs,!1),[n("data-table-head-content",{attrs:{column:e,active:a.isActive(e),"sort-desc":a.sortDesc}})],1)}),0):a._e()])},_=(m._withStripped=!0,e({render:m,staticRenderFns:[]},void 0,h,void 0,!1,void 0,void 0,void 0)),v={name:"DataTablePagination",props:{total:{type:Number,required:!0},perPage:{type:Number,required:!0},page:{type:Number,required:!0}},computed:{pages:function(){return function(t,e){if(e<=5)return o(function(t){for(var e=[],a=0;a<t;a++)e[a]=a+1;return e}(e));for(var a,n=[],r=0;r<2;r++)n.push(r+1),n.push(e-r);for(var i=0;i<Math.ceil(1.5);i++)1<t-i&&n.push(t-i),t+i<e&&n.push(t+i);return o((a=n,a.filter(function(t,e){return a.indexOf(t)===e})).sort(function(t,e){return t-e}))}(this.page,this.totalPages)},totalPages:function(){return Math.ceil(this.total/(this.perPage||1))},reachedFirst:function(){return 1===this.page},reachedLast:function(){return this.page>=this.totalPages}},methods:{isActive:function(t){return!t.disabled&&this.page===t.value},load:function(t,e){e||t<1||t>this.totalPages||this.$emit("update:page",t)}}},b=function(){var a=this,t=a.$createElement,n=a._self._c||t;return n("nav",{staticClass:"datatable__pagination"},[n("ul",{staticClass:"datatable__plist"},[n("li",{staticClass:"datatable__pitem"},[n("a",{class:["datatable__plink datatable__pprev",{"datatable__plink--disabled":a.reachedFirst}],attrs:{href:"#","aria-label":"Previous"},on:{click:function(t){return t.preventDefault(),a.load(a.page-1)}}},[n("span",{attrs:{"aria-hidden":"true"}},[a._v("«")])])]),a._l(a.pages,function(e,t){return n("li",{key:t,staticClass:"datatable__pitem"},[n("a",{class:["datatable__plink",{"datatable__plink--active":a.isActive(e),"datatable__plink--disabled":e.disabled}],attrs:{href:"#"},on:{click:function(t){return t.preventDefault(),a.load(e.value,e.disabled)}}},[a._v(a._s(e.value))])])}),n("li",{staticClass:"datatable__pitem"},[n("a",{class:["datatable__plink datatable__pnext",{"datatable__plink--disabled":a.reachedLast}],attrs:{href:"#","aria-label":"Next"},on:{click:function(t){return t.preventDefault(),a.load(a.page+1)}}},[n("span",{attrs:{"aria-hidden":"true"}},[a._v("»")])])])],2)])},g=(b._withStripped=!0,e({render:b,staticRenderFns:[]},void 0,v,void 0,!1,void 0,void 0,void 0)),y={name:"DataTableFilter",props:{filter:{type:String,required:!0}},methods:{update:function(t){this.$emit("update:filter",t)},clear:function(){this.$emit("update:filter","")}}},C=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"datatable__filter"},[a("input",{staticClass:"datatable__input",attrs:{type:"text",placeholder:"Filter table data"},domProps:{value:e.filter},on:{input:function(t){return e.update(t.target.value)}}}),e._v(" "),e.filter?a("div",{staticClass:"datatable__clear",on:{click:function(t){return t.stopPropagation(),e.clear(t)}}},[a("a",{staticClass:"datatable__x",attrs:{href:"#"},on:{click:function(t){return t.stopPropagation(),t.preventDefault(),e.clear(t)}}},[e._v("×")])]):e._e()])},S=(C._withStripped=!0,{name:"DataTable",components:{DataTableBody:s,DataTableHead:_,DataTablePagination:g,DataTableFilter:e({render:C,staticRenderFns:[]},void 0,y,void 0,!1,void 0,void 0,void 0)},props:{items:{type:[Array,Function],required:!0},perPage:{type:Number,default:10},sortBy:{type:String,default:""},sortDesc:{type:Boolean,default:!1},filter:{type:String,default:""}},data:function(){return{actualItems:[],vnodes:[],total:0,page:1,options:{sortBy:this.sortBy,sortDesc:this.sortDesc,filter:this.filter}}},computed:{func:function(){return this.items instanceof Function},identifier:function(){return"by:"+this.sorting.by+"|order:"+this.sorting.order+"|filter:"+this.options.filter+"|page:"+this.page+"|per_page:"+this.perPage},columns:function(){return this.vnodes.map(function(t){var e=t.componentOptions,a=e.Ctor.options.props,n=e.propsData,r=e.children,i=t.data,o=i.scopedSlots,s=i.attrs,l=i.class,u=i.staticClass,c=function(t,e){var a={};for(var n in t)void 0===e[n]?"function"!=typeof t[n].default?a[n]=t[n].default:a[n]=t[n].default():a[n]=e[n];return a}(a,n);return{field:c.field,label:c.label,sortable:c.sortable,filterable:c.filterable,render:c.render,scopedSlots:o,children:r,attrs:s,dynamicClass:l,staticClass:u}})},filterable:function(){return this.columns.filter(function(t){return t.filterable}).map(function(t){return t.field}).filter(function(t){return t})},filtering:function(){return{query:this.options.filter.toLowerCase(),fields:this.filterable}},paging:function(){return{page:this.page,perPage:this.perPage}},sorting:function(){return{by:this.options.sortBy,order:this.options.sortDesc?"desc":"asc"}},from:function(){return(this.page-1)*this.perPage+1},to:function(){var t=this.page*this.perPage;return this.total<t?this.total:t},transformed:function(){return this.func?[]:this.transform(this.items)}},watch:{items:"loadItems",identifier:"loadItems",sortBy:{immediate:!0,handler:function(t){this.$set(this.options,"sortBy",t)}},sortDesc:{immediate:!0,handler:function(t){this.$set(this.options,"sortDesc",t)}},filter:{immediate:!0,handler:function(t){this.$set(this.options,"filter",t),this.page=1}},"options.sortBy":function(t){this.$emit("update:sortBy",t)},"options.sortDesc":function(t){this.$emit("update:sortDesc",t)},"options.filter":function(t){this.$emit("update:filter",t)}},created:function(){this.loadSlots(),this.loadItems()},methods:{transform:function(t){var e=this;return t.map(function(a){return e.columns.filter(function(t){return"function"==typeof t.render}).forEach(function(t){var n=t.field.split("."),e=n.reduce(function(t,e,a){return a===n.length-1?t+".$_"+e:t+"."+e});1===n.length&&(e="$_"+e),a.hasOwnProperty(e)||(r(a,e,l(a,t.field)),r(a,t.field,t.render(l(a,t.field),a)))}),a})},loadSlots:function(){this.vnodes=this.$slots.default?this.$slots.default.filter(function(t){return t.componentOptions}):[]},loadItems:function(){var e=this;if(this.func)return Promise.resolve(this.items(this.filtering,this.sorting,this.paging)).then(function(t){e.actualItems=e.transform(t.items),e.total=t.total}),this.ping();if(!this.items)return this.actualItems=[],this.total=0,this.ping();var t=a(this.transformed,this.filtering,this.sorting,this.paging);return this.actualItems=t.items,this.total=t.total,this.ping()},ping:function(){this.$emit("loaded",{items:this.actualItems,total:this.total})}}}),D=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"datatable"},[a("div",{staticClass:"datatable__wrapper"},[a("div",{staticClass:"datatable__heading"},[a("data-table-filter",{staticClass:"datatable__unit",attrs:{filter:e.options.filter},on:{"update:filter":function(t){return e.$set(e.options,"filter",t)}}}),e._v(" "),a("div",{staticClass:"datatable__unit datatable__text"},[e.total?a("span",[e._v("\n          Showing "),a("span",{domProps:{textContent:e._s(e.from===e.to&&e.to===e.total?"the last entry":e.from+" to "+e.to)}}),e._v(" of "+e._s(e.total)+" records\n        ")]):a("span",[e._v("No records")])])],1),e._v(" "),a("div",{staticClass:"datatable__screen"},[a("table",{staticClass:"datatable__content",attrs:{cellspacing:"0",cellpadding:"0"}},[a("data-table-head",{attrs:{columns:e.columns,"sort-by":e.options.sortBy,"sort-desc":e.options.sortDesc},on:{"update:sortBy":function(t){return e.$set(e.options,"sortBy",t)},"update:sort-by":function(t){return e.$set(e.options,"sortBy",t)},"update:sortDesc":function(t){return e.$set(e.options,"sortDesc",t)},"update:sort-desc":function(t){return e.$set(e.options,"sortDesc",t)}}}),e._v(" "),a("data-table-body",{attrs:{columns:e.columns,items:e.actualItems}})],1)]),e._v(" "),a("data-table-pagination",{attrs:{"per-page":e.perPage,page:e.page,total:e.total},on:{"update:page":function(t){e.page=t}}})],1)])},$=(D._withStripped=!0,e({render:D,staticRenderFns:[]},void 0,S,void 0,!1,void 0,void 0,void 0)),B={name:"DataColumn",props:{label:{type:String,required:!0},field:{type:String,default:""},sortable:{type:Boolean,default:!0},filterable:{type:Boolean,default:!0},render:{type:Function}}};return t.DataColumn=B,t.DataTable=$,t.default=$,t}({});
