import orderBy from 'lodash.orderby'
import chunk from 'lodash.chunk'

const filterData = (items, filtering) => {
  return items.filter(item => {
    for (let field of filtering.fields) {
      if (!item[field]) {
        continue
      }

      if (`${item[field]}`.toLowerCase().indexOf(filtering.query) === -1) {
        continue
      }

      return true
    }

    return false
  })
}

export const load = (data, filtering, sorting, paging) => {
  let filtered = (!filtering || !filtering.query) ? data : filterData(data, filtering)
  if (!filtered || !filtered.length) {
    return {
      items: [],
      total: 0
    }
  }

  let ordered = orderBy(filtered, sorting.by, sorting.order)
  let chunked = chunk(ordered, paging.perPage)
  let items = chunked[paging.page - 1]
  if (!items) {
    return {
      items: [],
      total: filtered.length
    }
  }

  return {
    items,
    total: filtered.length
  }
}

export const defaultProps = (options, data) => {
  let props = {}
  for (let key in options) {
    if (data[key] !== undefined) {
      props[key] = data[key]
      continue
    }

    if (typeof options[key].default === 'function') {
      props[key] = options[key].default()
      continue
    }

    props[key] = options[key].default
  }

  return props
}
