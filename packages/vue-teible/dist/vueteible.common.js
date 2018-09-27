'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Octicon = require('octicons-vue');
var Octicon__default = _interopDefault(Octicon);

const chunk = (arr, size) => {
  if (!size) {
    size = arr.length;
  }

  let result = [];
  for (let i = 0, len = arr.length; i < len; i += size) { result.push(arr.slice(i, i + size)); }
  return result
};

const orderBy = (arr, field, order) => {
  let copy = [...arr];
  copy.sort((a, b) => {
    if (order === 'desc') {
      return dotGet(a, field) < dotGet(b, field)
    }

    return dotGet(a, field) > dotGet(b, field)
  });

  return copy
};

const filter = (items, filtering) => {
  return items.filter(item => {
    for (let i = 0; i < filtering.fields.length; i++) {
      let field = filtering.fields[i];
      let value = dotGet(item, field);

      if (!value) {
        continue
      }

      if (`${value}`.toLowerCase().indexOf(filtering.query) === -1) {
        continue
      }

      return true
    }

    return false
  })
};

const load = (data, filtering, sorting, paging) => {
  let filtered = (!filtering || !filtering.query) ? data : filter(data, filtering);
  if (!filtered || !filtered.length) {
    return {
      items: [],
      total: 0
    }
  }

  let ordered = orderBy(filtered, sorting.by, sorting.order);
  let chunked = chunk(ordered, paging.perPage);
  let items = chunked[paging.page - 1];
  if (!items) {
    return {
      items: [],
      total: filtered.length
    }
  }

  return {
    items,
    total: filtered.length
  }
};

const defaultProps = (options, data) => {
  let props = {};
  for (let key in options) {
    if (data[key] !== undefined) {
      props[key] = data[key];
      continue
    }

    if (typeof options[key].default === 'function') {
      props[key] = options[key].default();
      continue
    }

    props[key] = options[key].default;
  }

  return props
};

const dotGet = (obj, path) => {
  return path.split('.').reduce((o, i) => o[i], obj)
};

const dotSet = (obj, path, val) => {
  let parts = path.split('.');
  return parts.reduce((o, i, idx) => {
    if (idx === parts.length - 1) {
      o[i] = val;
      return o[i]
    }

    if (!o.hasOwnProperty(i)) {
      o[i] = {};
    }

    return o[i]
  }, obj)
};

var DataTableCell = {
  functional: true,
  props: {
    item: {
      type: Object,
      required: true
    },
    column: {
      type: Object,
      required: true
    }
  },
  render (h, { props, data }) {
    if (props.column.field) {
      let value = dotGet(props.item, props.column.field);
      if (typeof value !== 'string') {
        value = JSON.stringify(value);
      }

      if (props.column.scopedSlots && typeof props.column.scopedSlots.default === 'function') {
        return h('td', data, props.column.scopedSlots.default({ value, item: props.item, column: props.column }))
      }

      return h('td', data, value)
    }

    if (props.column.scopedSlots && typeof props.column.scopedSlots.default === 'function') {
      return h('td', data, props.column.scopedSlots.default(props))
    }

    return h('td', data, props.column.children)
  }
};

//
var script = {
  name: 'DataTableBody',
  components: { DataTableCell },
  props: {
    items: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      required: true
    }
  }
};

/* script */
            const __vue_script__ = script;
            
