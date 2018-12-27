<template lang="pug">
  #heroComponent
    .heroComponentInner.restrict-tiny
      .card
        .card-content
          h3.card-title Welcome ! Let's organize some useful bookmarks.
          .card-description Add some bookmarks from url at the right header or import some records from browser.
          //- .card-loading(v-if="parsedRecords.length > 0")
          .card-loading(v-if="parsedRecords.length > 0")
            .loader-wrapper
              .loader(:style="'width:' + ( 100 /parsedRecords.length * parsed) + '%;'")
              .loader-counter {{parsed}} / {{parsedRecords.length}}
          .card-upload(v-else)
            input(ref="importer", type="file", @change="parseFile")
            p Generate bookmarks to JSON files from here.
        
</template>

<script>
import moment from 'moment'
import short from 'short-uuid'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      file: [],
      parsedRecords: [],
      parsed: 0
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'user/isLoggedIn',
      profile: 'user/profile',
      getUserId: 'user/getUserId',
      getTeam: 'user/getTeam'
    })
  },
  methods: {
    parseFile () {
      this.file = this.$refs.importer.files[0]
      let reader = new FileReader()
      reader.onload = (event) => {
        // The file's text will be printed here
        this.parsedRecords = JSON.parse(event.target.result)
        this.parseRecords().then((res) => {
          console.log(res)
        }).catch((err) => {
          console.log(err)
        })
      };
      reader.readAsText(this.file);
    },
    async parseRecords () {
      for (let request of this.parsedRecords) {
        try {
          const result = await this.$axios.post('/api/records/resolve', {url: request.url})
          this.parsed++
          let record = {
            sid: short.uuid(),
            category: ['default'],
            username: this.profile.emails[0].value,
            data: result.data,
            deleted: 0,
            sync: 0,
            indexed: 0,
            created: moment().format('x'),
            public: 1,
            userid: this.getUserId,
            teamid: this.getTeam
          }
          this.$store.dispatch('db/insert', record)
        } catch(err) {
          console.log(err)
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import '~assets/styles/lib/var';
#heroComponent {
  margin-bottom: 1em;
}
.heroComponentInner {
  background-color: $white;
  // border: 1px solid $gray;
  border-radius: $border-radius;
  // padding: 0.5em 1.5em;
  .title {
    font-weight: 100;
  }
  .loader-wrapper {
    background-color: $lightgray;
    position: relative;
    height: 1.6em;
    border-radius: $border-radius;
    display: flex;
    .loader {
      background-color: $primary;
      width: 0;
      margin: 4px;
      transition: .3s all ease;
      border-radius: $border-radius;
    }
    .loader-counter {
      font-size: 12px;
      line-height: 2.2;
      position: absolute;
      left: 0;
      right: 0;
      text-align: center;
    }
  }
}
</style>
