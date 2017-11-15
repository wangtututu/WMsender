var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by Saco at 2016/9/1
 **/
var SimpleLoading = (function () {
    function SimpleLoading() {
    }
    SimpleLoading.i = function () {
        if (!this._instance) {
            this._instance = new SimpleLoading();
        }
        return this._instance;
    };
    SimpleLoading.prototype.showLoading = function () {
    };
    SimpleLoading.prototype.hideLoading = function () {
    };
    SimpleLoading.prototype.setProgress = function (value) {
    };
    return SimpleLoading;
}());
__reflect(SimpleLoading.prototype, "SimpleLoading");
