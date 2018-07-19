import { shallowMount } from '@vue/test-utils'
import DataTableBody from '../src/DataTableBody.vue'

describe('DataTableBody', () => {
  it(`renders correctly`, () => {
    let wrapper = shallowMount(DataTableBody, {
      propsData: {
        items: [{
          'one': 'foo',
          'two': 'bar'
        }, {
          'one': 'baz',
          'two': 'qux'
        }],
        columns: [{
          field: 'one',
          label: 'One'
        }, {
          field: 'two',
          label: 'Two'
        }]
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
