var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by Saco on 16/3/23.
 */
var Dict = (function () {
    function Dict() {
        return Object.create(null);
    }
    return Dict;
}());
__reflect(Dict.prototype, "Dict");
