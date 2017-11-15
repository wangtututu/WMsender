var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by Saco at 2017/01/24
 **/
var WXShare = (function () {
    function WXShare() {
    }
    WXShare.initShare = function (data) {
        var wx = window["wx"];
        if (!wx) {
            return;
        }
        wx.config({
            debug: false,
            appId: data.AppID,
            timestamp: data.TimeStamp,
            nonceStr: data.Noncestr,
            signature: data.Sign,
            jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "onMenuShareQZone"]
        });
        wx.ready(function () {
            WXShare.share();
        });
    };
    WXShare.share = function () {
        var wx = window["wx"];
        if (!wx) {
            return;
        }
        wx.onMenuShareTimeline({
            title: WXShare.ShareTitle,
            link: WXShare.ShareLink,
            imgUrl: WXShare.ShareIcon,
            success: function () {
                EventCenter.dispatchWith("shareDone");
            },
            cancel: function () {
            }
        });
        wx.onMenuShareAppMessage({
            title: WXShare.ShareTitle,
            desc: WXShare.ShareContent,
            link: WXShare.ShareLink,
            imgUrl: WXShare.ShareIcon,
            type: '',
            dataUrl: '',
            success: function () {
                EventCenter.dispatchWith("shareDone");
            },
            cancel: function () {
            }
        });
        wx.onMenuShareQQ({
            title: WXShare.ShareTitle,
            desc: WXShare.ShareContent,
            link: WXShare.ShareLink,
            imgUrl: WXShare.ShareIcon,
            success: function () {
                EventCenter.dispatchWith("shareDone");
            },
            cancel: function () {
            }
        });
        wx.onMenuShareWeibo({
            title: WXShare.ShareTitle,
            desc: WXShare.ShareContent,
            link: WXShare.ShareLink,
            imgUrl: WXShare.ShareIcon,
            success: function () {
                EventCenter.dispatchWith("shareDone");
            },
            cancel: function () {
            }
        });
        wx.onMenuShareQZone({
            title: WXShare.ShareTitle,
            desc: WXShare.ShareContent,
            link: WXShare.ShareLink,
            imgUrl: WXShare.ShareIcon,
            success: function () {
                EventCenter.dispatchWith("shareDone");
            },
            cancel: function () {
            }
        });
    };
    WXShare.ShareTitle = "是男人就下100层";
    WXShare.ShareContent = "[食品供应链] 炎炎夏日\"冻\"起来，挑战游戏，Iphone 7送给你！";
    WXShare.ShareIcon = "http://xyfy.egret-labs.org/100level/icon.jpg";
    WXShare.ShareLink = "http://xyfy.egret-labs.org/100level/index3.html";
    return WXShare;
}());
__reflect(WXShare.prototype, "WXShare");
