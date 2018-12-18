<template lang="pug">
#wrapper
  appHeader
  #appContent
    .appContentInner
      transition(name="fade", mode="out-in")
        #previewNotification(v-if="previewContent")
          .previewNotificationInner
            previewCard(:source="previewContent", :footer="false")
      loginPanel(v-if="!$auth.loggedIn && !getNeverLogin")
      nuxt
    .appFooter
      .meta Designed With Love.
</template>
<script>
import appHeader from '~/components/appHeader'
import previewCard from '~/components/previewCard'
import loginPanel from '~/components/loginPanel'
import { mapGetters } from 'vuex'
export default {
  components: {
    appHeader,
    previewCard,
    loginPanel
  },
  computed: {
    ...mapGetters({
      previewContent: 'app/getPreviewContent',
      isLoading: 'app/isLoading',
      getNeverLogin: 'app/getNeverLogin'
    })
  }
}
</script>

<style lang="scss">
@import '~assets/styles/lib/var';
html, body, #__nuxt, #__layout, #wrapper {
  background-color: #f7f7f7;
  height: 100%;
}
#appContent {
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  .appContentInner {
    padding-top: 83px;
    padding-left: 1em;
    padding-right: 1em;
  }
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
.appFooter {
  font-size: 12px;
  text-align: center;
  padding: 2em 0;
  color: $darkestgray;
}
</style>
