var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
* Created By Saco At 2016.06.29
* Last Modified: 2016.06.29
**/
var MovieClipPool = (function () {
    function MovieClipPool() {
        this._pool = [];
    }
    MovieClipPool.i = function () {
        if (!this._instance) {
            this._instance = new MovieClipPool();
        }
        return this._instance;
    };
    MovieClipPool.prototype.recycleMC = function (mc) {
        mc.reset();
        if (mc.parent) {
            mc.parent.removeChild(mc);
        }
        this._pool.push(mc);
    };
    MovieClipPool.prototype.getMC = function () {
        if (this._pool.length) {
            return this._pool.shift();
        }
        return new MovieClip();
    };
    return MovieClipPool;
}());
__reflect(MovieClipPool.prototype, "MovieClipPool");
