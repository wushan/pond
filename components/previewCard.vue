<template lang="pug">
  #previewCard
    .card(v-if="source")
      .card-image
        a(:href="source.url", target="_blank")
          figure.image
            img(:src="source.image")
      .card-content
        .media
          .media-left
            a(:href="source.url", target="_blank")
              figure.image.is-48x48
                img(:src="source.logo")
          .media-content
            p.title.is-6
              a(:href="source.url", target="_blank") {{source.title}}
        .content(v-if="detail")
          p.description {{source.description}}
          time.time {{source.date}}
          .tags
            span.tag(v-for="tag of source.keywords") {{tag}}
    //- p {{source}}
</template>

<script>
export default {
  props: {
    source: {
      type: Object,
      default () {
        return null
      }
    }
  },
  data () {
    return {
      detail: false
    }
  }
}
</script>

<style lang="scss" scoped>
#previewCard {
  transition: .3s all ease;
  max-width: 300px;
  &:hover {
    box-shadow: 0 3px 12px rgba(0,0,0,0.33);
  }
}
.time {
  font-size: 12px;
  color: gray;
  display: block;
  height: 1.4em;
}
.tags {
  margin: .5em 0;
}
.image {
  background-color: #f7f7f7;
}
.title {
  height: 3.4em;
  overflow: hidden;
}
.description {
  color: gray;
  font-size: .8em;
  line-height: 1.4;
  height: 8em;
  overflow: hidden;
  word-break: break-all;
}
</style>
