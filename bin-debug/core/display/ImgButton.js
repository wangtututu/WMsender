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
 * Created by Saco on 2014/12/19.
 */
var ImgButton = (function (_super) {
    __extends(ImgButton, _super);
    function ImgButton() {
        var _this = _super.call(this) || this;
        _this.init();
        _this.touchEnabled = true;
        _this.touchChildren = true;
        _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onTouchBegin, _this);
        _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.onTouchEnd, _this);
        return _this;
    }
    ImgButton.prototype.onTouchBegin = function () {
        if (this._resArr[1])
            this._btn.texture = this._resArr[1];
    };
    ImgButton.prototype.onTouchEnd = function () {
        if (this._resArr[0])
            this._btn.texture = this._resArr[0];
    };
    ImgButton.prototype.init = function () {
        this._btn = new egret.Bitmap();
        this._label = new egret.TextField();
        this._label.size = 28;
        this._label.fontFamily = "黑体";
        this._label.textColor = 0xffffff;
        this._label.textAlign = "center";
        this._label.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._label.x = 25;
        this._labelImg = new egret.Bitmap();
        this.addChild(this._btn);
        this.addChild(this._labelImg);
        this.addChild(this._label);
    };
    ImgButton.prototype.initRes = function (up, down, label, labelImg) {
        this._resArr = [RES.getRes(up), RES.getRes(down)];
        this._btn.texture = this._resArr[0];
        if (label) {
            this.setLable(label);
        }
        if (labelImg) {
            this._labelImg.x = this._btn.width / 2;
            this._labelImg.y = this._btn.height / 2;
            this._labelImg.texture = RES.getRes(labelImg);
        }
    };
    ImgButton.prototype.setLable = function (label) {
        this._label.width = this._btn.width - 50;
        this._label.height = this._btn.height;
        this._label.text = label;
    };
    ImgButton.prototype.setImgLabel = function (label) {
        this._labelImg.texture = RES.getRes(label);
        this._labelImg.x = this._btn.width / 2;
        this._labelImg.y = this._btn.height / 2;
    };
    return ImgButton;
}(egret.DisplayObjectContainer));
__reflect(ImgButton.prototype, "ImgButton");
