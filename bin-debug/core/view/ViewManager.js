var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by Saco on 16/3/14.
 */
var ViewManager = (function () {
    function ViewManager() {
        this._views = Object.create(null);
    }
    ViewManager.prototype.openView = function (view, param) {
        if (param === void 0) { param = null; }
        if (!this._views[egret.getQualifiedClassName(view)]) {
            this._views[egret.getQualifiedClassName(view)] = new view();
        }
        var view = this._views[egret.getQualifiedClassName(view)];
        view.openView(param);
    };
    ViewManager.prototype.openViewAndClose = function (view, closeView, param) {
        if (!this._views[egret.getQualifiedClassName(view)]) {
            this._views[egret.getQualifiedClassName(view)] = new view();
        }
        var view = this._views[egret.getQualifiedClassName(view)];
        view.closeHookView = closeView;
        view.openView(param);
    };
    ViewManager.prototype.getView = function (view) {
        return this._views[egret.getQualifiedClassName(view)];
    };
    ViewManager.prototype.closeView = function (view) {
        if (this._views[egret.getQualifiedClassName(view)]) {
            this._views[egret.getQualifiedClassName(view)].close();
        }
    };
    ViewManager.prototype.closeViewsByLayer = function (layer) {
        var thisLayer = Api.Layers.getLayer(layer);
        while (thisLayer.numChildren > 0) {
            var child = thisLayer.getChildAt(0);
            child.close();
        }
    };
    ViewManager.prototype.closeAll = function (view) {
        var layers = Api.Layers.getLayers();
        for (var key in layers) {
            var numChild = layers[key].numChildren - 1;
            while (numChild >= 0) {
                var child = layers[key].getChildAt(numChild);
                numChild--;
                if (child == view)
                    continue;
                if (child instanceof BaseView) {
                    child.close();
                }
                else {
                    child.parent.removeChild(child);
                }
            }
        }
    };
    return ViewManager;
}());
__reflect(ViewManager.prototype, "ViewManager");
