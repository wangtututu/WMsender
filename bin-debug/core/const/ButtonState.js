var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by Saco on 16/4/1.
 */
var ButtonState = (function () {
    function ButtonState() {
    }
    ButtonState.UP = "up";
    ButtonState.DOWN = "down";
    ButtonState.DISABLE = "disable";
    ButtonState.DOWNANDSELECTED = "downAndSelected";
    return ButtonState;
}());
__reflect(ButtonState.prototype, "ButtonState");