/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('tbody',_vm._l((_vm.items),function(d,index){return _c('tr',{key:index,class:[
      'datatable__row',
      {
        'datatable__row--odd': index % 2 === 1,
        'datatable__row--last': index === _vm.items.length - 1
      }
  ]},_vm._l((_vm.columns),function(column,columnIndex){return _c('data-table-cell',{key:columnIndex,class:[
        'datatable__cell',
        {
          'datatable__cell--last-column': columnIndex === _vm.columns.length - 1,
          'datatable__cell--last-row': index === _vm.items.length - 1
        }
    ],attrs:{"item":d,"column":column}})}))}))};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-4483f897_0", { source: ".datatable__row{background-color:#fff}.datatable__row--odd{background-color:#e9ecef}.datatable__cell{position:relative;padding:.3em .5em;border-right:1px solid #dee2e6;border-bottom:1px solid #dee2e6;vertical-align:middle;text-align:left}.datatable__cell--last-column{border-right:0}.datatable__cell--last-row{border-bottom:0}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* component normalizer */
  function __vue_normalize__(
    template, style, script$$1,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "DataTableBody.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    {
      let hook;
      if (style) {
        hook = function(context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook !== undefined) {
        if (component.functional) {
          // register for functional component in vue file
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context)
          };
        } else {
          // inject component registration as beforeCreate hook
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }

    return component
  }
  /* style inject */
  function __vue_create_injector__() {
    const head = document.head || document.getElementsByTagName('head')[0];
    const styles = __vue_create_injector__.styles || (__vue_create_injector__.styles = {});
    const isOldIE =
      typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return // SSR styles are present.

      const group = isOldIE ? css.media || 'default' : id;
      const style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        let code = css.source;
        let index = style.ids.length;

        style.ids.push(id);

        if (css.map) {
          // https://developer.chrome.com/devtools/docs/javascript-debugging
          // this makes source maps inside style tags work properly in Chrome
          code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
          // http://stackoverflow.com/a/26603875
          code +=
            '\n/*# sourceMappingURL=data:application/json;base64,' +
            btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
            ' */';
        }

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          const el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) el.setAttribute('media', css.media);
          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts
            .filter(Boolean)
            .join('\n');
        } else {
          const textNode = document.createTextNode(code);
          const nodes = style.element.childNodes;
          if (nodes[index]) style.element.removeChild(nodes[index]);
          if (nodes.length) style.element.insertBefore(textNode, nodes[index]);
          else style.element.appendChild(textNode);
        }
      }
    }
  }
  /* style inject SSR */
  

  
  var DataTableBody = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    __vue_create_injector__,
    undefined
  );

const capitalize = str => {
  if (!str) {
    return
  }

  return str.charAt(0).toUpperCase() + str.slice(1)
};

const icon = (column, active, sortDesc) => {
  if (active) {
    return sortDesc ? Octicon.triangleDown : Octicon.triangleUp
  }

  return Octicon.threeBars
};

var DataTableHeadContent = {
  functional: true,
  props: {
    column: {
      type: Object,
      required: true
    },
    active: {
      type: Boolean,
      required: true
    },
    sortDesc: {
      type: Boolean,
      required: true
    }
  },
  render (h, { props, data }) {
    if (props.column.scopedSlots && props.column.scopedSlots.header) {
      return h('span', {
        on: {
          click ($event) {
            $event.stopPropagation();
          }
        }
      }, props.column.scopedSlots.header(props))
    }

    let children = [ h('span', {
      attrs: {
        class: 'datatable__column-text'
      }
    }, capitalize(props.column.label)) ];
    if (props.column.sortable) {
      children.push(h(Octicon__default, {
        props: {
          icon: icon(props.column, props.active, props.sortDesc),
          className: 'datatable__column-icon'
        }
      }));
    }
    return children
  }
};

//

var script$1 = {
  name: 'DataTableHead',
  components: { DataTableHeadContent },
  props: {
    columns: {
      type: Array,
      required: true
    },
    sortBy: {
      type: String,
      default: ''
    },
    sortDesc: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    isActive (column) {
      return !!(column.sortable) && this.isSortedBy(column.field)
    },
    isSortedBy (field) {
      return this.sortBy === field
    },
    updateSort (field, sortable) {
      if (!field) {
        return
      }

      if (!sortable) {
        return
      }

      if (this.isSortedBy(field)) {
        this.$emit('update:sortDesc', !this.sortDesc);
        return
      }

      this.$emit('update:sortBy', field);
    }
  }
};

/* script */
            const __vue_script__$1 = script$1;
            
