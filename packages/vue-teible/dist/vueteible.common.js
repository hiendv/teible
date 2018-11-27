'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Octicon = _interopDefault(require('octicons-vue/lib/Octicon'));
var octiconsModular = require('octicons-modular');

var chunk = function (arr, size) {
  if (!size) {
    size = arr.length;
  }

  var result = [];
  for (var i = 0, len = arr.length; i < len; i += size) { result.push(arr.slice(i, i + size)); }
  return result
};

var sortStrings = function (a, b, order) {
  if (order === 'desc') {
    if (!b) {
      return -1
    }

    if (!a) {
      return 1
    }

    return b.localeCompare(a)
  }

  if (!a) {
    return -1
  }

  if (!b) {
    return 1
  }

  return a.localeCompare(b)
};

var sortNumbers = function (a, b, order) {
  if (order === 'desc') {
    return parseFloat(b) - parseFloat(a)
  }

  return parseFloat(a) - parseFloat(b)
};

var orderBy = function (arr, field, order) {
  if (!arr || !arr.length) {
    return []
  }

  var sample = dotGet(arr[0], field);

  if (typeof sample === 'string') {
    return arr.sort(function (a, b) { return sortStrings(dotGet(a, field), dotGet(b, field), order); })
  }

  if (typeof sample === 'number') {
    return arr.sort(function (a, b) { return sortNumbers(dotGet(a, field), dotGet(b, field), order); })
  }

  return arr
};

var filter = function (items, filtering) {
  return items.filter(function (item) {
    for (var i = 0; i < filtering.fields.length; i++) {
      var field = filtering.fields[i];
      var value = dotGet(item, field);

      if (!value) {
        continue
      }

      if (("" + value).toLowerCase().indexOf(filtering.query) === -1) {
        continue
      }

      return true
    }

    return false
  })
};

var load = function (data, filtering, sorting, paging) {
  var filtered = (!filtering || !filtering.query) ? data : filter(data, filtering);
  if (!filtered || !filtered.length) {
    return {
      items: [],
      total: 0
    }
  }

  var ordered = orderBy(filtered, sorting.by, sorting.order);
  var chunked = chunk(ordered, paging.perPage);
  var items = chunked[paging.page - 1];
  if (!items) {
    return {
      items: [],
      total: filtered.length
    }
  }

  return {
    items: items,
    total: filtered.length
  }
};

