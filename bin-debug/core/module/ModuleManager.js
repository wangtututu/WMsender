var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by Saco on 16/3/14.
 */
var ModuleManager = (function () {
    function ModuleManager() {
        this._modules = Object.create(null);
    }
    ModuleManager.prototype.regModule = function (moduleKey, cls) {
        if (this._modules[moduleKey]) {
            console.error("duplicate module reg:" + moduleKey);
            return;
        }
        this._modules[moduleKey] = new cls();
    };
    ModuleManager.prototype.getModule = function (moduleKey) {
        if (!this._modules[moduleKey]) {
            console.error("cant find module:" + moduleKey);
            return null;
        }
        return this._modules[moduleKey];
    };
    return ModuleManager;
}());
__reflect(ModuleManager.prototype, "ModuleManager");