/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('thead',{staticClass:"datatable__head"},[(_vm.columns.length)?_c('tr',_vm._l((_vm.columns),function(column,index){return _c('th',_vm._b({key:column.field + column.label,class:['datatable__column', {
        'datatable__column--custom': column.scopedSlots && column.scopedSlots.header,
        'datatable__column--sortable': column.sortable,
        'datatable__column--active': _vm.isActive(column),
        'datatable__column--last': index === _vm.columns.length - 1
      }, column.staticClass, column.dynamicClass],attrs:{"scope":"col"},on:{"click":function($event){$event.preventDefault();_vm.updateSort(column.field, column.sortable);}}},'th',column.attrs,false),[_c('data-table-head-content',{attrs:{"column":column,"active":_vm.isActive(column),"sort-desc":_vm.sortDesc}})],1)})):_vm._e()])};
var __vue_staticRenderFns__$1 = [];

  /* style */
  const __vue_inject_styles__$1 = function (inject) {
    if (!inject) return
    inject("data-v-4acef8e2_0", { source: ".datatable__column{position:relative;padding:.5em;padding-right:1.75em;min-width:1em;vertical-align:middle;text-align:left;line-height:1;white-space:nowrap;border-right:1px solid #dee2e6;border-bottom:1px solid #dee2e6;box-shadow:0 1px 2px 0 rgba(50,50,50,.1);background-color:#fff;font-weight:700}.datatable__column--last{border-right:0}.datatable__column--active{background-color:#f0f0f0}.datatable__column--sortable{cursor:pointer}.datatable__column--custom{padding-right:.5em}.datatable__column-icon{position:absolute;top:8px;right:.5em}.datatable__column-text{display:inline-block;vertical-align:middle;margin-top:2px}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* component normalizer */
  function __vue_normalize__$1(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "DataTableHead.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    {
      let hook;
      if (style) {
        hook = function(context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook !== undefined) {
        if (component.functional) {
          // register for functional component in vue file
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context)
          };
        } else {
          // inject component registration as beforeCreate hook
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }

    return component
  }
  /* style inject */
  function __vue_create_injector__$1() {
    const head = document.head || document.getElementsByTagName('head')[0];
    const styles = __vue_create_injector__$1.styles || (__vue_create_injector__$1.styles = {});
    const isOldIE =
      typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return // SSR styles are present.

      const group = isOldIE ? css.media || 'default' : id;
      const style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        let code = css.source;
        let index = style.ids.length;

        style.ids.push(id);

        if (css.map) {
          // https://developer.chrome.com/devtools/docs/javascript-debugging
          // this makes source maps inside style tags work properly in Chrome
          code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
          // http://stackoverflow.com/a/26603875
          code +=
            '\n/*# sourceMappingURL=data:application/json;base64,' +
            btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
            ' */';
        }

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          const el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) el.setAttribute('media', css.media);
          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts
            .filter(Boolean)
            .join('\n');
        } else {
          const textNode = document.createTextNode(code);
          const nodes = style.element.childNodes;
          if (nodes[index]) style.element.removeChild(nodes[index]);
          if (nodes.length) style.element.insertBefore(textNode, nodes[index]);
          else style.element.appendChild(textNode);
        }
      }
    }
  }
  /* style inject SSR */
  

  
  var DataTableHead = __vue_normalize__$1(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    __vue_create_injector__$1,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$2 = {
  name: 'DataTablePagination',
  props: {
    total: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      required: true
    },
    page: {
      type: Number,
      required: true
    }
  },
  computed: {
    totalPages () {
      return Math.ceil(this.total / (this.perPage || 1))
    },
    reachedFirst () {
      return this.page === 1
    },
    reachedLast () {
      return this.page >= this.totalPages
    }
  },
  watch: {
    page: 'isLast',
    totalPages: 'isLast'
  },
  methods: {
    isActive (page) {
      return this.page === page
    },
    load (page) {
      if (page < 1) {
        return
      }

      if (page > this.totalPages) {
        return
      }

      this.$emit('update:page', page);
    },
    isLast () {
      return this.page > this.totalPages && this.load(this.page - 1)
    }
  }
};

/* script */
            const __vue_script__$2 = script$2;
            
