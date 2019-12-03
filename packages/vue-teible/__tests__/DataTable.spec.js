import { mount, createLocalVue } from '@vue/test-utils'
import { DataTable, DataColumn } from '../src/main.js'

let localVue = null

beforeAll(() => {
  localVue = createLocalVue()
  localVue.component('DataTable', DataTable)
  localVue.component('DataColumn', DataColumn)
})

afterAll(() => {
  localVue = null
})

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

  it('works with sync data', () => {
    const items = generateItems()
    const wrapper = mount(DataTable, {
      propsData: { items, perPage: 2 },
      mocks: {
        idx (id) {
          return `id-${id}`
        }
      },
      slots: {
        default: `
          <data-column field="id" label="ID" :render="idx"/>
          <data-column field="key" label="Value"/>
        `
      },
      localVue
    })

    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ items: [] })
    return wrapper.vm.$nextTick()
      .then(() => {
        expect(wrapper.html()).toMatchSnapshot()
      })
  })

  it('works with sync data using function', () => {
    const items = generateItems()
    const wrapper = mount(DataTable, {
      propsData: {
        items () {
          return {
            items,
            total: items.length
          }
        }
      },
      mocks: {
        idx (id) {
          return `id-${id}`
        }
      },
      slots: {
        default: `
          <data-column field="id" label="ID" :render="idx"/>
          <data-column field="key" label="Value"/>
        `
      },
      localVue
    })

    expect(wrapper.vm.transformed).toEqual([])
    expect(wrapper.isVueInstance()).toBeTruthy()
    return wrapper.vm.$nextTick()
      .then(() => {
        expect(wrapper.html()).toMatchSnapshot()
      })
  })

  it('works with async data', () => {
    const items = generateItems()
    const wrapper = mount(DataTable, {
      propsData: {
        items () {
          return new Promise(resolve => {
            resolve({
              items,
              total: items.length
            })
          })
        }
      },
      mocks: {
        idx (id) {
          return `id-${id}`
        }
      },
      slots: {
        default: `
          <data-column field="id" label="ID" :render="idx"/>
          <data-column field="key" label="Value"/>
        `
      },
      localVue
    })

    expect(wrapper.isVueInstance()).toBeTruthy()
    return wrapper.vm.$nextTick()
      .then(() => {
        expect(wrapper.html()).toMatchSnapshot()
      })
  })

  it('works with no columns', () => {
    const wrapper = mount(DataTable, {
      propsData: { items: generateItems() }
    })

    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('works with empty data', () => {
    const wrapper = mount(DataTable, {
      propsData: { items: [] },
      mocks: {
        idx (id) {
          return `id-${id}`
        }
      },
      slots: {
        default: `
          <data-column field="id" label="ID" :render="idx"/>
          <data-column field="key" label="Value"/>
        `
      },
      localVue
    })

    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('works with vue-i18n', () => {
    // Mocking vue-i18n because of https://github.com/kazupon/vue-i18n/issues/501
    const items = generateItems()
    const wrapper = mount(DataTable, {
      propsData: { items, perPage: 2 },
      slots: {
        default: `
          <data-column field="id" label="ID"/>
          <data-column field="key" label="Value"/>
        `
      },
      mocks: {
        $tc (key, count) {
          if (count) {
            return `${key}-${count}`
          }

          return key
        }
      }
    })

    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('emits loaded', () => {
    const items = generateItems()
    const wrapper = mount(DataTable, {
      propsData: { items: generateItems(), perPage: 1 },
      mocks: {
        idx (id) {
          return `id-${id}`
        }
      },
      slots: {
        default: `
          <data-column field="id" label="ID" :render="idx"/>
          <data-column field="key" label="Value"/>
        `
      },
      localVue
    })

    const theItem = items[0]
    theItem.$_id = theItem.id
    theItem.id = `id-${theItem.id}`

    expect(wrapper.emitted().loaded).toEqual([[{
      items: [theItem],
      total: items.length
    }]])
  })

  it('emits update:sortBy', () => {
    const wrapper = mount(DataTable, {
      props: { items: generateItems() },
      slots: {
        default: `
          <data-column field="id" label="ID"/>
          <data-column field="key" label="Value"/>
        `
      },
      localVue
    })

    wrapper.find('th').trigger('click')
    return wrapper.vm.$nextTick()
      .then(() => {
        expect(wrapper.emitted()['update:sortBy']).toEqual([['id']])
      })
  })

  it('emits update:sortDesc', () => {
    const wrapper = mount(DataTable, {
      propsData: { items: generateItems(), sortBy: 'id', sortDesc: true },
      slots: {
        default: `
          <data-column field="id" label="ID"/>
          <data-column field="key" label="Value"/>
        `
      },
      localVue
    })

    wrapper.find('th').trigger('click')
    return wrapper.vm.$nextTick()
      .then(() => {
        expect(wrapper.emitted()['update:sortDesc']).toEqual([[false]])
      })
  })

  it('emits update:filter', () => {
    const wrapper = mount(DataTable, {
      propsData: { items: generateItems(), filter: 'z' },
      slots: {
        default: `
          <data-column field="id" label="ID"/>
          <data-column field="key" label="Value"/>
        `
      },
      localVue
    })

    const input = wrapper.find('.datatable__input')
    input.element.value = 'a'
    input.trigger('input')

    return wrapper.vm.$nextTick()
      .then(() => {
        expect(wrapper.emitted()['update:filter']).toEqual([['a']])
      })
  })

  it('allows disableFiltering', () => {
    const wrapper = mount(DataTable, {
      propsData: { items: generateItems(), filter: 'z', disableFiltering: true },
      slots: {
        default: `
          <data-column field="id" label="ID"/>
          <data-column field="key" label="Value"/>
        `
      },
      localVue
    })

    expect(wrapper.find('.datatable__input').exists()).toBeFalsy()
  })

  it('keeps original items', () => {
    const items = [{
      foo: {
        bar: {
          baz: 'yo'
        }
      },
      qux: 'LOWERCASE ME'
    }]
    const wrapper = mount(DataTable, {
      propsData: {
        items
      },
      mocks: {
        u (value) {
          return value.toUpperCase()
        },
        l (value) {
          return value.toLowerCase()
        }
      },
      slots: {
        default: `
          <data-column field="foo.bar.baz" label="dot-chaining field" :sortable="false" :render="u"/>
          <data-column field="qux" label="plain field" :sortable="false" :render="l"/>
        `
      },
      localVue
    })

    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
