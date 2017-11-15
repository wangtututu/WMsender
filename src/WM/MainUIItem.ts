// TypeScript file
/**
* Created by moitech
**/
class MainUIItem extends eui.ItemRenderer {
    private lDoneTime: eui.Label;
    private lNumber: eui.Label;
    private lShopName: eui.Label;
    private lShopLoca: eui.Label;
    private lUserLoca: eui.Label;
    private iDetailBtn: eui.Image;
    private lDis: eui.Label;
    private gGetBtn: eui.Group;
    private rMaskBtn: eui.Rect;

    public constructor() {
        super();
        this.skinName = MainUIItemSkin;
    }

    public childrenCreated(): void {
        this.rMaskBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goDetail, this);
        this.gGetBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGet, this)
    }

    public dataChanged(): void {
        switch (Consts.TAB_INDEX) {
            case 1: this.lDoneTime.text = "建议" + this.data.time + "前到达";
                this.lNumber.text = this.data.num;
                this.lShopLoca.text = this.data.sLoca;
                this.lShopName.text = this.data.sName;
                this.lUserLoca.text = this.data.uLoca;
                this.lDis.text = this.data.dis + "KM";
                break;
            case 2: this.lDoneTime.text = "用户已等待" + this.data.time;
                this.lNumber.text = this.data.num;
                this.lShopLoca.text = this.data.sLoca;
                this.lShopName.text = this.data.sName;
                this.lUserLoca.text = this.data.uLoca;
                this.lDis.text = this.data.dis + "KM";
                this.gGetBtn.getChildAt(1)["text"] = "已取货";
                break;
            case 3: this.lDoneTime.text = "用户已等待" + this.data.time;
                this.lNumber.text = this.data.num;
                this.lShopLoca.text = this.data.sLoca;
                this.lShopName.text = this.data.sName;
                this.lUserLoca.text = this.data.uLoca;
                this.lDis.text = this.data.dis + "KM";
                this.gGetBtn.getChildAt(1)["text"] = "已送达";
                break;
        }

    }

    private goDetail(): void {
        console.log("详情");
        Api.ViewManager.openView(Detail, Consts.DATA[0]);
    }
    private onGet(): void {
        var main = Api.ViewManager.getView(MainUI)
        switch(Consts.TAB_INDEX){
            case 1:console.log("接单");main.onTab2();break;
            case 2:console.log("取货");main.onTab3();break;
            case 3:console.log("送达");main.onTab1();break;
        }
        
        
    }
}