//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
    }],
    TabCur: 0,
    scrollHeight: "100vh;",
    topHeight: 0,
    topNum: 0
  },

  //切换界面时弹回页面顶部
  gotop() {
    this.setData({
      topNum: 0
    })
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

  //切换页面时触发
  handleItemChange(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
    })
    console.log(e);
  },
})