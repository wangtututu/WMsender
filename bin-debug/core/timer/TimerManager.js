var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by Saco on 16/4/7.
 */
var TimerManager = (function () {
    function TimerManager() {
        this._handlers = new Dict();
        this._timeCall = new Dict();
        this._id = 0;
        egret.startTick(this.onFrame, this);
        this._lastTimestamp = egret.getTimer();
        this._serverTime = new Date().getTime();
    }
    TimerManager.prototype.setServerTime = function (serverTime) {
        this._serverTime = serverTime * 1000;
    };
    TimerManager.prototype.getTime = function () {
        return parseInt(this._serverTime + "");
    };
    TimerManager.prototype.regTimeCall = function (hour, minute, callback, callObj, para) {
        var nowTimestamp = new Date(this._serverTime).getTime();
        var regDate = new Date();
        var timescale;
        regDate.setHours(hour);
        regDate.setMinutes(minute);
        regDate.setSeconds(0);
        regDate.setMilliseconds(0);
        var regTimestamp = regDate.getTime();
        if (nowTimestamp > regTimestamp) {
            var date = new Date();
            date.setHours(24);
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0);
            timescale = date.getTime() - nowTimestamp;
            timescale += hour * 3600000 + minute * 60000;
        }
        else {
            timescale = regTimestamp - nowTimestamp;
        }
        var handler = new TimerHandler();
        handler.callback = callback;
        handler.callObj = callObj;
        handler.repeatCount = 1;
        handler.callPara = para;
        handler.timeScale = timescale;
        return this.addHandler(handler);
    };
    TimerManager.prototype.regCountdown = function (second, updateCallBack, completeCallBack, callObj, para) {
        var handler = new TimerHandler();
        handler.callback = updateCallBack;
        handler.callObj = callObj;
        handler.completeCallBack = completeCallBack;
        handler.repeatCount = second;
        handler.timeScale = 1000;
        handler.callPara = para;
        return this.addHandler(handler);
    };
    TimerManager.prototype.callNextFrame = function (callback, callObj, para) {
        var handler = new TimerHandler();
        handler.callback = callback;
        handler.callObj = callObj;
        handler.repeatCount = 1;
        handler.timeScale = 0;
        handler.callPara = para;
        return this.addHandler(handler);
    };
    TimerManager.prototype.startTicker = function (callback, callObj, para) {
        var handler = new TimerHandler();
        handler.callback = callback;
        handler.callObj = callObj;
        handler.timeScale = 0;
        handler.callPara = para;
        return this.addHandler(handler);
    };
    TimerManager.prototype.setTimeout = function (callback, callObj, time, para) {
        var handler = new TimerHandler();
        handler.callback = callback;
        handler.callObj = callObj;
        handler.timeScale = time;
        handler.repeatCount = 1;
        handler.callPara = para;
        return this.addHandler(handler);
    };
    TimerManager.prototype.setInterval = function (callback, callObj, time, para) {
        var handler = new TimerHandler();
        handler.callback = callback;
        handler.callObj = callObj;
        handler.timeScale = time;
        handler.callPara = para;
        return this.addHandler(handler);
    };
    TimerManager.prototype.onFrame = function (timestamp) {
        var timeDiff = timestamp - this._lastTimestamp;
        this._lastTimestamp = timestamp;
        this._serverTime += timeDiff;
        var handler;
        var keys = Object.keys(this._handlers);
        for (var i = keys.length - 1; i >= 0; i--) {
            handler = this._handlers[keys[i]];
            if (!handler)
                continue;
            if (!handler.isPause) {
                handler.timePast += timeDiff;
            }
            if (!handler.isPause && handler.timePast >= handler.timeScale) {
                if (handler.repeatCount > 0) {
                    handler.repeatCount--;
                }
                if (handler.callback) {
                    if (handler.callPara) {
                        handler.callback.call(handler.callObj, handler.callPara);
                    }
                    else if (handler.repeatCount != null) {
                        handler.callback.call(handler.callObj, handler.repeatCount);
                    }
                    else {
                        handler.callback.call(handler.callObj, timeDiff);
                    }
                }
                if (handler.repeatCount == 0) {
                    if (handler.completeCallBack) {
                        handler.completeCallBack.call(handler.callObj);
                    }
                    delete this._handlers[keys[i]];
                }
                handler.timePast -= handler.timeScale;
            }
        }
        return true;
    };
    TimerManager.prototype.pauseHandler = function (handlerID, pause) {
        if (pause === void 0) { pause = true; }
        this._handlers[handlerID].isPause = pause;
    };
    TimerManager.prototype.remove = function (handlerID) {
        delete this._handlers[handlerID];
    };
    TimerManager.prototype.addHandler = function (handler) {
        this._handlers[++this._id] = handler;
        return this._id;
    };
    return TimerManager;
}());
__reflect(TimerManager.prototype, "TimerManager");
var TimerHandler = (function () {
    function TimerHandler() {
        //经过时间
        this.timePast = 0;
    }
    return TimerHandler;
}());
__reflect(TimerHandler.prototype, "TimerHandler");
