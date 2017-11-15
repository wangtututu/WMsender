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
var Detail = (function (_super) {
    __extends(Detail, _super);
    function Detail() {
        var _this = _super.call(this) || this;
        _this.list.itemRenderer = DetailItem;
        return _this;
    }
    Detail.prototype.onInit = function () {
        this.iReturn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReturn, this);
        this.gGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGet, this);
        this.gSend.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSend, this);
    };
    Detail.prototype.onOpen = function (para) {
        this.data = para;
        this.getMsg();
    };
    Detail.prototype.getMsg = function () {
        this.lShopName.text = this.data.ShopName;
        this.lShopAddr.text = this.data.ShopAddr;
        this.lShopPhone.text = this.data.ShopPhone;
        this.lPerAddr.text = this.data.PerAddr;
        this.lPerName.text = this.data.PerName;
        this.lPerPhone.text = this.data.PerPhone;
        this.lDesc.text = this.data.Desc;
        this.lAllPrice.text = "￥" + this.data.AllPrice;
        this.setTime();
        var _data = [{
                "name": "餐盒费",
                "num": "x" + this.data.Canhe_num,
                "price": "￥" + this.data.Canhe_price
            }, {
                "name": this.data.Dish_name,
                "num": "x" + this.data.Dish_num,
                "price": "￥" + this.data.Dish_price
            }, {
                "name": "配送费",
                "num": "",
                "price": "￥" + this.data.Peisong
            }, {
                "name": "餐具数量",
                "num": "",
                "price": this.data.canju
            }];
        this.list.dataProvider = new eui.ArrayCollection(_data);
    };
    Detail.prototype.setTime = function () {
        var time = new Date();
        time.setTime(this.data.Time * 1000);
        var year = time.getFullYear();
        var mouth = time.getMonth() + 1;
        var day = time.getDate();
        var hour = time.getHours();
        var min = time.getMinutes();
        var sec = time.getSeconds();
        var timeText = year + "/" + mouth + "/" + day + "   " + hour + " : " + min + " : " + sec;
        this.lTime.text = timeText;
    };
    Detail.prototype.onGet = function () {
        console.log("已取货");
    };
    Detail.prototype.onSend = function () {
        console.log("已送达");
    };
    Detail.prototype.onReturn = function () {
        Api.ViewManager.closeView(Detail);
    };
    Detail.prototype.onClear = function () {
        this.lState.text = null;
        this.lShopName.text = null;
        this.lShopAddr.text = null;
        this.lShopPhone.text = null;
        this.lPerAddr.text = null;
        this.lPerName.text = null;
        this.lPerPhone.text = null;
        this.lAllPrice.text = null;
        this.lDesc.text = null;
        this.lTime.text = null;
    };
    return Detail;
}(BaseView));
__reflect(Detail.prototype, "Detail");
