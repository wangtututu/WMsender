/**
 * Created by Saco on 16/3/17.
 */
class BaseView extends eui.Component {
    protected currentGuideID: number;
    public resources;
    public viewID;
    public isInited: boolean;
    public interestGuide: number[];
    public closeHookView: any;
    private _blackBg: egret.Shape;
    private isOpened;
    protected _scaleEffect;
    protected _needBg;
    protected openLayer = LayerType.UI;

    public constructor() {
        super();
        this.setSize();
        this.initBlackBg();
        this.bindSkin();
    }

    private bindSkin(): void {
        if (window[egret.getQualifiedClassName(this) + "Skin"]) {
            this.skinName = window[egret.getQualifiedClassName(this) + "Skin"];
        }
    }

    private initBlackBg(): void {
        this._blackBg = new egret.Shape();
        this._blackBg.graphics.beginFill(0, 0.6);
        this._blackBg.graphics.drawRect(0, 0, Api.StageUtil.stageWidth, Api.StageUtil.stageHeight);
        this._blackBg.graphics.endFill();
        this._blackBg.touchEnabled = true;
        this._blackBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
    }

    private onGuide(e: GameEvent): void {
        this.checkGuide(e.eventBody);
    }

    protected checkGuide(guideID: number): void {
        if (!this.isInited || !this.parent) {
            this.currentGuideID = guideID;
            return;
        }
        if (this.interestGuide && this.interestGuide.indexOf(guideID) > -1) {
            this.showGuide(guideID);
            this.currentGuideID = null;
        }
    }

    protected showGuide(guideID: number): void {

    }

    protected setScaleEffect(b): void {
        this._scaleEffect = b;
    }

    protected setSize(): void {
        this.width = Api.StageUtil.stageWidth;
        this.height = Api.StageUtil.stageHeight;
    }

    protected childrenCreated(): void {
        if (this["btnClose"]) {
            this["btnClose"].touchEnabled = true;
            this["btnClose"].addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
        }
        this.onInit();
        this.isInited = true;
    }

    protected onInit(): void {

    }

    protected onOpen(para: any): void {

    }

    public setSkinName(name: string): void {
        this.skinName = "resource/skins/" + name + ".exml";
    }

    protected openView(para: any = null): void {
        if (this.isOpened) return;
        this.isOpened = true;
        var addToStage = function() {
            Api.Layers.getLayer(this.openLayer).addChild(this);
            this.open(para);
        }.bind(this);
        if (this.isInited || !this.resources) {
            addToStage();
        } else if (this.resources) {
            SimpleLoading.i().showLoading();
            Api.ResourceUtil.loadResource(this.resources, () => {
                SimpleLoading.i().hideLoading();
                addToStage();
            }, this.onResLoadProgress, this);
        }
    }

    protected onResLoadProgress(load: number, total: number): void {
        SimpleLoading.i().setProgress(load / total);
    }

    private open(para): void {
        if (!this._scaleEffect) {
            if (this.currentGuideID) {
                this.checkGuide(this.currentGuideID);
            }
        }
        if (this.closeHookView) {
            if (this.closeHookView == "all") {
                Api.ViewManager.closeAll();
            } else if (this.closeHookView instanceof BaseView) {
                this.closeHookView.close();
            } else {
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
        egret.callLater(() => {
            this.calculatePos();
            this.onOpen(para);
            this.isOpened = false;
        }, this);
    }

    protected calculateScale() {
        var scale = 1;
        if (this.width > Api.StageUtil.stageWidth) {
            scale = Api.StageUtil.stageWidth / this.width;
        }
        if (this.height > Api.StageUtil.stageHeight) {
            scale = Math.min(scale, Api.StageUtil.stageHeight / this.height);
        }
        this.scaleX = this.scaleY = scale;
    }

    protected calculatePos() {
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
            }, 300, egret.Ease.backOut).call(() => {
                this.touchEnabled = true;
                this.touchChildren = true;
                if (this.currentGuideID) {
                    this.checkGuide(this.currentGuideID);
                }
            }, this);
        } else {
            this.x = tempX;
            this.y = tempY;
        }

        this.visible = true;
    }

    public close(): void {
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
            }, 300, egret.Ease.backIn).call(() => {
                this.touchEnabled = true;
                this.touchChildren = true;
                this.scaleX = tempScale;
                this.scaleY = tempScale;
                if (this.parent) {
                    this.parent.removeChild(this);
                }
            }, this);
        } else {
            if (this.parent) {
                this.parent.removeChild(this);
            }
        }
        if (this._blackBg.parent) {
            this._blackBg.parent.removeChild(this._blackBg);
        }
    }

    protected setRes(res: string[]): void {
        this.resources = res;
    }

    public regMsgListener(msg: any, listener: Function): void {
        Api["MessageCenter"].regMsgListener(msg, listener, this);
    }

    public removeMsgListener(msg: any, listener: Function): void {
        Api["MessageCenter"].removeMsgListener(msg, listener, this);
    }

    public sendMsg(msg: any): void {
        Api["GameSocket"].sendMsg(msg);
    }

    public getGlobalText(key: string): string {
        return Api.GlobalRes.getText(key);
    }

    public setGlobalText(com: any, key: string): void {
        com.text = this.getGlobalText(key);
    }
}
