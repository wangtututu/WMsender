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
var MainUIItem = (function (_super) {
    __extends(MainUIItem, _super);
    function MainUIItem() {
        var _this = _super.call(this) || this;
        _this.skinName = MainUIItemSkin;
        return _this;
    }
    MainUIItem.prototype.childrenCreated = function () {
        this.rMaskBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goDetail, this);
        this.gGetBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGet, this);
    };
    MainUIItem.prototype.dataChanged = function () {
        switch (Consts.TAB_INDEX) {
            case 1:
                this.lDoneTime.text = "建议" + this.data.time + "前到达";
                this.lNumber.text = this.data.num;
                this.lShopLoca.text = this.data.sLoca;
                this.lShopName.text = this.data.sName;
                this.lUserLoca.text = this.data.uLoca;
                this.lDis.text = this.data.dis + "KM";
                break;
            case 2:
                this.lDoneTime.text = "用户已等待" + this.data.time;
                this.lNumber.text = this.data.num;
                this.lShopLoca.text = this.data.sLoca;
                this.lShopName.text = this.data.sName;
                this.lUserLoca.text = this.data.uLoca;
                this.lDis.text = this.data.dis + "KM";
                this.gGetBtn.getChildAt(1)["text"] = "已取货";
                break;
            case 3:
                this.lDoneTime.text = "用户已等待" + this.data.time;
                this.lNumber.text = this.data.num;
                this.lShopLoca.text = this.data.sLoca;
                this.lShopName.text = this.data.sName;
                this.lUserLoca.text = this.data.uLoca;
                this.lDis.text = this.data.dis + "KM";
                this.gGetBtn.getChildAt(1)["text"] = "已送达";
                break;
        }
    };
    MainUIItem.prototype.goDetail = function () {
        console.log("详情");
        Api.ViewManager.openView(Detail, Consts.DATA[0]);
    };
    MainUIItem.prototype.onGet = function () {
        var main = Api.ViewManager.getView(MainUI);
        switch (Consts.TAB_INDEX) {
            case 1:
                console.log("接单");
                main.onTab2();
                break;
            case 2:
                console.log("取货");
                main.onTab3();
                break;
            case 3:
                console.log("送达");
                main.onTab1();
                break;
        }
    };
    return MainUIItem;
}(eui.ItemRenderer));
__reflect(MainUIItem.prototype, "MainUIItem");
