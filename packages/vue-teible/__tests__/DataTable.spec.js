import Vue from 'vue'
import { mount } from '@vue/test-utils'
import { DataTable, DataColumn } from '../src/main.js'

const fakeMount = (component, options, children) => {
  if (!children) {
    return mount(component, options)
  }

  let App = Vue.extend({
    render (h) {
      return h(component, options, children(h))
    }
  })

  return mount(App).find(component)
}

describe('DataTable', () => {
  const generateItems = () => [{
    id: 1,
    key: 'value z (id-1)'
  }, {
    id: 2,
    key: 'value m (id-2)'
  }, {
    id: 3,
    key: 'value a (id-3)'
  }]

  const defaultColumns = h => {
    return [ h(DataColumn, { props: { field: 'id', label: 'ID', render: id => `id-${id}` } }), h(DataColumn, { props: { field: 'key', label: 'Value' } }) ]
  }

  it('works with sync data', () => {
    let wrapper = fakeMount(DataTable, {
      props: { items: generateItems(), perPage: 2 }
    }, defaultColumns)

    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('works with async data', () => {
    let items = generateItems()
    let wrapper = fakeMount(DataTable, {
      props: {
        items () {
          return new Promise(resolve => {
            resolve({
              items,
              total: items.length
            })
          })
        }
      }
    }, defaultColumns)

    expect(wrapper.isVueInstance()).toBeTruthy()
    return wrapper.vm.$nextTick()
      .then(() => {
        expect(wrapper.html()).toMatchSnapshot()
      })
  })

  it('works with no columns', () => {
    let wrapper = fakeMount(DataTable, {
      props: { items: generateItems() }
    })

    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('works with empty data', () => {
    let wrapper = fakeMount(DataTable, {
      props: { items: [] }
    }, defaultColumns)

    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('emits loaded', () => {
    let items = generateItems()
    let wrapper = fakeMount(DataTable, {
      props: { items, perPage: 1 }
    }, defaultColumns)

    expect(wrapper.emitted()['loaded']).toEqual([[{
      items: [items[0]],
      total: items.length
    }]])
  })

  it('emits update:sortBy', () => {
    let wrapper = fakeMount(DataTable, {
      props: { items: generateItems() }
    }, defaultColumns)

    wrapper.find('th').trigger('click')
    expect(wrapper.emitted()['update:sortBy']).toEqual([['id']])
  })

  it('emits update:sortDesc', () => {
    let wrapper = fakeMount(DataTable, {
      props: { items: generateItems(), sortBy: 'id', sortDesc: true }
    }, defaultColumns)

    wrapper.find('th').trigger('click')
    expect(wrapper.emitted()['update:sortDesc']).toEqual([[false]])
  })

  it('emits update:filter', () => {
    let wrapper = fakeMount(DataTable, {
      props: { items: generateItems(), filter: 'z' }
    }, defaultColumns)

    const input = wrapper.find('.datatable__input')
    input.element.value = 'a'
    input.trigger('input')

    expect(wrapper.emitted()['update:filter']).toEqual([['a']])
  })
})
