<template>
  <div class="datatable">
    <div class="datatable__wrapper">
      <div class="datatable__heading">
        <data-table-filter :filter.sync="options.filter" class="datatable__unit" />
        <div class="datatable__unit datatable__text">
          <span v-if="total">
            Showing <span v-text="from === to && to === total ? 'the last entry' : from + ' to ' + to" /> of {{ total }} records
          </span>
          <span v-else>No records</span>
        </div>
      </div>
      <div class="datatable__screen">
        <table class="datatable__content" cellspacing="0" cellpadding="0">
          <data-table-head :columns="columns" :sort-by.sync="options.sortBy" :sort-desc.sync="options.sortDesc" />
          <data-table-body :columns="columns" :items="actualItems" />
        </table>
      </div>
      <data-table-pagination :per-page="perPage" :page.sync="page" :total="total" />
    </div>
  </div>
</template>
<script>
import { load, defaultProps, dotGet, dotSet } from './helpers'
import DataTableBody from './DataTableBody.vue'
import DataTableHead from './DataTableHead.vue'
import DataTablePagination from './DataTablePagination.vue'
import DataTableFilter from './DataTableFilter.vue'

export default {
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
        let { componentOptions: { Ctor: { options: { props } }, propsData, children }, data: { scopedSlots, attrs, class: dynamicClass, staticClass } } = vnode
        let { field, label, sortable, filterable, render } = defaultProps(props, propsData)
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
      let x = this.page * this.perPage
      return this.total < x ? this.total : x
    }
  },
  watch: {
    items: 'loadItems',
    identifier: 'loadItems',
    sortBy: {
      immediate: true,
      handler (val) {
        this.$set(this.options, 'sortBy', val)
      }
    },
    sortDesc: {
      immediate: true,
      handler (val) {
        this.$set(this.options, 'sortDesc', val)
      }
    },
    filter: {
      immediate: true,
      handler (val) {
        this.$set(this.options, 'filter', val)
      }
    },
    'options.sortBy' (val) {
      this.$emit('update:sortBy', val)
    },
    'options.sortDesc' (val) {
      this.$emit('update:sortDesc', val)
    },
    'options.filter' (val) {
      this.$emit('update:filter', val)
    }
  },
  created () {
    this.loadSlots()
    this.loadItems()
  },
  methods: {
    loaded (data) {
      let items = JSON.parse(JSON.stringify(data.items))
      this.actualItems = items.map(item => {
        this.columns.filter(column => typeof column.render === 'function').forEach(column => {
          let parts = column.field.split('.')
          let originalField = parts.reduce((a, b, index) => {
            if (index === parts.length - 1) {
              return `${a}.$_${b}`
            }

            return `${a}.${b}`
          })
          if (parts.length === 1) {
            originalField = `$_${originalField}`
          }

          dotSet(item, originalField, dotGet(item, column.field))
          dotSet(item, column.field, column.render(dotGet(item, column.field)))
        })

        return item
      })
      this.total = data.total

      this.$emit('loaded', {
        items: this.actualItems,
        total: data.total
      })
    },
    loadSlots () {
      // $slots is not reactive
      this.vnodes = !this.$slots.default ? [] : this.$slots.default.filter(vnode => vnode.componentOptions)
    },
    loadItems () {
      this.load(this.items, this.filtering, this.sorting, this.paging)
    },
    load (items, filtering, sorting, paging) {
      if (this.asynchronous) {
        let result = items(filtering, sorting, paging)
        Promise.resolve().then(this.loaded)
        return
      }

      this.loaded(load(items, filtering, sorting, paging))
    }
  }
}
</script>
<style lang="scss">
@import "~@hiendv/bem-sass";
*, *::after, *::before {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.datatable {
  color: $color;
  font: 1em/1.5 -apple-system,BlinkMacSystemFont,Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  @include e('screen') {
    display: block;
    width: 100%;
  }

  @include e('wrapper') {
    position: relative;
    display: block;
    text-align: left;
    width: 100%;
  }

  @include e('heading') {
    margin-bottom: .5em;
    display: table;
    table-layout: fixed;
    width: 100%;
  }

  @include e('unit') {
    margin-bottom: .5em;
  }

  @media (min-width: 768px) {
    @include e('unit') {
      width: 50%;
      display: table-cell;
    }

    @include e('text') {
      padding-left: 1em;
    }
  }

  @include e('content') {
    min-width: 100%;
    border: solid 1px $border-color;
    table-layout: fixed;
  }
}
</style>
