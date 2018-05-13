var app = getApp();

Page({
  data: {
    // 地图数据
    latitude: 23.099994,
    longitude: 113.324520,
    markers: [{
      id: 1,
      latitude: 23.099994,
      longitude: 113.324520,
      name: 'T.I.T 创意园'
    }],
    covers: [{
      latitude: 23.099994,
      longitude: 113.344520,
      iconPath: '/image/location.png'
    }],

    // 其它数据
    index: 4,
    array: [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
    title: "",
    share_id: "0"
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  changeTitle: function(e) {
    this.setData({
      title: e.detail.value
    })
  },

  releaseSignin: function () {
    if (this.data.title == "") {
      wx.showToast({
        title: '名称不能为空',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    var that = this;
    var signinMessage = {
      latitude: this.data.latitude,
      longitude: this.data.longitude,
      title: this.data.title,
      limit_time: this.data.array[this.data.index]
    }
    app.releaseSignin(signinMessage,
      function (msg) {
        that.setData({
          share_id: "" + msg
        });
        that.dialog.showDialog();
      }
    );
  },

  //取消事件
  _cancelEvent() {
    this.dialog.hideDialog();
  },

  //确认事件
  _confirmEvent() {
    this.dialog.hideDialog();
  },

  confirmButtonTap: function () {
    wx.navigateBack({
      delta: 1
    })
  },

  onLoad: function (options) {
    console.log(options);
    var that = this;
    // this.setData({
    //   msg: options.outputString
    // })
  },

  /**
     * 生命周期函数--监听页面初次渲染完成
     */
  onReady: function () {
    this.mapCtx = wx.createMapContext('myMap')
    this.dialog = this.selectComponent("#dialog")
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
      }
    })
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
});

