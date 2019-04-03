// miniprogram/pages/listpage/listpage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookList: [{
      title: '书1',
    
    },
    {
      title: '书2',
     
    },
    {
      title: '书3',
   
    },
    {
      title: '书4',
   
    },
   
    {
      title: '书5',
 
    },
    {
      title: '书6',
  
    },
    {
      title: '书7',
  
    },
    {
      title: '书8',
  
    },
    {
      title: '书9',
    
    },
    {
      title: '书10',
   
    },
    {
      title: '书11',
  
    },
    {
      title: '书12',
     
    },
    {
      title: '书13',
    
    },
    {
      title: '书14',
     
    },
     {
      title: '书15',
     },
    ]
  },

  doSearchBooks: function () {
    wx.cloud.callFunction({
      name: 'searchBooks',
      data: {
        // 这些项可以选填，如果不需要可以不用写某个字段
        publisher: 'test-2',
        //bookName: '计算机操作系统',
        //state: 'borrowable',
        //borrower: '',
        //phone: 11223344
      },
      success: res => {
        console.log('书籍搜索结果：', res)
        // 获取成功后的逻辑
      },
      fail: err => {
        console.log('书籍搜索失败', err)
        // 获取失败后的逻辑
      }
    })
    wx.cloud.uploadFile({
      cloudPath: 'abc.png', // 上传至云端的路径
      filePath: '',
      success: res => {
        console.log(res.fileID)
      }
    })
    wx.cloud.downloadFile({
      fileID: '', // 文件 ID
      success: res => {
        // 返回临时文件路径
        console.log(res.tempFilePath)
      },
      fail: console.error
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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