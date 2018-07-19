import { shallowMount } from '@vue/test-utils'
import DataTableFilter from '../src/DataTableFilter.vue'

describe('DataTableFilter', () => {
  it(`renders correctly`, () => {
    let wrapper = shallowMount(DataTableFilter, {
      propsData: {
        filter: 'default'
      }
    })
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.find('input').element.value = 'new value'
    wrapper.find('input').trigger('input')
    expect(wrapper.emitted()['update:filter']).toEqual([['new value']])

    wrapper.find('.datatable__x').trigger('click')
    expect(wrapper.emitted()['update:filter']).toEqual([['new value'], ['']])
  })
})
