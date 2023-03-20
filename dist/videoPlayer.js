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
exports.videoPlayer = void 0;
var VideoPlayer = /** @class */ (function () {
    function VideoPlayer() {
        this.video = null;
        this.status = null;
    }
    VideoPlayer.prototype.getVideo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var maxAttempts, attempts;
            var _this = this;
            return __generator(this, function (_a) {
                if (this.video) {
                    return [2 /*return*/, this.video];
                }
                maxAttempts = 10;
                attempts = 0;
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var _a;
                        var videoTimeoutId;
                        var checkForVideo = function () {
                            _this.video = document.querySelector('video');
                            if (_this.video) {
                                clearTimeout(videoTimeoutId);
                                resolve(_this.video);
                            }
                            else if (++attempts >= maxAttempts) {
                                clearTimeout(videoTimeoutId);
                                reject(new Error('Video element not found'));
                            }
                            else {
                                videoTimeoutId = setTimeout(checkForVideo, 100);
                            }
                        };
                        videoTimeoutId = setTimeout(checkForVideo, 100);
                        var cleanup = function () {
                            clearTimeout(videoTimeoutId);
                        };
                        Promise.resolve().then(function () {
                            var _a;
                            (_a = _this.video) === null || _a === void 0 ? void 0 : _a.removeEventListener('loadedmetadata', cleanup);
                        });
                        (_a = _this.video) === null || _a === void 0 ? void 0 : _a.addEventListener('loadedmetadata', cleanup);
                    })];
            });
        });
    };
    VideoPlayer.prototype.addEventListener = function (_a) {
        var type = _a.type, listener = _a.listener, options = _a.options;
        return __awaiter(this, void 0, void 0, function () {
            var video;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!type || !listener) {
                            console.log('Missing type or listener!');
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.getVideo()];
                    case 1:
                        video = _b.sent();
                        video.addEventListener(type, function (event) {
                            _this.status = event.type;
                            typeof listener === 'function' && listener(event);
                        }, options);
                        return [2 /*return*/];
                }
            });
        });
    };
    VideoPlayer.prototype.removeEventListener = function (_a) {
        var type = _a.type, listener = _a.listener, options = _a.options;
        return __awaiter(this, void 0, void 0, function () {
            var video;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!type || !listener) {
                            console.log('Missing type or listener!');
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.getVideo()];
                    case 1:
                        video = _b.sent();
                        video.removeEventListener(type, listener, options);
                        return [2 /*return*/];
                }
            });
        });
    };
    VideoPlayer.prototype.getStatus = function () {
        return this.status;
    };
    VideoPlayer.prototype.getReadyState = function () {
        return this.video && this.video.readyState;
    };
    VideoPlayer.prototype.getCurrentTime = function () {
        return this.video && this.video.currentTime;
    };
    VideoPlayer.prototype.getDuration = function () {
        return this.video && this.video.duration;
    };
    return VideoPlayer;
}());
exports.videoPlayer = new VideoPlayer();
