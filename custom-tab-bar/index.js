Component({
    data: {
      selected: 0,
      color: "#000000",
      selectedColor: "#1296db",
      list:  [{
        "pagePath": "/pages/index/index",
        "text": "首页",
        "iconPath": "../img/home.png",
        "selectedIconPath": "../img/home_c.png"
    },
    {
        "pagePath": "/pages/myWallet/myWallet",
        "text": "钱包",
        "iconPath": "../img/wallet.png",
        "selectedIconPath": "../img/wallet_c.png"
    },
    {
        "pagePath": "/pages/mine/mine",
        "text": "我的",
        "iconPath": "../img/mine.png",
        "selectedIconPath": "../img/mine_c.png"
    }
]
    },
    attached() {
    },
    methods: {
      switchTab(e) {
        const data = e.currentTarget.dataset
        const url = data.path
        wx.switchTab({url})
        this.setData({
          selected: data.index
        })
      }
    }
  })