<template lang="pug">
  #callBack
    p Loading...
    p {{error}}
    nuxt-link(to="/login") Login
</template>

<script>
import qs from 'qs'
export default {
  middleware: ['auth'],
  data () {
    return {
      error: null
    }
  },
  created () {
    let parsedResult = qs.parse(this.$route.fullPath.split('?')[1])
    if (parsedResult.error) {
      this.error = parsedResult
    }
  }
}
</script>

<style>

</style>
