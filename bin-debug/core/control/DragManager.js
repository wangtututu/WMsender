var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by Saco at 2016/11/29
 **/
var DragManager = (function () {
    function DragManager() {
        this._enabled = true;
        this._dragItems = new Dict();
        this._dragAccept = {};
        this._savedItemProp = {};
        this.initStageEvent();
    }
    DragManager.prototype.enableDrag = function () {
        this._enabled = true;
    };
    DragManager.prototype.disableDrag = function () {
        this._enabled = false;
    };
    DragManager.prototype.initStageEvent = function () {
        Api.StageUtil.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        Api.StageUtil.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        Api.StageUtil.stage.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
    };
    DragManager.prototype.initDragItemEvent = function (obj) {
        obj.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
    };
    DragManager.prototype.removeDragItemEvent = function (obj) {
        obj.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
    };
    DragManager.prototype.initAcceptDragEvent = function (obj) {
        obj.addEventListener(egret.TouchEvent.TOUCH_END, this.onAcceptDrag, this);
    };
    DragManager.prototype.removeAcceptDragEvent = function (obj) {
        obj.removeEventListener(egret.TouchEvent.TOUCH_END, this.onAcceptDrag, this);
    };
    DragManager.prototype.regAcceptDrag = function (obj, type) {
        this._dragAccept[obj.hashCode] = type;
        this.initAcceptDragEvent(obj);
    };
    DragManager.prototype.removeAcceptDrag = function (obj) {
        delete this._dragAccept[obj.hashCode];
        this.removeAcceptDragEvent(obj);
    };
    DragManager.prototype.regDragItem = function (obj) {
        this._dragItems[obj.hashCode] = obj;
        this.initDragItemEvent(obj);
    };
    DragManager.prototype.removeDragItem = function (obj) {
        this.removeDragItemEvent(obj);
        delete this._dragItems[obj.hashCode];
    };
    DragManager.prototype.onAcceptDrag = function (e) {
        if (!this._enabled)
            return;
        if (!this._currDragItem)
            return;
        if (this._dragAccept.hasOwnProperty(e.currentTarget.hashCode)) {
            if (!this._dragAccept[e.currentTarget.hashCode] || this._currDragItem instanceof this._dragAccept[e.currentTarget.hashCode]) {
                e.currentTarget.onDragIn(this._currDragItem);
            }
        }
    };
    DragManager.prototype.onTouchBegin = function (e) {
        if (!this._enabled)
            return;
        if (this._dragItems[e.currentTarget.hashCode]) {
            this._needCheck = true;
            this._startPos = new egret.Point(e.stageX, e.stageY);
            this._currDragItem = this._dragItems[e.currentTarget.hashCode];
        }
    };
    DragManager.prototype.onTouchMove = function (e) {
        if (!this._enabled)
            return;
        if (!this._needCheck)
            return;
        if (!this._isDragMove) {
            if (Math.abs(e.stageX - this._startPos.x) > 10 || Math.abs(e.stageY - this._startPos.y) > 10) {
                this._isDragMove = true;
                this._currDragItem.onDragBegin(e);
                this._currDragItem.touchEnabled = false;
                this._currDragItem["touchChildren"] = false;
                this.saveItemProp();
            }
        }
        else {
            this._currDragItem.onDragMove(e);
            this._currDragItem.x = this._savedItemProp.globalX + e.stageX - this._startPos.x;
            this._currDragItem.y = this._savedItemProp.globalY + e.stageY - this._startPos.y;
        }
    };
    DragManager.prototype.resumeProp = function () {
        this._currDragItem.x = this._savedItemProp.x;
        this._currDragItem.y = this._savedItemProp.y;
        this._savedItemProp.parent.addChildAt(this._currDragItem, this._savedItemProp.childIndex);
    };
    DragManager.prototype.saveItemProp = function () {
        this._savedItemProp.x = this._currDragItem.x;
        this._savedItemProp.y = this._currDragItem.y;
        var point = this._currDragItem.localToGlobal(0, 0);
        this._savedItemProp.globalX = point.x;
        this._savedItemProp.globalY = point.y;
        this._savedItemProp.childIndex = this._currDragItem.parent.getChildIndex(this._currDragItem);
        this._savedItemProp.parent = this._currDragItem.parent;
        this._currDragItem.x = point.x;
        this._currDragItem.y = point.y;
        Api.StageUtil.stage.addChild(this._currDragItem);
    };
    DragManager.prototype.onTouchEnd = function (e) {
        if (!this._enabled)
            return;
        if (!this._needCheck)
            return;
        if (this._isDragMove) {
            this._currDragItem.onDragEnd(e);
            this.resumeProp();
        }
        this._needCheck = false;
        this._isDragMove = false;
        this._currDragItem.touchEnabled = true;
        this._currDragItem = null;
    };
    return DragManager;
}());
__reflect(DragManager.prototype, "DragManager");
