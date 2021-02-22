//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        total: 0,
        index1: 0,
        index2: 0,
        canSearch: true,
        list: {},
        picker1: ['全部', '活动', '基本', '黄金', '暴雪', '预购', '促销', '游戏', '电竞', '传说', '赛季', '英雄', '成就', '炉边聚会'],
        picker2: ['从新到旧', '从旧到新'],
        scrollHeight: "100vh;",
        topNum: 0,
        data: {
            sort: 'dateadded',
            order: 'desc',
            textFilter: '',
            collectible: '1',
            cardBackCategory: '',
            pageSize: '200'
        }
    },

    onLoad: function (flag) {
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

        if (flag != true) {
            this.query()
        }
    },

    search() {
        var that = this
        this.setData({
            topNum: 0
        })

        if (this.data.canSearch) {
            this.query()
            this.data.canSearch = false
            setTimeout(function () {
                that.data.canSearch = true
            }, 2000)
        } else {
            wx.showToast({
                title: '请勿频繁提交!',
                icon: null
            })
        }
    },

    query() {
        var that = this
        that.data.data.t = Date.parse(new Date());
        wx.showLoading({
            title: '请稍后~',
        })
        wx.request({
            url: getApp().globalData.baseUrl + 'action/hs/cardbacks',
            data: that.data.data,
            method: "GET",
            header: {
                'Content-Type': 'application/json',
                'Authorization': getApp().globalData.access_token
            },
            success(res) {
                var list = res.data.cardBacks
                // console.log(list);
                that.setData({
                    list: list,
                    total: res.data.cardCount
                })
                wx.hideLoading()
            },
            fail(res) {
                wx.hideLoading()
            }
        });
    },

    standardChange(e) {
        // console.log(e);
        switch (e.detail.value) {
            case '0':
                this.data.data.cardBackCategory = '';
                break;
            case '1':
                this.data.data.cardBackCategory = 'events';
                break;
            case '2':
                this.data.data.cardBackCategory = 'base';
                break;
            case '3':
                this.data.data.cardBackCategory = 'golden';
                break;
            case '4':
                this.data.data.cardBackCategory = 'blizzard';
                break;
            case '5':
                this.data.data.cardBackCategory = 'pre_purchase';
                break;
            case '6':
                this.data.data.cardBackCategory = 'promotion';
                break;
            case '7':
                this.data.data.cardBackCategory = 'game_license';
                break;
            case '8':
                this.data.data.cardBackCategory = 'esports';
                break;
            case '9':
                this.data.data.cardBackCategory = 'legend';
                break;
            case '10':
                this.data.data.cardBackCategory = 'season';
                break;
            case '11':
                this.data.data.cardBackCategory = 'heroes';
                break;
            case '12':
                this.data.data.cardBackCategory = 'achieve';
                break;
            case '13':
                this.data.data.cardBackCategory = 'fireside';
                break;
        }

        if (e.detail.value == this.data.index1) {
            this.data.dataChange = false
        } else {
            this.data.dataChange = true
        }

        this.setData({
            index1: e.detail.value,
            topNum: 0
        })

        if (this.data.dataChange) {
            this.query()
        }

    },

    cardClassChange(e) {
        // console.log(e);
        switch (e.detail.value) {
            case '0':
                this.data.data.order = 'desc';
                break;
            case '1':
                this.data.data.order = 'asc';
                break;
        }

        if (e.detail.value == this.data.index2) {
            this.data.dataChange = false
        } else {
            this.data.dataChange = true
        }

        this.setData({
            index2: e.detail.value,
            topNum: 0
        })

        if (this.data.dataChange) {
            this.query()
        }

    },

    onShow() {
        if (typeof this.getTabBar === 'function' &&
            this.getTabBar()) {
            this.getTabBar().setData({
                selected: 3
            })
        }
        // this.onLoad(true)
    },

    bindText(e) {
        this.data.data.textFilter = e.detail.value
        this.setData({
            data: this.data.data
        })
    },

    toDetails(e) {
        var index = e.currentTarget.dataset.id

        var data = this.data.list
        // var list = data[index]

        var list = {}
        list.image = data[index].image
        list.name = data[index].name
        list.text = data[index].text

        var listData = JSON.stringify(list)

        // console.log(listData);
        wx.navigateTo({
            url: '../detailsCardBack/detailsCardBack?data=' + listData,
        })
    },
})