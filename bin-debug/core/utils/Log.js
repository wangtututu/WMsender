var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by Saco on 16/1/18.
 */
var Log = (function () {
    function Log() {
        this._logLevel = LogLevel.ERROR;
        if (egret.getOption("debug") == "1") {
            this._logLevel = LogLevel.DEBUG;
        }
        // this._logLevel = 100;
    }
    Log.prototype.setLevel = function (level) {
        this._logLevel = level;
    };
    Log.prototype.debug = function (msg) {
        if (this._logLevel <= LogLevel.DEBUG) {
            if (msg instanceof Object) {
                msg = JSON.stringify(msg);
            }
            console.debug("[" + Api.DateUtil.getTimeInfo() + "]" + msg);
        }
    };
    Log.prototype.info = function (msg) {
        if (this._logLevel <= LogLevel.INFO) {
            if (msg instanceof Object) {
                msg = JSON.stringify(msg);
            }
            console.log("[" + Api.DateUtil.getTimeInfo() + "]" + msg);
        }
    };
    Log.prototype.warn = function (msg) {
        if (this._logLevel <= LogLevel.WARN) {
            if (msg instanceof Object) {
                msg = JSON.stringify(msg);
            }
            console.warn("[" + Api.DateUtil.getTimeInfo() + "]" + msg);
        }
    };
    Log.prototype.error = function (msg) {
        if (this._logLevel <= LogLevel.ERROR) {
            if (msg instanceof Object) {
                msg = JSON.stringify(msg);
            }
            console.error("[" + Api.DateUtil.getTimeInfo() + "]" + msg);
        }
    };
    Log.prototype.fatal = function (msg) {
        if (this._logLevel <= LogLevel.FATAL) {
            if (msg instanceof Object) {
                msg = JSON.stringify(msg);
            }
            console.error("[" + Api.DateUtil.getTimeInfo() + "]" + msg);
        }
    };
    return Log;
}());
__reflect(Log.prototype, "Log");
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["DEBUG"] = 0] = "DEBUG";
    LogLevel[LogLevel["INFO"] = 1] = "INFO";
    LogLevel[LogLevel["WARN"] = 2] = "WARN";
    LogLevel[LogLevel["ERROR"] = 3] = "ERROR";
    LogLevel[LogLevel["FATAL"] = 4] = "FATAL";
})(LogLevel || (LogLevel = {}));
