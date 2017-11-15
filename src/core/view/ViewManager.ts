/**
 * Created by Saco on 16/3/14.
 */
class ViewManager {
    private _views: any;
    private backBlack: eui.Rect;

    public constructor() {
        this._views = Object.create(null);
    }

    public openView(view: any, param: any = null): void {
        if (!this._views[egret.getQualifiedClassName(view)]) {
            this._views[egret.getQualifiedClassName(view)] = new view();
        }
        var view = this._views[egret.getQualifiedClassName(view)];
        view.openView(param);
    }

    public openViewAndClose(view: any, closeView: any, param?): void {
        if (!this._views[egret.getQualifiedClassName(view)]) {
            this._views[egret.getQualifiedClassName(view)] = new view();
        }
        var view = this._views[egret.getQualifiedClassName(view)];
        view.closeHookView = closeView;
        view.openView(param);
    }

    public getView(view: any): any {
        return this._views[egret.getQualifiedClassName(view)];
    }

    public closeView(view: any): void {
        if (this._views[egret.getQualifiedClassName(view)]) {
            this._views[egret.getQualifiedClassName(view)].close();
        }
    }

    public closeViewsByLayer(layer: string) {
        var thisLayer = Api.Layers.getLayer(layer);
        while (thisLayer.numChildren > 0) {
            var child: BaseView = <BaseView>thisLayer.getChildAt(0);
            child.close();
        }
    }

    public closeAll(view?: BaseView): void {
        var layers = Api.Layers.getLayers();
        for (var key in layers) {
            var numChild = layers[key].numChildren - 1;
            while (numChild >= 0) {
                var child: any = layers[key].getChildAt(numChild);
                numChild--;
                if (child == view) continue;
                if (child instanceof BaseView) {
                    child.close();
                } else {
                    child.parent.removeChild(child);
                }
            }
        }
    }
}
