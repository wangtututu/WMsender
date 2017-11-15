var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by Saco on 16/5/6.
 */
var Gesture = (function () {
    function Gesture() {
        this._longTouchTimer = new Dict();
        this._longTouchCallback = new Dict();
        this._doubleTouchCallback = new Dict();
        this._doubleTouchTimer = new Dict();
    }
    Gesture.prototype.addDoubleTouchCallback = function (dis, callback, callObj) {
        dis.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        if (!this._doubleTouchCallback[dis.hashCode]) {
            this._doubleTouchCallback[dis.hashCode] = [];
        }
        this._doubleTouchCallback[dis.hashCode].push({ callback: callback, callobj: callObj });
    };
    Gesture.prototype.addLongTouchCallback = function (dis, callback, callObj) {
        dis.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        dis.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        dis.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        dis.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchOut, this);
        if (!this._longTouchCallback[dis.hashCode]) {
            this._longTouchCallback[dis.hashCode] = [];
        }
        this._longTouchCallback[dis.hashCode].push({ callback: callback, callobj: callObj });
    };
    Gesture.prototype.removeLongTouchCallback = function (dis, callback, callObj) {
        if (this._longTouchCallback[dis.hashCode]) {
            for (var i = this._longTouchCallback[dis.hashCode].length - 1; i >= 0; i--) {
                if (this._longTouchCallback[dis.hashCode][i].callback == callback && this._longTouchCallback[dis.hashCode][i].callobj == callObj) {
                    this._longTouchCallback[dis.hashCode].splice(i, 1);
                }
            }
        }
    };
    Gesture.prototype.onTouchBegin = function (e) {
        if (this._longTouchTimer[e.currentTarget.hashCode]) {
            this._touchBeginX = e.stageX;
            this._touchBeginY = e.stageY;
            Api.TimerManager.remove(this._longTouchTimer[e.currentTarget.hashCode]);
        }
        this._longTouchTimer[e.currentTarget.hashCode] = Api.TimerManager.setTimeout(this.onTimeOut, this, 300, e.currentTarget);
    };
    Gesture.prototype.onTouchMove = function (e) {
        if (Math.abs(this._touchBeginX - e.stageX) > 6 || Math.abs(this._touchBeginY - e.stageY) > 6) {
            this.removeTimer(e.currentTarget);
        }
    };
    Gesture.prototype.onTimeOut = function (target) {
        this.removeTimer(target);
        this.callTarget(target);
    };
    Gesture.prototype.callTarget = function (target) {
        if (this._longTouchCallback[target.hashCode]) {
            this._longTouchCallback[target.hashCode].map(function (callback) {
                callback.callback.call(callback.callobj, target);
            });
        }
    };
    Gesture.prototype.onTouchOut = function (e) {
        this.removeTimer(e.currentTarget);
    };
    Gesture.prototype.onTouchEnd = function (e) {
        this.removeTimer(e.currentTarget);
    };
    Gesture.prototype.removeTimer = function (target) {
        if (this._longTouchTimer[target.hashCode]) {
            Api.TimerManager.remove(this._longTouchTimer[target.hashCode]);
        }
    };
    Gesture.prototype.onTouchTap = function (e) {
        var timer = egret.getTimer();
        if (this._doubleTouchTimer[e.currentTarget.hashCode]) {
            if (timer - this._doubleTouchTimer[e.currentTarget.hashCode] < 400) {
                this.callDoubleTouch(e.currentTarget);
            }
        }
        this._doubleTouchTimer[e.currentTarget.hashCode] = timer;
    };
    Gesture.prototype.callDoubleTouch = function (target) {
        if (this._doubleTouchCallback[target.hashCode]) {
            this._doubleTouchCallback[target.hashCode].map(function (callback) {
                callback.callback.call(callback.callobj, target);
            });
        }
    };
    return Gesture;
}());
__reflect(Gesture.prototype, "Gesture");
