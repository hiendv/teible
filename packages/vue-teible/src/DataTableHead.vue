<template>
  <thead class="datatable__head">
    <tr v-if="columns.length">
      <th
        v-for="(column, index) in columns" :key="column.field + column.label" :class="['datatable__column', {
          'datatable__column--custom': column.scopedSlots && column.scopedSlots.header,
          'datatable__column--sortable': column.sortable,
          'datatable__column--active': isActive(column),
          'datatable__column--last': index === columns.length - 1
        }, column.staticClass, column.dynamicClass]"
        v-bind="column.attrs" scope="col" @click.prevent="updateSort(column.field, column.sortable)">
        <data-table-head-content :column="column" :active="isActive(column)" :sort-desc="sortDesc" />
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
  }
}
</script>
<style lang="scss">
@import '~@hiendv/bem-sass';
.datatable {
  @include e('column') {
    position: relative;
    padding: .5em;
    padding-right: 1.75em;
    min-width: 1em;
    vertical-align: middle;
    text-align: left;
    line-height: 1;
    white-space: nowrap;
    border-right: 1px solid $border-color;
    border-bottom: 1px solid $border-color;
    box-shadow: 0px 1px 2px 0px rgba(50, 50, 50, 0.1);
    background-color: $bg-color;
    font-weight: bold;

    @include m('last') {
      border-right: 0;
    }

    @include m('active') {
      background-color: $bg-color__column--active;
    }

    @include m('sortable') {
      cursor: pointer;
    }

    @include m('custom') {
      padding-right: .5em;
    }
  }

  @include e('column-icon') {
    position: absolute;
    top: 8px;
    right: .5em;
  }

  @include e('column-text') {
    display: inline-block;
    vertical-align: middle;
    margin-top: 2px;
  }
}
</style>
