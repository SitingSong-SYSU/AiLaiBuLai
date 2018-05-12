//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
  gotoSignin: function (successCb, failCb) {
    var that = this;
      // send request to Server, get data
      wx.request({
        url: 'http://172.19.54.42:3000/',
        method: 'GET',
        success(res) {
          successCb(res);
        },
        fail() {
          typeof successCb == 'function' && failCb('Server Error: cannot get initial poster');
        }
      });
  },
    onLaunch: function () {
        qcloud.setLoginUrl(config.service.loginUrl)
    }
})