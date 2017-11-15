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
 * Created by Saco on 16/5/15.
 */
var UnderLineLabel = (function (_super) {
    __extends(UnderLineLabel, _super);
    function UnderLineLabel() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    UnderLineLabel.prototype.init = function () {
        this._label = new egret.TextField();
        this._underLine = new egret.Shape();
        this.addChild(this._label);
        this.addChild(this._underLine);
    };
    Object.defineProperty(UnderLineLabel.prototype, "text", {
        get: function () {
            return this._label.text;
        },
        set: function (value) {
            this._label.text = value;
            this.updateUnderLine();
        },
        enumerable: true,
        configurable: true
    });
    UnderLineLabel.prototype.updateUnderLine = function () {
        var _this = this;
        egret.callLater(function () {
            var bounds = _this.getLabelBounds();
            _this._underLine.graphics.clear();
            _this._underLine.graphics.lineStyle(2, _this._label.textColor);
            _this._underLine.graphics.moveTo(bounds.x, bounds.y + bounds.height);
            _this._underLine.graphics.lineTo(bounds.x + bounds.width, bounds.y + bounds.height);
        }, this);
    };
    UnderLineLabel.prototype.getLabelBounds = function () {
        var bounds = new egret.Rectangle();
        bounds.width = this._label.textWidth;
        bounds.height = this._label.textHeight;
        if (this._label.textAlign == egret.HorizontalAlign.LEFT) {
            bounds.x = 0;
        }
        else if (this._label.textAlign == egret.HorizontalAlign.CENTER) {
            bounds.x = (this._label.width - this._label.textWidth) / 2;
        }
        else if (this._label.textAlign == egret.HorizontalAlign.RIGHT) {
            bounds.x = this._label.width - this._label.textWidth;
        }
        if (this._label.verticalAlign == egret.VerticalAlign.TOP) {
            bounds.y = 0;
        }
        else if (this._label.verticalAlign == egret.VerticalAlign.MIDDLE) {
            bounds.y = (this._label.height - this._label.textHeight) / 2;
        }
        else if (this._label.verticalAlign == egret.VerticalAlign.BOTTOM) {
            bounds.y = this._label.height - this._label.textHeight;
        }
        return bounds;
    };
    Object.defineProperty(UnderLineLabel.prototype, "label", {
        get: function () {
            return this._label;
        },
        enumerable: true,
        configurable: true
    });
    return UnderLineLabel;
}(egret.DisplayObjectContainer));
__reflect(UnderLineLabel.prototype, "UnderLineLabel");
