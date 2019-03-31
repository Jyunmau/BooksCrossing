// pages/list/list.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput: true,
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

  /**
   * 生命周期函数--监听页面加载
   */



  getdata: function () {
    var that = this;
    wx.request({
      url: 'https://www.turing-cup.online/voteapp/activity',
      header: {
        "Content-Type": "applciation/json"
      },
      method: "GET",

      success: function (res) {

        console.log(res.data);
        that.setData({ activitylist: res.data });
      },
      fail: function (err) { },
      complete: function () { },
    })
  },

  onLoad: function (options) {
    this.getdata();
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