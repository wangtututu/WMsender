var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by Saco at 2016/6/19
 */
var ArrayUtil = (function () {
    function ArrayUtil() {
    }
    ArrayUtil.prototype.sortBy = function (arr, key) {
        arr.sort(this.sortByKeyFun(key));
    };
    ArrayUtil.prototype.sortByKeyFun = function (key) {
        return function (item1, item2) {
            if (item1[key] > item2[key]) {
                return -1;
            }
            else if (item1[key] == item2[key]) {
                return 0;
            }
            else {
                return 1;
            }
        };
    };
    ArrayUtil.prototype.getRandomArray = function (len) {
        var arr = [];
        for (var i = 0; i < len; i++) {
            arr.push(i);
        }
        return arr.sort(this.randomSort);
    };
    ArrayUtil.prototype.randomSort = function (t1, t2) {
        return Math.random() > .5 ? -1 : 1;
    };
    return ArrayUtil;
}());
__reflect(ArrayUtil.prototype, "ArrayUtil");
