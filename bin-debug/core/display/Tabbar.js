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
 * Created by Saco on 16/3/26.
 */
var Tabbar = (function (_super) {
    __extends(Tabbar, _super);
    function Tabbar() {
        var _this = _super.call(this) || this;
        _this._btnMargin = 2;
        // this._tabButtonWidth = 150;
        _this._contentContainer = new egret.DisplayObjectContainer();
        _this._contentPos = new egret.Point(0, 0);
        _this._content = new Dict();
        _this._tabButton = new Dict();
        _this._adaption = new Dict();
        _this.touchEnabled = true;
        _this.addChild(_this._contentContainer);
        _this.setButtonSkin("union-button2", "union-button2-a");
        return _this;
    }
    Tabbar.prototype.setButtonSkin = function () {
        var para = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            para[_i] = arguments[_i];
        }
        this._buttonSkins = arguments;
    };
    /**
     *
     * @param index
     * @param content DisplayObject
     * @param btnLabel
     * @param adaption 设置内容区域显示适配
     */
    Tabbar.prototype.setContent = function (index, content, btnLabel, adaption, data) {
        if (adaption === void 0) { adaption = Tabbar.ADAPTION_SHOW_ALL; }
        if (data === void 0) { data = null; }
        this.pushTabData(btnLabel, content, adaption, index, data);
        this.invalidateTabbar();
    };
    Tabbar.prototype.pushTabData = function (label, content, adaption, index, data) {
        if (adaption === void 0) { adaption = Tabbar.ADAPTION_SHOW_ALL; }
        if (index === void 0) { index = -1; }
        if (data === void 0) { data = null; }
        var btn;
        if (this._tabButton[index]) {
            btn = this._tabButton[index];
        }
        else {
            btn = new TabbarButton();
            btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.updateSelectIndex, this);
        }
        btn.data = data;
        btn.setBtnSkin(this._buttonSkins[0], this._buttonSkins[1]);
        btn.setLabelDisplay(label);
        if (index == -1) {
            index = Object.keys(this._tabButton).length;
        }
        if (content && content.parent) {
            content.parent.removeChild(content);
        }
        this._tabButton[index] = btn;
        this._content[index] = content;
        this._adaption[index] = adaption;
    };
    Object.defineProperty(Tabbar.prototype, "dataProvider", {
        get: function () {
            return this._dataProvider;
        },
        set: function (data) {
            var _this = this;
            this.reset();
            this._dataProvider = data;
            this._dataProvider.forEach(function (btnData) {
                _this.pushTabData(btnData.label, btnData.content, btnData.adaption, -1, btnData.data);
            }, this);
            this.invalidateTabbar();
        },
        enumerable: true,
        configurable: true
    });
    Tabbar.prototype.updateButtonDisplay = function () {
        if (!this._validateProp)
            return;
        var keys = Object.keys(this._tabButton);
        var tempX = 0;
        for (var i = 0, len = keys.length; i < len; i++) {
            this._tabButton[keys[i]].x = tempX + this._btnMargin * i;
            if (!this._tabButtonWidth) {
                this._tabButton[keys[i]].width = this._tabButton[keys[i]].label.textWidth + 40;
            }
            else {
                this._tabButton[keys[i]].width = this._tabButtonWidth;
            }
            tempX += this._tabButton[keys[i]].width;
            this.addChildAt(this._tabButton[keys[i]], 0);
            if (this._content[keys[i]]) {
                this.setContentAdaption(this._content[keys[i]], this._adaption[keys[i]]);
            }
        }
        this._validateProp = false;
        this.setContentPos(this._contentPos.x, this._contentPos.y);
        if (!this._selectIndex) {
            this.selectedIndex = 0;
        }
    };
    Tabbar.prototype.invalidateTabbar = function () {
        this._validateProp = true;
        egret.callLater(this.updateButtonDisplay, this);
    };
    Object.defineProperty(Tabbar.prototype, "btnMargin", {
        get: function () {
            return this._btnMargin;
        },
        set: function (value) {
            this._btnMargin = value;
            if (Object.keys(this._tabButton).length > 0) {
                this.invalidateTabbar();
            }
        },
        enumerable: true,
        configurable: true
    });
    //设置内容区域坐标位置
    Tabbar.prototype.setContentPos = function (posX, posY) {
        this._contentPos.x = posX;
        this._contentPos.y = posY;
        this._contentContainer.x = this._contentPos.x;
        this._contentContainer.y = this._contentPos.y;
        if (this._tabButton[0]) {
            if (!this._tabButton[0].height) {
                this._tabButton[0].validateNow();
            }
            this._contentContainer.y += this._tabButton[0].height;
        }
    };
    //设置内容区域尺寸
    Tabbar.prototype.setContentSize = function (width, height) {
        this._contentWidth = width;
        this._contentHeight = height;
        this.invalidateTabbar();
    };
    //设置内容区域显示适配
    Tabbar.prototype.setContentAdaption = function (dis, adaption) {
        if (dis.width <= this._contentWidth && dis.height <= this._contentHeight)
            return;
        var scale;
        if (adaption == Tabbar.ADAPTION_SHOW_ALL) {
            if (dis.width / dis.height > this._contentWidth / this._contentHeight) {
                scale = this._contentWidth / dis.width;
            }
            else {
                scale = this._contentHeight / dis.height;
            }
            dis.scaleX = dis.scaleY = scale;
        }
        else if (adaption == Tabbar.ADAPTION_SCALE) {
            dis.width = this._contentWidth;
            dis.height = this._contentHeight;
        }
        else if (adaption == Tabbar.ADAPTION_SCROLL) {
            if (dis.width / dis.height > this._contentWidth / this._contentHeight) {
                scale = this._contentHeight / dis.height;
            }
            else {
                scale = this._contentWidth / dis.width;
            }
            dis.scaleX = dis.scaleY = scale;
        }
    };
    Tabbar.prototype.checkScroller = function () {
        if (!this._scroller) {
            this._scroller = new eui.Scroller();
            this._scroller.bounces = false;
            this._scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
            this._scroller.width = this._contentWidth;
            this._scroller.height = this._contentHeight;
            var group = new eui.Group();
            this._scroller.viewport = group;
        }
    };
    //设置为0为自动宽度
    Tabbar.prototype.setTabButtonWidth = function (value) {
        this._tabButtonWidth = value;
        this.invalidateTabbar();
    };
    Object.defineProperty(Tabbar.prototype, "selectedIndex", {
        get: function () {
            return this._selectIndex;
        },
        set: function (value) {
            var tabButton = this._tabButton[value];
            if (this._selectIndex == value) {
                tabButton.active();
                return;
            }
            if (this._selectIndex != null) {
                this._tabButton[this._selectIndex].deactive();
            }
            this._selectIndex = value;
            if (this._tabButton[this._selectIndex]) {
                this._tabButton[this._selectIndex].active();
            }
            if (this._content[this._selectIndex]) {
                if (this._content[this.selectedIndex] instanceof egret.DisplayObject) {
                    this.clearContainer();
                    this._content[this._selectIndex].visible = true;
                    if (this._adaption[this._selectIndex] == Tabbar.ADAPTION_SCROLL) {
                        this.checkScroller();
                        this._contentContainer.addChild(this._scroller);
                        this._scroller.viewport.addChild(this._content[this._selectIndex]);
                    }
                    else {
                        this._contentContainer.addChild(this._content[this._selectIndex]);
                    }
                }
                else if (this._content[this.selectedIndex] instanceof Function) {
                    this._content[this.selectedIndex](this.selectedIndex);
                }
            }
            var event = new egret.Event(egret.Event.CHANGE);
            event.data = this._tabButton[this._selectIndex].data;
            this.dispatchEvent(event);
        },
        enumerable: true,
        configurable: true
    });
    Tabbar.prototype.clearContainer = function () {
        this._contentContainer.removeChildren();
        if (this._scroller) {
            this._scroller.viewport.removeChildren();
        }
    };
    Tabbar.prototype.updateSelectIndex = function (e) {
        var keys = Object.keys(this._tabButton);
        for (var i = 0, len = keys.length; i < len; i++) {
            if (this._tabButton[keys[i]] == e.currentTarget) {
                this.selectedIndex = parseInt(keys[i]);
                break;
            }
        }
    };
    Tabbar.prototype.reset = function () {
        var keys = Object.keys(this._tabButton);
        for (var i = 0; i < keys.length; i++) {
            this._tabButton[keys[i]].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.updateSelectIndex, this);
            this.removeChild(this._tabButton[keys[i]]);
        }
        this._contentContainer.removeChildren();
        this._content = new Dict();
        this._tabButton = new Dict();
        this._adaption = new Dict();
    };
    Tabbar.ADAPTION_SHOW_ALL = "show_all";
    Tabbar.ADAPTION_SCROLL = "scroll";
    Tabbar.ADAPTION_SCALE = "scale";
    Tabbar.ADAPTION_NONE = "none";
    return Tabbar;
}(eui.Component));
__reflect(Tabbar.prototype, "Tabbar");
