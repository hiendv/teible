import { dotGet } from 'teible'
export const defaultProps = (options, data) => {
  const props = {}
  for (const key in options) {
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

export const i18nMixin = {
  i18n: {
    messages: {
      en: {
        teible: {
          showing: 'Showing',
          total: 'of {count} records',
          last: 'the last record',
          empty: 'No records',
          filter: 'Filter records'
        }
      }
    }
  },
  methods: {
    t (key, count) {
      // We have to patch the original $tc because the fallback strategy does not work as expected
      // https://github.com/kazupon/vue-i18n/issues/729

      if (!this.$root) {
        return this.localize(key, count)
      }

      if (!this.$root.$tc) {
        return this.localize(key, count)
      }

      if (!this.$root.$te || !this.$root.$te(key)) {
        return this.localize(key, count)
      }

      return this.$root.$tc(key, count)
    }
  },
  computed: {
    localize () {
      return (key, count) => {
        const i18n = this.$options.i18n
        if (!i18n || !i18n.messages) {
          return key
        }

        const messages = i18n.messages.en
        const message = dotGet(messages, key)

        if (!message) {
          return key
        }

        if (count) {
          return message.replace('{count}', count)
        }

        return message
      }
    }
  }
}