var defaultProps = function (options, data) {
  var props = {};
  for (var key in options) {
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

var dotGet = function (obj, path) {
  return path.split('.').reduce(function (o, i) { return o[i]; }, obj)
};

var dotSet = function (obj, path, val) {
  var parts = path.split('.');
  return parts.reduce(function (o, i, idx) {
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

var uniqArr = function (arr) {
  return arr.filter(function (item, pos) {
    return arr.indexOf(item) === pos
  })
};

var range = function (n) {
  var a = [];
  for (var i = 0; i < n; i++) {
    a[i] = i + 1;
  }

  return a
};

var paginate = function (currentPage, total) {
  var showing = 3;
  var eachSide = 2;
  if (total <= showing + eachSide) {
    return paginationValueOrThreeDots(range(total))
  }

  var pages = [];

  for (var i = 0; i < eachSide; i++) {
    pages.push(i + 1);
    pages.push(total - i);
  }

  for (var i$1 = 0; i$1 < Math.ceil(showing / 2); i$1++) {
    if (currentPage - i$1 > 1) {
      pages.push(currentPage - i$1);
    }

    if (currentPage + i$1 < total) {
      pages.push(currentPage + i$1);
    }
  }

  return paginationValueOrThreeDots(uniqArr(pages).sort(function (a, b) { return a - b; }))
};

var paginationValueOrThreeDots = function (pages) {
  var dots = '...';
  for (var i = 0; i < pages.length - 1; i++) {
    if (pages[i + 1] - pages[i] > 1) {
      pages.splice(i + 1, 0, dots);
    }
  }

  pages = pages.map(function (page) {
    return {
      value: page,
      disabled: page === dots
    }
  });

  return pages
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
  render: function render (h, ref) {
    var props = ref.props;
    var data = ref.data;

    if (props.column.field) {
      var value = dotGet(props.item, props.column.field);
      if (typeof value !== 'string') {
        value = JSON.stringify(value);
      }

      if (props.column.scopedSlots && typeof props.column.scopedSlots.default === 'function') {
        return h('td', data, props.column.scopedSlots.default({ value: value, item: props.item, column: props.column }))
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
  components: { DataTableCell: DataTableCell },
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
            var __vue_script__ = script;
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
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* component normalizer */
  function __vue_normalize__(
    template, style, script$$1,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    var component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "DataTableBody.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) { component.functional = true; }
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var DataTableBody = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

var capitalize = function (str) {
  if (!str) {
    return
  }

  return str.charAt(0).toUpperCase() + str.slice(1)
};

var icon = function (column, active, sortDesc) {
  if (active) {
    return sortDesc ? octiconsModular.triangleDown : octiconsModular.triangleUp
  }

  return octiconsModular.threeBars
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
  render: function render (h, ref) {
    var props = ref.props;

    if (props.column.scopedSlots && props.column.scopedSlots.header) {
      return h('span', {
        on: {
          click: function click ($event) {
            $event.stopPropagation();
          }
        }
      }, props.column.scopedSlots.header(props))
    }

    var children = [ h('span', {
      attrs: {
        class: 'datatable__column-text'
      }
    }, capitalize(props.column.label || props.column.field)) ];
    if (props.column.sortable) {
      children.push(h(Octicon, {
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
  components: { DataTableHeadContent: DataTableHeadContent },
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
    isActive: function isActive (column) {
      return !!(column.sortable) && this.isSortedBy(column.field)
    },
    isSortedBy: function isSortedBy (field) {
      return this.sortBy === field
    },
    updateSort: function updateSort (field, sortable) {
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
            var __vue_script__$1 = script$1;
/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('thead',{staticClass:"datatable__head"},[(_vm.columns.length)?_c('tr',_vm._l((_vm.columns),function(column,index){return _c('th',_vm._b({key:column.field + column.label,class:['datatable__column', {
        'datatable__column--custom': column.scopedSlots && column.scopedSlots.header,
        'datatable__column--sortable': column.sortable,
        'datatable__column--active': _vm.isActive(column),
        'datatable__column--last': index === _vm.columns.length - 1
      }, column.staticClass, column.dynamicClass],attrs:{"scope":"col"},on:{"click":function($event){$event.preventDefault();_vm.updateSort(column.field, column.sortable);}}},'th',column.attrs,false),[_c('data-table-head-content',{attrs:{"column":column,"active":_vm.isActive(column),"sort-desc":_vm.sortDesc}})],1)})):_vm._e()])};
var __vue_staticRenderFns__$1 = [];

  /* style */
  var __vue_inject_styles__$1 = undefined;
  /* scoped */
  var __vue_scope_id__$1 = undefined;
  /* module identifier */
  var __vue_module_identifier__$1 = undefined;
  /* functional template */
  var __vue_is_functional_template__$1 = false;
  /* component normalizer */
  function __vue_normalize__$1(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    var component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "DataTableHead.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) { component.functional = true; }
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var DataTableHead = __vue_normalize__$1(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    undefined,
    undefined
  );

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
    pages: function pages () {
      return paginate(this.page, this.totalPages)
    },
    totalPages: function totalPages () {
      return Math.ceil(this.total / (this.perPage || 1))
    },
    reachedFirst: function reachedFirst () {
      return this.page === 1
    },
    reachedLast: function reachedLast () {
      return this.page >= this.totalPages
    }
  },
  methods: {
    isActive: function isActive (page) {
      return !page.disabled && this.page === page.value
    },
    load: function load$$1 (page, disabled) {
      if (disabled) {
        return
      }

      if (page < 1) {
        return
      }

      if (page > this.totalPages) {
        return
      }

      this.$emit('update:page', page);
    }
  }
};

/* script */
            var __vue_script__$2 = script$2;
/* template */
var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('nav',{staticClass:"datatable__pagination"},[_c('ul',{staticClass:"datatable__plist"},[_c('li',{staticClass:"datatable__pitem"},[_c('a',{class:[
          'datatable__plink datatable__pprev',
          {
            'datatable__plink--disabled': _vm.reachedFirst
          }
        ],attrs:{"href":"#","aria-label":"Previous"},on:{"click":function($event){$event.preventDefault();_vm.load(_vm.page-1);}}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("«")])])]),_vm._l((_vm.pages),function(page,index){return _c('li',{key:index,staticClass:"datatable__pitem"},[_c('a',{class:['datatable__plink', { 'datatable__plink--active': _vm.isActive(page), 'datatable__plink--disabled': page.disabled }],attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();_vm.load(page.value, page.disabled);}}},[_vm._v(_vm._s(page.value))])])}),_c('li',{staticClass:"datatable__pitem"},[_c('a',{class:['datatable__plink datatable__pnext', { 'datatable__plink--disabled': _vm.reachedLast }],attrs:{"href":"#","aria-label":"Next"},on:{"click":function($event){$event.preventDefault();_vm.load(_vm.page+1);}}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("»")])])])],2)])};
var __vue_staticRenderFns__$2 = [];

  /* style */
  var __vue_inject_styles__$2 = undefined;
  /* scoped */
  var __vue_scope_id__$2 = undefined;
  /* module identifier */
  var __vue_module_identifier__$2 = undefined;
  /* functional template */
  var __vue_is_functional_template__$2 = false;
  /* component normalizer */
  function __vue_normalize__$2(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    var component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "DataTablePagination.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) { component.functional = true; }
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var DataTablePagination = __vue_normalize__$2(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    undefined,
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
    update: function update (filter) {
      this.$emit('update:filter', filter);
    },
    clear: function clear () {
      this.$emit('update:filter', '');
    }
  }
};

/* script */
            var __vue_script__$3 = script$3;
/* template */
var __vue_render__$3 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"datatable__filter"},[_c('input',{staticClass:"datatable__input",attrs:{"type":"text","placeholder":"Filter table data"},domProps:{"value":_vm.filter},on:{"input":function($event){_vm.update($event.target.value);}}}),_vm._v(" "),(_vm.filter)?_c('div',{staticClass:"datatable__clear",on:{"click":function($event){$event.stopPropagation();return _vm.clear($event)}}},[_c('a',{staticClass:"datatable__x",attrs:{"href":"#"},on:{"click":function($event){$event.stopPropagation();return _vm.clear($event)}}},[_vm._v("×")])]):_vm._e()])};
var __vue_staticRenderFns__$3 = [];

  /* style */
  var __vue_inject_styles__$3 = undefined;
  /* scoped */
  var __vue_scope_id__$3 = undefined;
  /* module identifier */
  var __vue_module_identifier__$3 = undefined;
  /* functional template */
  var __vue_is_functional_template__$3 = false;
  /* component normalizer */
  function __vue_normalize__$3(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    var component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "DataTableFilter.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) { component.functional = true; }
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var DataTableFilter = __vue_normalize__$3(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    undefined,
    undefined
  );

//

var script$4 = {
  name: 'DataTable',
  components: { DataTableBody: DataTableBody, DataTableHead: DataTableHead, DataTablePagination: DataTablePagination, DataTableFilter: DataTableFilter },
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
  data: function data () {
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
    identifier: function identifier () {
      return ("by:" + (this.sorting.by) + "|order:" + (this.sorting.order) + "|filter:" + (this.options.filter) + "|page:" + (this.page) + "|per_page:" + (this.perPage))
    },
    asynchronous: function asynchronous () {
      return this.items instanceof Function
    },
    columns: function columns () {
      return this.vnodes.map(function (vnode) {
        var vnode_componentOptions = vnode.componentOptions;
        var props = vnode_componentOptions.Ctor.options.props;
        var propsData = vnode_componentOptions.propsData;
        var children = vnode_componentOptions.children;
        var vnode_data = vnode.data;
        var scopedSlots = vnode_data.scopedSlots;
        var attrs = vnode_data.attrs;
        var dynamicClass = vnode_data.class;
        var staticClass = vnode_data.staticClass;
        var ref = defaultProps(props, propsData);
        var field = ref.field;
        var label = ref.label;
        var sortable = ref.sortable;
        var filterable = ref.filterable;
        var render = ref.render;
        return {
          field: field,
          label: label,
          sortable: sortable,
          filterable: filterable,
          render: render,
          scopedSlots: scopedSlots,
          children: children,
          attrs: attrs,
          dynamicClass: dynamicClass,
          staticClass: staticClass
        }
      })
    },
    filterable: function filterable () {
      return this.columns
        .filter(function (column) {
          return column.filterable
        })
        .map(function (column) {
          return column.field
        })
        .filter(function (field) { return field; })
    },
    filtering: function filtering () {
      return {
        query: this.options.filter.toLowerCase(),
        fields: this.filterable
      }
    },
    paging: function paging () {
      return {
        page: this.page,
        perPage: this.perPage
      }
    },
    sorting: function sorting () {
      return {
        by: this.options.sortBy,
        order: !this.options.sortDesc ? 'asc' : 'desc'
      }
    },
    from: function from () {
      return (this.page - 1) * this.perPage + 1
    },
    to: function to () {
      var x = this.page * this.perPage;
      return this.total < x ? this.total : x
    }
  },
  watch: {
    items: 'loadItems',
    identifier: 'loadItems',
    sortBy: {
      immediate: true,
      handler: function handler (val) {
        this.$set(this.options, 'sortBy', val);
      }
    },
    sortDesc: {
      immediate: true,
      handler: function handler (val) {
        this.$set(this.options, 'sortDesc', val);
      }
    },
    filter: {
      immediate: true,
      handler: function handler (val) {
        this.$set(this.options, 'filter', val);
      }
    },
    'options.sortBy': function options_sortBy (val) {
      this.$emit('update:sortBy', val);
    },
    'options.sortDesc': function options_sortDesc (val) {
      this.$emit('update:sortDesc', val);
    },
    'options.filter': function options_filter (val) {
      this.$emit('update:filter', val);
    }
  },
  created: function created () {
    this.loadSlots();
    this.loadItems();
  },
  methods: {
    loaded: function loaded (data) {
      var this$1 = this;

      var items = JSON.parse(JSON.stringify(data.items));
      this.actualItems = items.map(function (item) {
        this$1.columns.filter(function (column) { return typeof column.render === 'function'; }).forEach(function (column) {
          var parts = column.field.split('.');
          var originalField = parts.reduce(function (a, b, index) {
            if (index === parts.length - 1) {
              return (a + ".$_" + b)
            }

            return (a + "." + b)
          });
          if (parts.length === 1) {
            originalField = "$_" + originalField;
          }

          dotSet(item, originalField, dotGet(item, column.field));
          dotSet(item, column.field, column.render(dotGet(item, column.field)));
        });

        return item
      });
      this.total = data.total;

      this.$emit('loaded', {
        items: this.actualItems,
        total: data.total
      });
    },
    loadSlots: function loadSlots () {
      // $slots is not reactive
      this.vnodes = !this.$slots.default ? [] : this.$slots.default.filter(function (vnode) { return vnode.componentOptions; });
    },
    loadItems: function loadItems () {
      this.load(this.items, this.filtering, this.sorting, this.paging);
    },
    load: function load$1 (items, filtering, sorting, paging) {
      if (this.asynchronous) {
        Promise.resolve(items(filtering, sorting, paging)).then(this.loaded);
        return
      }

      if (!items) {
        this.loaded({ items: [], total: 0 });
        return
      }

      this.loaded(load(JSON.parse(JSON.stringify(items)), filtering, sorting, paging));
    }
  }
};

/* script */
            var __vue_script__$4 = script$4;
/* template */
var __vue_render__$4 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"datatable"},[_c('div',{staticClass:"datatable__wrapper"},[_c('div',{staticClass:"datatable__heading"},[_c('data-table-filter',{staticClass:"datatable__unit",attrs:{"filter":_vm.options.filter},on:{"update:filter":function($event){_vm.$set(_vm.options, "filter", $event);}}}),_vm._v(" "),_c('div',{staticClass:"datatable__unit datatable__text"},[(_vm.total)?_c('span',[_vm._v("\n          Showing "),_c('span',{domProps:{"textContent":_vm._s(_vm.from === _vm.to && _vm.to === _vm.total ? 'the last entry' : _vm.from + ' to ' + _vm.to)}}),_vm._v(" of "+_vm._s(_vm.total)+" records\n        ")]):_c('span',[_vm._v("No records")])])],1),_vm._v(" "),_c('div',{staticClass:"datatable__screen"},[_c('table',{staticClass:"datatable__content",attrs:{"cellspacing":"0","cellpadding":"0"}},[_c('data-table-head',{attrs:{"columns":_vm.columns,"sort-by":_vm.options.sortBy,"sort-desc":_vm.options.sortDesc},on:{"update:sortBy":function($event){_vm.$set(_vm.options, "sortBy", $event);},"update:sortDesc":function($event){_vm.$set(_vm.options, "sortDesc", $event);}}}),_vm._v(" "),_c('data-table-body',{attrs:{"columns":_vm.columns,"items":_vm.actualItems}})],1)]),_vm._v(" "),_c('data-table-pagination',{attrs:{"per-page":_vm.perPage,"page":_vm.page,"total":_vm.total},on:{"update:page":function($event){_vm.page=$event;}}})],1)])};
var __vue_staticRenderFns__$4 = [];

  /* style */
  var __vue_inject_styles__$4 = undefined;
  /* scoped */
  var __vue_scope_id__$4 = undefined;
  /* module identifier */
  var __vue_module_identifier__$4 = undefined;
  /* functional template */
  var __vue_is_functional_template__$4 = false;
  /* component normalizer */
  function __vue_normalize__$4(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    var component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "DataTable.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) { component.functional = true; }
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var DataTable = __vue_normalize__$4(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    undefined,
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
