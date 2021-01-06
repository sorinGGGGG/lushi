// pages/serviceCentre/serviceCentre.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight: "100vh;",
    isDetails: false,
    isHighNew: true,
    showDetails: '企业详情'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      scrollHeight: getApp().globalData.height + 'px'
    })
  },

  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3
      })
    }
    this.onLoad()
  },

  isDetails() {
    this.setData({
      isDetails: !this.data.isDetails
    })
    if (this.data.isDetails) {
      this.setData({
        showDetails: '关闭详情'
      })
    } else {
      this.setData({
        showDetails: '企业详情'
      })
    }
  }

})