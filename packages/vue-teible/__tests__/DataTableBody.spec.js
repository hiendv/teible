import { shallowMount } from '@vue/test-utils'
import idObj from 'identity-obj-proxy'
import DataTableBody from '../src/DataTableBody.vue'

describe('DataTableBody', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(DataTableBody, {
      propsData: {
        items: [{
          one: 'foo',
          two: 'bar'
        }, {
          one: 'baz',
          two: 'qux'
        }],
        columns: [{
          field: 'one',
          label: 'One'
        }, {
          field: 'two',
          label: 'Two'
        }],
        click: () => {}
      },
      provide: () => ({
        $theme: () => idObj
      })
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
