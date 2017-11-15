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
    private TabArr: any[] = [this.rTab1, this.rTab2, this.rTab3, this.lTab1, this.lTab2, this.lTab3];
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
    }
    private onTab1(): void {
        Consts.TAB_INDEX = 1;
        this.onTabChange(Consts.TAB_INDEX);
        var data = RES.getRes("data_json");
        //console.log(data)
        this.RenwuList.dataProvider = new eui.ArrayCollection(data);
    }
    private onTab2(): void {
        Consts.TAB_INDEX = 2;
        this.onTabChange(Consts.TAB_INDEX);
        var data = RES.getRes("data_json");
        //console.log(data)
        this.RenwuList.dataProvider = new eui.ArrayCollection(data);
    }
    private onTab3(): void {
        Consts.TAB_INDEX = 3;
        this.onTabChange(Consts.TAB_INDEX);
        var data = RES.getRes("data_json");
        //console.log(data)
        this.RenwuList.dataProvider = new eui.ArrayCollection(data);
    }
    private onTabChange(index: number): void {
        for (var i = 1; i < 4; i++) {
            this.TabArr[i-1].visible = false;
            this.TabArr[i + 2].textcolor = 0xCCCCCC;
        }
        this.TabArr[index-1].visible = true;
        this.TabArr[index + 2].textcolor = 0xFFFFFF;
    }

    private onMenu(): void {
        Api.ViewManager.openView(MenuUI);
    }
    private onRefresh(): void {
        switch(Consts.TAB_INDEX){
            case 1:this.onTab1();console.log("刷新1");;break;
            case 2:this.onTab2();console.log("刷新2");;break;
            case 3:this.onTab3();console.log("刷新3");;break;
        }
    }
}