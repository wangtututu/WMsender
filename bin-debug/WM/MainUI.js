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
    };
    MainUI.prototype.onTab1 = function () {
        Consts.TAB_INDEX = 1;
        this.onTabChange(Consts.TAB_INDEX);
        var data = RES.getRes("data_json");
        //console.log(data)
        this.RenwuList.dataProvider = new eui.ArrayCollection(data);
    };
    MainUI.prototype.onTab2 = function () {
        Consts.TAB_INDEX = 2;
        this.onTabChange(Consts.TAB_INDEX);
        var data = RES.getRes("data_json");
        //console.log(data)
        this.RenwuList.dataProvider = new eui.ArrayCollection(data);
    };
    MainUI.prototype.onTab3 = function () {
        Consts.TAB_INDEX = 3;
        this.onTabChange(Consts.TAB_INDEX);
        var data = RES.getRes("data_json");
        //console.log(data)
        this.RenwuList.dataProvider = new eui.ArrayCollection(data);
    };
    MainUI.prototype.onTabChange = function (index) {
        for (var i = 1; i < 4; i++) {
            this.TabArr[i - 1].visible = false;
            this.TabArr[i + 2].textcolor = 0xCCCCCC;
        }
        this.TabArr[index - 1].visible = true;
        this.TabArr[index + 2].textcolor = 0xFFFFFF;
    };
    MainUI.prototype.onMenu = function () {
        Api.ViewManager.openView(MenuUI);
    };
    MainUI.prototype.onRefresh = function () {
        switch (Consts.TAB_INDEX) {
            case 1:
                this.onTab1();
                console.log("刷新1");
                ;
                break;
            case 2:
                this.onTab2();
                console.log("刷新2");
                ;
                break;
            case 3:
                this.onTab3();
                console.log("刷新3");
                ;
                break;
        }
    };
    return MainUI;
}(BaseView));
__reflect(MainUI.prototype, "MainUI");
