// releaseSignin.js
var app = getApp();

Page({
  data: {
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
    }, {
      latitude: 23.099994,
      longitude: 113.304520,
      iconPath: '/image/location.png'
    }]
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