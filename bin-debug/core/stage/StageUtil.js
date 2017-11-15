var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by Saco on 16/3/21.
 */
var StageUtil = (function () {
    function StageUtil(stage) {
        this.init(stage);
    }
    StageUtil.prototype.init = function (stage) {
        this.stage = stage;
        this.stageHeight = stage.stageHeight;
        this.stageWidth = stage.stageWidth;
        this.stage.addEventListener(egret.Event.RESIZE, this.resizeStage, this);
    };
    StageUtil.prototype.resizeStage = function () {
        this.stageHeight = this.stage.stageHeight;
        this.stageWidth = this.stage.stageWidth;
        Api.Layers.resizeLayer();
    };
    return StageUtil;
}());
__reflect(StageUtil.prototype, "StageUtil");
