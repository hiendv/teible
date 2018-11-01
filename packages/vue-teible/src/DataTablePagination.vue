<template>
  <nav class="datatable__pagination">
    <ul class="datatable__plist">
      <li class="datatable__pitem">
        <a
          :class="[
            'datatable__plink datatable__pprev',
            {
              'datatable__plink--disabled': reachedFirst
            }
          ]" href="#" aria-label="Previous"
          @click.prevent="load(page-1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li><li v-for="(page, index) in pages" :key="index" class="datatable__pitem">
        <a :class="['datatable__plink', { 'datatable__plink--active': isActive(page), 'datatable__plink--disabled': page.disabled }]" href="#" @click.prevent="load(page.value, page.disabled)">{{ page.value }}</a>
      </li><li class="datatable__pitem">
        <a
          :class="['datatable__plink datatable__pnext', { 'datatable__plink--disabled': reachedLast }]" href="#" aria-label="Next"
          @click.prevent="load(page+1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>
<script>
import { paginate } from './helpers'
export default {
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
    pages () {
      return paginate(this.page, this.totalPages)
    },
    totalPages () {
      return Math.ceil(this.total / (this.perPage || 1))
    },
    reachedFirst () {
      return this.page === 1
    },
    reachedLast () {
      return this.page >= this.totalPages
    }
  },
  methods: {
    isActive (page) {
      return !page.disabled && this.page === page.value
    },
    load (page, disabled) {
      if (disabled) {
        return
      }

      if (page < 1) {
        return
      }

      if (page > this.totalPages) {
        return
      }

      this.$emit('update:page', page)
    }
  }
}
</script>
<style lang="scss">
@import '~@hiendv/bem-sass';
.datatable {
  @include e('pagination') {
    display: block;
  }

  @include e('plist') {
    display: inline-block;
    margin: 0;
    padding: 0;
    margin-top: .5em;
    border-radius: 4px;
  }

  @include e('pitem') {
    display: inline;
  }

  @include e('plink') {
    position: relative;
    float: left;
    padding: .3em .6em;
    margin-left: -1px;
    color: $color__plink;
    text-decoration: none;
    background-color: $bg-color;
    border: 1px solid $border-color;

    @include m('active') {
      z-index: 3;
      color: #fff!important;
      cursor: default;
      background-color: $bg-color__plink--active!important;
      border-color: $bg-color__plink--active!important;
    }

    @include m('disabled') {
      color: $color--disabled!important;
      cursor: not-allowed;
      background-color: $bg-color--disabled!important;
    }

    &:focus,
    &:hover {
      z-index: 2;
      background-color: $bg-color__plink--focus;
    }
  }
}
</style>
