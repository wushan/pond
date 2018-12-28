<template lang="pug">
  .team-wrapper.container
    .team-header.restrict(v-if="getTeam.name")
      .meta TEAM
      h1
        | {{getTeam.name}}
        small {{getTeam.description}}
    .waterfall
      transition-group(name="transform", tag="div", mode="out-in")
        lazy-component.pin(v-for="record of getRecordCacheByTeam", :key="record.sid", @show="handler(record.sid)")
          previewCard(:source="record", :id="record.sid", :editable="true")
</template>

<script>
import previewCard from '~/components/previewCard'
import { mapGetters } from 'vuex'
export default {
  components: {
    previewCard
  },
  data () {
    return {
      inputUrl: '',
      isCompact: true
    }
  },
  computed: {
    ...mapGetters({
      getRecordCacheByTeam: 'db/getRecordCacheByTeam',
      getConfig: 'app/getConfig',
      getTeam: 'user/getTeam'
    })
  },
  watch: {},
  mounted () {
    this.fetchTeamInfo()
  },
  methods: {
    fetchTeamInfo () {
      this.$store.dispatch('user/fetchTeamInfo')
    },
    handler (sid) {
      // console.log(sid)
    },
    accessBookMarks () {
      console.log(bookmarks)
    }
  }
}
</script>

<style lang="scss">
@import '~assets/styles/lib/var';
@import '~breakpoint-sass/stylesheets/_breakpoint';
.team-header {
  text-align: left;
  margin-bottom: 1.5em;
  h1 {
    font-size: 3em;
    font-weight: 600;
    margin: 0;
    line-height: 1.2;
    small {
      display: block;
      font-size: .45em;
      color: $darkgray;
      font-weight: 400;
    }
  }
  .meta {
    font-size: 12px;
    color: $darkgray;
  }
}
</style>
