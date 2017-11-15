var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by Saco at 2016/11/22
 **/
var TipsManager = (function () {
    function TipsManager() {
        this._margin = 0;
        this._maxTips = 5;
        this._fadeTime = 1000;
        this._moveDis = 0;
        this._tipsPool = [];
        this._currTips = [];
    }
    TipsManager.prototype.setItemType = function (type) {
        this._itemType = type;
    };
    /**
     * prop:margin/fadeTime/moveDis/maxTips
     */
    TipsManager.prototype.setProp = function (prop) {
        if (prop.margin) {
            this._margin = prop.margin;
        }
        if (prop.fadeTime) {
            this._fadeTime = prop.fadeTime;
        }
        if (prop.moveDis) {
            this._moveDis = prop.moveDis;
        }
        if (prop.maxTips) {
            this._maxTips = prop.maxTips;
        }
    };
    TipsManager.prototype.showTips = function (txt) {
        var tip = this.getTips();
        tip.onShow(txt);
        tip.x = (Api.StageUtil.stageWidth - tip.width) / 2;
        tip.y = (Api.StageUtil.stageHeight - tip.height) / 2;
        if (this._currTips.length) {
            var lastTip = this._currTips[this._currTips.length - 1];
            tip.y = lastTip.y + lastTip.height + this._margin;
        }
        if (this._currTips.length > this._maxTips) {
            this.recycleTip(this._currTips[0]);
        }
        Api.Layers.getLayer(LayerType.TIPS).addChild(tip);
        this._currTips.push(tip);
        this.moveTips(tip);
    };
    TipsManager.prototype.moveTips = function (tip) {
        var tarY = tip.y - this._moveDis;
        egret.Tween.get(tip).to({ y: tarY }, this._fadeTime).call(this.onMoveEnd, this, [tip]);
    };
    TipsManager.prototype.onMoveEnd = function (tip) {
        this.recycleTip(tip);
    };
    //show tips by keys in global text
    TipsManager.prototype.showTipsByKey = function (key) {
        this.showTips(Api.GlobalRes.getText(key));
    };
    TipsManager.prototype.getTips = function () {
        if (this._tipsPool.length) {
            return this._tipsPool.pop();
        }
        var tip = new this._itemType();
        tip.touchEnabled = false;
        return tip;
    };
    TipsManager.prototype.recycleTip = function (tip) {
        this._currTips.shift();
        egret.Tween.removeTweens(tip);
        if (tip.stage) {
            Api.Layers.getLayer(LayerType.TIPS).removeChild(tip);
        }
        this._tipsPool.push(tip);
    };
    return TipsManager;
}());
__reflect(TipsManager.prototype, "TipsManager");
