var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    "title": "软测b403",
    "checkedin": [
      {
        "id": "15331689",
        "name": "王同学",
        "university": "中山大学",
        "msg": "备注信息"
      },
      {
        "id": "15457682",
        "name": "李同学",
        "university": "中山大学",
        "msg": "备注信息"
      }
    ],
    "checkedin_num": 75,
    "is_on": true,
    "share_id": 2132
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.findSignin(options.checkin_id,
      function (checkedin) {
        //更新数据
        that.setData({
          checkedin: checkedin
        });
      }
    )
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