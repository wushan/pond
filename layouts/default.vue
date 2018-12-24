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
      heroComponent(v-if="getRecordCache.length < 5")
      nuxt
    .appFooter
      .meta Designed With Love.
</template>
<script>
import appHeader from '~/components/appHeader'
import previewCard from '~/components/previewCard'
import heroComponent from '~/components/heroComponent'
import loginPanel from '~/components/loginPanel'
import { mapGetters } from 'vuex'
export default {
  components: {
    appHeader,
    previewCard,
    loginPanel,
    heroComponent
  },
  computed: {
    ...mapGetters({
      previewContent: 'db/getPreviewContent',
      isLoading: 'db/isLoading',
      getNeverLogin: 'app/getNeverLogin',
      getRecordCache: 'db/getRecordCache'
    })
  },
  mounted () {
    this.$store.dispatch('db/feedStore').then((res) => {
      if (this.$auth.loggedIn) {
        this.$store.dispatch('db/syncRecords').then(() => {})
        this.$store.dispatch('db/checkSynchronize')
      }
    })
  },
  methods: {}
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
  top: 60px;
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
