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
      return dotGet(a, field) < dotGet(b, field)
    }

    return dotGet(a, field) > dotGet(b, field)
  })

  return copy
}

const filter = (items, filtering) => {
  return items.filter(item => {
    for (let i = 0; i < filtering.fields.length; i++) {
      let field = filtering.fields[i]
      let value = dotGet(item, field)

      if (!value) {
        continue
      }

      if (`${value}`.toLowerCase().indexOf(filtering.query) === -1) {
        continue
      }

      return true
    }

    return false
  })
}

export const load = (data, filtering, sorting, paging) => {
  let filtered = (!filtering || !filtering.query) ? data : filter(data, filtering)
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

export const dotGet = (obj, path) => {
  return path.split('.').reduce((o, i) => o[i], obj)
}

export const dotSet = (obj, path, val) => {
  let parts = path.split('.')
  return parts.reduce((o, i, idx) => {
    if (idx === parts.length - 1) {
      o[i] = val
      return o[i]
    }

    if (!o.hasOwnProperty(i)) {
      o[i] = {}
    }

    return o[i]
  }, obj)
}
