<template lang="pug">
  #home
    section.section
      .container
        .restrict-tiny
          input.input.is-large(type="text", placeholder="Paste url here", v-model="inputUrl", @change="fetchContent")
      .container(v-if="fetchedData")
        .restrict-tiny
          .card
            .card-image
              figure.image
                img(:src="fetchedData.image")
            .card-content
              //- .media
              //-   .media-content
              time {{fetchedData.date}}
              .content
                p.title.is-4
                  a(:href="fetchedData.url", target="_blank") {{fetchedData.title}}
                p {{fetchedData.description}}
          p {{fetchedData}}
</template>

<script>
import Database from '~/assets/utils/db'
export default {
  components: {},
  data () {
    return {
      inputUrl: '',
      fetchedData: ''
    }
  },
  mounted () {
    let logger = {}
    logger = new Database('pounds', 'fish', 1)
    logger.init()
  },
  methods: {
    fetchContent () {
      this.$axios.post('/api/fetchContent', {url: this.inputUrl}).then((res) => {
        this.fetchedData = res.data
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss">
.restrict-tiny {
  max-width: 320px;
  margin: auto;
}
.container {
  margin-bottom: 1em;
}
.image {
  height: 0;
  overflow: hidden;
  padding-top: 56.25%;
  img {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
}
.title {
  word-break: break-all;
}
.card-image {
  background-color: #f7f7f7;
}
</style>
