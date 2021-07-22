<template>
  <div id="app"></div>
</template>

<script>
/**
 * 1.在index.html中引入JSApI
 * 2.在main.js中导入BMap，并挂载，这样不用在每个Vue文件中引入
 * 3.在webpack中配置(vue.config.js)BMap 。
 * 4.如果在页面提示BMap is not defined ，可在package.json中的eslintConfig配置globals，忽略对BMap的检查
 */
export default {
  name: 'App',
  data() {
    return {
      map: null, // 地图实例
      position: [121.670629, 31.247346], // 初始的经纬度
      markerPosition: [
        {
          position: [121.670629, 31.247346],
          custId: "1",
          custName: "上海银行数据处理中心",
          url: ""
        },
        {
          position: [121.667373, 31.249433],
          custId: "2",
          custName: "上海财神庙",
          url: ""
        },
        {
          position: [121.678253, 31.247538],
          custId: "3",
          custName: "兴业银行运维中心",
          url: ""
        }
      ],
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    // 1.初始化地图
    initMap() {
      this.map = new BMap.Map('app')
      this.map.centerAndZoom(new BMap.Point(121.670629, 31.247346), 16);
      this.map.enableScrollWheelZoom();  // 拖动地图
      this.addMarker()
      this.getAddress()
    },
    // 2.实例化地图标记
    addMarker() {
      this.markerPosition.forEach(item => {
        //获取地图的标记点
        let point = new BMap.Point(item.position[0], item.position[1])
        //创建地图的标记点
        let marker = new BMap.Marker(point)
        // 添加地图覆盖物(将地图的标记点添加到地图中)
        this.map.addOverlay(marker)
        // 给标记点添加跳跃的动画
        marker.setAnimation(BMAP_ANIMATION_BOUNCE)
      })
    },
    // 3.地理编码
    getAddress() {
      // 创建地理编码实例
      const geo = new BMap.Geocoder({ extensions_town: true })
      this.markerPosition.forEach(item => {
        let point = new BMap.Point(item.position[0], item.position[1])
        geo.getLocation(point, result => {
          if (result) {
            console.log('获取的地址是', result)
          }
        })
      })
    }
  }
}
</script>

<style>
#app {
  width: 100%;
  height: 500px;
  border: 1px solid pink;
}
</style>
