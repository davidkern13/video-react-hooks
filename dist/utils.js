"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkVideoStatus = exports.getVideoStatus = exports.debounce = void 0;
var videoPlayer_1 = require("./videoPlayer");
var debounce = function (func, wait) {
    var timeout;
    return function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var later = function () {
            timeout = null;
            //@ts-ignore
            func.apply(_this, args);
        };
        timeout && clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};
exports.debounce = debounce;
var getVideoStatus = function () { return __awaiter(void 0, void 0, void 0, function () {
    var video;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, videoPlayer_1.videoPlayer.getVideo()];
            case 1:
                video = _a.sent();
                return [2 /*return*/, video.readyState >= 4];
        }
    });
}); };
exports.getVideoStatus = getVideoStatus;
var checkVideoStatus = function () {
    return new Promise(function (resolve, reject) {
        var intervalId = setInterval(function () { return __awaiter(void 0, void 0, void 0, function () {
            var status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, exports.getVideoStatus)()];
                    case 1:
                        status = _a.sent();
                        if (status) {
                            clearInterval(intervalId);
                            resolve(status);
                        }
                        return [2 /*return*/];
                }
            });
        }); }, 1);
        // Reject the promise if the checkFn doesn't return a truthy value after 10 seconds
        setTimeout(function () {
            clearInterval(intervalId);
            reject('Timeout exceeded, video is not ready.');
        }, 10000);
    });
};
exports.checkVideoStatus = checkVideoStatus;
// export const memoizePreviousValue = () => {
//   let prevValue: any = null;
//   return (currentValue: any) => {
//     const memoizedValue = prevValue;
//     prevValue = currentValue;
//     return memoizedValue;
//   };
// };
// const obj = {
//   value: null as any,
//   get latest() {
//     return this.value;
//   },
//   set current(data: any) {
//     this.value = data;
//   },
// };
