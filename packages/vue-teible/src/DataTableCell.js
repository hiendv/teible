import { pathIndex } from './helpers'

export default {
  functional: true,
  props: {
    item: {
      type: Object,
      required: true
    },
    column: {
      type: Object,
      required: true
    }
  },
  render (h, { props, data }) {
    if (props.column.field) {
      let value = pathIndex(props.item, props.column.field)
      if (typeof value === 'string') {
        return h('td', data, value)
      }

      return h('td', data, JSON.stringify(value))
    }

    if (props.column.scopedSlots && typeof props.column.scopedSlots.default === 'function') {
      return h('td', data, props.column.scopedSlots.default(props))
    }

    return h('td', data, props.column.children)
  }
}
