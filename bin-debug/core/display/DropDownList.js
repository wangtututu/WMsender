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
/**
 * Created by Saco on 16/5/13.
 */
var DropDownList = (function (_super) {
    __extends(DropDownList, _super);
    function DropDownList() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/component/DropDownListSkin.exml";
        return _this;
    }
    DropDownList.prototype.childrenCreated = function () {
        this.dropList.visible = false;
        this.dropDown.touchEnabled = true;
        this.dropScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
        this.dropDown.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showDropDown, this);
        this.itemList.itemRenderer = DropDownListItem;
        this.itemList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onSelectItem, this);
    };
    DropDownList.prototype.onSelectItem = function () {
        this.dropList.visible = false;
        if (this.itemList.selectedIndex == this._lastSelectIndex) {
            return;
        }
        this.updateDisplay();
    };
    DropDownList.prototype.showDropDown = function () {
        this.dropList.visible = !this.dropList.visible;
    };
    DropDownList.prototype.setSelectdIndex = function (value) {
        this.itemList.selectedIndex = value;
        this.onSelectItem();
    };
    DropDownList.prototype.getSelectedIndex = function () {
        return this.itemList.selectedIndex;
    };
    DropDownList.prototype.updateDisplay = function () {
        this._lastSelectIndex = this.itemList.selectedIndex;
        this.selectedItem = this.itemList.selectedItem;
        if (this.itemList.selectedItem) {
            this.selected.text = this.itemList.selectedItem.label;
        }
        else {
            this.selected.text = "";
        }
        this.dispatchEventWith(egret.Event.CHANGE);
    };
    Object.defineProperty(DropDownList.prototype, "dataProvider", {
        get: function () {
            return this._dataProvider;
        },
        set: function (data) {
            this._dataProvider = data;
            this.itemList.dataProvider = this._dataProvider;
            if (data.length > 0) {
                this.itemList.selectedIndex = 0;
            }
            this.updateDisplay();
        },
        enumerable: true,
        configurable: true
    });
    return DropDownList;
}(eui.Component));
__reflect(DropDownList.prototype, "DropDownList");
