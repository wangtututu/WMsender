// TypeScript file
/**
* Created by moitech
**/
class MenuUI extends BaseView {

    private lState: eui.Label;
    private iReturnBtn: eui.Image;
    private rDetailMask: eui.Rect;
    private gKaigongBtn: eui.Group;
    private iState1: eui.Image;
    private lState1: eui.Label;
    private gMangluBtn: eui.Group;
    private iState2: eui.Image;
    private lState2: eui.Label;
    private gShougongBtn: eui.Group;
    private iState3: eui.Image;
    private lState3: eui.Label;
    private gDingdanBtn: eui.Group;
    private gShezhiBtn: eui.Group;
    private rBlank:eui.Rect;

    private StateArr: any[] = [this.iState1, this.iState2, this.iState3, this.lState1, this.lState2, this.lState3];
    private imgArr: any[] = ["kaigong1_png", "manglu1_png", "shougong1_png", "kaigong2_png", "manglu2_png", "shougong2_png"];

    public constructor() {
        super();
        this.openLayer = LayerType.UI_TOP;
    }

    public onInit(): void {
        this.gKaigongBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onState1, this);
        this.gMangluBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onState2, this);
        this.gShougongBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onState3, this);
        this.rDetailMask.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goDetail, this);
        this.iReturnBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReturn, this);
        this.rBlank.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onReturn,this);
    }

    public onOpen(para): void {

    }
    private changeState(index: number): void {
        for (var i = 0; i < 3; i++) {
            this.StateArr[i].source = RES.getRes(this.imgArr[i]);
            this.StateArr[i + 3].textColor = 0x8a8a8a;
        }
        this.StateArr[index].source = RES.getRes(this.imgArr[index + 3]);
    }
    private onState1(): void {
        Consts.STATE_INDEX = 0;
        Consts.STATE_NAME = "开工中";
        this.lState.text = Consts.STATE_NAME;
        this.changeState(Consts.STATE_INDEX);
        this.lState1.textColor = 0x1AFA29;
    }
    private onState2(): void {
        Consts.STATE_INDEX = 1;
        Consts.STATE_NAME = "忙碌中";
        this.lState.text = Consts.STATE_NAME;
        this.changeState(Consts.STATE_INDEX);
        this.lState2.textColor = 0xea9518;
    }
    private onState3(): void {
        Consts.STATE_INDEX = 2;
        Consts.STATE_NAME = "收工中";
        this.lState.text = Consts.STATE_NAME;
        this.changeState(Consts.STATE_INDEX);
        this.lState3.textColor = 0xd81e06;
    }
    private goDetail(): void {
        console.log("详情");
    }
    private onReturn(): void {
        var mainUI = Api.ViewManager.getView(MainUI);
        mainUI.lState.text = Consts.STATE_NAME;
        Api.ViewManager.closeView(MenuUI)
    }
}