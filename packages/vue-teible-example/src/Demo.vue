<template>
  <div>
    <slot/>
    <div class="demo__info">
      <p class="demo__line">Items per page: <span class="demo__value"><input class="demo__control" v-model="perPage" type="range" min="1" max="10" step="1"> {{ perPage }}</span></p>
      <p class="demo__line">Filter: <span class="demo__value"><input class="demo__control" v-model="filter" type="text"></span></p>
      <p class="demo__line">Sort By: <span class="demo__value">{{ sortBy }}</span></p>
      <p class="demo__line">Descending: <span class="demo__value">{{ sortDesc }}</span></p>
      <p class="demo__line">Selected: <span class="demo__value">{{ checked }}</span></p>
    </div>
    <hr>
    <data-table
      :items="items"
      :per-page="perPageNumber"
      :sort-desc.sync="sortDesc"
      :sort-by.sync="sortBy"
      :filter.sync="filter"
      @loaded="loaded"
    >
      <data-column field="id" label="ID" width="10%"/>
      <data-column field="name" label="Name" width="50%"/>
      <data-column :sortable="false" label="Action">
        <template slot-scope="props">
          <button @click.prevent="action(props, 1)">Yo</button>
          <button @click.prevent="action(props, 10)">Yo x10</button>
          <button @click.prevent="destroy(props.item)">Delete</button>
        </template>
      </data-column>
      <data-column :sortable="false" label="Text">Hello</data-column>
      <data-column :sortable="false" label="Select">
        <template slot-scope="props" slot="header">
          <input v-model="checkedAll" type="checkbox">
        </template>
        <template slot-scope="props">
          <input v-model="checked" :value="props.item.name" type="checkbox">
        </template>
      </data-column>
    </data-table>
  </div>
</template>
<style lang="scss">
@mixin clearfix {
  &:after {
    content: "";
    display: table;
    clear: both;
  }
}

.demo__info {
  position: relative;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
}

.demo__line {
  margin: 0;
  margin-top: -1px;
  padding: .7rem;
  background-color: #fff;
  border: 1px solid rgba(0,0,0,.125);
  font-weight: 300;
  @include clearfix;
}

.demo__control {
  max-height: 2em;
}

.demo__value {
  float: right;
  font-weight: bold;
}
</style>
<script>
import { DataTable, DataColumn } from 'vue-teible'
export default {
  name: 'Demo',
  components: { DataTable, DataColumn },
  props: {
    items: {
      type: [Array, Function]
    }
  },
  data () {
    return {
      sortBy: '',
      sortDesc: false,
      perPage: 4,
      filter: '',
      checked: [],
      loadedItems: []
    }
  },
  computed: {
    perPageNumber () {
      return parseInt(this.perPage)
    },
    checkedAll: {
      get () {
        if (!this.checked.length) {
          return false
        }

        for (let item of this.loadedItems) {
          if (this.checked.indexOf(item.name) === -1) {
            return false
          }
        }

        return true
      },
      set (val) {
        if (!val) {
          this.checked = this.checked.filter(i => {
            for (let item of this.loadedItems) {
              if (item.name === i) {
                return false
              }
            }

            return true
          })
          return
        }

        this.checked = this.uniq(this.checked.concat(this.loadedItems.map(i => i.name)))
      }
    }
  },
  methods: {
    uniq (arrArg) {
      return arrArg.filter((elem, pos, arr) => {
        return arr.indexOf(elem) === pos
      })
    },
    action (props, times) {
      for (let i = 0; i < times; i++) {
        props.item.name += ' Yo'
      }
    },
    destroy (x) {
      this.items = this.items.filter(item => {
        return item.id !== x.id
      })
    },
    loaded (data) {
      this.loadedItems = data.items
    }
  }
}
</script>
