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
var Button = (function (_super) {
    __extends(Button, _super);
    function Button() {
        var _this = _super.call(this) || this;
        _this._enabled = true;
        _this.initEvent();
        return _this;
        // this.skinName = "resource/skins/component/SimpleButtonSkin.exml";
    }
    Button.prototype.initEvent = function () {
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
    };
    Button.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this._isInited = true;
        if (this._dis) {
            this.setLabelDisplay(this._dis);
        }
    };
    Object.defineProperty(Button.prototype, "buttonWidth", {
        get: function () {
            return this._btnWidth;
        },
        set: function (value) {
            this._btnWidth = value;
            this.width = value;
        },
        enumerable: true,
        configurable: true
    });
    Button.prototype.onTouchEnd = function () {
        if (!this._enabled)
            return;
        if (this._touchBegin) {
            this.dispatchEvent(new egret.TouchEvent(egret.TouchEvent.TOUCH_TAP));
        }
        this._touchBegin = false;
        this.currentState = ButtonState.UP;
    };
    Button.prototype.onTouchBegin = function () {
        if (!this._enabled)
            return;
        this._touchBegin = true;
        this.currentState = ButtonState.DOWN;
    };
    Object.defineProperty(Button.prototype, "enabled", {
        get: function () {
            return this._enabled;
        },
        set: function (value) {
            this._enabled = value;
            if (value) {
                this.currentState = ButtonState.UP;
            }
            else {
                this.currentState = ButtonState.DISABLE;
            }
        },
        enumerable: true,
        configurable: true
    });
    Button.prototype.setBtnSkin = function (upState, downState, disableState) {
        this.up.source = upState;
        if (downState) {
            this.down.source = downState;
        }
        else {
            this.down.source = upState;
        }
        if (disableState) {
            this.disable.source = disableState;
        }
        else {
            this.disable.source = upState;
        }
    };
    Button.prototype.setLabelDisplay = function (dis) {
        if (!this._isInited) {
            this._dis = dis;
            return;
        }
        if (typeof dis == "string") {
            this.labelDisplay.text = dis;
        }
        else {
            this._labelDis = dis;
            this.addChild(this._labelDis);
            this.labelDisplay.visible = false;
        }
    };
    return Button;
}(eui.Component));
__reflect(Button.prototype, "Button");
