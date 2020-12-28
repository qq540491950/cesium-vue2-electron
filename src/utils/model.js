import * as Cesium from 'cesium'

export class Model {
  constructor(viewer, url, name) {
    this.viewer = viewer
    this.url = url
    this.name = name
    this.path = []
    this.model = this.initModel()
    this.routeLine = this.initRoute()
  }

  /**
   * 初始化模型
   * @returns {Entity}
   */
  initModel() {
    return this.viewer.entities.add({
      name: this.name,
      model: {
        uri: this.url,
        minimumPixelSize: 128,
        maximumScale: 20000
      }
    })
  }

  initRoute() {
    return this.viewer.entities.add({
      polyline: {
        width: 5,
        material: Cesium.Color.RED
      }
    })
  }

  addLineData(lon, lat, height, head, pitch, roll) {
    let position = Cesium.Cartesian3.fromDegrees(lon, lat, height)
    let heading = Cesium.Math.toRadians(135)
    let hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll)
    let orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr)
    this.model.position = position
    // 模型位置移动
    this.model.orientation = new Cesium.CallbackProperty(() => {
      return orientation
    }, false)
    // 路径
    this.path.push(position)
    this.routeLine.polyline.positions = new Cesium.CallbackProperty(() => {
      return this.path
    }, false)
  }

}
