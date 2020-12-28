<template>
  <div class="map">
    <div id="con"></div>
    <div class="btn1">
      <el-button type="primary" @click="lock">锁定🔒</el-button>
      <el-button type="primary" @click="cancelLock">解锁🔓</el-button>
    </div>
  </div>
</template>

<script>
window.CESIUM_BASE_URL = '/Cesium/'
import * as Cesium from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'
import {Model} from '@/utils/model'

export default {
  name: 'Map',
  data() {
    return {
      viewer: null,
      model: null,
      i: 0
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {
      this.viewer = new Cesium.Viewer('con', {
        baseLayerPicker: false, // 是否显示图层选择器
        sceneModePicker: false, // 是否显示2D,3D选择器
        homeButton: false, // 是否显示Home按钮
        geocoder: false, // 是否显示geocode小器件，右上角查询按钮。
        navigationHelpButton: false, // 是否显示右上角的帮助按钮
        fullscreenButton: false, //是否显示全屏
        timeline: false, //是否显示时间轴
        animation: false, //是否创建动画小控件
        selectionIndicator: false,
        // infoBox: false,
        // vrButton: false,
        requestVertexNormals: true, // 请求照明
        requestWaterMask: true, // 请求水波纹效果
        shouldAnimate: true
      })
      this.viewer._cesiumWidget._creditContainer.style.display = 'none' //去除版权信息logo
      this.viewer.scene.globe.enableLigthing = true //光照
      this.viewer.scene.fog.enabled = true //雾效果
      this.viewer.scene.globe.depthTestAgainstTerrain = true;

      //默认地图位置，经纬度
      // Set view with heading, pitch and roll
      this.viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(116.675425423348, 29.3060024700309, 500)
      })

      this.model = new Model(this.viewer, '/model/CesiumAir/Cesium_Air.glb', '飞机')
      let radar = this.viewer.entities.add({
        // position: Cesium.Cartesian3.fromDegrees(116.675425423348, 29.3060024700309, 500.0),
        name: 'Green circle at height with outline',
        ellipse: {
          minimumPixelSize: 128,
          maximumScale: 20000,
          semiMinorAxis: 3000.0,
          semiMajorAxis: 3000.0,
          height: 500,
          material: Cesium.Color.GREEN.withAlpha(0.4),
          outline: true,
          outlineColor: Cesium.Color.GREEN,
          outlineWidth: 5
        }
      })
      console.log(radar)
      setInterval(() => {
        this.model.addLineData(116.675425423348 - this.i, 29.3060024700309 - this.i, 500, 135, 0, 0)
        radar.position = new Cesium.CallbackProperty(() => {
          return Cesium.Cartesian3.fromDegrees(116.675425423348 - this.i, 29.3060024700309 - this.i, 500)
        }, false)
        this.i += 0.0001
      }, 50)
    },
    lock() {
      this.viewer.trackedEntity = this.model.model
    },
    cancelLock() {
      this.viewer.trackedEntity = null
    }
  }
}
</script>

<style scoped lang="less">
.map {
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: repeat(20, 1fr);
  grid-template-rows: repeat(20, 1fr);

  #con {
    grid-column: 1 / span 20;
    grid-row: 1 / span 20;
  }

  .btn1 {
    grid-column: 1 / span 2;
    grid-row: 1 / span 1;
    justify-self: center;
    align-self: center;
    z-index: 1;
  }
}
</style>