/* template */
var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('nav',{staticClass:"datatable__pagination"},[_c('ul',{staticClass:"datatable__plist"},[_c('li',{staticClass:"datatable__pitem"},[_c('a',{class:[
          'datatable__plink datatable__pprev',
          {
            'datatable__plink--disabled': _vm.reachedFirst
          }
        ],attrs:{"href":"#","aria-label":"Previous"},on:{"click":function($event){$event.preventDefault();_vm.load(_vm.page-1);}}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("«")])])]),_vm._v(" "),_vm._l((_vm.totalPages),function(page){return _c('li',{key:page,staticClass:"datatable__pitem"},[_c('a',{class:['datatable__plink', { 'datatable__plink--active': _vm.isActive(page) }],attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();_vm.load(page);}}},[_vm._v(_vm._s(page))])])}),_vm._v(" "),_c('li',{staticClass:"datatable__pitem"},[_c('a',{class:['datatable__plink datatable__pnext', { 'datatable__plink--disabled': _vm.reachedLast }],attrs:{"href":"#","aria-label":"Next"},on:{"click":function($event){$event.preventDefault();_vm.load(_vm.page+1);}}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("»")])])])],2)])};
var __vue_staticRenderFns__$2 = [];

  /* style */
  const __vue_inject_styles__$2 = function (inject) {
    if (!inject) return
    inject("data-v-1e900a5a_0", { source: ".datatable__pagination{display:block}.datatable__plist{display:inline-block;margin:0;padding:0;margin-top:.5em;border-radius:4px}.datatable__pitem{display:inline}.datatable__plink{position:relative;display:inline-block;margin-left:-1px;padding:.3em .6em;color:#337ab7;text-decoration:none;background-color:#fff;border:1px solid #dee2e6}.datatable__plink--active{z-index:3;color:#fff!important;cursor:default;background-color:#337ab7!important;border-color:#337ab7!important}.datatable__plink--disabled{color:#777!important;cursor:not-allowed;background-color:#f0f0f0!important}.datatable__plink:focus,.datatable__plink:hover{z-index:2;background-color:#eee}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$2 = undefined;
  /* module identifier */
  const __vue_module_identifier__$2 = undefined;
  /* functional template */
  const __vue_is_functional_template__$2 = false;
  /* component normalizer */
  function __vue_normalize__$2(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "DataTablePagination.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    {
      let hook;
      if (style) {
        hook = function(context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook !== undefined) {
        if (component.functional) {
          // register for functional component in vue file
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context)
          };
        } else {
          // inject component registration as beforeCreate hook
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }

    return component
  }
  /* style inject */
  function __vue_create_injector__$2() {
    const head = document.head || document.getElementsByTagName('head')[0];
    const styles = __vue_create_injector__$2.styles || (__vue_create_injector__$2.styles = {});
    const isOldIE =
      typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return // SSR styles are present.

      const group = isOldIE ? css.media || 'default' : id;
      const style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        let code = css.source;
        let index = style.ids.length;

        style.ids.push(id);

        if (css.map) {
          // https://developer.chrome.com/devtools/docs/javascript-debugging
          // this makes source maps inside style tags work properly in Chrome
          code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
          // http://stackoverflow.com/a/26603875
          code +=
            '\n/*# sourceMappingURL=data:application/json;base64,' +
            btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
            ' */';
        }

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          const el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) el.setAttribute('media', css.media);
          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts
            .filter(Boolean)
            .join('\n');
        } else {
          const textNode = document.createTextNode(code);
          const nodes = style.element.childNodes;
          if (nodes[index]) style.element.removeChild(nodes[index]);
          if (nodes.length) style.element.insertBefore(textNode, nodes[index]);
          else style.element.appendChild(textNode);
        }
      }
    }
  }
  /* style inject SSR */
  

  
  var DataTablePagination = __vue_normalize__$2(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    __vue_create_injector__$2,
    undefined
  );

//
//
//
//
//
//
//
//
//
//

var script$3 = {
  name: 'DataTableFilter',
  props: {
    filter: {
      type: String,
      required: true
    }
  },
  methods: {
    update (filter) {
      this.$emit('update:filter', filter);
    },
    clear () {
      this.$emit('update:filter', '');
    }
  }
};

