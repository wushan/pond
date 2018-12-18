<template lang="pug">
  #appHeader
    .appHeaderInner.container
      .col.brand-wrapper
        nuxt-link.brand(to="/")
          figure
            img(src="~/assets/images/logo.svg")
          .title PONDS
      .col.searchBox
        searchComponent
      .col.userBox(v-if="$auth.loggedIn")
        .userAvatar(@click="toggleMenu")
          img(:src="$auth.user.picture")
        .userSubMenu(:class="{ active: menu }")
          ul
            li
              a(@click="logout") Logout
      .col.importBox
        importerComponent
</template>

<script>
import importerComponent from '~/components/importerComponent'
import searchComponent from '~/components/searchComponent'
export default {
  components: {
    importerComponent,
    searchComponent
  },
  data () {
    return {
      menu: false
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout()
      let pattern = /(.+:\/\/)?([^\/]+)(\/.*)*/
      let patterns = pattern.exec(window.location.href)
      window.location.href = 'https://ponds.auth0.com/v2/logout?returnTo=' + patterns[1] + patterns[2]
    },
    toggleMenu () {
      this.menu = !this.menu
    }
  }
}
</script>

<style lang="scss">
@import '~assets/styles/lib/var';
@import '~breakpoint-sass/stylesheets/_breakpoint';
#appHeader {
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 50px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  z-index: 800;
  font-size: 14px;
  border-bottom: 1px solid #ddd;
  box-shadow: 0 3px 2px -2px rgba(200,200,200,0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  .appHeaderInner {
    flex: 1;
    display: flex;
    align-items: center;
    padding: 0 0.5em;
    .col {
      display: flex;
      // flex: 1;
      align-items: center;
      padding: 0.8em;
      &.brand-wrapper {
        // max-width: 46px;
      }
      &.searchBox {
        // min-width: 10%;
        flex: 1;
      }
      &.userBox {
        // max-width: 46px;
      }
      &.importBox {}
    }
  }
  .brand {
    display: flex;
    align-items: center;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
    img {
      max-height: 36px;
      width: auto;
      max-width: auto;
      display: block;
    }
    .title {
      display: none;
    }
    @include breakpoint(768px) {
      .title {
        display: block;
        margin-left: 0.8em;
        font-weight: 900;
        color: $black;
        font-size: 1.4em;
      }
    }
  }
  .userBox {
    .userSubMenu {
      display: none;
      position: absolute;
      right: 0.5em;
      top: 3em;
      background-color: white;
      padding: 1em;
      box-shadow: 1px 1px 3px rgba(black, .33);
      border-radius: 3px;
      ul {
        li {
          a {
            cursor: pointer;
          }
        }
      }
      &.active {
        display: block;
      }
    }
  }
  .userAvatar {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    border: 2px solid rgba(#63a5df, .33);
    overflow: hidden;
    position: relative;
    img {
      position: absolute;
      display: block;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%)
    }
  }
}
</style>
