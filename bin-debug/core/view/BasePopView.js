var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Created by Saco at 2016/12/ 4
 **/
var BasePopView = (function (_super) {
    __extends(BasePopView, _super);
    function BasePopView() {
        var _this = _super.call(this) || this;
        _this._scaleEffect = true;
        _this._needBg = true;
        _this.openLayer = LayerType.UI_TOP;
        return _this;
    }
    BasePopView.prototype.setSize = function () {
    };
    return BasePopView;
}(BaseView));
__reflect(BasePopView.prototype, "BasePopView");
