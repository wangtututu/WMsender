/**
 * Created by Saco at 2016/12/ 4
 **/
class BasePopView extends BaseView {
    protected _scaleEffect = true;
    protected _needBg = true;
    public constructor() {
        super();
        this.openLayer = LayerType.UI_TOP;
    }

    protected setSize(): void {
    }
}
