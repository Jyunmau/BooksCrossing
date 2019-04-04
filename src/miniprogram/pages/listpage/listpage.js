// miniprogram/pages/listpage/listpage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookList: [],
    pageNum: 0,
    searchText: '',
    isEmpty: false
  },

  doSearchBooks: function () {
    this.setData({
      pageNum: 0
    })
    if (!this.data.isEmpty) {
      console.log(this.data.searchText)
      wx.cloud.callFunction({
        name: 'searchBooks',
        data: {
          // 这些项可以选填，如果不需要可以不用写某个字段
          booKName: this.data.searchText,
          //publisher: "test-openid-1",
          //state: 'borrowable',
          //borrower: '',
          //phone: 11223344
        },
        success: res => {
          console.log('书籍搜索结果：', res)
          // 获取成功后的逻辑
          this.setData({
            bookList: res.result.data
          })
        },
        fail: err => {
          console.log('书籍搜索失败', err)
          // 获取失败后的逻辑
          wx.showToast({
            title: '搜索失败！',
            icon: 'none'
          })
        }
      })
    } else {
      this.doGetBookList()
    }
  },

  getSearchText: function(e) {
    if (e.detail.value != '') {
      this.setData({
        searchText: e.detail.value
      })
      this.setData({
        isEmpty: false
      })
    } else {
      this.setData({
        isEmpty: true
      })
    }
  },

  turn2Detail: function (e) {
    console.log(e.currentTarget.id)
    console.log(this.data.bookList)
    var id = this.data.bookList[e.currentTarget.id]._id
    wx.navigateTo({
      url: '../details/details?id=' + id,
    })
  },

  // 获取书籍列表
  doGetBookList: function () {
    wx.cloud.callFunction({
      name: 'getBookList',
      data: {
        pageNum: this.data.pageNum     // 要获取第几页的数据，从0开始
      },
      success: res => {
        console.log('书籍列表：', res)
        // 获取成功后的逻辑
        if (this.data.pageNum == 0) {
          this.setData({
            bookList: res.result.data
          })
        } else {
          for (var i = 0; i < res.result.data.length; i++) {
            this.data.bookList.push(res.result.data[i])
          }
          this.setData({
            bookList: this.data.bookList
          })
        }
      },
      fail: err => {
        console.log('书籍列表获取失败', err)
        // 获取失败后的逻辑
        wx.showToast({
          title: '书籍列表获取失败！',
          icon: 'none'
        })
      }
    })
  },

  getMoreBook: function () {
    this.setData({
      pageNum: this.data.pageNum + 1
    })
    this.doGetBookList()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.doGetBookList()
  },
})