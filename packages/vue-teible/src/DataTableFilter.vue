<template>
  <div :class="theme.datatable__filter" data-elm="filter">
    <input
      :value="filter" type="text" :class="theme.datatable__input"
      :placeholder="t('teible.filter')" data-elm="input" @input="update($event.target.value)"
    >
    <div
      v-if="filter" :class="theme.datatable__clear" data-elm="clear"
      @click.stop="clear"
    >
      <a
        :class="theme.datatable__x" href="#" data-elm="x"
        @click.stop.prevent="clear"
      >×</a>
    </div>
  </div>
</template>
<script>
import { i18nMixin } from './helpers'
export default {
  name: 'DataTableFilter',
  mixins: [i18nMixin],
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
