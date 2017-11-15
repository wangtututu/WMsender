var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by Saco on 16/3/14.
 */
var BaseModule = (function () {
    function BaseModule() {
    }
    BaseModule.prototype.regMsgListener = function (msg, listener) {
        Api["MessageCenter"].regMsgListener(msg, listener, this);
    };
    BaseModule.prototype.sendMsg = function (msg) {
        Api["GameSocket"].sendMsg(msg);
    };
    return BaseModule;
}());
__reflect(BaseModule.prototype, "BaseModule");
