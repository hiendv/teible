import { mount } from '@vue/test-utils'
import DataTableCell from '../src/DataTableCell.js'

describe('DataTableCell', () => {
  it(`renders correctly`, () => {
    let wrapper = mount(DataTableCell, {
      context: {
        props: {
          item: {
            'one': 'foo',
            'two': 'bar'
          },
          column: {
            field: 'one'
          }
        }
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it(`renders objects correctly`, () => {
    let wrapper = mount(DataTableCell, {
      context: {
        props: {
          item: {
            'one': {
              foo: 'bar'
            },
            'two': 'bar'
          },
          column: {
            field: 'one'
          }
        }
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it(`renders scopedSlots correctly`, () => {
    let wrapper = mount(DataTableCell, {
      context: {
        props: {
          item: {
            'one': 'foo',
            'two': 'bar'
          },
          column: {
            scopedSlots: {
              default (props) {
                return JSON.stringify(props.item)
              }
            }
          }
        }
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it(`renders scopedSlots with field correctly`, () => {
    let wrapper = mount(DataTableCell, {
      context: {
        props: {
          item: {
            'one': 'foo',
            'two': 'bar'
          },
          column: {
            field: 'one',
            scopedSlots: {
              default ({ value }) {
                return value
              }
            }
          }
        }
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it(`renders children correctly`, () => {
    let wrapper = mount(DataTableCell, {
      context: {
        props: {
          item: {
            'one': 'foo',
            'two': 'bar'
          },
          column: {
            children: ['yo']
          }
        }
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
