//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    postBookIMG: ''
  },

  onLoad: function() {
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
        }
      }
    })
  },

  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  // 获取openid
  onGetOpenid: function() {
    // 调用云函数
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
  },

  // 用户注册
  doSignUp: function() {
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

  // 获取云端（已注册）用户信息
  doGetUserInfo: function() {
    wx.cloud.callFunction({
      name: 'getUserInfo',
      data: {
        openid: 'test_openid-1'
      },
      success: res => {
        console.log('用户信息：', res)
        // 获取成功后的逻辑
        if (res.result.data.length==0) {
          console.log("未注册！")
          // 未注册处理逻辑
        }
      },
      fail: err => {
        console.log('用户信息获取失败', err)
      }
    })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        
        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)
            this.setData({
              postBookIMG: cloudPath
            })

            // app.globalData.fileID = res.fileID
            // app.globalData.cloudPath = cloudPath
            // app.globalData.imagePath = filePath

          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },

})
