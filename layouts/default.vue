<template lang="pug">
#wrapper
  appHeader
  #appContent
    transition(name="fade", mode="out-in")
      #previewNotification(v-if="previewContent")
        .previewNotificationInner
          previewCard(:source="previewContent")
    nuxt
</template>
<script>
import appHeader from '~/components/appHeader'
import previewCard from '~/components/previewCard'
import { mapGetters } from 'vuex'
export default {
  components: {
    appHeader,
    previewCard
  },
  computed: {
    ...mapGetters({
      previewContent: 'app/getPreviewContent',
      isLoading: 'app/isLoading'
    })
  }
}
</script>

<style lang="scss">
html, body, #wrapper {
  background-color: #f7f7f7;
  height: 100%;
}
#appContent {
  padding-top: 83px;
}
#previewNotification {
  position: absolute;
  top: 50px;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 801;
  background-color: rgba(0,0,0, 0.85);
  display: flex;
  justify-content: flex-end;
  .previewNotificationInner {
    padding: 1.5em;
  }
}
</style>
