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
    private rMaskBtn:eui.Rect;
	
    public constructor() {
        super();
        this.skinName = MainUIItemSkin;
    }

    public childrenCreated(): void {
        this.rMaskBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.goDetail,this);
        this.gGetBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onGet,this)
    }

    public dataChanged(): void {
        this.lDoneTime.text = "建议"+this.data.time+"前到达";
        this.lNumber.text = this.data.num;
        this.lShopLoca.text = this.data.sLoca;
        this.lShopName.text = this.data.sName;
        this.lUserLoca.text = this.data.uLoca;
        this.lDis.text = this.data.dis + "KM";
    }

private goDetail():void{
    console.log("详情");
}
private onGet():void{
    console.log("接单");
}
}