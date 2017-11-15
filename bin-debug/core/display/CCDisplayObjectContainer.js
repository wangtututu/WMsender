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
 * Created by Saco on 2015/6/2.
 */
var CCDisplayObjectContainer = (function (_super) {
    __extends(CCDisplayObjectContainer, _super);
    function CCDisplayObjectContainer() {
        var _this = _super.call(this) || this;
        _this._childIndex = {};
        return _this;
    }
    CCDisplayObjectContainer.prototype.addChild = function (item) {
        this._childIndex[this.getNewMaxIndex()] = item;
        return _super.prototype.addChild.call(this, item);
    };
    CCDisplayObjectContainer.prototype.addChildAt = function (item, index) {
        this.validateChildrenIndex(index);
        this._childIndex[index] = item;
        this.addChild(item);
        this.sortChildren(index);
        return item;
    };
    CCDisplayObjectContainer.prototype.removeChild = function (item) {
        this.deleteChild(item);
        return _super.prototype.removeChild.call(this, item);
    };
    CCDisplayObjectContainer.prototype.getNewMaxIndex = function () {
        var childKeys = Object.keys(this._childIndex);
        childKeys.sort();
        return parseFloat(childKeys[childKeys.length - 1]) + 1;
    };
    CCDisplayObjectContainer.prototype.deleteChild = function (item) {
        var keys = Object.keys(this._childIndex);
        for (var i = 0, len = keys.length; i < len; i++) {
            if (this._childIndex[keys[i]] == item) {
                delete this._childIndex[keys[i]];
                break;
            }
        }
    };
    CCDisplayObjectContainer.prototype.validateChildrenIndex = function (index) {
        var tempIndex = index;
        while (this._childIndex[tempIndex]) {
            tempIndex -= 0.01;
            if (this._childIndex[tempIndex] == undefined) {
                for (var i = tempIndex; i < index; i += 0.01) {
                    this._childIndex[i] = this._childIndex[i + 0.01];
                }
                break;
            }
        }
    };
    CCDisplayObjectContainer.prototype.sortChildren = function (index) {
        var childKeys = Object.keys(this._childIndex);
        childKeys.sort();
        for (var i = 0, len = childKeys.length; i < len; i++) {
            if (i < index)
                continue;
            this.addChild(this._childIndex[childKeys[i]]);
        }
    };
    CCDisplayObjectContainer.prototype.setChildZIndex = function (item, zindex) {
        this.validateChildrenIndex(zindex);
        this.addChild(item);
        this.sortChildren(zindex);
    };
    return CCDisplayObjectContainer;
}(egret.DisplayObjectContainer));
__reflect(CCDisplayObjectContainer.prototype, "CCDisplayObjectContainer");
