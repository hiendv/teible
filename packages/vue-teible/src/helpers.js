const chunk = (arr, size) => {
  if (!size) {
    size = arr.length
  }

  let result = []
  for (let i = 0, len = arr.length; i < len; i += size) { result.push(arr.slice(i, i + size)) }
  return result
}

const orderBy = (arr, field, order) => {
  let copy = [...arr]
  copy.sort((a, b) => {
    if (order === 'desc') {
      return a[field] < b[field]
    }

    return a[field] > b[field]
  })

  return copy
}

const filterData = (items, filtering) => {
  return items.filter(item => {
    for (let i = 0; i < filtering.fields.length; i++) {
      let field = filtering.fields[i]

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
