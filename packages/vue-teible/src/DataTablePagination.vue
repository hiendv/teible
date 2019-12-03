<template>
  <nav :class="theme.datatable__pagination">
    <ul :class="theme.datatable__plist">
      <li :class="theme.datatable__pitem">
        <a
          :class="{
            [theme.datatable__plink]: true,
            [theme['datatable__plink--disabled']]: reachedFirst
          }" href="#" aria-label="Previous"
          @click.prevent="load(page-1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li><li v-for="(p, index) in pages" :key="index" :class="theme.datatable__pitem">
        <a
          :class="{
            [theme.datatable__plink]: true,
            [theme['datatable__plink--active']]: isActive(p),
            [theme['datatable__plink--disabled']]: p.disabled
          }" href="#" @click.prevent="load(p.value, p.disabled)"
        >{{ p.value }}</a>
      </li><li :class="theme.datatable__pitem">
        <a
          :class="{
            [theme.datatable__plink]: true,
            [theme['datatable__plink--disabled']]: reachedLast
          }" href="#" aria-label="Next"
          @click.prevent="load(page+1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>
<script>
import { paginate } from 'teible'

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
    },
    theme () {
      return this.$theme()
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
  },
  inject: ['$theme']
}
</script>
