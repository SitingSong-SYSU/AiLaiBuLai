// gotoSignin.js
var app = getApp();

Page({
  data: {
    share_id: "",
    comment: "",
    photo: "",
    isTakePhoto: false,
    latitude: 0,
    longitude: 0,
    title: "未知签到"
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

  gotoSignin: function() {
    var that = this;
    var myMseeage = {
      share_id: this.data.share_id,
      latitude: this.data.latitude,
      longitude: this.data.longitude,
      msg: this.data.comment,
      photo: this.data.photo
    }
    app.gotoSignin(myMseeage,
      function (msg) {
        that.setData({
          resMsg: msg
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

  changeShare_id: function(e) {
    this.setData({
      share_id: e.detail.value
    })
  },

  changeComment: function(e) {
    this.setData({
      comment: e.detail.value
    })
  },

  confirmButtonTap: function () {
    wx.navigateBack({
      delta: 1
    })
  },

  findSignin: function() {
    if (this.data.share_id.length != 4) {
      wx.showToast({
        title: "签到号非法",
        icon: "none",
        duration: 2000
      });
      return;
    }
    var that = this;
    app.findSignin(this.data.share_id, function(title) {
      if (title.substr(0, 4) == '查询失败'){
        wx.showToast({
          title: title,
          duration: 2000
        })
      } else {
        // 设置当前标题栏为签到名称
        wx.setNavigationBarTitle(title);
        that.setData({
          title: title
        })
      }
    })
  },

  onLoad: function (options) {

  },

  /**
     * 生命周期函数--监听页面初次渲染完成
     */
  onReady: function () {
    //获得dialog组件
    this.dialog = this.selectComponent("#dialog");
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