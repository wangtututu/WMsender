/**
 * Created by Saco at 2017/07/01
 **/
class StringUtil {
    public static stringLength(str: string): number {
        var len = 0;
        var charCode;
        for (var i = 0; i < str.length; i++) {
            charCode = str.charCodeAt(i);
            if (charCode >= 0x4E00 && charCode <= 0x9FA5) {
                len++;
            } else {
                len += 0.5;
            }
        }
        return len;
    }
}

