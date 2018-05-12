// main.js
var app = getApp();

Page({
  data: {
    userInfo: {},
    checkin_history: [
      {
        "title": "软测b304",
        "checkin_id": 1231,
        "datetime": "2018-01-03 11:12:23",
        "checkedin_num": 80,
        "is_on": true
      },
      {
        "title": "系分b209",
        "checkin_id": 431,
        "datetime": "2018-01-23 14:12:23",
        "checkedin_num": 75,
        "is_on": false
      }
    ]
  },

  confirmButtonTap: function () {
    wx.navigateBack({
      delta: 1
    })
  },

  signinDetail: function (e) {
    console.log(e);
    var detailsUrl = '../detail/detail?checkin_id=' + e.currentTarget.dataset.checkin_id;
    wx.navigateTo({
      url: detailsUrl
    });
  },

  onLoad: function (options) {
    // console.log(options);
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      });
    });
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
});