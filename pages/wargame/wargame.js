// pages/IntelligentMatching/IntelligentMatching.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index1: null,
    index2: null,
    picker1: ['种族', '恶魔', '海盗', '机械', '龙', '全部', '野兽', '鱼人', '元素'],
    picker2: ['星级', '1', '2', '3', '4', '5', '6'],
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

  raceChange(e) {
    // console.log(e);
    switch (e.detail.value) {
      case '0':
        this.data.data.minionType = '';
        break;
      case '1':
        this.data.data.minionType = 'demon';
        break;
      case '2':
        this.data.data.minionType = 'pirate';
        break;
      case '3':
        this.data.data.minionType = 'mech';
        break;
      case '4':
        this.data.data.minionType = 'dragon';
        break;
      case '5':
        this.data.data.minionType = 'all';
        break;
      case '6':
        this.data.data.minionType = 'beast';
        break;
      case '7':
        this.data.data.minionType = 'murloc';
        break;
      case '8':
        this.data.data.minionType = 'elemental';
        break;
    }
    this.setData({
      index1: e.detail.value,
      topNum: 0
    })
    this.query()
  },

  starsChange(e) {
    switch (e.detail.value) {
      case '0':
        this.data.data.tier = 'all';
        break;
      case '1':
        this.data.data.tier = '1';
        break;
      case '2':
        this.data.data.tier = '2';
        break;
      case '3':
        this.data.data.tier = '3';
        break;
      case '4':
        this.data.data.tier = '4';
        break;
      case '5':
        this.data.data.tier = '5';
        break;
      case '6':
        this.data.data.tier = '6';
        break;
    }
    this.setData({
      index2: e.detail.value,
      topNum: 0
    })
    this.query()
  },

  query() {
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
    if (e.currentTarget.dataset.id == 0) {
      this.data.data = {
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
    } else if (e.currentTarget.dataset.id == 1) {
      this.data.data = {
        sort: 'tier',
        order: 'async',
        type: 'minion',
        minionType: '',
        tier: 'all',
        viewMode: 'table',
        collectible: '0,1',
        pageSize: 200,
        locale: 'zh_cn'
      }
    }
    this.query()
  },

  toDetails(e) {
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