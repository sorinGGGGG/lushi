Component({
    data: {
      selected: 0,
      color: "#000000",
      selectedColor: "#d4237a",
      list:  [{
        "pagePath": "/pages/index/index",
        "text": "项目中心",
        "iconPath": "../img/one.png",
        "selectedIconPath": "../img/onechoose.png"
    },
    {
        "pagePath": "/pages/IntelligentMatching/IntelligentMatching",
        "text": "智能匹配",
        "iconPath": "../img/two.png",
        "selectedIconPath": "../img/twochoose.png"
    },
    {
        "pagePath": "/pages/PatentApplication/PatentApplication",
        "text": "专利申请",
        "iconPath": "../img/three.png",
        "selectedIconPath": "../img/threechoose.png"
    },
    {
        "pagePath": "/pages/serviceCentre/serviceCentre",
        "text": "服务中心",
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