/* script */
            const __vue_script__$3 = script$3;
            
/* template */
var __vue_render__$3 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"datatable__filter"},[_c('input',{staticClass:"datatable__input",attrs:{"type":"text","placeholder":"Filter table data"},domProps:{"value":_vm.filter},on:{"input":function($event){_vm.update($event.target.value);}}}),_vm._v(" "),(_vm.filter)?_c('div',{staticClass:"datatable__clear",on:{"click":function($event){$event.stopPropagation();return _vm.clear($event)}}},[_c('a',{staticClass:"datatable__x",attrs:{"href":"#"},on:{"click":function($event){$event.stopPropagation();return _vm.clear($event)}}},[_vm._v("×")])]):_vm._e()])};
var __vue_staticRenderFns__$3 = [];

  /* style */
  const __vue_inject_styles__$3 = function (inject) {
    if (!inject) return
    inject("data-v-19c9c3a0_0", { source: ".datatable__filter{position:relative}.datatable__input{width:100%;padding:.3rem 1.5rem .3rem .75rem;font-size:1em;line-height:1.5;border:1px solid #dee2e6;border-radius:.25rem}.datatable__input:focus{outline:0;border-color:#999;box-shadow:0 0 0 .2rem rgba(100,100,100,.25)}.datatable__clear{position:absolute;top:0;right:0;display:inline-block;height:100%;border:1px solid transparent;cursor:pointer;vertical-align:middle}.datatable__clear:hover{font-weight:700}.datatable__clear:active{font-weight:700;text-shadow:0 0 2px #969696}.datatable__x{padding:.25em .75em;color:inherit!important;text-decoration:none;display:inline-block;vertical-align:middle}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$3 = undefined;
  /* module identifier */
  const __vue_module_identifier__$3 = undefined;
  /* functional template */
  const __vue_is_functional_template__$3 = false;
  /* component normalizer */
  function __vue_normalize__$3(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "DataTableFilter.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    {
      let hook;
      if (style) {
        hook = function(context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook !== undefined) {
        if (component.functional) {
          // register for functional component in vue file
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context)
          };
        } else {
          // inject component registration as beforeCreate hook
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }

    return component
  }
  /* style inject */
  function __vue_create_injector__$3() {
    const head = document.head || document.getElementsByTagName('head')[0];
    const styles = __vue_create_injector__$3.styles || (__vue_create_injector__$3.styles = {});
    const isOldIE =
      typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return // SSR styles are present.

      const group = isOldIE ? css.media || 'default' : id;
      const style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        let code = css.source;
        let index = style.ids.length;

        style.ids.push(id);

        if (css.map) {
          // https://developer.chrome.com/devtools/docs/javascript-debugging
          // this makes source maps inside style tags work properly in Chrome
          code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
          // http://stackoverflow.com/a/26603875
          code +=
            '\n/*# sourceMappingURL=data:application/json;base64,' +
            btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
            ' */';
        }

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          const el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) el.setAttribute('media', css.media);
          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts
            .filter(Boolean)
            .join('\n');
        } else {
          const textNode = document.createTextNode(code);
          const nodes = style.element.childNodes;
          if (nodes[index]) style.element.removeChild(nodes[index]);
          if (nodes.length) style.element.insertBefore(textNode, nodes[index]);
          else style.element.appendChild(textNode);
        }
      }
    }
  }
  /* style inject SSR */
  

  
  var DataTableFilter = __vue_normalize__$3(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    __vue_create_injector__$3,
    undefined
  );

//

