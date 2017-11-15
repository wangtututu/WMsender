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
 * Created by Saco on 16/5/13.
 */
var DropDownListItem = (function (_super) {
    __extends(DropDownListItem, _super);
    function DropDownListItem() {
        var _this = _super.call(this) || this;
        _this.initDisplay();
        return _this;
    }
    DropDownListItem.prototype.initDisplay = function () {
        this.left = 0;
        this.right = 0;
        this.height = 30;
        this.stroke = 1;
        this.size = 20;
        this.verticalAlign = "middle";
        this.textAlign = "center";
    };
    Object.defineProperty(DropDownListItem.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (data) {
            this._data = data;
            this.dataChanged();
        },
        enumerable: true,
        configurable: true
    });
    DropDownListItem.prototype.dataChanged = function () {
        this.text = this._data.label;
    };
    return DropDownListItem;
}(eui.Label));
__reflect(DropDownListItem.prototype, "DropDownListItem", ["eui.IItemRenderer", "eui.UIComponent", "egret.DisplayObject"]);
