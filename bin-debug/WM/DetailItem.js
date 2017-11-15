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
// TypeScript file
/**
* Created by moitech
**/
var DetailItem = (function (_super) {
    __extends(DetailItem, _super);
    function DetailItem() {
        var _this = _super.call(this) || this;
        _this.skinName = DetailItemSkin;
        return _this;
    }
    DetailItem.prototype.childrenCreated = function () {
    };
    DetailItem.prototype.dataChanged = function () {
        this.lName.text = this.data.name;
        this.lNum.text = this.data.num;
        this.lPrice.text = this.data.price;
    };
    return DetailItem;
}(eui.ItemRenderer));
__reflect(DetailItem.prototype, "DetailItem");
