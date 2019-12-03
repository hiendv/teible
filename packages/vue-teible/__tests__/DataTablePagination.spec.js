import { shallowMount } from '@vue/test-utils'
import idObj from 'identity-obj-proxy'
import DataTablePagination from '../src/DataTablePagination.vue'

describe('DataTablePagination', () => {
  // wrapper.setProps lines are to mock two-way binding

  it('renders correctly', () => {
    const wrapper = shallowMount(DataTablePagination, {
      propsData: {
        total: 10,
        page: 2,
        eachSide: 2,
        perPage: 3
      },
      provide: () => ({
        $theme: () => idObj
      })
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders correctly with invalid perPage', () => {
    const wrapper = shallowMount(DataTablePagination, {
      propsData: {
        total: 10,
        page: 1,
        eachSide: 2,
        perPage: 0
      },
      provide: () => ({
        $theme: () => idObj
      })
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders correctly when total change', () => {
    const wrapper = shallowMount(DataTablePagination, {
      propsData: {
        total: 10,
        page: 4,
        eachSide: 2,
        perPage: 3
      },
      provide: () => ({
        $theme: () => idObj
      })
    })
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({
      total: 9
    })

    return wrapper.vm.$nextTick()
      .then(() => {
        expect(wrapper.html()).toMatchSnapshot()
      })
  })

  it('emits update:page events', () => {
    const wrapper = shallowMount(DataTablePagination, {
      propsData: {
        total: 10,
        eachSide: 2,
        perPage: 3,
        page: 2
      },
      provide: () => ({
        $theme: () => idObj
      })
    })

    wrapper.find('.datatable__pprevious').trigger('click')
    expect(wrapper.emitted()).toEqual({ 'update:page': [[1]] })
    wrapper.setProps({
      page: 1
    })

    // < > [1] 2 3 4

    /*
      Nothing emitted since we reached the first page
    */
    wrapper.find('.datatable__pprevious').trigger('click')
    expect(wrapper.emitted()).toEqual({ 'update:page': [[1]] })

    wrapper.findAll('.datatable__plink').at(5).trigger('click')
    expect(wrapper.emitted()).toEqual({ 'update:page': [[1], [4]] })
    wrapper.setProps({
      page: 4
    })

    /*
      Nothing emitted since we reached the last page
    */
    wrapper.find('.datatable__pnext').trigger('click')
    expect(wrapper.emitted()).toEqual({ 'update:page': [[1], [4]] })
  })

  it('does not emit update:page event when clicking on the three-dots button', () => {
    const wrapper = shallowMount(DataTablePagination, {
      propsData: {
        total: 10,
        page: 1,
        eachSide: 2,
        perPage: 1
      },
      provide: () => ({
        $theme: () => idObj
      })
    })
    expect(wrapper.html()).toMatchSnapshot() // < > [1] 2 3 ... 9 10

    wrapper.findAll('.datatable__plink').at(3).trigger('click')
    expect(wrapper.emitted()).toEqual({ 'update:page': [[2]] }) // < > 1 [2] 3 ... 9 10
    wrapper.setProps({
      page: 2
    })

    return wrapper.vm.$nextTick()
      .then(() => {
        // Clicking on the [...]
        wrapper.findAll('.datatable__plink').at(5).trigger('click') // this won't actually do because of vuejs/vue-test-utils/issues/1321
        expect(wrapper.emitted()).toEqual({ 'update:page': [[2]] }) // < > 1 [2] 3 ... 9 10

        wrapper.findAll('.datatable__plink').at(7).trigger('click')
        expect(wrapper.emitted()).toEqual({ 'update:page': [[2], [10]] }) // < > 1 2 3 ... 9 [10]
        wrapper.setProps({
          page: 10
        })
      })
  })
})
