Page({
  data: {
    ischeck: true,  //是否选择记住密码
    username: '',   //input用户名
    userpwd: ''     //input密码
  },

  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载',
    })

    //读取缓存
    this.readinput()
  },

  //绑定用户输入的用户名
  username(e) {
    this.setData({
      username: e.detail.value
    })
  },

  //绑定用户输入的密码
  userpwd(e) {
    this.setData({
      userpwd: e.detail.value
    })
  },

  //点击记住密码时候修改是否被选择
  check() {
    this.setData({
      ischeck: !this.data.ischeck
    })
  },

  //跳转到注册页面
  register() {
    wx.navigateTo({
      url: '../register/register',
    })
  },

  //读取缓存的用户名密码
  readinput() {
    var that = this
    wx.getStorage({
      key: 'username',
      success(res) {
        that.setData({
          username: res.data
        })
        wx.getStorage({
          key: 'userpwd',
          success(res) {
            that.setData({
              userpwd: res.data
            })
            wx.hideLoading()
          },
          fail(res) {
            wx.hideLoading()
          }
        })
      },
      fail(res) {
        wx.hideLoading()
      }
    })
  },

  //用户名密码存入缓存
  saveinput() {
    wx.setStorage({
      key: "username",
      data: this.data.username
    });
    wx.setStorage({
      key: "userpwd",
      data: this.data.userpwd
    });
  },

  //清除用户名密码缓存
  clearsave() {
    wx.clearStorage()
  },

  //前端验证输入长度
  flag() {
    if (this.data.username.length < 6) {
      wx.showToast({
        title: '用户名小于6位！',
        icon: 'none'
      })
      return false
    } else if (this.data.userpwd.length < 6) {
      wx.showToast({
        title: '密码小于6位！',
        icon: 'none'
      })
      return false
    } else {
      return true
    }
  },

  //点击登录
  login() {
    if (this.flag()) {
      if (this.data.ischeck == true) {    
        this.saveinput()
      } else {
        this.clearsave()
      }
      wx.showToast({
        title: '登录成功',
      })
    }
  }
})