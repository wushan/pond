<template lang="pug">
  #appHeader
    .appHeaderInner.container
      .col.brand-wrapper
        nuxt-link(to="/")
          figure.brand
            img(src="~/assets/images/logo.svg")
      .col.searchBox
        input.input(type="text", placeholder="Search a fish.", v-model="keyword")
      .col.userBox
        p user
      .col.importBox
        importerComponent
</template>

<script>
import importerComponent from '~/components/importerComponent'
export default {
  components: {
    importerComponent
  },
  data () {
    return {
      keyword: ''
    }
  }
}
</script>

<style lang="scss">
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
    .col {
      display: flex;
      flex: 1;
      align-items: center;
      padding: 0 0.2em;
      &.brand-wrapper {
        max-width: 46px;
      }
      &.searchBox {
        min-width: 40%;
      }
      &.userBox {
        max-width: 46px;
      }
      &.importBox {
        @include breakpoint(768px) {
          max-width: 200px;
        }
      }
    }
  }
  .brand {
    display: flex;
    align-items: center;
    padding: 0;
    box-sizing: border-box;
    img {
      max-height: 36px;
      width: auto;
      max-width: auto;
      display: block;
    }
  }
}
</style>