var script$4 = {
  name: 'DataTable',
  components: { DataTableBody, DataTableHead, DataTablePagination, DataTableFilter },
  props: {
    items: {
      type: [Array, Function],
      required: true
    },
    perPage: {
      type: Number,
      default: 10
    },
    sortBy: {
      type: String,
      default: ''
    },
    sortDesc: {
      type: Boolean,
      default: false
    },
    filter: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      actualItems: [],
      vnodes: [],
      total: 0,
      page: 1,
      options: {
        sortBy: this.sortBy,
        sortDesc: this.sortDesc,
        filter: this.filter
      }
    }
  },
  computed: {
    identifier () {
      return `by:${this.sorting.by}|order:${this.sorting.order}|filter:${this.options.filter}|page:${this.page}|per_page:${this.perPage}`
    },
    asynchronous () {
      return this.items instanceof Function
    },
    columns () {
      return this.vnodes.map(vnode => {
        let { componentOptions: { Ctor: { options: { props } }, propsData, children }, data: { scopedSlots, attrs, class: dynamicClass, staticClass } } = vnode;
        let { field, label, sortable, filterable, render } = defaultProps(props, propsData);
        return {
          field,
          label,
          sortable,
          filterable,
          render,
          scopedSlots,
          children,
          attrs,
          dynamicClass,
          staticClass
        }
      })
    },
    filterable () {
      return this.columns
        .filter(column => {
          return column.filterable
        })
        .map(column => {
          return column.field
        })
        .filter(field => field)
    },
    filtering () {
      return {
        query: this.options.filter.toLowerCase(),
        fields: this.filterable
      }
    },
    paging () {
      return {
        page: this.page,
        perPage: this.perPage
      }
    },
    sorting () {
      return {
        by: this.options.sortBy,
        order: !this.options.sortDesc ? 'asc' : 'desc'
      }
    },
    from () {
      return (this.page - 1) * this.perPage + 1
    },
    to () {
      let x = this.page * this.perPage;
      return this.total < x ? this.total : x
    }
  },
  watch: {
    items: 'loadItems',
    identifier: 'loadItems',
    sortBy: {
      immediate: true,
      handler (val) {
        this.$set(this.options, 'sortBy', val);
      }
    },
    sortDesc: {
      immediate: true,
      handler (val) {
        this.$set(this.options, 'sortDesc', val);
      }
    },
    filter: {
      immediate: true,
      handler (val) {
        this.$set(this.options, 'filter', val);
      }
    },
    'options.sortBy' (val) {
      this.$emit('update:sortBy', val);
    },
    'options.sortDesc' (val) {
      this.$emit('update:sortDesc', val);
    },
    'options.filter' (val) {
      this.$emit('update:filter', val);
    }
  },
  created () {
    this.loadSlots();
    this.loadItems();
  },
  methods: {
    loaded (data) {
      this.$emit('loaded', data);
      let items = JSON.parse(JSON.stringify(data.items));
      this.actualItems = items.map(item => {
        this.columns.filter(column => typeof column.render === 'function').forEach(column => {
          dotSet(item, column.field, column.render(dotGet(item, column.field)));
        });

        return item
      });
      this.total = data.total;
    },
    loadSlots () {
      // $slots is not reactive
      this.vnodes = !this.$slots.default ? [] : this.$slots.default.filter(vnode => vnode.componentOptions);
    },
    loadItems () {
      this.load(this.items, this.filtering, this.sorting, this.paging);
    },
    async load (items, filtering, sorting, paging) {
      if (this.asynchronous) {
        this.loaded(await items(filtering, sorting, paging));
        return
      }

      this.loaded(load(items, filtering, sorting, paging));
    }
  }
};

/* script */
            const __vue_script__$4 = script$4;
            
