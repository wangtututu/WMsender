// TypeScript file
/**
* Created by moitech
**/
class DetailItem extends eui.ItemRenderer {
    private lName: eui.Label;
	private lNum: eui.Label;
	private lPrice: eui.Label;
	
    public constructor() {
        super();
        this.skinName = DetailItemSkin;
    }

    public childrenCreated(): void {

    }

    public dataChanged(): void {
        this.lName.text = this.data.name;
        this.lNum.text = this.data.num;
        this.lPrice.text = this.data.price;
    }

}