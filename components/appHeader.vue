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
      .col.userBox(v-if="isLoggedIn")
        .userAvatar(@click="toggleMenu", :class="{ inactive: menu }")
          img(:src="profile.photos[0].value")
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
import { mapGetters } from 'vuex';
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
  computed: {
    ...mapGetters({
      isLoggedIn: 'user/isLoggedIn',
      profile: 'user/profile'
    })
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
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
      position: relative;
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
      right: 0.8em;
      top: 4em;
      background-color: white;
      box-shadow: 1px 1px 3px rgba(black, .33);
      border-radius: 3px;
      &:before {
        content: '';
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 6px 6px 6px;
        border-color: transparent transparent $white transparent;
        position: absolute;
        right: 14px;
        top: -6px;
        z-index: 2;
      }
      &:after {
        content: '';
        box-shadow: 1px 1px 3px rgba(black, .33);
        width: 8px;
        height: 8px;
        z-index: 1;
        position: absolute;
        right: 16px;
        top: -5px;
        transform-origin: center center;
        transform: rotate(45deg);
      }
      ul {
        position: relative;
        z-index: 2;
        margin: 0;
        padding: 0;
        background-color: $white;
        list-style-type: none;
        li {
          a {
            padding: 0.5em 1em;
            cursor: pointer;
            display: block;
            color: $primary;
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
    border: 2px solid rgba($primary, .33);
    overflow: hidden;
    position: relative;
    transition: .3s all ease;
    cursor: pointer;
    img {
      position: absolute;
      display: block;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%)
    }
    &.inactive {
      border: 2px solid rgba($gray, 1);
      img {
        filter: saturate(0);
      }
      &:hover {
        border: 2px solid rgba($darkgray, 1);
      }
    }
    &:hover {
      border: 2px solid rgba($primary, 1);
    }
  }
}
</style>
