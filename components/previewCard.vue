<template lang="pug">
  #previewCard
    .card(v-if="preview")
      .card-compact(v-if="compact")
        a(:href="preview.url", target="_blank")
          figure.image
            img(:src="preview.image")
      .card-image(v-else)
        a(:href="preview.url", target="_blank")
          figure.image
            img(:src="preview.image")
        .card-status(:class="{synced: source.sync === 1}")
          i.fa.fa-check(v-if="source.sync === 1")
          i.fa.fa-refresh(v-else)

      .card-content(v-if="!compact")
        time.time
          span(v-if="preview.date") {{formatDate(preview.date)}} /
          |  Added: {{formatDateFromStamp(source.created)}} / {{nickName}}
        //- a.card-title(:href="preview.url", target="_blank")
        a.card-title
          figure
            img(:src="preview.logo")
          .title(:contenteditable="isEditable", v-html="matchSearch(preview.title)", @blur="update('title', $event)")
        .card-description
          p(:contenteditable="isEditable", v-html="matchSearch(preview.description)", @blur="update('description', $event)")
          .tags
            //- span.tag(v-for="tag of preview.keywords", v-html="matchSearch(tag)", contenteditable, @blur="updateTag('keywords', tag, $event)")
            span.tag(v-for="tag of preview.keywords", v-html="matchSearch(tag)")
      .card-footer(v-if="footer")
        .button-group
          a.button.secondary(@click="deleteRecord") DELETE
          //- a.button.edit REFETCH
          a.button.primary(@click="copyResult(preview.url)") COPY
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
import { cloneDeep } from 'lodash'
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
    },
    compact: {
      type: Boolean,
      default: false
    },
    editable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      detail: false
    }
  },
  computed: {
    ...mapGetters({
      getSearchText: 'db/getSearchText',
      getUserId: 'user/getUserId'
    }),
    preview () {
      return this.source.data || this.source
    },
    isAuthor () {
      return (this.source.publisherId === this.getUserId) || (this.source.userid === this.getUserId)
    },
    isEditable () {
      return this.isAuthor && this.editable
    },
    nickName () {
      return this.source.username.split('@')[0]
    }
  },
  methods: {
    copyResult (url) {
      if (window.navigator.clipboard) {
        window.navigator.clipboard.writeText(url)
        .then(() => {
          console.log('Text copied.')
        })
        .catch(() => {
          console.log('Failed to copy text.')
        })
      } else {
        throw new Error('Clipboard API is only available in https protocal.')
      }
    },
    update (type, evt) {
      let editObj = cloneDeep(this.source)
      editObj.sync = 0
      editObj.data[type] = evt.target.innerText
      this.$store.dispatch('db/updateRecordCache', editObj).then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
    },
    updateTag (type, origin, evt) {
      console.log('------')
      console.log(type)
      console.log(origin)
      console.log(evt.target.innerText)
    },
    deleteRecord () {
      let deletedObj = cloneDeep(this.source)
      deletedObj.sync = 0
      deletedObj.deleted = 1
      this.$store.dispatch('db/updateRecordCache', deletedObj).then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
    },
    replacer(match, p1, p2, p3, offset, string) {
      console.log(match, p1, p2, p3, offset, string)
      return '<span class=highlight>' + match + '</span>'
    },
    matchSearch (content) {
      if (!content) {
        return content
      }
      if (this.getSearchText.split('').length >= 2) {
        let searchText = this.getSearchText
        let re = new RegExp(searchText, 'gi')
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
