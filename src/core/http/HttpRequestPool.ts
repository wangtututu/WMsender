/**
 * Created by Saco on 16/4/4.
 */
class HttpRequestPool {
    private _requestPool: egret.HttpRequest[];
    private _callBacks: Dict;

    public constructor() {
        this._requestPool = [];
        this._callBacks = new Dict();
    }

    public load(url: string, callback: Function, callbackObj: any, type: string = egret.HttpMethod.POST, data?: any): void {
        var request: egret.HttpRequest = this.getNewRequest();
        if (type == egret.HttpMethod.POST) {
            request.open(url, type);
            if (data) {
                request.send(data);
            } else {
                request.send();
            }
        } else {
            if (data) {
                var para = "?";
                if (data) {
                    for (var key in data) {
                        para += key + "=" + data[key] + "&";
                    }
                }
                request.open(url + para, type);
            } else {
                request.open(url, type);
            }
            request.send();
        }
        this._callBacks[request.hashCode] = { call: callback, obj: callbackObj };
    }

    private recycleRequest(request: egret.HttpRequest): void {
        this._requestPool.push(request);
    }

    private getNewRequest(): egret.HttpRequest {
        if (this._requestPool.length) {
            return this._requestPool.shift();
        }
        var request = new egret.HttpRequest();
        this.initRequest(request);
        return request;
    }

    private initRequest(request: egret.HttpRequest): void {
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError, this);
    }

    private onLoadComplete(e: egret.Event): void {
        var callInfo = this._callBacks[e.currentTarget.hashCode];
        callInfo.call.call(callInfo.obj, e.currentTarget.data);
        this.recycleRequest(e.currentTarget);
        delete this._callBacks[e.currentTarget.hashCode];
    }

    private onLoadError(e: egret.IOErrorEvent): void {
        var req: egret.HttpRequest;
        Api.Log.error("urlloader ioerror :" + e);
        this.recycleRequest(e.currentTarget);
        delete this._callBacks[e.currentTarget.hashCode];
    }
}