/* template */
var __vue_render__$4 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"datatable"},[_c('div',{staticClass:"datatable__wrapper"},[_c('div',{staticClass:"datatable__heading"},[_c('data-table-filter',{staticClass:"datatable__unit",attrs:{"filter":_vm.options.filter},on:{"update:filter":function($event){_vm.$set(_vm.options, "filter", $event);}}}),_vm._v(" "),_c('div',{staticClass:"datatable__unit datatable__text"},[(_vm.total)?_c('span',[_vm._v("\n          Showing "),_c('span',{domProps:{"textContent":_vm._s(_vm.from === _vm.to && _vm.to === _vm.total ? 'the last entry' : _vm.from + ' to ' + _vm.to)}}),_vm._v(" of "+_vm._s(_vm.total)+" records\n        ")]):_c('span',[_vm._v("No records")])])],1),_vm._v(" "),_c('div',{staticClass:"datatable__screen"},[_c('table',{staticClass:"datatable__content",attrs:{"cellspacing":"0","cellpadding":"0"}},[_c('data-table-head',{attrs:{"columns":_vm.columns,"sort-by":_vm.options.sortBy,"sort-desc":_vm.options.sortDesc},on:{"update:sortBy":function($event){_vm.$set(_vm.options, "sortBy", $event);},"update:sortDesc":function($event){_vm.$set(_vm.options, "sortDesc", $event);}}}),_vm._v(" "),_c('data-table-body',{attrs:{"columns":_vm.columns,"items":_vm.actualItems}})],1)]),_vm._v(" "),_c('data-table-pagination',{attrs:{"per-page":_vm.perPage,"page":_vm.page,"total":_vm.total},on:{"update:page":function($event){_vm.page=$event;}}})],1)])};
var __vue_staticRenderFns__$4 = [];

  /* style */
  const __vue_inject_styles__$4 = function (inject) {
    if (!inject) return
    inject("data-v-78908090_0", { source: "*,::after,::before{-webkit-box-sizing:border-box;box-sizing:border-box}.datatable{color:#495057;font:1em/1.5 -apple-system,BlinkMacSystemFont,Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\";-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.datatable__screen{display:block;width:100%}.datatable__wrapper{position:relative;display:block;text-align:left;width:100%}.datatable__heading{margin-bottom:.5em;display:table;table-layout:fixed;width:100%}.datatable__unit{margin-bottom:.5em}@media (min-width:768px){.datatable__unit{width:50%;display:table-cell}.datatable__text{padding-left:1em}}.datatable__content{min-width:100%;border:solid 1px #dee2e6;table-layout:fixed}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$4 = undefined;
  /* module identifier */
  const __vue_module_identifier__$4 = undefined;
  /* functional template */
  const __vue_is_functional_template__$4 = false;
  /* component normalizer */
  function __vue_normalize__$4(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "DataTable.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    {
      let hook;
      if (style) {
        hook = function(context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook !== undefined) {
        if (component.functional) {
          // register for functional component in vue file
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context)
          };
        } else {
          // inject component registration as beforeCreate hook
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }

    return component
  }
  /* style inject */
  function __vue_create_injector__$4() {
    const head = document.head || document.getElementsByTagName('head')[0];
    const styles = __vue_create_injector__$4.styles || (__vue_create_injector__$4.styles = {});
    const isOldIE =
      typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return // SSR styles are present.

      const group = isOldIE ? css.media || 'default' : id;
      const style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        let code = css.source;
        let index = style.ids.length;

        style.ids.push(id);

        if (css.map) {
          // https://developer.chrome.com/devtools/docs/javascript-debugging
          // this makes source maps inside style tags work properly in Chrome
          code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
          // http://stackoverflow.com/a/26603875
          code +=
            '\n/*# sourceMappingURL=data:application/json;base64,' +
            btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
            ' */';
        }

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          const el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) el.setAttribute('media', css.media);
          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts
            .filter(Boolean)
            .join('\n');
        } else {
          const textNode = document.createTextNode(code);
          const nodes = style.element.childNodes;
          if (nodes[index]) style.element.removeChild(nodes[index]);
          if (nodes.length) style.element.insertBefore(textNode, nodes[index]);
          else style.element.appendChild(textNode);
        }
      }
    }
  }
  /* style inject SSR */
  

  
  var DataTable = __vue_normalize__$4(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    __vue_create_injector__$4,
    undefined
  );

var DataColumn = {
  name: 'DataColumn',
  props: {
    label: {
      type: String,
      required: true
    },
    field: {
      type: String,
      default: ''
    },
    sortable: {
      type: Boolean,
      default: true
    },
    filterable: {
      type: Boolean,
      default: true
    },
    render: {
      type: Function
    }
  }
};

exports.default = DataTable;
exports.DataTable = DataTable;
exports.DataColumn = DataColumn;
