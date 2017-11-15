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
 * Created by Saco on 2014/8/2.
 */
var GameEvent = (function (_super) {
    __extends(GameEvent, _super);
    function GameEvent(type, body) {
        var _this = _super.call(this, type) || this;
        _this.eventBody = body;
        return _this;
    }
    GameEvent.GAME_EVENT_GAMEOVER = "game_over";
    GameEvent.GAME_EVENT_GAMESTART = "game_start";
    GameEvent.GAME_EVENT_GAMERESTART = "game_restart";
    GameEvent.GAME_EVENT_SHARE = "game_share";
    GameEvent.SERVER_CONNECTED = "server_connected";
    GameEvent.SERVER_CONNECT_CLOSE = "server_connect_close";
    GameEvent.DRAG_BEGIN = "drag_begin";
    GameEvent.DRAG_MOVE = "drag_move";
    GameEvent.DRAG_END = "drag_end";
    return GameEvent;
}(egret.Event));
__reflect(GameEvent.prototype, "GameEvent");
