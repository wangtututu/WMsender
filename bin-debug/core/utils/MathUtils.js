var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by Saco on 16/4/18.
 */
var MathUtils = (function () {
    function MathUtils() {
        this.PI = 3.14;
    }
    MathUtils.prototype.angleToArc = function (angle) {
        return angle / 180 * this.PI;
    };
    MathUtils.prototype.distance = function (p1x, p1y, p2x, p2y) {
        var total = Math.pow((p2x - p1x), 2) + Math.pow((p2y - p1y), 2);
        return Math.sqrt(total);
    };
    MathUtils.prototype.pointDistance = function (p1, p2) {
        return this.distance(p1.x, p1.y, p2.x, p2.y);
    };
    MathUtils.prototype.getArc = function (startX, startY, endX, endY) {
        return Math.atan2(endY - startY, endX - startX);
    };
    MathUtils.prototype.getAngle = function (startX, startY, endX, endY) {
        return Math.atan2(endY - startY, endX - startX) / this.PI * 180;
    };
    return MathUtils;
}());
__reflect(MathUtils.prototype, "MathUtils");
