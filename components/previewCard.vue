<template lang="pug">
  #previewCard
    .card(v-if="source")
      .card-image
        figure.image
          img(:src="source.image")
      .card-content
        .media
          .media-left
            figure.image.is-48x48
              img(:src="source.logo")
          .media-content
            p.title.is-6
              a(:href="source.url", target="_blank") {{source.title}}
        .content
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
  }
}
</script>

<style lang="scss">
.time {
  font-size: 12px;
  color: smokygray;
}
.tags {
  margin: .5em 0;
}
.image {
  background-color: #f7f7f7;
}
.description {
  color: gray;
  font-size: .8em;
}
</style>
