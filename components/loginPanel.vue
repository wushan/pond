<template lang="pug">
  #loginPanel
    .loginPanelInner
      .card
        //- header.card-header
        //-   .card-header-title Sign In
        .card-content
          .title We can keep your fishes(bookmarks) updated cross platform.
          .subtitle Or, data will be saved in the browser.
        footer.card-footer
          a.card-footer-item(@click="neverLogin") No Thanks
          a.card-footer-item(@click="login") Sign in with Auth0
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
      this.$auth.loginWith('auth0')
    },
    neverLogin () {
      this.$store.commit('app/setNeverLogin', true)
    }
  }
}
</script>

<style lang="scss">
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
    max-width: 400px;
    padding: 1em;
  }
}
</style>
