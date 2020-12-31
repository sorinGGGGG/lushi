// pages/login/login.js
Page({

    data: {

    },

    onLoad: function (options) {

    },

    login(){
        wx.navigateTo({
          url: '../login/login',
        })
    },

    loginwx(){
        console.log("微信登录！"); 
    }
})