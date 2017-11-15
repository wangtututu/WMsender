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
 * Created by husong on 16/4/2.
 */
var ScaleView = (function (_super) {
    __extends(ScaleView, _super);
    function ScaleView(content) {
        var _this = _super.call(this) || this;
        _this.maxScale = 2;
        _this.minScale = 0.5;
        _this.beginVector = [];
        _this.beginScale = 1;
        _this.beginX = 0;
        _this.beginY = 0;
        _this._content = content;
        _this.touchEnabled = true;
        _this.addChild(content);
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdd, _this);
        return _this;
    }
    ScaleView.prototype.onAdd = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.stage.addEventListener(egret.Event.LEAVE_STAGE, this.onTouchEnd, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
    };
    ScaleView.prototype.setScaleRange = function (min, max) {
        this.maxScale = max;
        this.minScale = min;
    };
    ScaleView.prototype.onTouchBegin = function (e) {
        ScaleView.pointMap[e.touchPointID] = [e.stageX, e.stageY];
        var keys = Object.keys(ScaleView.pointMap);
        var pointMapLen = keys.length;
        //若有两个手指放在屏幕上
        if (pointMapLen >= 2) {
            var p0 = ScaleView.pointMap[keys[0]];
            var p1 = ScaleView.pointMap[keys[1]];
            // this.dispatchEventWith(Events.SCALE_BEGIN);
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.beginVector = [p1[0] - p0[0], p1[1] - p0[1]];
            this.beginScale = this._content.scaleX;
            this.beginX = this._content.x;
            this.beginY = this._content.y;
        }
    };
    ScaleView.prototype.onTouchMove = function (e) {
        ScaleView.pointMap[e.touchPointID] = [e.stageX, e.stageY];
        var keys = Object.keys(ScaleView.pointMap);
        var pointMapLen = keys.length;
        if (pointMapLen >= 2) {
            //计算缩放
            var p0 = ScaleView.pointMap[keys[0]];
            var p1 = ScaleView.pointMap[keys[1]];
            var moveVector = [p1[0] - p0[0], p1[1] - p0[1]];
            var thisScale = this.getScale(moveVector);
            var scale = thisScale * this.beginScale;
            //计算坐标
            this.scaleWithPoint(scale, this.getScalePoint());
        }
    };
    ScaleView.prototype.onTouchEnd = function (e) {
        delete ScaleView.pointMap[e.touchPointID];
        var len = Object.keys(ScaleView.pointMap).length;
        if (len < 2) {
            this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        }
        if (len == 1) {
            // this.dispatchEventWith(Events.SCALE_END);
        }
    };
    ScaleView.prototype.getScalePoint = function () {
        var point = [0, 0];
        var keys = Object.keys(ScaleView.pointMap);
        for (var i = 0; i < 2; i++) {
            point[0] += ScaleView.pointMap[keys[i]][0];
            point[1] += ScaleView.pointMap[keys[i]][1];
        }
        point[0] = Math.round(point[0] / 2);
        point[1] = Math.round(point[1] / 2);
        return point;
    };
    ScaleView.prototype.getVectorLength = function (vector) {
        return Math.sqrt(vector[0] * vector[0] + vector[1] * vector[1]);
    };
    ScaleView.prototype.getScale = function (moveVector) {
        var moveVectorLength = this.getVectorLength(moveVector);
        var beginVectorLength = this.getVectorLength(this.beginVector);
        return moveVectorLength / beginVectorLength;
    };
    ScaleView.prototype.scaleWithPoint = function (scale, globalPoint) {
        if (scale < this.minScale || scale > this.maxScale) {
            return;
        }
        //计算坐标
        var localPoint = this._content.globalToLocal(globalPoint[0], globalPoint[1]);
        //var localPointX =localPoint.x * this._content.scaleX;
        var localPoint = new egret.Point(localPoint.x, localPoint.y);
        var toX = this.beginX - localPoint.x * (scale - this.beginScale);
        var toY = this.beginY - localPoint.y * (scale - this.beginScale);
        this._content.x = toX;
        this._content.y = toY;
        this._content.scaleX = scale;
        this._content.scaleY = scale;
    };
    ScaleView.pointMap = {};
    return ScaleView;
}(egret.DisplayObjectContainer));
__reflect(ScaleView.prototype, "ScaleView");
