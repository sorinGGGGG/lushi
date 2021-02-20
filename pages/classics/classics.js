//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    isBottom: false,
    maxPage: 0,
    index1: null,
    index2: null,
    index3: null,
    list: {},
    picker1: ['狂野卡牌', '标准卡牌'],
    picker2: ['恶魔猎手', '德鲁伊', '猎人', '法师', '圣骑士', '牧师', '潜行者', '萨满', '术士', '战士', '中立'],
    picker3: ['全水晶', '0', '1', '2', '3', '4', '5', '6', '7+'],
    TabCur: 0,
    scrollHeight: "100vh;",
    topHeight: 0,
    topNum: 0,
    data: {
      cardClass: 'demonhunter', //职业
      p: 1, //页数
      standard: '0', //模式
      cardSet: '', //卡包
      keywords: '', //关键词
      t: '', //时间
      cost: '', //费用
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
    this.query()
  },

  query(flag) {
    var that = this
    that.data.data.t = Date.parse(new Date());
    wx.request({
      url: getApp().globalData.baseUrl + 'action/cards/query',
      data: that.data.data,
      method: "POST",
      header: {
        'Content-Type': 'application/json',
        'Authorization': getApp().globalData.access_token
      },
      success(res) {
        var list = res.data.cards
        // console.log(list);
        if (flag) {
          list.forEach(element => {
            that.data.list.push(element)
          });

          list = that.data.list
        }

        that.setData({
          list: list,
          maxPage: res.data.totalPage
        })
      }
    });
  },

  standardChange(e) {
    // console.log(e);
    switch (e.detail.value) {
      case '0':
        this.data.data.standard = 0;
        this.data.data.p = 1;
        break;
      case '1':
        this.data.data.standard = 1;
        this.data.data.p = 1;
        break;
    }
    this.setData({
      index1: e.detail.value,
      topNum: 0
    })
    this.query()
  },

  cardClassChange(e) {
    // console.log(e);
    switch (e.detail.value) {
      case '0':
        this.data.data.cardClass = 'demonhunter';
        this.data.data.p = 1;
        break;
      case '1':
        this.data.data.cardClass = 'druid';
        this.data.data.p = 1;
        break;
      case '2':
        this.data.data.cardClass = 'hunter';
        this.data.data.p = 1;
        break;
      case '3':
        this.data.data.cardClass = 'mage';
        this.data.data.p = 1;
        break;
      case '4':
        this.data.data.cardClass = 'paladin';
        this.data.data.p = 1;
        break;
      case '5':
        this.data.data.cardClass = 'priest';
        this.data.data.p = 1;
        break;
      case '6':
        this.data.data.cardClass = 'rogue';
        this.data.data.p = 1;
        break;
      case '7':
        this.data.data.cardClass = 'shaman';
        this.data.data.p = 1;
        break;
      case '8':
        this.data.data.cardClass = 'warlock';
        this.data.data.p = 1;
        break;
      case '9':
        this.data.data.cardClass = 'warrior';
        this.data.data.p = 1;
        break;
      case '10':
        this.data.data.cardClass = 'neutral';
        this.data.data.p = 1;
        break;
    }
    this.setData({
      index2: e.detail.value,
      topNum: 0
    })
    this.query()
  },

  costChange(e) {
    // console.log(e);
    switch (e.detail.value) {
      case '0':
        this.data.data.cost = '';
        this.data.data.p = 1;
        break;
      case '1':
        this.data.data.cost = '0';
        this.data.data.p = 1;
        break;
      case '2':
        this.data.data.cost = '1';
        this.data.data.p = 1;
        break;
      case '3':
        this.data.data.cost = '2';
        this.data.data.p = 1;
        break;
      case '4':
        this.data.data.cost = '3';
        this.data.data.p = 1;
        break;
      case '5':
        this.data.data.cost = '4';
        this.data.data.p = 1;
        break;
      case '6':
        this.data.data.cost = '5';
        this.data.data.p = 1;
        break;
      case '7':
        this.data.data.cost = '6';
        this.data.data.p = 1;
        break;
      case '8':
        this.data.data.cost = '7';
        this.data.data.p = 1;
        break;
    }
    this.setData({
      index3: e.detail.value,
      topNum: 0
    })
    this.query()
  },

  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
    this.onLoad(true)
  },

  addPage() {
    //console.log("到底了");

    if (this.data.maxPage <= 1) {
      this.setData({
        isBottom: true
      })
      return
    } else {
      var that = this
      that.data.data.p += 1
      // console.log(that.data.data.p);
      // console.log(that.data.maxPage);
      if (that.data.data.p > that.data.maxPage) {
        that.data.data.p = that.data.maxPage
        that.setData({
          isBottom: true
        })
        return
      }
      this.query(true)
    }
  },

  bindText(e) {
    this.data.data.keywords = e.detail.value
    this.setData({
      data: this.data.data
    })
  },

  toDetails(e) {
    var index = e.currentTarget.dataset.id
    
    var data = this.data.list
    var list = data[index]

    var listData = JSON.stringify(list)
    // console.log(listData);
    wx.navigateTo({
      url: '../details/details?data=' + listData,
    })
  },
})