<template lang="pug">
  #previewCard
    .card(v-if="preview")
      .card-image
        a(:href="preview.url", target="_blank")
          figure.image
            img(:src="preview.image")
        .card-status
          i.fa.fa-refresh

      .card-content
        time.time
          span(v-if="preview.date") {{formatDate(preview.date)}} /
          |  Added: {{formatDateFromStamp(source.created)}}
        a.card-title(:href="preview.url", target="_blank")
          figure
            img(:src="preview.logo")
          .title(v-html="matchSearch(preview.title)")
        .card-description
          p(v-html="matchSearch(preview.description)")
          .tags
            span.tag(v-for="tag of preview.keywords", v-html="matchSearch(tag)")
      .card-footer(v-if="footer")
        .button-group
          a.button.secondary DELETE
          a.button.edit REFETCH
          a.button.primary COPY
    .card.invalid(v-else)
      .card-image
        figure.image
          //- img(src="https://via.placeholder.com/720x480?text=Invalid+Record")
      .card-content
        a.card-title
          .title Invalid Record
        .card-description
          p This is an invalid record ({{ id }})
      .card-footer(v-if="footer")
        .button-group
          a.button.secondary DELETE
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
export default {
  props: {
    id: {
      type: String,
      default: ''
    },
    source: {
      type: Object,
      default () {
        return null
      }
    },
    footer: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      detail: false
    }
  },
  computed: {
    ...mapGetters({
      getSearchText: 'app/getSearchText'
    }),
    preview () {
      return this.source.data
    }
  },
  methods: {
    replacer(match, p1, p2, p3, offset, string) {
      console.log(match, p1, p2, p3, offset, string)
      return '<span class=highlight>' + match + '</span>'
    },
    matchSearch (content) {
      if (this.getSearchText.split('').length >= 2) {
        let searchText = this.getSearchText
        let re = new RegExp(searchText, 'gi')
        // '<span class=highlight>' + this.getSearchText + '</span>'
        return content.replace(re, this.replacer)
      } else {
        return content
      }
    },
    formatDate (date)  {
      return moment(date).fromNow()
    },
    formatDateFromStamp (date) {
      return moment(date, 'x').fromNow()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/lib/var';
#previewCard {
  transition: .3s all ease;
  background-color: $white;
  border-radius: $border-radius;
  // overflow: hidden;
  max-width: 26em;
  box-shadow: 0 0px 3px rgba(0,0,0,0.33);
  &:hover {
    box-shadow: 0 3px 12px rgba(0,0,0,0.33);
  }
}
</style>
