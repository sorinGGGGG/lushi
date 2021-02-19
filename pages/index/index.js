//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    picker1: ['狂野卡牌', '标准卡牌'],
    picker2: ['全职业', '恶魔猎手', '德鲁伊', '猎人', '法师', '圣骑士', '牧师', '潜行者', '萨满', '术士', '战士', '中立'],
    picker3: ['全水晶', '0', '1', '2', '3', '4', '5', '6', '7+'],
    TabCur: 0,
    scrollHeight: "100vh;",
    topHeight: 0,
    topNum: 0
  },

  onLoad: function () {
    var that = this
    //获取设备信息，计算屏幕高度
    let systemInfo = wx.getSystemInfoSync();
    // console.log(systemInfo);

    let ios = !!(systemInfo.system.toLowerCase().search('ios') + 1);
    let Height;
    if (ios) {
      Height = systemInfo.screenHeight - (systemInfo.statusBarHeight + 44 + 65)
    } else {
      Height = systemInfo.screenHeight - (systemInfo.statusBarHeight + 48 + 65)
    }
    getApp().globalData.height = Height
    getApp().globalData.lgHeight = Height + 65

    //计算页面高度
    var query = wx.createSelectorQuery();
    //选择id
    query.select('#mjltest').boundingClientRect()
    query.exec(function (res) {
      // console.log(res);
      var height = getApp().globalData.height - res[0].height
      that.setData({
        scrollHeight: height,
        topHeight: res[0].height
      })
    })

    var query = wx.createSelectorQuery();
    //选择id
    query.select('#mjltest2').boundingClientRect()
    query.exec(function (res) {
      // console.log(res);
      var height = that.data.scrollHeight - res[0].height
      var topheight = that.data.topHeight + res[0].height
      that.setData({
        scrollHeight: height + "px;",
        topHeight: topheight + "px"
      })
    })
  },

  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
    this.onLoad()
  },

})