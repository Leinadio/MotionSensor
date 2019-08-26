"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var johnny_five_1 = __importDefault(require("johnny-five"));
var board_1 = require("../../hardware/board");
function Motion(callback) {
    var motionOption = {};
    board_1.Board.on("ready", function () {
        var motion = new johnny_five_1["default"].Motion(7);
        motion.on("calibrated", function () {
            callback(__assign({}, motionOption, { status: 1, description: 'The device is calibrated' }));
            console.log("calibrated");
        });
        motion.on("motionstart", function () {
            callback(__assign({}, motionOption, { status: 2, description: 'A movement is detected' }));
        });
        motion.on("motionend", function () {
            callback(__assign({}, motionOption, { status: 3, description: 'The movement was stopped' }));
        });
    });
}
exports["default"] = Motion;
//# sourceMappingURL=index.js.map