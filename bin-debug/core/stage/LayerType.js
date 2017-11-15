var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by Saco on 2014/11/20.
 */
var LayerType = (function () {
    function LayerType() {
    }
    /*警告层*/
    LayerType.ALERT = "alert";
    /*引导层*/
    LayerType.GUIDE = "guide";
    /*提示层*/
    LayerType.TIPS = "tips";
    /*UI上层*/
    LayerType.UI_TOP = "ui_top";
    /*UI层*/
    LayerType.UI = "ui";
    /*UI底层*/
    LayerType.UI_BOTTOM = "ui_bottom";
    /*游戏层*/
    LayerType.GAME = "game";
    /*背景层*/
    LayerType.BACKGROUND = "background";
    return LayerType;
}());
__reflect(LayerType.prototype, "LayerType");
