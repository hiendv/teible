import { shallowMount } from '@vue/test-utils'
import DataTablePagination from '../src/DataTablePagination.vue'

describe('DataTablePagination', () => {
  it(`renders correctly`, () => {
    let wrapper = shallowMount(DataTablePagination, {
      propsData: {
        total: 10,
        page: 2,
        perPage: 3
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it(`renders correctly with invalid perPage`, () => {
    let wrapper = shallowMount(DataTablePagination, {
      propsData: {
        total: 10,
        page: 1,
        perPage: 0
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it(`renders correctly when total change`, () => {
    let wrapper = shallowMount(DataTablePagination, {
      propsData: {
        total: 10,
        page: 4,
        perPage: 3
      }
    })
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({
      total: 9
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it(`emits update:page events`, () => {
    let wrapper = shallowMount(DataTablePagination, {
      propsData: {
        total: 10,
        perPage: 3,
        page: 2
      }
    })

    wrapper.find('.datatable__pprev').trigger('click')
    expect(wrapper.emitted()).toEqual({ 'update:page': [[1]] })
    wrapper.setProps({ // fake two-way binding
      'page': 1
    })

    wrapper.find('.datatable__pprev').trigger('click')
    expect(wrapper.emitted()).toEqual({ 'update:page': [[1]] })

    wrapper.findAll('.datatable__plink').at(4).trigger('click')
    expect(wrapper.emitted()).toEqual({ 'update:page': [[1], [4]] })
    wrapper.setProps({ // fake two-way binding
      'page': 4
    })
    wrapper.find('.datatable__pnext').trigger('click')
    expect(wrapper.emitted()).toEqual({ 'update:page': [[1], [4]] })
  })
})
