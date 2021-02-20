// pages/detailsHero/detailsHero.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // console.log(options);
        var id = options.data1
        var id2 = options.data2
        // console.log(id);
        var that = this
        wx.request({
            url: getApp().globalData.baseUrl + 'action/hs/cards/battleround',
            data: {
                ids: id,
                tier: 'all',
                pageSize: 200,
                locale: 'zh_cn'
            },
            method: "GET",
            header: {
                'Content-Type': 'application/json',
                'Authorization': getApp().globalData.access_token
            },
            success(res) {
                wx.request({
                    url: getApp().globalData.baseUrl + 'action/hs/cards/battleround',
                    data: {
                        ids: id2,
                        tier: 'all',
                        pageSize: 200,
                        locale: 'zh_cn'
                    },
                    method: "GET",
                    header: {
                        'Content-Type': 'application/json',
                        'Authorization': getApp().globalData.access_token
                    },
                    success(res2) {
                        
                        var list = {}
                        list[0]=res.data.cards[0]
                        list[1]=res2.data.cards[0]
                        
                        // console.log(list);
                        that.setData({
                            list: list,
                        })
                    }
                });
            }
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})