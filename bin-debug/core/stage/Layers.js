var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by Saco on 2014/11/20.
 */
var Layers = (function () {
    function Layers(stage) {
        this.init(stage);
    }
    /*
    * stage:游戏文档类初始化，传入游戏stage
    * */
    Layers.prototype.init = function (stage) {
        if (this._layers)
            return;
        this._layers = {};
        this.addLayer(this._layers, LayerType.BACKGROUND, stage);
        this.addLayer(this._layers, LayerType.GAME, stage);
        this.addLayer(this._layers, LayerType.UI_BOTTOM, stage);
        this.addLayer(this._layers, LayerType.UI, stage);
        this.addLayer(this._layers, LayerType.UI_TOP, stage);
        this.addLayer(this._layers, LayerType.TIPS, stage);
        this.addLayer(this._layers, LayerType.GUIDE, stage);
        this.addLayer(this._layers, LayerType.ALERT, stage);
        this.resizeLayer();
    };
    Layers.prototype.addLayer = function (layers, type, stage) {
        var layer = new eui.Group();
        layer.touchEnabled = false;
        layers[type] = layer;
        stage.addChild(layer);
    };
    Layers.prototype.resizeLayer = function () {
        for (var key in this._layers) {
            this._layers[key].width = Api.StageUtil.stageWidth;
            this._layers[key].height = Api.StageUtil.stageHeight;
        }
    };
    /*
    * type : 取值于LayerType
    * 获取目标层
    * */
    Layers.prototype.getLayer = function (type) {
        return this._layers[type];
    };
    /**
     * 获取所有显示层级
     * @returns {any}
     */
    Layers.prototype.getLayers = function () {
        return this._layers;
    };
    return Layers;
}());
__reflect(Layers.prototype, "Layers");
