<template>
  <nav :class="theme.datatable__pagination" data-elm="pagination">
    <span v-if="total" :class="theme.datatable__ptext" data-elm="ptext">
      {{ t('teible.showing') }} <span v-text="from === to && to === total ? t('teible.last') : from + ' – ' + to" /> {{ t('teible.total', total) }}
    </span>
    <span v-else :class="theme.datatable__ptext" data-elm="ptext">{{ t('teible.empty') }}</span>

    <a
      :disabled="reachedFirst" :class="[theme.datatable__plink, theme.datatable__pprevious]" href="#"
      aria-label="Previous" data-elm="plink"
      data-previous @click.prevent="load(page-1)"
    >
      <span aria-hidden="true">&laquo;</span>
    </a>
    <a
      :disabled="reachedLast" :class="[theme.datatable__plink, theme.datatable__pnext]" href="#"
      aria-label="Next" data-elm="plink"
      data-pnext @click.prevent="load(page+1)"
    >
      <span aria-hidden="true">&raquo;</span>
    </a>

    <ul :class="theme.datatable__plist" data-elm="plist">
      <li
        v-for="(p, index) in pages" :key="index" :class="theme.datatable__pitem"
        data-elm="pitem"
      >
        <a
          :disabled="p.disabled" :class="{
            [theme.datatable__plink]: true,
            [theme['datatable__plink--active']]: isActive(p),
          }" href="#"
          data-elm="plink"
          :data-active="isActive(p)"
          @click.prevent="load(p.value, p.disabled)"
        >{{ p.value }}</a>
      </li>
    </ul>
  </nav>
</template>
<script>
import { paginate } from 'teible'
import { i18nMixin } from './helpers'

export default {
  name: 'DataTablePagination',
  mixins: [i18nMixin],
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
    },
    eachSide: {
      type: Number,
      required: true
    }
  },
  computed: {
    pages () {
      return paginate(this.page, this.totalPages, 3, this.eachSide)
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
    },
    from () {
      return (this.page - 1) * this.perPage + 1
    },
    to () {
      const x = this.page * this.perPage
      return this.total < x ? this.total : x
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
