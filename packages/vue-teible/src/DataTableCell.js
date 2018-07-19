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
      return h('td', data, props.item[props.column.field])
    }

    if (props.column.scopedSlots && typeof props.column.scopedSlots.default === 'function') {
      return h('td', data, props.column.scopedSlots.default(props))
    }

    return h('td', data, props.column.children)
  }
}
