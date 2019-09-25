<template>
  <thead :class="theme.datatable__head">
    <tr v-if="columns.length">
      <th
        v-for="(column, index) in columns" :key="column.field + column.label" :class="{
          [theme.datatable__column]: true,
          [theme['datatable__column--custom']]: column.scopedSlots && column.scopedSlots.header,
          [theme['datatable__column--sortable']]: column.sortable,
          [theme['datatable__column--active']]: isActive(column),
          [theme['datatable__column--last']]: index === columns.length - 1,
          [column.staticClass]: column.staticClass,
          [column.dynamicClass]: column.dynamicClass
        }"
        v-bind="column.attrs" scope="col" @click.prevent="updateSort(column.field, column.sortable)"
      >
        <data-table-head-content
          :column="column" :active="isActive(column)" :sort-desc="sortDesc"
          :theme="theme"
        />
      </th>
    </tr>
  </thead>
</template>
<script>
import DataTableHeadContent from './DataTableHeadContent'

export default {
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
  computed: {
    theme () {
      return this.$theme()
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
        this.$emit('update:sortDesc', !this.sortDesc)
        return
      }

      this.$emit('update:sortBy', field)
    }
  },
  inject: ['$theme'],
  provide () {
    return {
      $theme: this.$theme
    }
  }
}
</script>
