//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        index1: 0,
        index2: 0,
        list: {},
        picker1: ['对决模式', '竞技模式'],
        picker2: ['恶魔猎手', '德鲁伊', '猎人', '法师', '圣骑士', '牧师', '潜行者', '萨满', '术士', '战士', '中立'],
        scrollHeight: "100vh;",
        topNum: 0,
        data: {
            cardSet: 'duels',
            cardClass: 'demonhunter',
            pageSize: '1200',
            sort: 'MANACOST_ASC',
            t: '',
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
                scrollHeight: height + "px;",
            })
        })

        if (flag != true) {
            this.query()
        }
    },

    search() {
        this.query()
    },

    query() {
        var that = this
        that.data.data.t = Date.parse(new Date());
        wx.showLoading({
            title: '卡牌正在加载中',
        })
        wx.request({
            url: getApp().globalData.baseUrl + 'action/gameguide/cards',
            data: that.data.data,
            method: "POST",
            header: {
                'Content-Type': 'application/json',
                'Authorization': getApp().globalData.access_token
            },
            success(res) {
                var list = res.data.data.list
                // console.log(list);

                that.setData({
                    list: list
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
                this.data.data.cardSet = 'duels';
                break;
            case '1':
                this.data.data.cardSet = 'arena';
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
                this.data.data.cardClass = 'demonhunter';
                break;
            case '1':
                this.data.data.cardClass = 'druid';
                break;
            case '2':
                this.data.data.cardClass = 'hunter';
                break;
            case '3':
                this.data.data.cardClass = 'mage';
                break;
            case '4':
                this.data.data.cardClass = 'paladin';
                break;
            case '5':
                this.data.data.cardClass = 'priest';
                break;
            case '6':
                this.data.data.cardClass = 'rogue';
                break;
            case '7':
                this.data.data.cardClass = 'shaman';
                break;
            case '8':
                this.data.data.cardClass = 'warlock';
                break;
            case '9':
                this.data.data.cardClass = 'warrior';
                break;
            case '10':
                this.data.data.cardClass = 'neutral';
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
                selected: 2
            })
        }
        // this.onLoad(true)
    },

    toDetails(e) {
        var index = e.currentTarget.dataset.id

        var data = this.data.list
        // var list = data[index]

        var list = {}
        list.image = data[index].image
        list.legacyKeywords = data[index].legacyKeywords
        list.flavorText = data[index].flavorText
        list.artistName = data[index].artistName.replace('&', '/')

        var listData = JSON.stringify(list)

        // console.log(listData);
        wx.navigateTo({
            url: '../details/details?data=' + listData,
        })
    },
})