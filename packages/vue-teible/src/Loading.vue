<template>
  <transition name="datatable">
    <div v-show="active" :class="theme.datatable__loading" data-elm="loading">
      <slot>
        <svg
          viewBox="0 0 105 105" xmlns="http://www.w3.org/2000/svg" fill="#fff"
          width="40px"
        >
          <circle cx="12.5" cy="12.5" r="12.5">
            <animate
              attributeName="fill-opacity"
              begin="0s" dur="1s"
              values="1;.2;1" calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
          <circle
            cx="12.5" cy="52.5" r="12.5"
            fill-opacity=".5"
          >
            <animate
              attributeName="fill-opacity"
              begin="100ms" dur="1s"
              values="1;.2;1" calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="52.5" cy="12.5" r="12.5">
            <animate
              attributeName="fill-opacity"
              begin="300ms" dur="1s"
              values="1;.2;1" calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="52.5" cy="52.5" r="12.5">
            <animate
              attributeName="fill-opacity"
              begin="600ms" dur="1s"
              values="1;.2;1" calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="92.5" cy="12.5" r="12.5">
            <animate
              attributeName="fill-opacity"
              begin="800ms" dur="1s"
              values="1;.2;1" calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="92.5" cy="52.5" r="12.5">
            <animate
              attributeName="fill-opacity"
              begin="400ms" dur="1s"
              values="1;.2;1" calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="12.5" cy="92.5" r="12.5">
            <animate
              attributeName="fill-opacity"
              begin="700ms" dur="1s"
              values="1;.2;1" calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="52.5" cy="92.5" r="12.5">
            <animate
              attributeName="fill-opacity"
              begin="500ms" dur="1s"
              values="1;.2;1" calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="92.5" cy="92.5" r="12.5">
            <animate
              attributeName="fill-opacity"
              begin="200ms" dur="1s"
              values="1;.2;1" calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </slot>
    </div>
  </transition>
</template>
<script>
export default {
  inject: ['$theme'],
  props: {
    active: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    theme () {
      return this.$theme()
    }
  }
}
</script>
<style lang="scss">
.datatable-enter-active, .datatable-leave-active {
  transition: opacity .5s;
}
.datatable-enter, .datatable-leave-to {
  opacity: 0;
}
</style>
