<template>
  <nav :class="theme.datatable__pagination">
    <a
      :disabled="reachedFirst" :class="[theme.datatable__plink, theme.datatable__pprevious]" href="#"
      aria-label="Previous" @click.prevent="load(page-1)"
    >
      <span aria-hidden="true">&laquo;</span>
    </a>
    <a
      :disabled="reachedLast" :class="[theme.datatable__plink, theme.datatable__pnext]" href="#"
      aria-label="Next" @click.prevent="load(page+1)"
    >
      <span aria-hidden="true">&raquo;</span>
    </a>

    <ul :class="theme.datatable__plist">
      <li v-for="(p, index) in pages" :key="index" :class="theme.datatable__pitem">
        <a
          :disabled="p.disabled" :class="{
            [theme.datatable__plink]: true,
            [theme['datatable__plink--active']]: isActive(p),
          }" href="#"
          @click.prevent="load(p.value, p.disabled)"
        >{{ p.value }}</a>
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
      return paginate(this.page, this.totalPages, 3, 2)
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
