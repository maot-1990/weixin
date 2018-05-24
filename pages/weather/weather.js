//获取应用实例
const app = getApp()
Page({
  data: {
    motto: 'Welcome!',
    userInfo: {},
    hasUserInfo: false,
    newLocation: '',
    nowInfo: '',
    lifeInfo: '',
    weatherInfo: ''
  },
  onReady:function(){
  //初始化加载数据
    var self = this
    //获取定位信息 经纬度
    wx.getLocation({
      success: function (res) {
        //初始化【北京】经纬度  location=39.93:116.40（格式是 纬度:经度，英文冒号分隔） 
        var newLocation = '39.93:116.40'; 
        if(res){newLocation = res.latitude + ":" + res.longitude}
        self.setData({
          newLocation: newLocation
        })

      //初始化获取 当前的天气状况
        wx.request({
          url: 'https://api.seniverse.com/v3/weather/now.json?key=fdw9qkun1btvenxt&location=' + newLocation+'&language=zh-Hans&unit=c',
          success: function (result) {
            self.setData({
              nowInfo: result.data.results[0]
            })
          },
          fail: function ({ errMsg }) {
            console.log('request fail', errMsg)
          }
        }),
          //初始化获取今天的生活指数信息
          wx.request({
          url: 'https://api.seniverse.com/v3/life/suggestion.json?key=fdw9qkun1btvenxt&location=' + newLocation + '&language=zh-Hans',
            success: function (result) {
              self.setData({
                lifeInfo: result.data.results[0].suggestion
              })
            },
            fail: function ({ errMsg }) {
              console.log('request fail', errMsg)
            }
          }),
          //初始化话获取最近三天的天气状况
          wx.request({
          url: 'https://api.seniverse.com/v3/weather/daily.json?key=fdw9qkun1btvenxt&location=' + newLocation + '&language=zh-Hans&unit=c&start=0&days=5',
            success: function (result) {
              self.setData({
                //weatherInfo: result.data.results[0]
                weatherInfo: formatDate(result.data.results[0])
              })
            },
          })
      }
    })
  }
})