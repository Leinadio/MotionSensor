"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var johnny_five_1 = __importDefault(require("johnny-five"));
var raspi_io_1 = require("raspi-io");
exports.Board = new johnny_five_1["default"].Board({
    io: new raspi_io_1.RaspiIO()
});
//# sourceMappingURL=board.js.map