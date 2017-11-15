/**
 * Created by Saco at 2017/01/24
 **/
class WXShare {
    public static ShareTitle = "是男人就下100层";
    public static ShareContent = "[食品供应链] 炎炎夏日\"冻\"起来，挑战游戏，Iphone 7送给你！";
    public static ShareIcon = "http://xyfy.egret-labs.org/100level/icon.jpg";
    public static ShareLink = "http://xyfy.egret-labs.org/100level/index3.html";
    public static initShare(data): void {
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

        wx.ready(function() {
            WXShare.share();
        })
    }

    public static share(): void {
        var wx = window["wx"];
        if (!wx) {
            return;
        }
        wx.onMenuShareTimeline({
            title: WXShare.ShareTitle,
            link: WXShare.ShareLink,
            imgUrl: WXShare.ShareIcon,
            success: function() {
                EventCenter.dispatchWith("shareDone");
            },
            cancel: function() {
            }
        });

        wx.onMenuShareAppMessage({
            title: WXShare.ShareTitle,
            desc: WXShare.ShareContent,
            link: WXShare.ShareLink,
            imgUrl: WXShare.ShareIcon,
            type: '',
            dataUrl: '',
            success: function() {
                EventCenter.dispatchWith("shareDone");
            },
            cancel: function() {
            }
        });

        wx.onMenuShareQQ({
            title: WXShare.ShareTitle,
            desc: WXShare.ShareContent,
            link: WXShare.ShareLink,
            imgUrl: WXShare.ShareIcon,
            success: function() {
                EventCenter.dispatchWith("shareDone");
            },
            cancel: function() {
            }
        });

        wx.onMenuShareWeibo({
            title: WXShare.ShareTitle,
            desc: WXShare.ShareContent,
            link: WXShare.ShareLink,
            imgUrl: WXShare.ShareIcon,
            success: function() {
                EventCenter.dispatchWith("shareDone");
            },
            cancel: function() {
            }
        });

        wx.onMenuShareQZone({
            title: WXShare.ShareTitle,
            desc: WXShare.ShareContent,
            link: WXShare.ShareLink,
            imgUrl: WXShare.ShareIcon,
            success: function() {
                EventCenter.dispatchWith("shareDone");
            },
            cancel: function() {
            }
        });
    }
}
