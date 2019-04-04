// miniprogram/pages/individual/individual.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    TabCur: 0,
    scrollLeft: 0,
    hiddenmodalput:true,
    borrowhidden:true,
    deletehidden:true,
    tabc:['我的图书','借入图书'],
    picker:['可借','锁定'],                      
    lendbookmsg:[],//借出图书
    borrowbookmsg: [],//借入图书
    mybookmsg:[],//还没借出去的图书
    code:'',//输入的还书码
    currentid:-1,//还书的id
    lendid:-1,//borrowList的id
    returncode:"",//展示还书码
    deletebookid:'',//要删除的图书id
    state:'0',//mybook的state，0可借 1锁定
    openid:"test_yW5IvXG3gg9ZFivBC3naru"
  },
  inputcode:function(e){
    this.data.code=e.detail.value
  },
  borrowconfirm:function(){
    this.setData({
      borrowhidden: true
    });
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
    console.log("id:", this.data.currentid)
    console.log("checkCode:",this.data.code)
    console.log("lendid:", this.data.lendid)
    var that=this;
    var code = this.data.code;
    var id = this.data.currentid;
    var lendid = this.data.lendid;
    wx.cloud.callFunction({
      name: 'returnBook',
      data: {
        id: id,
        checkCode:code,
        lendid:lendid
      },
      success: res => {


        if(res.result=="checkFailed"){
          wx.showToast({
            title: '还书失败',
            duration: 1000,
            icon:'loading',
            mask: true
          })
         
        }
        else{
        wx.showToast({
          title: '还书成功',
          icon: 'success',
          duration: 1000,
          mask: true
        })
        that.onLoad()
        }
      
      },
      fail: err => {
        
        console.error('[云函数] [returnBook] 调用失败', err)
      }
    })

  },
  tabSelect(e) {
    console.log(e);
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that=this;
    //借入
    wx.cloud.callFunction({
      name: 'getBorrowBook',
      data: {
        id:that.data.openid
      },
      success: res => {
        console.log('[云函数] [getBorrowBook] bookList: ', res.result.data)
        that.setData({
          borrowbookmsg: res.result.data
          //lendbookList:book
        })

      },
      fail: err => {

        console.error('[云函数] [getBorrowBook] 调用失败', err)
      }
    })
    //借出
    wx.cloud.callFunction({
      name: 'getLendBook',
      data: {
        id: that.data.openid
      },
      success: res => {
        that.setData({
          lendbookmsg: res.result.data,
          //lendbookList:book
        })
        console.log("book=", that.data.lendbookmsg)
        
      },
      fail: err => {
        console.error('[云函数] [getBorrowBook] 调用失败', err)
      }
    })
    wx.cloud.callFunction({
      name: 'getMyBook',
      data: {
        id: that.data.openid
      },
      success: res => {
        console.log('[云函数] [getMyBook] bookList: ', res.result.data)
        that.setData({
          mybookmsg: res.result.data
          //lendbookList:book
        })

      },
      fail: err => {

        console.error('[云函数] [getBorrowBook] 调用失败', err)
      }
    })
    console.log("mybookmsg", this.data.mybookmsg)

  },    
  //点击借书    
  returnBook:function(e){
    this.setData({
      hiddenmodalput:false,
      currentid: e.currentTarget.dataset.id,
      lendid:e.currentTarget.dataset.lendid
    })

  },
  //查看还书码
  checkReturncode:function(e){

    this.setData({
      borrowhidden: false,
      returncode: e.currentTarget.dataset.id
    })
  },
  //删除图书
  dellend:function(e){

    this.setData({
      deletehidden: false,
      deletebookid: e.currentTarget.dataset.id
    })
    //console.log("dellend:", this.data.deletebookid)
  },
  //确认删除
  confirmdel:function(){
    this.setData({
      deletehidden:true
    })
    var that=this
    wx.cloud.callFunction({
      name: 'deleteBook',
      data: {
        id: that.data.deletebookid
      },
      success: res => {
        console.log('[云函数] [deleteBook] bookList: ', res.result.data)
        if (res.result == "checkFailed") {
          wx.showToast({
            title: '删除失败',
            duration: 1000,
            icon: 'loading',
            mask: true
          })
        }
        else {
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 1000,
            mask: true
          })
          that.onLoad()
        }
      },
      fail: err => {

        console.error('[云函数] [deleteBook] 调用失败', err)
      }
    })

  },
  //取消删除
  canceldel:function(){

    this.setData({
      deletehidden: true
    })
  },
  //选择状态
  PickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      state: e.detail.value
    })
    var id = e.currentTarget.dataset.id
    var state=''
    var that=this
    if (e.detail.value == 0){
      state ='borrowable'
    }
    else{
      state = 'locked'
    }
    console.log("state:",state)
    wx.cloud.callFunction({
      name: 'lockBook',
      data: {
        state: state,
        id: id,
      },
      success: res => {
        
        console.log("lockbook",res)
        that.onLoad()

      },
      fail: err => {
        console.error('[云函数] [lockbook] 调用失败', err)
      }
    })

  },

})