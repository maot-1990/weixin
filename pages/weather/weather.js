//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')
Page({
  data: {
    location: '',
    nowInfo: '',
    imgUrl: '',
    showLoading: false
  },
  onReady: function () {
    //初始化加载数据
    //判断白天还是晚上
    var nowDate = new Date();
    var nowImgUrl = '';
    var hour = nowDate.getHours();
    if (hour > 7 && hour < 19) {
      nowImgUrl = "day.jpg"
    } else {
      nowImgUrl = "night.jpg"
    }
    this.setData({
      imgUrl: nowImgUrl
    })
    var self = this
    //获取定位信息 经纬度
    wx.getLocation({
      success: function (res) {
        //初始化【北京】经纬度  location=39.93:116.40（格式是 纬度:经度，英文冒号分隔） 
        var newLocation = '39.93:116.40';
        if (res) {
          newLocation = res.latitude + ":" + res.longitude
        }
        self.setData({
          location: newLocation
        })
        //console.log("city:" + self.data.location)
        wx.request({
          url: 'https://api.seniverse.com/v3/weather/now.json?key=ms4cs3wi02xqojtu&location=' + newLocation + '&language=zh-Hans&unit=c',
          success: function (result) {
            //console.log("nowInfo:" + util.jsonToString(result.data))
            self.setData({
              location: result.data.results[0].location.name
            })
            //console.log("city:" + self.data.location)
            //初始化获取 当前的天气状况
            wx.request({
              url: 'https://www.sojson.com/open/api/weather/json.shtml?city=' + self.data.location,
              success: function (result) {
                //console.log("nowInfo:" + util.replaceWeixin(util.jsonToString(result.data),"低温",""))
                if (result.data.status == 200) {
                  self.setData({
                    nowInfo: util.stringToJson(util.replaceWeixin(util.jsonToString(result.data), "", ""))
                  })

                  setTimeout(function () {
                    self.cancelLoading()
                  },
                    1000)
                } else {
                  console.log("error:" + util.jsonToString(result.data))
                }
              },
              fail: function ({ errMsg }) {
                console.log('request fail', errMsg)
              }
            })
          },
          fail: function ({ errMsg }) {
            console.log('request fail', errMsg)
          }
        })


      }
    })
    
  },
  showLoading: function () {
    this.setData({
      showLoading: false
    })
  },
  cancelLoading: function () {
    this.setData({
      showLoading: true
    })
  }
})