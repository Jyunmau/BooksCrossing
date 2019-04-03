// pages/list/list.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput: true,
    bookID: '',
    bookDetail: {}
  },
  modalinput: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  //取消按钮  
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认  
  confirm: function () {
    this.setData({
      hiddenmodalput: true
    })
  },

  // 搜索书籍
  doGetBookDetail: function () {
    console.log(this.data.bookID)
    wx.cloud.init({
      env: 'bookscrossing'
    })
    const db = wx.cloud.database()
    db.collection('bookList').where({
      _id: this.data.bookID
    }).get({
      success(res) {
        console.log(res)
        this.setData({
          bookDetail: res.data[0]
        })
      }
    })
  },

  onLoad: function (options) {
    console.log(options)
    this.setData({
      bookID: options.id
    })
    this.doGetBookDetail()
  },

 
})