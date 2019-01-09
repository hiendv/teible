# Vue Teible
## Introduction
Teible is yet another table component. I know we have [enough of them](https://github.com/vuejs/awesome-vue#table) but it is something else.

### Features
- Column definition using template
- Filtering, ordering and pagination
- Synchronous and asynchronous data (Promise)
- Customizable headers & cells using slot and formatter
- Customizable styling & attributes
- Dot-notation support for column fields

Teible is heavily inspired by [vue-table-component](https://github.com/spatie/vue-table-component). The way columns are defined totally got me at the first sight. But it's deprecated in favor of the "traditional" way, no longer in maintenance and has a lot of fancy features you may never need: data type, date format, caching, etc. So if you're looking for a simple but flexible component, take a look at the below example, you may fall in love with teible.

### Demo
See [https://hiendv.github.io/teible/](https://hiendv.github.io/teible/) or [the fiddle](https://jsfiddle.net/o4m7k1z6/6/)

## Installation & Usage
### CDN
[![](https://data.jsdelivr.com/v1/package/npm/vue-teible/badge)](https://www.jsdelivr.com/package/npm/vue-teible)
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vue-teible@latest/dist/vueteible.css" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/vue-teible@latest/dist/vueteible.iife.js" crossorigin="anonymous"></script>
```
**Note: We recommend linking to a specific version number that you can update manually**
```js
Vue.component('data-table', vueteible.DataTable)
Vue.component('data-column', vueteible.DataColumn)
```

### NPM
```bash
npm install --save vue-teible
# yarn add vue-teible
```

```vue
<script>
import Vue from 'vue'
import 'vue-teible/dist/vueteible.css'
import { DataTable, DataColumn } from 'vue-teible'

new Vue({
  el: '#app',
  components: { DataTable, DataColumn },
  data: {
    items: [{
      id: 'id-1',
      name: 'foo'
    }, {
      id: 'id-2',
      name: 'bar'
    }, {
      id: 'id-3',
      name: 'qux'
    }]
  },
  methods: {
    destroy (x) {
      this.items = this.items.filter(item => item.id !== x.id)
    }
  }
})
</script>

// write your table
<template>
  <data-table :items="items">
    <data-column field="id" label="ID"/>
    <data-column field="name" label="Name" width="50%"/>
    <data-column label="Action" :sortable="false">
      <template slot-scope="props">
        <button @click.prevent="destroy(props.item)">Delete</button>
      </template>
    </data-column>
  </data-table>
</template>
```

If you're looking for a more complicated use-case, see **[vue-teible-example](/packages/vue-teible-example)**.
## Documentation
### DataTable
#### Props
```js
{
  items: { // Array of objects or Function (filtering, sorting, paging)
    type: [Array, Function],
    required: true
  },
  perPage: {
    type: Number,
    default: 10
  },
  sortBy: {
    type: String,
    default: ''
  },
  sortDesc: {
    type: Boolean,
    default: false
  },
  filter: {
    type: String,
    default: ''
  }
}
```
#### Methods
+ loadSlots (): reload columns manually
+ loadItems (): reload data manually

#### Events
+ loaded (items): fired when items are loaded

### DataColumn
#### Props
```js
{
  label: {
    type: String,
    required: true
  },
  field: {
    type: String,
    default: ''
  },
  sortable: {
    type: Boolean,
    default: true
  },
  filterable: {
    type: Boolean,
    default: true
  },
  render: { // Function (value, item). Format the column with the original value reserved at $_[field]
    type: Function
  }
}
```

## Development & Testing
Please check the [Contributing Guidelines](https://github.com/hiendv/teible/blob/master/CONTRIBUTING.md).

## Contribution
Issues and PRs are welcome !
