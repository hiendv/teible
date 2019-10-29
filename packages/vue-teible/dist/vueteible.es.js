import { dotGet, paginate, themeDefault, transform, load } from 'teible';
export * from 'teible';
import { Octicon, triangleDown, triangleUp, threeBars } from 'octicons-vue';

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

var i18nMixin = {
  computed: {
    t: function t () {
      var this$1 = this;

      if (this.$tc) {
        return this.$tc
      }

      return function (key, count) {
        var i18n = this$1.$options.i18n;
        if (!i18n || !i18n.messages) {
          return key
        }

        var messages = i18n.messages[i18n.fallbackLocale];
        var message = dotGet(messages, key);

        if (!message) {
          return key
        }

        if (count) {
          return message.replace('{count}', count)
        }

        return message
      }
    }
  }
};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var clone_1 = createCommonjsModule(function (module) {
var clone = (function() {

function _instanceof(obj, type) {
  return type != null && obj instanceof type;
}

var nativeMap;
try {
  nativeMap = Map;
} catch(_) {
  // maybe a reference error because no `Map`. Give it a dummy value that no
  // value will ever be an instanceof.
  nativeMap = function() {};
}

var nativeSet;
try {
  nativeSet = Set;
} catch(_) {
  nativeSet = function() {};
}

var nativePromise;
try {
  nativePromise = Promise;
} catch(_) {
  nativePromise = function() {};
}

/**
 * Clones (copies) an Object using deep copying.
 *
 * This function supports circular references by default, but if you are certain
 * there are no circular references in your object, you can save some CPU time
 * by calling clone(obj, false).
 *
 * Caution: if `circular` is false and `parent` contains circular references,
 * your program may enter an infinite loop and crash.
 *
 * @param `parent` - the object to be cloned
 * @param `circular` - set to true if the object to be cloned may contain
 *    circular references. (optional - true by default)
 * @param `depth` - set to a number if the object is only to be cloned to
 *    a particular depth. (optional - defaults to Infinity)
 * @param `prototype` - sets the prototype to be used when cloning an object.
 *    (optional - defaults to parent prototype).
 * @param `includeNonEnumerable` - set to true if the non-enumerable properties
 *    should be cloned as well. Non-enumerable properties on the prototype
 *    chain will be ignored. (optional - false by default)
*/
function clone(parent, circular, depth, prototype, includeNonEnumerable) {
  if (typeof circular === 'object') {
    depth = circular.depth;
    prototype = circular.prototype;
    includeNonEnumerable = circular.includeNonEnumerable;
    circular = circular.circular;
  }
  // maintain two arrays for circular references, where corresponding parents
  // and children have the same index
  var allParents = [];
  var allChildren = [];

  var useBuffer = typeof Buffer != 'undefined';

  if (typeof circular == 'undefined')
    { circular = true; }

  if (typeof depth == 'undefined')
    { depth = Infinity; }

  // recurse this function so we don't reset allParents and allChildren
  function _clone(parent, depth) {
    // cloning null always returns null
    if (parent === null)
      { return null; }

    if (depth === 0)
      { return parent; }

    var child;
    var proto;
    if (typeof parent != 'object') {
      return parent;
    }

    if (_instanceof(parent, nativeMap)) {
      child = new nativeMap();
    } else if (_instanceof(parent, nativeSet)) {
      child = new nativeSet();
    } else if (_instanceof(parent, nativePromise)) {
      child = new nativePromise(function (resolve, reject) {
        parent.then(function(value) {
          resolve(_clone(value, depth - 1));
        }, function(err) {
          reject(_clone(err, depth - 1));
        });
      });
    } else if (clone.__isArray(parent)) {
      child = [];
    } else if (clone.__isRegExp(parent)) {
      child = new RegExp(parent.source, __getRegExpFlags(parent));
      if (parent.lastIndex) { child.lastIndex = parent.lastIndex; }
    } else if (clone.__isDate(parent)) {
      child = new Date(parent.getTime());
    } else if (useBuffer && Buffer.isBuffer(parent)) {
      if (Buffer.allocUnsafe) {
        // Node.js >= 4.5.0
        child = Buffer.allocUnsafe(parent.length);
      } else {
        // Older Node.js versions
        child = new Buffer(parent.length);
      }
      parent.copy(child);
      return child;
    } else if (_instanceof(parent, Error)) {
      child = Object.create(parent);
    } else {
      if (typeof prototype == 'undefined') {
        proto = Object.getPrototypeOf(parent);
        child = Object.create(proto);
      }
      else {
        child = Object.create(prototype);
        proto = prototype;
      }
    }

    if (circular) {
      var index = allParents.indexOf(parent);

      if (index != -1) {
        return allChildren[index];
      }
      allParents.push(parent);
      allChildren.push(child);
    }

    if (_instanceof(parent, nativeMap)) {
      parent.forEach(function(value, key) {
        var keyChild = _clone(key, depth - 1);
        var valueChild = _clone(value, depth - 1);
        child.set(keyChild, valueChild);
      });
    }
    if (_instanceof(parent, nativeSet)) {
      parent.forEach(function(value) {
        var entryChild = _clone(value, depth - 1);
        child.add(entryChild);
      });
    }

    for (var i in parent) {
      var attrs;
      if (proto) {
        attrs = Object.getOwnPropertyDescriptor(proto, i);
      }

      if (attrs && attrs.set == null) {
        continue;
      }
      child[i] = _clone(parent[i], depth - 1);
    }

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(parent);
      for (var i = 0; i < symbols.length; i++) {
        // Don't need to worry about cloning a symbol because it is a primitive,
        // like a number or string.
        var symbol = symbols[i];
        var descriptor = Object.getOwnPropertyDescriptor(parent, symbol);
        if (descriptor && !descriptor.enumerable && !includeNonEnumerable) {
          continue;
        }
        child[symbol] = _clone(parent[symbol], depth - 1);
        if (!descriptor.enumerable) {
          Object.defineProperty(child, symbol, {
            enumerable: false
          });
        }
      }
    }

    if (includeNonEnumerable) {
      var allPropertyNames = Object.getOwnPropertyNames(parent);
      for (var i = 0; i < allPropertyNames.length; i++) {
        var propertyName = allPropertyNames[i];
        var descriptor = Object.getOwnPropertyDescriptor(parent, propertyName);
        if (descriptor && descriptor.enumerable) {
          continue;
        }
        child[propertyName] = _clone(parent[propertyName], depth - 1);
        Object.defineProperty(child, propertyName, {
          enumerable: false
        });
      }
    }

    return child;
  }

  return _clone(parent, depth);
}

/**
 * Simple flat clone using prototype, accepts only objects, usefull for property
 * override on FLAT configuration object (no nested props).
 *
 * USE WITH CAUTION! This may not behave as you wish if you do not know how this
 * works.
 */
clone.clonePrototype = function clonePrototype(parent) {
  if (parent === null)
    { return null; }

  var c = function () {};
  c.prototype = parent;
  return new c();
};

// private utility functions

function __objToStr(o) {
  return Object.prototype.toString.call(o);
}
clone.__objToStr = __objToStr;

function __isDate(o) {
  return typeof o === 'object' && __objToStr(o) === '[object Date]';
}
clone.__isDate = __isDate;

function __isArray(o) {
  return typeof o === 'object' && __objToStr(o) === '[object Array]';
}
clone.__isArray = __isArray;

function __isRegExp(o) {
  return typeof o === 'object' && __objToStr(o) === '[object RegExp]';
}
clone.__isRegExp = __isRegExp;

function __getRegExpFlags(re) {
  var flags = '';
  if (re.global) { flags += 'g'; }
  if (re.ignoreCase) { flags += 'i'; }
  if (re.multiline) { flags += 'm'; }
  return flags;
}
clone.__getRegExpFlags = __getRegExpFlags;

return clone;
})();

if ( module.exports) {
  module.exports = clone;
}
});

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
      if (props.column.scopedSlots && typeof props.column.scopedSlots.default === 'function') {
        return h('td', data, props.column.scopedSlots.default({ value: value, item: props.item, column: props.column }))
      }

      if (typeof value !== 'string') {
        value = JSON.stringify(value);
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
  },
  inject: ['$theme'],
  computed: {
    theme: function theme () {
      return this.$theme()
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('tbody',_vm._l((_vm.items),function(d,index){
var _obj;
return _c('tr',{key:index,class:( _obj = {}, _obj[_vm.theme.datatable__row] = true, _obj[_vm.theme['datatable__row--odd']] = index % 2 === 1, _obj[_vm.theme['datatable__row--last']] = index === _vm.items.length - 1, _obj )},_vm._l((_vm.columns),function(column,columnIndex){
    var _obj;
return _c('data-table-cell',_vm._b({key:columnIndex,class:( _obj = {}, _obj[_vm.theme.datatable__cell] = true, _obj[_vm.theme['datatable__cell--last-column']] = columnIndex === _vm.columns.length - 1, _obj[_vm.theme['datatable__cell--last-row']] = index === _vm.items.length - 1, _obj ),attrs:{"item":d,"column":column}},'data-table-cell',column.attrs,false))}),1)}),0)};
var __vue_staticRenderFns__ = [];

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var DataTableBody = normalizeComponent_1(
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
    return sortDesc ? triangleDown : triangleUp
  }

  return threeBars
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
    },
    theme: {
      type: Object,
      required: true
    }
  },
  render: function render (h, ref) {
    var props = ref.props;

    var theme = props.theme; // vuejs/vue#5837
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
        class: theme['datatable__column-text']
      }
    }, capitalize(props.column.label || props.column.field)) ];
    if (props.column.sortable) {
      children.push(h(Octicon, {
        props: {
          icon: icon(props.column, props.active, props.sortDesc),
          className: theme['datatable__column-icon']
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
  computed: {
    theme: function theme () {
      return this.$theme()
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
  },
  inject: ['$theme'],
  provide: function provide () {
    return {
      $theme: this.$theme
    }
  }
};

/* script */
var __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('thead',{class:_vm.theme.datatable__head},[(_vm.columns.length)?_c('tr',_vm._l((_vm.columns),function(column,index){
var _obj;
return _c('th',_vm._b({key:column.field + column.label,class:( _obj = {}, _obj[_vm.theme.datatable__column] = true, _obj[_vm.theme['datatable__column--custom']] = column.scopedSlots && column.scopedSlots.header, _obj[_vm.theme['datatable__column--sortable']] = column.sortable, _obj[_vm.theme['datatable__column--active']] = _vm.isActive(column), _obj[_vm.theme['datatable__column--last']] = index === _vm.columns.length - 1, _obj[column.staticClass] = column.staticClass, _obj[column.dynamicClass] = column.dynamicClass, _obj ),attrs:{"scope":"col"},on:{"click":function($event){$event.preventDefault();return _vm.updateSort(column.field, column.sortable)}}},'th',column.attrs,false),[_c('data-table-head-content',{attrs:{"column":column,"active":_vm.isActive(column),"sort-desc":_vm.sortDesc,"theme":_vm.theme}})],1)}),0):_vm._e()])};
var __vue_staticRenderFns__$1 = [];

  /* style */
  var __vue_inject_styles__$1 = undefined;
  /* scoped */
  var __vue_scope_id__$1 = undefined;
  /* module identifier */
  var __vue_module_identifier__$1 = undefined;
  /* functional template */
  var __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var DataTableHead = normalizeComponent_1(
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
    },
    theme: function theme () {
      return this.$theme()
    }
  },
  methods: {
    isActive: function isActive (page) {
      return !page.disabled && this.page === page.value
    },
    load: function load (page, disabled) {
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
  },
  inject: ['$theme']
};

/* script */
var __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function () {
var _obj, _obj$1;
var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('nav',{class:_vm.theme.datatable__pagination},[_c('ul',{class:_vm.theme.datatable__plist},[_c('li',{class:_vm.theme.datatable__pitem},[_c('a',{class:( _obj = {}, _obj[_vm.theme.datatable__plink] = true, _obj[_vm.theme.datatable__pprev] = true, _obj[_vm.theme['datatable__plink--disabled']] = _vm.reachedFirst, _obj ),attrs:{"href":"#","aria-label":"Previous"},on:{"click":function($event){$event.preventDefault();return _vm.load(_vm.page-1)}}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("«")])])]),_vm._l((_vm.pages),function(p,index){
        var _obj;
return _c('li',{key:index,class:_vm.theme.datatable__pitem},[_c('a',{class:( _obj = {}, _obj[_vm.theme.datatable__plink] = true, _obj[_vm.theme['datatable__plink--active']] = _vm.isActive(p), _obj[_vm.theme['datatable__plink--disabled']] = p.disabled, _obj ),attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();return _vm.load(p.value, p.disabled)}}},[_vm._v(_vm._s(p.value))])])}),_c('li',{class:_vm.theme.datatable__pitem},[_c('a',{class:( _obj$1 = {}, _obj$1[_vm.theme.datatable__plink] = true, _obj$1[_vm.theme.datatable__pnext] = true, _obj$1[_vm.theme['datatable__plink--disabled']] = _vm.reachedLast, _obj$1 ),attrs:{"href":"#","aria-label":"Next"},on:{"click":function($event){$event.preventDefault();return _vm.load(_vm.page+1)}}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("»")])])])],2)])};
var __vue_staticRenderFns__$2 = [];

  /* style */
  var __vue_inject_styles__$2 = undefined;
  /* scoped */
  var __vue_scope_id__$2 = undefined;
  /* module identifier */
  var __vue_module_identifier__$2 = undefined;
  /* functional template */
  var __vue_is_functional_template__$2 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var DataTablePagination = normalizeComponent_1(
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
var script$3 = {
  name: 'DataTableFilter',
  i18n: {
    fallbackLocale: 'en',
    messages: {
      en: {
        teible: {
          filter: 'Filter records'
        }
      }
    }
  },
  mixins: [i18nMixin],
  props: {
    filter: {
      type: String,
      required: true
    }
  },
  computed: {
    theme: function theme () {
      return this.$theme()
    }
  },
  methods: {
    update: function update (filter) {
      this.$emit('update:filter', filter);
    },
    clear: function clear () {
      this.$emit('update:filter', '');
    }
  },
  inject: ['$theme']
};

/* script */
var __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.theme.datatable__filter},[_c('input',{class:_vm.theme.datatable__input,attrs:{"type":"text","placeholder":_vm.t('teible.filter')},domProps:{"value":_vm.filter},on:{"input":function($event){return _vm.update($event.target.value)}}}),_vm._v(" "),(_vm.filter)?_c('div',{class:_vm.theme.datatable__clear,on:{"click":function($event){$event.stopPropagation();return _vm.clear($event)}}},[_c('a',{class:_vm.theme.datatable__x,attrs:{"href":"#"},on:{"click":function($event){$event.stopPropagation();$event.preventDefault();return _vm.clear($event)}}},[_vm._v("×")])]):_vm._e()])};
var __vue_staticRenderFns__$3 = [];

  /* style */
  var __vue_inject_styles__$3 = undefined;
  /* scoped */
  var __vue_scope_id__$3 = undefined;
  /* module identifier */
  var __vue_module_identifier__$3 = undefined;
  /* functional template */
  var __vue_is_functional_template__$3 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var DataTableFilter = normalizeComponent_1(
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
  i18n: {
    fallbackLocale: 'en',
    messages: {
      en: {
        teible: {
          showing: 'Showing',
          total: 'of {count} records',
          last: 'the last record',
          empty: 'No records'
        }
      }
    }
  },
  components: { DataTableBody: DataTableBody, DataTableHead: DataTableHead, DataTablePagination: DataTablePagination, DataTableFilter: DataTableFilter },
  mixins: [i18nMixin],
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
    },
    theme: {
      type: Object,
      default: function default$1 () {
        return themeDefault
      }
    }
  },
  provide: function provide () {
    var this$1 = this;

    return {
      $theme: function () { return this$1.theme; } // because provide & inject bindings are not reactive
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
    func: function func () {
      return this.items instanceof Function
    },
    identifier: function identifier () {
      return ("by:" + (this.sorting.by) + "|order:" + (this.sorting.order) + "|filter:" + (this.options.filter) + "|page:" + (this.page) + "|per_page:" + (this.perPage))
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
    },
    transformed: function transformed () {
      if (this.func) {
        return []
      }

      return this.transform(clone_1(this.items, false))
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
        this.page = 1;
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
    transform: function transform$1 (data) {
      return transform(data, this.columns)
    },
    loadSlots: function loadSlots () {
      // $slots is not reactive
      this.vnodes = !this.$slots.default ? [] : this.$slots.default.filter(function (vnode) { return vnode.componentOptions; });
    },
    loadItems: function loadItems () {
      var this$1 = this;

      if (this.func) {
        Promise.resolve(this.items(this.filtering, this.sorting, this.paging)).then(function (data) {
          this$1.actualItems = this$1.transform(data.items);
          this$1.total = data.total;
        });

        return this.ping()
      }

      if (!this.items) {
        this.actualItems = [];
        this.total = 0;
        return this.ping()
      }

      var data = load(this.transformed, this.filtering, this.sorting, this.paging);
      this.actualItems = data.items;
      this.total = data.total;
      return this.ping()
    },
    ping: function ping () {
      this.$emit('loaded', {
        items: this.actualItems,
        total: this.total
      });
    }
  }
};

/* script */
var __vue_script__$4 = script$4;

/* template */
var __vue_render__$4 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.theme.datatable},[_c('div',{class:_vm.theme.datatable__wrapper},[_c('div',{class:_vm.theme.datatable__heading},[_c('data-table-filter',{class:_vm.theme.datatable__unit,attrs:{"filter":_vm.options.filter},on:{"update:filter":function($event){return _vm.$set(_vm.options, "filter", $event)}}}),_vm._v(" "),_c('div',{class:[_vm.theme.datatable__unit, _vm.theme.datatable__text]},[(_vm.total)?_c('span',[_vm._v("\n          "+_vm._s(_vm.t('teible.showing'))+" "),_c('span',{domProps:{"textContent":_vm._s(_vm.from === _vm.to && _vm.to === _vm.total ? _vm.t('teible.last') : _vm.from + ' – ' + _vm.to)}}),_vm._v(" "+_vm._s(_vm.t('teible.total', _vm.total))+"\n        ")]):_c('span',[_vm._v(_vm._s(_vm.t('teible.empty')))])])],1),_vm._v(" "),_c('div',{class:_vm.theme.datatable__screen},[_c('table',{class:_vm.theme.datatable__content,attrs:{"cellspacing":"0","cellpadding":"0"}},[_c('data-table-head',{attrs:{"columns":_vm.columns,"sort-by":_vm.options.sortBy,"sort-desc":_vm.options.sortDesc},on:{"update:sortBy":function($event){return _vm.$set(_vm.options, "sortBy", $event)},"update:sort-by":function($event){return _vm.$set(_vm.options, "sortBy", $event)},"update:sortDesc":function($event){return _vm.$set(_vm.options, "sortDesc", $event)},"update:sort-desc":function($event){return _vm.$set(_vm.options, "sortDesc", $event)}}}),_vm._v(" "),_c('data-table-body',{attrs:{"columns":_vm.columns,"items":_vm.actualItems}})],1)]),_vm._v(" "),_c('data-table-pagination',{attrs:{"per-page":_vm.perPage,"page":_vm.page,"total":_vm.total},on:{"update:page":function($event){_vm.page=$event;}}})],1)])};
var __vue_staticRenderFns__$4 = [];

  /* style */
  var __vue_inject_styles__$4 = undefined;
  /* scoped */
  var __vue_scope_id__$4 = undefined;
  /* module identifier */
  var __vue_module_identifier__$4 = undefined;
  /* functional template */
  var __vue_is_functional_template__$4 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var DataTable = normalizeComponent_1(
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

export default DataTable;
export { DataColumn, DataTable };
