//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
  // 登录函数
  onLaunch: function () {
    // qcloud.setLoginUrl(config.service.loginUrl)
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
    this.checkWhetherTokenExists();
  },
  getUserInfo: function (cb) {
    var that = this;
    if (this.globalData.userInfo) {
      typeof cb == 'function' && cb(this.globalData.userInfo);
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function (res) {
          that.globalData.userInfo = res.userInfo;
          typeof cb == 'function' && cb(that.globalData.userInfo);
        }
      });
    }
  },
  //检查当前Token是否存在
  checkWhetherTokenExists: function () {
    try {
      // 本地缓存中token存储key为token
      var value = wx.getStorageSync('token');
      var that = this;
      if (value) {
        // 发送当前token给服务器校验其有效性
        // wx.request({
        // 我们的服务器地址
        //  url: 'https://sysuactivity/users',
        //  data: {
        //    token: value
        //  },
        //  header: {
        //    'content-type': 'application/json' // 默认值
        //  },
        //  success: function(res) {
        //    that.saveTokenOfCurrentUser(res.token);
        //  }
        //});
      } else {
        // console.log('本地缓存中找不到token');
        that.currentUserLogin();
      }
    } catch (e) {
      // 输出错误信息
      // console.log(e);
    }
  },
  //用户微信登陆，并获得返回的Code
  currentUserLogin: function () {
    var that = this;
    wx.login({
      success: function (res) {
        // console.log('当前code:' + res.code);
        if (res.code) {
          that.returnCodeToServer(res.code);
        } else {
          // console.log('登录失败！' + res.errMsg);
        }
      }
    });
  },
  // 返回code给服务器
  returnCodeToServer: function (code) {
    // console.log("code: " + code);
    var that = this;
    var value = wx.getStorageSync('token');
    wx.request({
      url: that.globalData.url,
      data: {
        code: code
      },
      header: {
        'Content-type': 'application/json',
        'Authorization': value
      },
      method: 'POST',
      success: function (res) {
        that.saveTokenOfCurrentUser(res.token);
      },
      fail: function () {
        // console.log('sending code failed' + res.errMsg);
      },
    });
  },

  /**
   * 提交个人信息
   */
  commitPersonInfoamation: function(personInformation, callBack) {
    var that = this;
    var value = wx.getStorageSync('token');
    wx.request({
      url: that.globalData.url + 'users',
      method: 'POST',
      header: {
        Token: value
      },
      data: {
        "id": personInformation.id,
        "name": personInformation.name,
        "school": personInformation.school
      },
      success(res) {
        if (parseInt(res.statusCode) === 201) {
          callBack('提交成功');
        } else {
          
        }
      }
    })
  },


  // 全局数据
  globalData: {
    url: 'http://172.19.54.42:3000/',
    userInfo: null,
  }
})