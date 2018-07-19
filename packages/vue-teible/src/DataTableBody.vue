<template>
  <tbody>
    <tr
      v-for="(d, index) in items"
      :key="index"
      :class="[
        'datatable__row',
        {
          'datatable__row--odd': index % 2 === 1,
          'datatable__row--last': index === items.length - 1
        }
      ]"
    >
      <data-table-cell
        v-for="(column, columnIndex) in columns"
        :item="d"
        :column="column"
        :key="columnIndex"
        :class="[
          'datatable__cell',
          {
            'datatable__cell--last-column': columnIndex === columns.length - 1,
            'datatable__cell--last-row': index === items.length - 1
          }
        ]"
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
  }
}
</script>
<style lang="scss">
@import '~@hiendv/bem-sass';
.datatable {
  @include e('row') {
    background-color: $bg-color;
    @include m('odd') {
      background-color: $bg-color--odd;
    }
  }

  @include e('cell') {
    position: relative;
    padding: .3em .5em;
    border-right: 1px solid $border-color;
    border-bottom: 1px solid $border-color;
    vertical-align: middle;
    text-align: left;

    @include m('last-column') {
      border-right: 0;
    }

    @include m('last-row') {
      border-bottom: 0;
    }
  }
}
</style>
