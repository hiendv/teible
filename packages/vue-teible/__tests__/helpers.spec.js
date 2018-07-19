import { load, defaultProps } from '../src/helpers'

describe('load', () => {
  const data = [{
    id: 1,
    name: 'One'
  }, {
    id: 2,
    name: 'Two'
  }, {
    id: 3,
    name: 'Three'
  }, {
    id: 4,
    name: 'Four'
  }, {
    id: 5,
    name: 'Five'
  }]

  it('works', () => {
    expect(load(data, {
      query: 'e',
      fields: ['name']
    }, {
      by: 'id',
      order: 'desc'
    }, {
      perPage: 2,
      page: 1
    })).toEqual({
      items: [
        data[4],
        data[2]
      ],
      total: 3
    })
  })

  it('filters', () => {
    expect(load(data, {
      query: 'x',
      fields: ['name']
    }, {
      by: 'id'
    }, {
      perPage: 3,
      page: 1
    })).toEqual({
      items: [],
      total: 0
    })
  })

  it('filters with an invalid field', () => {
    expect(load(data, {
      query: 'o',
      fields: ['name', 'invalid']
    }, {
      by: 'id'
    }, {
      perPage: 3,
      page: 1
    })).toEqual({
      items: [
        data[0],
        data[1],
        data[3]
      ],
      total: 3
    })
  })

  it('sorts', () => {
    expect(load(data, {
      query: 'e',
      fields: ['name']
    }, {
      by: 'id'
    }, {
      perPage: 2,
      page: 1
    })).toEqual({
      items: [
        data[0],
        data[2]
      ],
      total: 3
    })
  })

  it('paginates', () => {
    expect(load(data, {
      query: 'o',
      fields: ['name']
    }, {
      by: 'id'
    }, {
      perPage: 1,
      page: 2
    })).toEqual({
      items: [
        data[1]
      ],
      total: 3
    })
  })

  it('paginates with an invalid page', () => {
    expect(load(data, {
      query: 'o',
      fields: ['name']
    }, {
      by: 'id'
    }, {
      perPage: 0,
      page: 2
    })).toEqual({
      items: [],
      total: 3
    })
  })
})

describe('defaultProps', () => {
  it('works', () => {
    expect(defaultProps({
      key: {
        type: String,
        default: 'default string'
      }
    }, {
    })).toEqual({key: 'default string'})

    expect(defaultProps({
      key: {
        type: Object,
        default: () => ({})
      }
    }, {
    })).toEqual({key: {}})
  })
})
