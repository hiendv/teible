import { defaultProps } from '../src/helpers'

describe('defaultProps', () => {
  it('works', () => {
    expect(defaultProps({
      key: {
        type: String,
        default: 'default string'
      }
    }, {
    })).toEqual({ key: 'default string' })

    expect(defaultProps({
      key: {
        type: Object,
        default: () => ({})
      }
    }, {
    })).toEqual({ key: {} })
  })
})
