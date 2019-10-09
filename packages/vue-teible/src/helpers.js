import { dotGet } from 'teible'
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

export const i18nMixin = {
  computed: {
    t () {
      if (this.$tc) {
        return this.$tc
      }

      return (key, count) => {
        const i18n = this.$options.i18n
        if (!i18n || !i18n.messages) {
          return key
        }

        const messages = i18n.messages[i18n.fallbackLocale]
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
