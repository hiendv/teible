import { dotGet } from 'teible'

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
      let value = dotGet(props.item, props.column.field)
      if (props.column.scopedSlots && typeof props.column.scopedSlots.default === 'function') {
        return h('td', data, props.column.scopedSlots.default({ value, item: props.item, column: props.column }))
      }

      if (typeof value !== 'string') {
        value = JSON.stringify(value)
      }
      return h('td', data, value)
    }

    if (props.column.scopedSlots && typeof props.column.scopedSlots.default === 'function') {
      return h('td', data, props.column.scopedSlots.default(props))
    }

    return h('td', data, props.column.children)
  }
}
