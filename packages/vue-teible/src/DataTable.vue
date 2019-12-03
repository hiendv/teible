<template>
  <div :class="theme.datatable">
    <div :class="theme.datatable__wrapper">
      <div :class="theme.datatable__heading">
        <data-table-filter v-if="!disableFiltering" :filter.sync="options.filter" :class="theme.datatable__unit" />
        <div :class="[theme.datatable__unit, theme.datatable__text]">
          <span v-if="total">
            {{ t('teible.showing') }} <span v-text="from === to && to === total ? t('teible.last') : from + ' – ' + to" /> {{ t('teible.total', total) }}
          </span>
          <span v-else>{{ t('teible.empty') }}</span>
        </div>
      </div>
      <div :class="theme.datatable__screen">
        <table :class="theme.datatable__content" cellspacing="0" cellpadding="0">
          <data-table-head :columns="columns" :sort-by.sync="options.sortBy" :sort-desc.sync="options.sortDesc" />
          <data-table-body :columns="columns" :items="actualItems" />
        </table>
      </div>
      <data-table-pagination :per-page="perPage" :page.sync="page" :total="total" />
    </div>
  </div>
</template>
<script>
import { defaultProps, i18nMixin } from './helpers'
import { load, transform, themeDefault } from 'teible'
import clone from 'clone'
import DataTableBody from './DataTableBody.vue'
import DataTableHead from './DataTableHead.vue'
import DataTablePagination from './DataTablePagination.vue'
import DataTableFilter from './DataTableFilter.vue'

export default {
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
  components: { DataTableBody, DataTableHead, DataTablePagination, DataTableFilter },
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
      default () {
        return themeDefault
      }
    },
    disableFiltering: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  provide () {
    return {
      $theme: () => this.theme // because provide & inject bindings are not reactive
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
    func () {
      return this.items instanceof Function
    },
    identifier () {
      if (this.disableFiltering) {
        return `by:${this.sorting.by}|order:${this.sorting.order}|page:${this.page}|per_page:${this.perPage}`
      }

      return `by:${this.sorting.by}|order:${this.sorting.order}|filter:${this.options.filter}|page:${this.page}|per_page:${this.perPage}`
    },
    columns () {
      return this.vnodes.map(vnode => {
        const { componentOptions: { Ctor: { options: { props } }, propsData, children }, data: { scopedSlots, attrs, class: dynamicClass, staticClass } } = vnode
        const { field, label, sortable, filterable, render } = defaultProps(props, propsData)
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
      if (this.disableFiltering) {
        // Data should not be filtered without query
        return {
          query: ''
        }
      }

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
      const x = this.page * this.perPage
      return this.total < x ? this.total : x
    },
    transformed () {
      if (this.func) {
        return []
      }

      return this.transform(clone(this.items, false))
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
        this.page = 1
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
    transform (data) {
      return transform(data, this.columns)
    },
    loadSlots () {
      // $slots is not reactive
      this.vnodes = !this.$slots.default ? [] : this.$slots.default.filter(vnode => vnode.componentOptions)
    },
    loadItems () {
      if (this.func) {
        Promise.resolve(this.items(this.filtering, this.sorting, this.paging)).then(data => {
          this.actualItems = this.transform(data.items)
          this.total = data.total
        })

        return this.ping()
      }

      if (!this.items) {
        this.actualItems = []
        this.total = 0
        return this.ping()
      }

      const data = load(this.transformed, this.filtering, this.sorting, this.paging)
      this.actualItems = data.items
      this.total = data.total
      return this.ping()
    },
    ping () {
      this.$emit('loaded', {
        items: this.actualItems,
        total: this.total
      })
    }
  }
}
</script>
