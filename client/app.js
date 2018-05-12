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
   * personInformation: 个人信息
   * callBack: 返回信息
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
          callBack('提交信息成功');
        } else {
          callBack('提交信息失败');
        }
      },
      fail() {
        callBack('提交信息失败，' + 'res.errMsg');
      }
    })
    return callBack;
  },

  /**
   * 上传个人照片
   * photo: 个人照片
   * callBack: 返回信息
   */
  uploadPhotos: function (photo, callBack) {
    var that = this;
    var value = wx.getStorageSync('token');
    wx.request({
      url: that.globalData.url + 'users/picture',
      method: 'POST',
      header: {
        Token: value
      },
      data: {
        photo
      },
      success(res) {
        if (parseInt(res.statusCode) === 201) {
          callBack('提交照片成功');
        } else {
          callBack('提交照片失败');
        }
      },
      fail() {
        callBack('提交照片失败，' + 'res.errMsg');
      }
    })
    return callBack;
  },

  /**
   * 发布签到
   * photo: 个人照片
   * callBack: 返回信息
   * 请求成功返回share_id
   */
  releaseSignin: function (signinMessage, callBack) {
    var that = this;
    var value = wx.getStorageSync('token');
    wx.request({
      url: that.globalData.url + 'checkin',
      method: 'POST',
      header: {
        Token: value
      },
      data: {
        "latitude": signinMessage.latitude,
        "longitude": signinMessage.longitude,
        "title": signinMessage.title,
        "limit_time": signinMessage.limit_time
      },
      success(res) {
        if (parseInt(res.statusCode) === 201) {
          callBack(res.data.share_id);
        } else {
          callBack('提交照片失败');
        }
      },
      fail() {
        callBack('提交照片失败，' + 'res.errMsg');
      }
    })
    return callBack;
  },

  /**
   * 参与签到
   * myMseeage: 个人信息
   * callBack: 返回信息
   * 请求成功返回签到成功/失败提示
   */
  gotoSignin: function (myMseeage, callBack) {
    var that = this;
    var value = wx.getStorageSync('token');
    wx.request({
      url: that.globalData.url + 'share_checkin/{' + myMseeage.share_id + '}?latitude=' + myMseeage.latitude + '&longitude=' + myMseeage.longitude + '&msg=' + myMseeage.msg,
      method: 'POST',
      header: {
        Token: value
      },
      data: {
        photo: myMseeage.photo
      },
      success(res) {
        if (parseInt(res.statusCode) === 201 || 401) {
          callBack(res.data.msg);
        } else {
          callBack('签到失败');
        }
      },
      fail(res) {
        callBack('签到失败，' + 'res.errMsg');
      }
    })
    return callBack;
  },

  /**
   * 查看签到活动的名称
   * share_id: 签到号
   * callBack: 返回信息
   * 请求成功返回签到成功/失败提示
   */
  findSignin: function (share_id, callBack) {
    var that = this;
    var value = wx.getStorageSync('token');
    wx.request({
      url: that.globalData.url + 'share_checkin/{' + share_id + '}',
      method: 'GET',
      header: {
        Token: value
      },
      success(res) {
        if (parseInt(res.statusCode) === 200) {
          callBack(res.data.title);
        } else if (parseInt(res.statusCode) === 401) {
          callBack(res.data.msg);
        } else {
          callBack('查询失败');
        }
      },
      fail(res) {
        callBack('查询失败，' + res.errMsg);
      }
    })
    return callBack;
  },

  /**
   * 历史发布签到列表
   * callBack: 返回信息
   * 请求成功返回历史发布签到
   */
  signinHistory: function (callBack) {
    var that = this;
    var value = wx.getStorageSync('token');
    wx.request({
      url: that.globalData.url + 'checkin',
      method: 'GET',
      header: {
        Token: value
      },
      success(res) {
        callBack(res.data.checkin_history);
      },
      fail(res) {
        callBack('查询失败，' + res.errMsg);
      }
    })
    return callBack;
  },

  /**
 * 结束签到
 * checkin_id: 签到id
 * callBack: 返回信息
 * 请求成功返回签到成功/失败提示
 */
  findSignin: function (checkin_id, callBack) {
    var that = this;
    var value = wx.getStorageSync('token');
    wx.request({
      url: that.globalData.url + 'checkin/{' + checkin_id+ '}',
      method: 'DELETE',
      header: {
        Token: value
      },
      success(res) {
        if (parseInt(res.statusCode) === 204) {
          callBack('操作成功');
        } else {
          callBack('操作失败');
        }
      },
      fail(res) {
        callBack('操作失败，' + res.errMsg);
      }
    })
    return callBack;
  },

  /**
  * 具体每个签到信息
  * checkin_id: 签到id
  * callBack: 返回信息
  * 请求成功返回签到成功/失败提示
  */
  findSignin: function (checkin_id, callBack) {
    var that = this;
    var value = wx.getStorageSync('token');
    wx.request({
      url: that.globalData.url + 'checkin/{' + checkin_id + '}',
      method: 'GET',
      header: {
        Token: value
      },
      success(res) {
        if (parseInt(res.statusCode) === 200) {
          callBack(res.data);
        } else {
          callBack('查询失败');
        }
      },
      fail(res) {
        callBack('查询失败，' + res.errMsg);
      }
    })
    return callBack;
  },

  // 全局数据
  globalData: {
    url: 'http://172.19.54.42:3000/',
    userInfo: null,
  }
})