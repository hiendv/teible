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
        click: () => {},
        hover: () => {}
      },
      provide: () => ({
        $theme: () => idObj
      })
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('accepts click', () => {
    const click = jest.fn()

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
        click,
        hover: () => {}
      },
      provide: () => ({
        $theme: () => idObj
      })
    })

    wrapper.find('tr').trigger('click')
    return wrapper.vm.$nextTick()
      .then(() => {
        expect(click.mock.calls.length).toBe(1)
        expect(click.mock.calls[0][0]).toBeInstanceOf(MouseEvent)
        expect(click.mock.calls[0][0].type).toBe('click')
        expect(click.mock.calls[0][1]).toStrictEqual({ one: 'foo', two: 'bar' })
        expect(click.mock.calls[0][2]).toStrictEqual(0)
      })
  })

  it('accepts hover', () => {
    const hover = jest.fn()

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
        click: () => {},
        hover
      },
      provide: () => ({
        $theme: () => idObj
      })
    })

    wrapper.find('tr').trigger('hover')
    return wrapper.vm.$nextTick()
      .then(() => {
        expect(hover.mock.calls.length).toBe(1)
        expect(hover.mock.calls[0][0]).toBeInstanceOf(Event)
        expect(hover.mock.calls[0][0].type).toBe('hover')
        expect(hover.mock.calls[0][1]).toStrictEqual({ one: 'foo', two: 'bar' })
        expect(hover.mock.calls[0][2]).toStrictEqual(0)
      })
  })
})
