import { mount } from '@vue/test-utils'
import DataTableCell from '../src/DataTableCell.js'

describe('DataTableCell', () => {
  it('renders correctly', () => {
    const wrapper = mount(DataTableCell, {
      context: {
        props: {
          item: {
            one: 'foo',
            two: 'bar'
          },
          column: {
            field: 'one'
          },
          index: 0
        }
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders objects correctly', () => {
    const wrapper = mount(DataTableCell, {
      context: {
        props: {
          item: {
            one: {
              foo: 'bar'
            },
            two: 'bar'
          },
          column: {
            field: 'one'
          },
          index: 0
        }
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders scopedSlots correctly', () => {
    const wrapper = mount(DataTableCell, {
      context: {
        props: {
          item: {
            one: 'foo',
            two: 'bar'
          },
          column: {
            scopedSlots: {
              default (props) {
                return JSON.stringify(props.item)
              }
            }
          },
          index: 0
        }
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders scopedSlots with field correctly', () => {
    const wrapper = mount(DataTableCell, {
      context: {
        props: {
          item: {
            one: 'foo',
            two: 'bar'
          },
          column: {
            field: 'one',
            scopedSlots: {
              default ({ value }) {
                return value
              }
            }
          },
          index: 0
        }
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders children correctly', () => {
    const wrapper = mount(DataTableCell, {
      context: {
        props: {
          item: {
            one: 'foo',
            two: 'bar'
          },
          column: {
            children: ['yo']
          },
          index: 0
        }
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders scopedSlots with index correctly', () => {
    const wrapper = mount(DataTableCell, {
      context: {
        props: {
          item: {
            one: 'foo',
            two: 'bar'
          },
          column: {
            scopedSlots: {
              default ({ index }) {
                return index
              }
            }
          },
          index: 1337
        }
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
