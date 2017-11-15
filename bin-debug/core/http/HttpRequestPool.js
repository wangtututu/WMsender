var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by Saco on 16/4/4.
 */
var HttpRequestPool = (function () {
    function HttpRequestPool() {
        this._requestPool = [];
        this._callBacks = new Dict();
    }
    HttpRequestPool.prototype.load = function (url, callback, callbackObj, type, data) {
        if (type === void 0) { type = egret.HttpMethod.POST; }
        var request = this.getNewRequest();
        if (type == egret.HttpMethod.POST) {
            request.open(url, type);
            if (data) {
                request.send(data);
            }
            else {
                request.send();
            }
        }
        else {
            if (data) {
                var para = "?";
                if (data) {
                    for (var key in data) {
                        para += key + "=" + data[key] + "&";
                    }
                }
                request.open(url + para, type);
            }
            else {
                request.open(url, type);
            }
            request.send();
        }
        this._callBacks[request.hashCode] = { call: callback, obj: callbackObj };
    };
    HttpRequestPool.prototype.recycleRequest = function (request) {
        this._requestPool.push(request);
    };
    HttpRequestPool.prototype.getNewRequest = function () {
        if (this._requestPool.length) {
            return this._requestPool.shift();
        }
        var request = new egret.HttpRequest();
        this.initRequest(request);
        return request;
    };
    HttpRequestPool.prototype.initRequest = function (request) {
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError, this);
    };
    HttpRequestPool.prototype.onLoadComplete = function (e) {
        var callInfo = this._callBacks[e.currentTarget.hashCode];
        callInfo.call.call(callInfo.obj, e.currentTarget.data);
        this.recycleRequest(e.currentTarget);
        delete this._callBacks[e.currentTarget.hashCode];
    };
    HttpRequestPool.prototype.onLoadError = function (e) {
        var req;
        Api.Log.error("urlloader ioerror :" + e);
        this.recycleRequest(e.currentTarget);
        delete this._callBacks[e.currentTarget.hashCode];
    };
    return HttpRequestPool;
}());
__reflect(HttpRequestPool.prototype, "HttpRequestPool");
