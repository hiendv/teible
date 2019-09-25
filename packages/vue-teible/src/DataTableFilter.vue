<template>
  <div :class="theme.datatable__filter">
    <input
      :value="filter" type="text" :class="theme.datatable__input"
      placeholder="Filter table data" @input="update($event.target.value)"
    >
    <div v-if="filter" :class="theme.datatable__clear" @click.stop="clear">
      <a :class="theme.datatable__x" href="#" @click.stop.prevent="clear">×</a>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DataTableFilter',
  props: {
    filter: {
      type: String,
      required: true
    }
  },
  computed: {
    theme () {
      return this.$theme()
    }
  },
  methods: {
    update (filter) {
      this.$emit('update:filter', filter)
    },
    clear () {
      this.$emit('update:filter', '')
    }
  },
  inject: ['$theme']
}
</script>
