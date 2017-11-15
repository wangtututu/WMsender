var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by Saco at 2016/11/24
 **/
var Dialogue = (function () {
    function Dialogue() {
    }
    Dialogue.prototype.regConfirm = function (view) {
        this._confirm = view;
    };
    Dialogue.prototype.regDialogue = function (view) {
        this._dialogue = view;
    };
    Dialogue.prototype.confirm = function (title, txt) {
        this._confirm["openView"](arguments);
    };
    Dialogue.prototype.dialogue = function (title, txt, confirmCall, cancelCall, callObj) {
        this._dialogue["openView"](arguments);
    };
    return Dialogue;
}());
__reflect(Dialogue.prototype, "Dialogue");
