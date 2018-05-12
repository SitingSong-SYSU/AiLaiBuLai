// pages/initial/initial.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 拍照数据
    photo: "",
    isTakePhoto: false,

    // 选择框数据
    index: 0,
    array: ['中山大学', '华南理工大学', '深圳大学', '香港中文大学',' 暨南大学'],

    // 其它数据
    name: "",
    id: ""
  },

  takePhoto: function () {
    if (this.data.isTakePhoto == false) {
      var that = this;
      const ctx = wx.createCameraContext()
      ctx.takePhoto({
        quality: 'high',
        success: (res) => {
          that.setData({
            photo: res.tempImagePath,
            isTakePhoto: true
          })
        }
      })
    } else {
      this.setData({
        isTakePhoto: false
      })
    }
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  showDialog() {
    this.dialog.showDialog();
  },

  gotoSignin: function () {
    var that = this;
    this.showDialog();
    // app.getPosters(
    //   function (msg) {
    //     console.log('getPosters: ' + thePoster.data);
    //     that.setData({
    //       currentPoster: thePoster.data
    //     });
    //   },
    //   function () {}
    // );
  },

  //取消事件
  _cancelEvent() {
    console.log('你点击了取消');
    this.dialog.hideDialog();
  },

  //确认事件
  _confirmEvent() {
    console.log('你点击了确定');
    this.dialog.hideDialog();
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