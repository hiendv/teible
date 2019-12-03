<template>
  <tbody>
    <tr
      v-for="(d, index) in items" :key="index" :class="{
        [theme.datatable__row]: true,
        [theme['datatable__row--odd']]: index % 2 === 1
      }"
    >
      <data-table-cell
        v-for="(column, columnIndex) in columns" :key="columnIndex" v-bind="column.attrs"
        :item="d" :column="column" :class="{
          [theme.datatable__cell]: true,
          [theme['datatable__cell--last-column']]: columnIndex === columns.length - 1,
          [theme['datatable__cell--last-row']]: index === items.length - 1
        }"
      />
    </tr>
  </tbody>
</template>
<script>
import DataTableCell from './DataTableCell'

export default {
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
  },
  inject: ['$theme'],
  computed: {
    theme () {
      return this.$theme()
    }
  }
}
</script>
