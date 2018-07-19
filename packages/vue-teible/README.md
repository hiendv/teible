# Vue Teible
## Installation & Usage
### NPM
```bash
npm install --save vue-teible
# or with yarn
yarn add vue-teible
```

```vue
<script>
// import components
import { DataTable, DataColumn } from 'vue-teible'

// initiate a Vue instance
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
      this.items = this.items.filter(item => {
        return item.id !== x.id
      })
    }
  }
})
</script>

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
  items: { // Data
    type: [Array, Function],
    required: true
  },
  perPage: { // Number of records for each page
    type: Number,
    default: 10
  },
  sortBy: { // Sorting field
    type: String,
    default: ''
  },
  sortDesc: { // Descending sort
    type: Boolean,
    default: false
  },
  filter: { // Search query
    type: String,
    default: ''
  }
}
```
#### Methods
```js
{
  loadSlots () {
    // Manually load columns
  },
  loadItems () {
    // Manually load data
  }
}
```
### DataColumn
#### Props
```js
{
  label: { // Column label
    type: String,
    required: true
  },
  field: { // Column field from data
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
  }
}
```

## Development & Testing
Please check the [Contributing Guidelines](https://github.com/hiendv/octicons-modular/blob/master/CONTRIBUTING.md).

## Contribution
Issues and PRs are welcome !
