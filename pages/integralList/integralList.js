// pages/integralList/integralList.js
var common = require('../../common.js');
var appInstance = getApp();
import { statistic, fromPageData } from '../../tunji'
Page({
  data: {
    sign: "",
    persionList: "",
    coins: "",
    topIndex: "",
    helpWin: false
  },
  onLoad: function(options) {
    var that = this;
    // 上报后台数据
    statistic();
    if (options.scene) {
      wx.setStorageSync('sence', options.scene)
    }

    // 渠道统计  一定要放在wx.setStorageSync('sence', options.scene) 之后
    fromPageData()

    var sign = appInstance.data.sign;
    var avatarUrl = wx.getStorageSync("avatarUrl");
    //console.log(sign)
    wx.showShareMenu({
      withShareTicket: true
    })
    that.setData({
      sign: sign,
      avatarUrl: avatarUrl
    })
    //console.log(that.data.sign);
    wx.request({
      url: 'https://hepulan.playonwechat.com/site/get-coins-top15?sign=' + that.data.sign,
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        //console.log(res);
        var persion = [];
        var persionList = res.data.data;
        for (var i = 0; i < persionList.length; i++) {
          persion[i] = {
            pUrl: persionList[i].avatarurl
          };
          persion[i].name = persionList[i].nickname;
          persion[i].integral = persionList[i].coins;
        }
        that.setData({
          persionList: persion
        })
      }
    });
    wx.request({
      url: 'https://hepulan.playonwechat.com/site/get-coins?sign=' + that.data.sign + '&v=1.1',
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res)
        var coins = res.data.data.coins;
        var topIndex = res.data.data.topIndex;
        that.setData({
          coins: coins,
          topIndex: topIndex
        })
      }
    });
  },
  // 弹窗
  helpCoins: function() {
    var that = this;
    that.setData({
      helpWin: true
    })
  },

  close_help: function() {
    var that = this;
    that.setData({
      helpWin: false
    })
  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示
  },
  // 返回首页
  backHome: function() {
    common.backHome();
  },

  // 分享海报
  toShare: function() {
    common.toShare();
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  }
})
