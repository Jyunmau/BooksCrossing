// pages/login/login.js
var app = getApp(); 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    // 获取本地用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
          wx.navigateTo({
            url: '/pages/listpage/listpage'
          })
        }
      }
    })
  },

  // 用户注册
  doSignUp: function () {
    wx.cloud.callFunction({
      name: 'signUp',
      data: {
        openid: 'test_openid-1',     // 需要先获取openid 
        phone: 12345,     // 需要input获取
        nickName: '用户昵称（test-1）'    // 需要input获取
      },
      success: res => {
        console.log('用户注册：', res)
        // 获取成功后的逻辑
        if (res.result == "duplication") {
          // openid重复的处理逻辑
          console.log("重名！")
        }
      },
      fail: err => {
        console.log('用户注册失败：', err)
        // 获取失败后的逻辑
      }
    })
  },

  getUserInfo: function (e) {
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result)
        app.globalData.openid = res.result.openid
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
    if (e.detail.userInfo){
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      }),
      wx.navigateTo({
        url: '/pages/listpage/listpage'
      })
    }
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