var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by Saco on 2014/12/10.
 */
var JsonpManager = (function () {
    function JsonpManager() {
    }
    JsonpManager.process = function (url, callback, callobj) {
        JsonpManager.completeCall["call_" + JsonpManager._regID] = function () {
            callback.bind(callobj)();
            JsonpManager._callbackCount++;
            if (JsonpManager._callbackCount == JsonpManager._regID) {
                JsonpManager.completeCall = {};
            }
        };
        JsonpManager.startLoader(url, JsonpManager._regID++);
    };
    JsonpManager.startLoader = function (url, id) {
        var script = document.createElement('script');
        script.src = url + "JsonpManager.completeCall.call_" + id + "";
        document.body.appendChild(script);
        var xhr = this.getXHR();
        xhr.open("HEAD", "index.html", true);
        xhr.send();
    };
    JsonpManager.getXHR = function () {
        if (window["XMLHttpRequest"]) {
            return new window["XMLHttpRequest"]();
        }
    };
    JsonpManager._regID = 0;
    JsonpManager._callbackCount = 0;
    JsonpManager.completeCall = {};
    return JsonpManager;
}());
__reflect(JsonpManager.prototype, "JsonpManager");
