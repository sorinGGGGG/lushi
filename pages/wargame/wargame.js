// pages/IntelligentMatching/IntelligentMatching.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: {},
    TabCur: 0,
    scrollHeight: "100vh;",
    topHeight: 0,
    topNum: 0,
    choose: ['英雄', '棋子'],
    data: {
      sort: 'tier',
      order: 'async',
      type: 'hero',
      minionType: '',
      tier: 'all',
      viewMode: 'table',
      collectible: '0,1',
      pageSize: 200,
      locale: 'zh_cn'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (flag) {
    var that = this
    //计算页面高度
    var query = wx.createSelectorQuery();
    //选择id
    query.select('#mjltest').boundingClientRect()
    query.exec(function (res) {
      // console.log(res);
      var height = getApp().globalData.height - res[0].height
      that.setData({
        scrollHeight: height + "px;",
        topHeight: res[0].height + "px;"
      })
    })

    if (flag != true) {
      this.query()
    }
  },

  query(flag) {
    var that = this
    wx.request({
      url: getApp().globalData.baseUrl + 'action/hs/cards/battleround',
      data: that.data.data,
      method: "GET",
      header: {
        'Content-Type': 'application/json',
        'Authorization': getApp().globalData.access_token
      },
      success(res) {
        console.log(res);
        var list = res.data.cards

        that.setData({
          list: list,
        })
      }
    });
  },

  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
    })
  },

  toDetails(e){
    console.log(e.currentTarget.dataset.id);
  },

  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
    this.onLoad(true)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})