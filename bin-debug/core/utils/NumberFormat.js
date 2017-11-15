var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by Saco on 16/5/11.
 */
var NumberFormat = (function () {
    function NumberFormat() {
    }
    NumberFormat.prototype.formatNumber = function (num) {
        return this.formatString(num + "");
    };
    NumberFormat.prototype.formatString = function (str) {
        var len = str.length;
        if (len < 5)
            return str;
        var unit = Math.floor((len - 1) / 3);
        var flag;
        if (unit == 1) {
            flag = "K";
        }
        else if (unit == 2) {
            flag = "M";
        }
        else if (unit == 3) {
            flag = "B";
        }
        var final = "";
        var index = 0;
        for (var i = len - 1; i >= 0; i--) {
            index++;
            final = str.charAt(i) + final;
            if (index % 3 == 0 && i != 0) {
                final = "." + final;
            }
        }
        final = final.slice(0, 4);
        if (final.charAt(3) == ".") {
            final = final.slice(0, 3);
        }
        return final + flag;
    };
    NumberFormat.prototype.formatString2 = function (str) {
        var len = str.length;
        if (len < 8)
            return str;
        var unit = Math.floor((len - 1) / 3);
        var flag;
        if (unit == 1) {
            flag = "K";
        }
        else if (unit == 2) {
            flag = "M";
        }
        else if (unit == 3) {
            flag = "B";
        }
        var final = "";
        var index = 0;
        for (var i = len - 1; i >= 0; i--) {
            index++;
            final = str.charAt(i) + final;
            if (index % 3 == 0 && i != 0) {
                final = "." + final;
            }
        }
        final = final.slice(0, 6);
        if (final.charAt(5) == ".") {
            final = final.slice(0, 5);
        }
        return final + flag;
    };
    return NumberFormat;
}());
__reflect(NumberFormat.prototype, "NumberFormat");
