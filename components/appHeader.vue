<template lang="pug">
  #appHeader
    importerComponent
</template>

<script>
import importerComponent from '~/components/importerComponent'
export default {
  components: {
    importerComponent
  }
}
</script>

<style lang="scss">
#appHeader {
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 50px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  z-index: 800;
  font-size: 14px;
  border-bottom: 1px solid #ddd;
  box-shadow: 0 3px 2px -2px rgba(200,200,200,0.2);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
