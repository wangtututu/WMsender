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
var MenuUI = (function (_super) {
    __extends(MenuUI, _super);
    function MenuUI() {
        var _this = _super.call(this) || this;
        _this.StateArr = [_this.iState1, _this.iState2, _this.iState3, _this.lState1, _this.lState2, _this.lState3];
        _this.imgArr = ["kaigong1_png", "manglu1_png", "shougong1_png", "kaigong2_png", "manglu2_png", "shougong2_png"];
        _this.openLayer = LayerType.UI_TOP;
        return _this;
    }
    MenuUI.prototype.onInit = function () {
        this.gKaigongBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onState1, this);
        this.gMangluBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onState2, this);
        this.gShougongBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onState3, this);
        this.rDetailMask.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goDetail, this);
        this.iReturnBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReturn, this);
        this.rBlank.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReturn, this);
    };
    MenuUI.prototype.onOpen = function (para) {
    };
    MenuUI.prototype.changeState = function (index) {
        for (var i = 0; i < 3; i++) {
            this.StateArr[i].source = RES.getRes(this.imgArr[i]);
            this.StateArr[i + 3].textColor = 0x8a8a8a;
        }
        this.StateArr[index].source = RES.getRes(this.imgArr[index + 3]);
    };
    MenuUI.prototype.onState1 = function () {
        Consts.STATE_INDEX = 0;
        Consts.STATE_NAME = "开工中";
        this.lState.text = Consts.STATE_NAME;
        this.changeState(Consts.STATE_INDEX);
        this.lState1.textColor = 0x1AFA29;
    };
    MenuUI.prototype.onState2 = function () {
        Consts.STATE_INDEX = 1;
        Consts.STATE_NAME = "忙碌中";
        this.lState.text = Consts.STATE_NAME;
        this.changeState(Consts.STATE_INDEX);
        this.lState2.textColor = 0xea9518;
    };
    MenuUI.prototype.onState3 = function () {
        Consts.STATE_INDEX = 2;
        Consts.STATE_NAME = "收工中";
        this.lState.text = Consts.STATE_NAME;
        this.changeState(Consts.STATE_INDEX);
        this.lState3.textColor = 0xd81e06;
    };
    MenuUI.prototype.goDetail = function () {
        console.log("详情");
    };
    MenuUI.prototype.onReturn = function () {
        var mainUI = Api.ViewManager.getView(MainUI);
        mainUI.rMask.visible = false;
        mainUI.lState.text = Consts.STATE_NAME;
        Api.ViewManager.closeView(MenuUI);
    };
    return MenuUI;
}(BaseView));
__reflect(MenuUI.prototype, "MenuUI");
