var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by Saco on 16/5/20.
 */
var TextFlowMaker = (function () {
    function TextFlowMaker() {
    }
    TextFlowMaker.prototype.makeTextFlow = function (sourceText) {
        var result = [];
        if (!sourceText || sourceText == "") {
            return [];
        }
        var tempIndex;
        sourceText = sourceText.replace(/\\\{/g, "\|Saco\|");
        sourceText = sourceText.replace(/\\\}/g, "\|Sacoz\|");
        sourceText = sourceText.replace(/\\\,/g, "\|Saco1\|");
        sourceText = sourceText.replace(/\\\:/g, "\|Saco2\|");
        while (sourceText.length) {
            tempIndex = sourceText.indexOf("{");
            if (tempIndex > 0) {
                result.push(this.getTextFlowElement(sourceText.slice(0, sourceText.indexOf("{"))));
                sourceText = sourceText.slice(sourceText.indexOf("{"));
            }
            else if (tempIndex == 0) {
                result.push(this.getTextFlowElement(sourceText.slice(tempIndex, sourceText.indexOf("}") + 1)));
                sourceText = sourceText.slice(sourceText.indexOf("}") + 1);
            }
            else {
                result.push(this.getTextFlowElement(sourceText));
                break;
            }
        }
        return result;
    };
    TextFlowMaker.prototype.getTextFlowElement = function (text) {
        var textFlow = new TextFlowElement();
        if (text.charAt(0) == "{") {
            text = text.replace(/ *, */g, "\",\"");
            text = text.replace(/ *: */g, "\":\"");
            text = text.replace(/\{/g, "\{\"");
            text = text.replace(/}/g, "\"\}");
            var textStyle = JSON.parse(text);
            textFlow.text = this.resumeText(textStyle.t);
            textFlow.style = new TextFlowElementStyle();
            textFlow.style.textColor = textStyle.c;
            textFlow.style.size = textStyle.s;
            textFlow.style.underline = textStyle.u;
            textFlow.style.italic = textStyle.i;
            textFlow.style.bold = textStyle.b;
            textFlow.style.stroke = textStyle.st;
            textFlow.style.strokeColor = textStyle.sc;
            textFlow.style.fontFamily = textStyle.f;
            textFlow.style.target = textStyle.ta;
            if (textStyle.h) {
                textFlow.style.href = textStyle.h;
            }
            if (textStyle.e) {
                textFlow.style.href = "event:" + textStyle.e;
            }
        }
        else {
            textFlow.text = this.resumeText(text);
        }
        return textFlow;
    };
    TextFlowMaker.prototype.resumeText = function (text) {
        text = text.replace(/\|Saco\|/g, "\{");
        text = text.replace(/\|Sacoz\|/g, "\}");
        text = text.replace(/\|Saco1\|/g, "\,");
        text = text.replace(/\|Saco2\|/g, "\:");
        return text;
    };
    return TextFlowMaker;
}());
__reflect(TextFlowMaker.prototype, "TextFlowMaker");
var TextFlowElement = (function () {
    function TextFlowElement(text) {
        this.text = text;
    }
    return TextFlowElement;
}());
__reflect(TextFlowElement.prototype, "TextFlowElement", ["egret.ITextElement"]);
var TextFlowElementStyle = (function () {
    function TextFlowElementStyle() {
    }
    return TextFlowElementStyle;
}());
__reflect(TextFlowElementStyle.prototype, "TextFlowElementStyle", ["egret.ITextStyle"]);
