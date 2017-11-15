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
 * Created by Saco on 16/3/17.
 */
var BaseView = (function (_super) {
    __extends(BaseView, _super);
    function BaseView() {
        var _this = _super.call(this) || this;
        _this.openLayer = LayerType.UI;
        _this.setSize();
        _this.initBlackBg();
        _this.bindSkin();
        return _this;
    }
    BaseView.prototype.bindSkin = function () {
        if (window[egret.getQualifiedClassName(this) + "Skin"]) {
            this.skinName = window[egret.getQualifiedClassName(this) + "Skin"];
        }
    };
    BaseView.prototype.initBlackBg = function () {
        this._blackBg = new egret.Shape();
        this._blackBg.graphics.beginFill(0, 0.6);
        this._blackBg.graphics.drawRect(0, 0, Api.StageUtil.stageWidth, Api.StageUtil.stageHeight);
        this._blackBg.graphics.endFill();
        this._blackBg.touchEnabled = true;
        this._blackBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
    };
    BaseView.prototype.onGuide = function (e) {
        this.checkGuide(e.eventBody);
    };
    BaseView.prototype.checkGuide = function (guideID) {
        if (!this.isInited || !this.parent) {
            this.currentGuideID = guideID;
            return;
        }
        if (this.interestGuide && this.interestGuide.indexOf(guideID) > -1) {
            this.showGuide(guideID);
            this.currentGuideID = null;
        }
    };
    BaseView.prototype.showGuide = function (guideID) {
    };
    BaseView.prototype.setScaleEffect = function (b) {
        this._scaleEffect = b;
    };
    BaseView.prototype.setSize = function () {
        this.width = Api.StageUtil.stageWidth;
        this.height = Api.StageUtil.stageHeight;
    };
    BaseView.prototype.childrenCreated = function () {
        if (this["btnClose"]) {
            this["btnClose"].touchEnabled = true;
            this["btnClose"].addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
        }
        this.onInit();
        this.isInited = true;
    };
    BaseView.prototype.onInit = function () {
    };
    BaseView.prototype.onOpen = function (para) {
    };
    BaseView.prototype.setSkinName = function (name) {
        this.skinName = "resource/skins/" + name + ".exml";
    };
    BaseView.prototype.openView = function (para) {
        if (para === void 0) { para = null; }
        if (this.isOpened)
            return;
        this.isOpened = true;
        var addToStage = function () {
            Api.Layers.getLayer(this.openLayer).addChild(this);
            this.open(para);
        }.bind(this);
        if (this.isInited || !this.resources) {
            addToStage();
        }
        else if (this.resources) {
            SimpleLoading.i().showLoading();
            Api.ResourceUtil.loadResource(this.resources, function () {
                SimpleLoading.i().hideLoading();
                addToStage();
            }, this.onResLoadProgress, this);
        }
    };
    BaseView.prototype.onResLoadProgress = function (load, total) {
        SimpleLoading.i().setProgress(load / total);
    };
    BaseView.prototype.open = function (para) {
        var _this = this;
        if (!this._scaleEffect) {
            if (this.currentGuideID) {
                this.checkGuide(this.currentGuideID);
            }
        }
        if (this.closeHookView) {
            if (this.closeHookView == "all") {
                Api.ViewManager.closeAll();
            }
            else if (this.closeHookView instanceof BaseView) {
                this.closeHookView.close();
            }
            else {
                for (var i = 0; i = this.closeHookView.length; i++) {
                    Api.ViewManager.closeView(this.closeHookView[i]);
                }
            }
            this.closeHookView = null;
        }
        if (this._needBg) {
            Api.Layers.getLayer(this.openLayer).addChild(this._blackBg);
        }
        Api.Layers.getLayer(this.openLayer).addChild(this);
        egret.Tween.removeTweens(this);
        this.measure();
        this.visible = false;
        egret.callLater(function () {
            _this.calculatePos();
            _this.onOpen(para);
            _this.isOpened = false;
        }, this);
    };
    BaseView.prototype.calculateScale = function () {
        var scale = 1;
        if (this.width > Api.StageUtil.stageWidth) {
            scale = Api.StageUtil.stageWidth / this.width;
        }
        if (this.height > Api.StageUtil.stageHeight) {
            scale = Math.min(scale, Api.StageUtil.stageHeight / this.height);
        }
        this.scaleX = this.scaleY = scale;
    };
    BaseView.prototype.calculatePos = function () {
        var _this = this;
        this.calculateScale();
        var tempX = (Api.StageUtil.stageWidth - this.width * this.scaleX) / 2;
        var tempY = (Api.StageUtil.stageHeight - this.height * this.scaleY) / 2;
        if (this._scaleEffect) {
            this.touchEnabled = false;
            this.touchChildren = false;
            this.alpha = 0.3;
            var tempScale = this.scaleX;
            var startScale = tempScale * 0.8;
            this.scaleX = this.scaleY = startScale;
            this.x = Math.round(tempX + this.width * (1 - startScale) / 2);
            this.y = Math.round(tempY + this.height * (1 - startScale) / 2);
            egret.Tween.get(this).to({
                x: tempX,
                y: tempY,
                alpha: 1,
                scaleX: tempScale,
                scaleY: tempScale
            }, 300, egret.Ease.backOut).call(function () {
                _this.touchEnabled = true;
                _this.touchChildren = true;
                if (_this.currentGuideID) {
                    _this.checkGuide(_this.currentGuideID);
                }
            }, this);
        }
        else {
            this.x = tempX;
            this.y = tempY;
        }
        this.visible = true;
    };
    BaseView.prototype.close = function () {
        var _this = this;
        if (this._scaleEffect) {
            var tempX = this.x;
            var tempY = this.y;
            this.touchEnabled = false;
            this.touchChildren = false;
            var tempScale = this.scaleX;
            var endScale = tempScale * 0.8;
            egret.Tween.removeTweens(this);
            egret.Tween.get(this).to({
                x: tempX + this.width * (1 - endScale) / 2,
                y: tempY + this.height * (1 - endScale) / 2,
                alpha: 0.3,
                scaleX: endScale,
                scaleY: endScale
            }, 300, egret.Ease.backIn).call(function () {
                _this.touchEnabled = true;
                _this.touchChildren = true;
                _this.scaleX = tempScale;
                _this.scaleY = tempScale;
                if (_this.parent) {
                    _this.parent.removeChild(_this);
                }
            }, this);
        }
        else {
            if (this.parent) {
                this.parent.removeChild(this);
            }
        }
        if (this._blackBg.parent) {
            this._blackBg.parent.removeChild(this._blackBg);
        }
    };
    BaseView.prototype.setRes = function (res) {
        this.resources = res;
    };
    BaseView.prototype.regMsgListener = function (msg, listener) {
        Api["MessageCenter"].regMsgListener(msg, listener, this);
    };
    BaseView.prototype.removeMsgListener = function (msg, listener) {
        Api["MessageCenter"].removeMsgListener(msg, listener, this);
    };
    BaseView.prototype.sendMsg = function (msg) {
        Api["GameSocket"].sendMsg(msg);
    };
    BaseView.prototype.getGlobalText = function (key) {
        return Api.GlobalRes.getText(key);
    };
    BaseView.prototype.setGlobalText = function (com, key) {
        com.text = this.getGlobalText(key);
    };
    return BaseView;
}(eui.Component));
__reflect(BaseView.prototype, "BaseView");
