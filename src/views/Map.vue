<template>
  <div id="con">
  </div>
</template>

<script>
window.CESIUM_BASE_URL = '/Cesium/'
import * as Cesium from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'

export default {
  name: 'Map',
  data() {
    return {
      viewer: null
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {
      this.viewer = new Cesium.Viewer('con')
    }
  }
}
</script>

<style scoped lang="less">
#con {
  height: 100vh;
  width: 100vw;
}
</style>
