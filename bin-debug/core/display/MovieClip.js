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
 * Created by Saco on 16/5/21.
 */
var MovieClip = (function (_super) {
    __extends(MovieClip, _super);
    function MovieClip() {
        var _this = _super.call(this) || this;
        _this._currentFrame = 0;
        _this._pastTime = 0;
        _this.frameRate = 30;
        _this.touchEnabled = false;
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.removeFromStage, _this);
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.addToStage, _this);
        return _this;
    }
    Object.defineProperty(MovieClip.prototype, "frameRate", {
        get: function () {
            return this._frameRate;
        },
        set: function (value) {
            this._frameRate = value;
            this._frameTime = Math.abs(1000 / value);
        },
        enumerable: true,
        configurable: true
    });
    MovieClip.prototype.setFrameData = function (frames) {
        this._frameKeys = frames;
        this._totalFrame = this._frameKeys.length;
        this._frameTexture = [];
        var checkResource = true;
        for (var i = 0; i < this._totalFrame; i++) {
            if (RES.getRes(this._frameKeys[i]) == null) {
                checkResource = false;
                break;
            }
        }
        if (!checkResource) {
            this._loadGroupName = "group" + Math.random();
            RES.createGroup(this._loadGroupName, frames);
            RES.loadGroup(this._loadGroupName);
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResLoaded, this);
        }
        else {
            this.initResource();
        }
    };
    MovieClip.prototype.initResource = function () {
        for (var i = 0, len = this._totalFrame; i < len; i++) {
            this._frameTexture.push(RES.getRes(this._frameKeys[i]));
        }
        this.texture = this._frameTexture[0];
        this._pastTime = 0;
    };
    MovieClip.prototype.onResLoaded = function (e) {
        if (e.groupName == this._loadGroupName) {
            this.initResource();
        }
    };
    MovieClip.prototype.play = function (count) {
        if (count === void 0) { count = -1; }
        if (this._ticker != -1) {
            this.stop();
        }
        this._playCount = count;
        this._currentFrame = 0;
        this._ticker = Api.TimerManager.startTicker(this.enterFrame, this);
    };
    MovieClip.prototype.resume = function () {
        this._ticker = Api.TimerManager.startTicker(this.enterFrame, this);
    };
    MovieClip.prototype.stop = function () {
        Api.TimerManager.remove(this._ticker);
        this._ticker = -1;
    };
    MovieClip.prototype.removeFromStage = function () {
        this._autoStop = true;
        this.stop();
    };
    MovieClip.prototype.addToStage = function () {
        if (this._autoStop) {
            this.play(this._playCount);
        }
    };
    MovieClip.prototype.enterFrame = function (frameTime) {
        if (!this._frameTexture || !this._frameTexture.length) {
            return;
        }
        this._pastTime += frameTime;
        if (this._pastTime < this._frameTime)
            return;
        this._currentFrame++;
        this._pastTime = 0;
        if (this._currentFrame >= this._totalFrame) {
            this._currentFrame = 0;
            if (this._playCount != -1) {
                this._playCount--;
                if (this._playCount == 0) {
                    this.over();
                }
            }
        }
        this.texture = this._frameTexture[this._currentFrame];
    };
    MovieClip.prototype.over = function () {
        this.stop();
        this._currentFrame = 0;
    };
    MovieClip.prototype.reset = function () {
        this.stop();
        this._frameTexture = [];
        this._frameKeys = [];
        this._totalFrame = 0;
        this._pastTime = 0;
        this._autoStop = false;
    };
    return MovieClip;
}(egret.Bitmap));
__reflect(MovieClip.prototype, "MovieClip");
