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
  const generateItems = (n = 3) => {
    if (n > 26) {
      n = 26
    }

    let output = []

    for (let i = 1; i <= n; i++) {
      output = output.concat({
        id: i,
        key: `value ${String.fromCharCode(123 - i)} (id-${i})`
      })
    }

    return output
  }

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

  it('allows pagination', () => {
    const wrapper = mount(DataTable, {
      propsData: { items: generateItems(), pagination: ['top', 'bottom'] },
      slots: {
        default: `
          <data-column field="id" label="ID"/>
          <data-column field="key" label="Value"/>
        `
      },
      localVue
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('allows paginationSide', () => {
    const wrapper = mount(DataTable, {
      propsData: { items: generateItems(26), paginationSide: 3, perPage: 2 },
      slots: {
        default: `
          <data-column field="id" label="ID"/>
          <data-column field="key" label="Value"/>
        `
      },
      localVue
    })

    expect(wrapper.html()).toMatchSnapshot()
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

  it('emits update:filter', () => {
    const mockCallback = jest.fn((event, item, index) => {
      return { item, index }
    })
    const items = generateItems()
    const wrapper = mount(DataTable, {
      propsData: { items, rowClick: mockCallback },
      slots: {
        default: `
          <data-column field="id" label="ID"/>
          <data-column field="key" label="Value"/>
        `
      },
      localVue
    })

    const input = wrapper.find('tbody tr')
    input.trigger('click')

    return wrapper.vm.$nextTick()
      .then(() => {
        expect(mockCallback.mock.calls.length).toBe(1)
        expect(mockCallback.mock.results[0].value).toMatchObject({
          item: items[0],
          index: 0
        })
      })
  })

  it('reloads', () => {
    const items = generateItems()
    const wrapper = mount(DataTable, {
      propsData: { items, perPage: 1 },
      slots: {
        default: `
          <data-column field="id" label="ID"/>
          <data-column field="key" label="Value"/>
        `
      },
      localVue
    })

    const link = wrapper.find('.datatable__pnext')
    link.trigger('click')

    return wrapper.vm.$nextTick()
      .then(() => {
        expect(wrapper.vm.page).toEqual(2)
        wrapper.vm.reloadItems()
        return wrapper.vm.$nextTick()
      })
      .then(() => {
        expect(wrapper.vm.page).toEqual(1)
        expect(wrapper.emitted().loaded).toEqual([
          [{ items: [items[0]], total: items.length }],
          [{ items: [items[1]], total: items.length }],
          [{ items: [items[0]], total: items.length }]
        ])
      })
  })
})
