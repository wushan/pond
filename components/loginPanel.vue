<template lang="pug">
  #loginPanel
    .loginPanelInner.restrict-tiny
      .loginPanelHeader
        .title
          span PONDS
          |  keeps your fishes ( bookmarks ) updated and find them back anytime, any where.
        .subtitle Or, data will be saved in the browser.
        .meta * data will be sync to our server automatically, defaults to visible in public, check privacy settings if this isn't what you want after login.
      .button-group
        a.button.warning(@click="neverLogin") No Thanks
        a.button.primary(@click="login") Sign in with Google
    //- .loginPanelInner
    //-   .title Sign In
    //-   p we can keep your fishes(bookmarks) updated cross platform.
    //-   button.button.is-primary(@click="login")
    //-     span Sign In
</template>

<script>
export default {
  methods: {
    login () {
      window.location.href=process.env.API_URL + 'auth/google'
    },
    neverLogin () {
      this.$store.commit('app/setNeverLogin', true)
    }
  }
}
</script>

<style lang="scss">
@import '~assets/styles/lib/var';
#loginPanel {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(black, .6);
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  .loginPanelInner {
    margin: 0 1.5em;
    background-color: $white;
    border-radius: $border-radius;
    .title {
      font-size: 1.6em;
      font-weight: 400;
      line-height: 1.4;
      word-break: break-word;
      span {
        font-weight: 900;
      }
    }
    .subtitle {
      margin: 1em 0;
      color: $darkestgray;
    }
    .meta {
      font-size: 12px;
      color: $darkgray;
    }
  }
  .loginPanelHeader {
    padding: 1em 1.5em;
  }
  .loginPanelFooter {
    border-top: 4px solid $lightgray;
    // display: flex;
    // .login-footer-item {
    //   flex: 1;
    //   padding: 0.5em 1.5em;
    //   display: block;
    //   cursor: pointer;
    // }
  }
}
</style>
