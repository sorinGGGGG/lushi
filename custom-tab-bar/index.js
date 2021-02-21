Component({
    data: {
      selected: 0,
      color: "#000000",
      selectedColor: "#a5673f",
      list:  [{
        "pagePath": "/pages/classics/classics",
        "text": "经典模式",
        "iconPath": "../img/one.png",
        "selectedIconPath": "../img/onechoose.png"
    },
    {
        "pagePath": "/pages/wargame/wargame",
        "text": "战棋模式",
        "iconPath": "../img/two.png",
        "selectedIconPath": "../img/twochoose.png"
    },
    {
        "pagePath": "/pages/fight/fight",
        "text": "其他模式",
        "iconPath": "../img/three.png",
        "selectedIconPath": "../img/threechoose.png"
    },
    {
        "pagePath": "/pages/cardBack/cardBack",
        "text": "卡背欣赏",
        "iconPath": "../img/four.png",
        "selectedIconPath": "../img/fourchoose.png"
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