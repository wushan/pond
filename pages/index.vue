<template lang="pug">
  #home
    section.hero.is-info.is-medium
      .hero-head
        .navbar
          .container
            .navbar-brand
              a.navbar-item
            .navbar-menu
              .navbar-end
                a.navbar-item aaa
                a.navbar-item bbb
                a.navbar-item ccc
      .hero-body
        .container.has-text-centered
          figure.logo
            img(src="~/assets/images/logo.png")
          //- h1.title Ponds
          //- h2.subtitle Feed some fishes in the ponds.
        .container#inputArea
          .restrict-tiny
            input.input.is-medium(type="text", placeholder="Paste url here", v-model="inputUrl", @input="fetchContent")
      .hero-foot
        .tabs
          .container
            ul
              li
                a.is-active ala
              li
                a ala
    section.section
      //- .container
      //-   .restrict-tiny
      //-     input.input.is-large(type="text", placeholder="Paste url here", v-model="inputUrl", @input="fetchContent")
      .container(v-if="fetchedData")
        .restrict-tiny
          previewCard(:source="fetchedData")
          button.button(@click="add") Add
      .container
        .columns.is-mobile.is-multiline.is-variable.is-2
          .column.is-6-mobile.is-4-tablet.is-2-desktop(v-for="record of getRecordCache", :key="record.sid")
            previewCard(:source="record.data")
</template>

<script>
import Database from '~/assets/utils/db'
import previewCard from '~/components/previewCard'
import { mapGetters } from 'vuex'
let db = {}
export default {
  components: {
    previewCard
  },
  data () {
    return {
      inputUrl: '',
      fetchedData: null
    }
  },
  computed: {
    ...mapGetters({
      getRecordCache: 'app/getRecordCache'
    })
  },
  mounted () {
    db = new Database('pounds', 'fish', 3)
    this.fecthHistory()
  },
  methods: {
    add () {
      db.insert('tony@simbo.com.tw', 'default', this.fetchedData).then(() => {
        this.fetchedData = null
        this.fecthHistory()
      })
    },
    fecthHistory () {
      // db.getRange()
      db.getAll().then((res) => {
        this.$store.commit('app/setRecordCache', res)
      })
    },
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
  // margin-bottom: 1em;
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
h1 {
  text-align: center;
  small {
    display: block;
  }
}
#inputArea {
  margin-top: 1em;
}
.logo {
  img {
    max-width: 120px;
    display: block;
    margin: auto;
  }
}
</style>
