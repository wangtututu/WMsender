var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Created by HuSong on 2016/5/6.
 */
var TabbarButton = (function (_super) {
    __extends(TabbarButton, _super);
    function TabbarButton() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    TabbarButton.prototype.setBtnSkin = function (upState, downState) {
        this.up.source = upState;
        this.down.source = downState;
    };
    TabbarButton.prototype.setLabelDisplay = function (dis) {
        if (typeof dis == "string") {
            this.label.text = dis;
        }
        else {
            this._labelDis = dis;
            this.addChild(this._labelDis);
            this.label.visible = false;
        }
    };
    TabbarButton.prototype.init = function () {
        this.up = new eui.Image();
        this.down = new eui.Image();
        this.down.visible = false;
        this.addChild(this.up);
        this.addChild(this.down);
        this.label = new eui.Label();
        this.label.verticalCenter = 0;
        this.label.horizontalCenter = 0;
        this.label.size = 26;
        this.label.bold = true;
        this.label.fontFamily = "黑体";
        this.label.textColor = 0xffffff;
        this.label.fontFamily = "SimHei";
        this.fill(this.up);
        this.fill(this.down);
        this.addChild(this.label);
    };
    TabbarButton.prototype.fill = function (com) {
        com.scale9Grid = new egret.Rectangle(23, 24, 60, 26);
        com.top = 0;
        com.bottom = 0;
        com.left = 0;
        com.right = 0;
    };
    TabbarButton.prototype.active = function () {
        this.up.visible = false;
        this.down.visible = true;
        this.label.textColor = 0xfff100;
    };
    TabbarButton.prototype.deactive = function () {
        this.up.visible = true;
        this.down.visible = false;
        this.label.textColor = 0xffffff;
    };
    TabbarButton.prototype.setButtonWidth = function (value) {
        this.width = value;
    };
    return TabbarButton;
}(eui.Group));
__reflect(TabbarButton.prototype, "TabbarButton");
var TabbarButtonData = (function () {
    function TabbarButtonData() {
    }
    return TabbarButtonData;
}());
__reflect(TabbarButtonData.prototype, "TabbarButtonData");
