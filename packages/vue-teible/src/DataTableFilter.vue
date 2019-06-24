<template>
  <div class="datatable__filter">
    <input
      :value="filter" type="text" class="datatable__input"
      placeholder="Filter table data" @input="update($event.target.value)">
    <div v-if="filter" class="datatable__clear" @click.stop="clear">
      <a class="datatable__x" href="#" @click.stop.prevent="clear">×</a>
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
  methods: {
    update (filter) {
      this.$emit('update:filter', filter)
    },
    clear () {
      this.$emit('update:filter', '')
    }
  }
}
</script>
<style lang="scss">
@import '~@hiendv/bem-sass';
.datatable {
  @include e('filter') {
    position: relative;
  }

  @include e('input') {
    width: 100%;
    padding: .3rem 1.5rem .3rem .75rem;
    font-size: 1em;
    line-height: 1.5;
    border: 1px solid $border-color;
    border-radius: .25rem;

    &:focus {
      outline: 0;
      border-color: $border-color--focus;
      box-shadow: 0 0 0 0.2rem rgba(100,100,100,.25);
    }
  }

  @include e('clear') {
    position: absolute;
    top: 0;
    right: 0;
    display: inline-block;
    height: 100%;
    border: 1px solid transparent;
    cursor: pointer;
    vertical-align: middle;
    &:hover {
      font-weight: bold;
    }

    &:active {
      font-weight: bold;
      text-shadow: 0px 0px 2px rgba(150, 150, 150, 1);
    }
  }

  @include e('x') {
    padding: .25em .75em;
    color: inherit!important;
    text-decoration: none;
    display: inline-block;
    vertical-align: middle;
  }
}
</style>
