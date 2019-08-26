"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var motion_1 = __importDefault(require("./services/motion"));
function handleMotionValue(val) {
    console.log('val : ', val);
}
motion_1["default"](handleMotionValue);
//# sourceMappingURL=index.js.map