<template lang="pug">
  #searchComponent
    input.input(type="text", placeholder="Search a fish.", v-model="keyword", @input="search")
</template>

<script>
import Database from '~/assets/utils/db'
let db = {}
export default {
  data () {
    return {
      keyword: ''
    }
  },
  mounted () {
    db = new Database('pounds', 'fish', 3)
  },
  methods: {
    search (evt) {
      this.$store.commit('app/setSearchText', evt.target.value)
      db.search(evt.target.value).then((res) => {
        this.$store.commit('app/resetRecordCache')
        this.$store.commit('app/setRecordCache', res)
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss">
#searchComponent {
  width: 100%;
}
</style>
