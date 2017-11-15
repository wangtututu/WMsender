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
var MainUI = (function (_super) {
    __extends(MainUI, _super);
    function MainUI() {
        var _this = _super.call(this) || this;
        _this.TabArr = [_this.rTab1, _this.rTab2, _this.rTab3, _this.lTab1, _this.lTab2, _this.lTab3];
        return _this;
    }
    MainUI.prototype.onInit = function () {
        this.gRenwuBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTab1, this);
        this.gQuhuoBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTab2, this);
        this.gSongdaBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTab3, this);
        this.iMenuBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMenu, this);
        this.iRefreshBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRefresh, this);
        this.RenwuList.itemRenderer = MainUIItem;
    };
    MainUI.prototype.onOpen = function (para) {
        this.onTab1();
        this.rMask.visible = false;
    };
    MainUI.prototype.onTab1 = function () {
        this._index = 0;
        this.onTabChange(this._index);
        var data = RES.getRes("data_json");
        //console.log(data)
        this.RenwuList.dataProvider = new eui.ArrayCollection(data);
    };
    MainUI.prototype.onTab2 = function () {
        this._index = 1;
        this.onTabChange(this._index);
    };
    MainUI.prototype.onTab3 = function () {
        this._index = 2;
        this.onTabChange(this._index);
    };
    MainUI.prototype.onTabChange = function (index) {
        for (var i = 0; i < 3; i++) {
            this.TabArr[i].visible = false;
            this.TabArr[i + 3].textColor = 0xCCCCCC;
        }
        this.TabArr[index].visible = true;
        this.TabArr[index + 3].textColor = 0xFFFFFF;
    };
    MainUI.prototype.onMenu = function () {
        Consts.MASK = true;
        this.rMask.visible = true;
        Api.ViewManager.openView(MenuUI);
    };
    MainUI.prototype.onRefresh = function () {
    };
    return MainUI;
}(BaseView));
__reflect(MainUI.prototype, "MainUI");
