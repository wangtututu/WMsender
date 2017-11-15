// TypeScript file
/**
* Created by moitech
**/
class MainUI extends BaseView {
    private iMenuBtn: eui.Image;
    private iLocationBtn: eui.Image;
    private lState: eui.Label;
    private gRenwuBtn: eui.Group;
    private rTab1: eui.Rect;
    private lTab1: eui.Label;
    private gQuhuoBtn: eui.Group;
    private rTab2: eui.Rect;
    private lTab2: eui.Label;
    private gSongdaBtn: eui.Group;
    private rTab3: eui.Rect;
    private lTab3: eui.Label;
    private sScroller: eui.Scroller;
    private RenwuList: eui.List;
    private iRefreshBtn: eui.Image;
    private rMask: eui.Rect;
    private TabArr: any[] = [this.rTab1, this.rTab2, this.rTab3, this.lTab1, this.lTab2, this.lTab3];
    private _index: number;
    public constructor() {
        super();
    }

    public onInit(): void {
        this.gRenwuBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTab1, this);
        this.gQuhuoBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTab2, this);
        this.gSongdaBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTab3, this);
        this.iMenuBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMenu, this);
        this.iRefreshBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRefresh, this);
        this.RenwuList.itemRenderer = MainUIItem;
    }

    public onOpen(para): void {
        this.onTab1();
        this.rMask.visible = false;
    }
    private onTab1(): void {
        this._index = 0;
        this.onTabChange(this._index);
        var data = RES.getRes("data_json");
        //console.log(data)
        this.RenwuList.dataProvider = new eui.ArrayCollection(data);
    }
    private onTab2(): void {
        this._index = 1;
        this.onTabChange(this._index);
    }
    private onTab3(): void {
        this._index = 2;
        this.onTabChange(this._index);
    }
    private onTabChange(index: number): void {
        for (var i = 0; i < 3; i++) {
            this.TabArr[i].visible = false;
            this.TabArr[i + 3].textColor = 0xCCCCCC;
        }
        this.TabArr[index].visible = true;
        this.TabArr[index + 3].textColor = 0xFFFFFF;
    }

    private onMenu(): void {
        Consts.MASK = true;
        this.rMask.visible = true;
        Api.ViewManager.openView(MenuUI);
    }
    private onRefresh(): void {

    }
}