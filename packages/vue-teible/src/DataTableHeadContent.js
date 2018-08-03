import Octicon, { triangleDown, triangleUp, threeBars } from 'octicons-vue'

const capitalize = str => {
  if (!str) {
    return
  }

  return str.charAt(0).toUpperCase() + str.slice(1)
}

const icon = (column, active, sortDesc) => {
  if (active) {
    return sortDesc ? triangleDown : triangleUp
  }

  return threeBars
}

export default {
  functional: true,
  props: {
    column: {
      type: Object,
      required: true
    },
    active: {
      type: Boolean,
      required: true
    },
    sortDesc: {
      type: Boolean,
      required: true
    }
  },
  render (h, { props, data }) {
    if (props.column.scopedSlots && props.column.scopedSlots.header) {
      return h('span', {
        on: {
          click ($event) {
            $event.stopPropagation()
          }
        }
      }, props.column.scopedSlots.header(props))
    }

    let children = [ h('span', {
      attrs: {
        class: 'datatable__column-text'
      }
    }, capitalize(props.column.label)) ]
    if (props.column.sortable) {
      children.push(h(Octicon, {
        props: {
          icon: icon(props.column, props.active, props.sortDesc),
          className: 'datatable__column-icon'
        }
      }))
    }
    return children
  }
}
