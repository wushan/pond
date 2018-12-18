<template lang="pug">
  #previewCard
    .card(v-if="source")
      .card-image
        a(:href="source.url", target="_blank")
          figure.image
            img(:src="source.image")
      .card-content
        time.time {{source.date}}
        a.card-title(:href="source.url", target="_blank")
          figure
            img(:src="source.logo")
          .title {{source.title}}
        .card-description
          p {{source.description}}
          .tags
            span.tag(v-for="tag of source.keywords") {{tag}}
      .card-footer(v-if="footer")
        .button-group
          a.button.secondary DELETE
          a.button.edit REFRESH
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
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/lib/var';
#previewCard {
  transition: .3s all ease;
  background-color: $white;
  border-radius: 9px;
  overflow: hidden;
  box-shadow: 0 0px 3px rgba(0,0,0,0.33);
  &:hover {
    box-shadow: 0 3px 12px rgba(0,0,0,0.33);
  }
}
</style>
