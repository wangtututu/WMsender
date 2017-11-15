// TypeScript file
/**
* Created by moitech
**/
class Detail extends BaseView {
    private iReturn: eui.Image;
    private lState: eui.Label;
    private lShopName: eui.Label;
    private list: eui.List;
    private lAllPrice: eui.Label;
    private lPerName: eui.Label;
    private lPerPhone: eui.Label;
    private lPerAddr: eui.Label;
    private lShopPhone: eui.Label;
    private lShopAddr: eui.Label;
    private lDesc: eui.Label;
    private lTime: eui.Label;
    private gGet: eui.Group;
    private gSend: eui.Group;
    private data;

    public constructor() {
        super();
        this.list.itemRenderer = DetailItem;
    }

    public onInit(): void {
        this.iReturn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReturn, this);
        this.gGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGet, this);
        this.gSend.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSend, this);
    }

    public onOpen(para): void {
        this.data = para;
        this.getMsg();
    }
    private getMsg(): void {
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
            "name":"餐盒费",
            "num":"x"+this.data.Canhe_num,
            "price":"￥"+this.data.Canhe_price
        },{
           "name":this.data.Dish_name,
            "num":"x"+this.data.Dish_num,
            "price":"￥"+this.data.Dish_price 
        },{
            "name":"配送费",
            "num":"",
            "price":"￥"+this.data.Peisong
        },{
            "name":"餐具数量",
            "num":"",
            "price":this.data.canju
        }]
        this.list.dataProvider = new eui.ArrayCollection(_data);

    }
    private setTime(): void {
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
    }
    private onGet(): void {
        console.log("已取货");
    }
    private onSend(): void {
        console.log("已送达")
    }
    private onReturn(): void {
        Api.ViewManager.closeView(Detail);
    }
    private onClear(): void {
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
    }
}