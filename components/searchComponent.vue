<template lang="pug">
  #searchComponent
    input.input(type="text", placeholder="Search a fish.", v-model="keyword", @input="search")
</template>

<script>
export default {
  data () {
    return {
      keyword: ''
    }
  },
  mounted () {},
  methods: {
    search (evt) {
      this.$store.commit('db/setSearchText', evt.target.value)
    }
  }
}
</script>

<style lang="scss">
#searchComponent {
  width: 100%;
}
</style>
