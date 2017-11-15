var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by Saco on 16/3/14.
 */
var Lang = (function () {
    function Lang() {
    }
    Lang.LANG_CN = "cn";
    Lang.LANG_EN = "en";
    Lang.LANG_TW = "tw";
    return Lang;
}());
__reflect(Lang.prototype, "Lang");
