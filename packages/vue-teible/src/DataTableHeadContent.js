import Octicon from 'octicons-vue/lib/Octicon'
import triangleDown from 'octicons-modular/lib/icons/triangle-down'
import triangleUp from 'octicons-modular/lib/icons/triangle-up'
import threeBars from 'octicons-modular/lib/icons/three-bars'

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
    },
    theme: {
      type: Object,
      required: true
    }
  },
  render (h, { props }) {
    const theme = props.theme // vuejs/vue#5837
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
        class: theme['datatable__column-text']
      }
    }, capitalize(props.column.label || props.column.field)) ]
    if (props.column.sortable) {
      children.push(h(Octicon, {
        props: {
          icon: icon(props.column, props.active, props.sortDesc),
          className: theme['datatable__column-icon']
        }
      }))
    }
    return children
  }
}
