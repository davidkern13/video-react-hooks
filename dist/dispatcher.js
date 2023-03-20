"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dispatcher = void 0;
var DispatcherHooks = /** @class */ (function () {
    function DispatcherHooks() {
        var _this = this;
        this.queue = [];
        this.isDispatching = false;
        this.previousDeps = [];
        this.enqueue = function (_a) {
            var callback = _a.callback, deps = _a.deps;
            var isMount = _this.previousDeps.length === 0;
            var hasChangedDeps = !isMount && !_this.compareDeps(_this.previousDeps, deps);
            if (isMount || hasChangedDeps) {
                var task = { callback: callback, deps: deps };
                _this.queue.push(task);
                _this.previousDeps = deps;
            }
            if (!_this.isDispatching) {
                _this.isDispatching = true;
                Promise.resolve().then(function () { return _this.dispatch(); });
            }
        };
        this.dequeue = function (_a) {
            var callback = _a.callback, deps = _a.deps;
            _this.queue = _this.queue.filter(function (queuedCallback) {
                if (queuedCallback.callback === callback && _this.compareDeps(queuedCallback.deps, deps)) {
                    queuedCallback.callback = function () { }; // Set callback to empty function
                    return false; // Remove from queue
                }
                return true; // Keep in queue
            });
        };
        this.compareDeps = function (prevDeps, nextDeps) {
            if (prevDeps.length !== nextDeps.length) {
                return false;
            }
            return prevDeps.every(function (dep, index) { return dep === nextDeps[index]; });
        };
        this.dispatch = function () {
            if (_this.queue.length === 0) {
                _this.isDispatching = false;
                return;
            }
            var queuedCallback = _this.queue[0];
            var callback = queuedCallback.callback;
            var deps = queuedCallback.deps;
            if (callback.toString() === '() => {}') {
                _this.queue.shift();
                _this.dispatch();
                return;
            }
            callback();
            if (_this.compareDeps(_this.previousDeps, deps)) {
                _this.queue.shift();
            }
            else {
                _this.previousDeps = deps;
            }
            Promise.resolve().then(function () { return _this.dispatch(); });
        };
    }
    return DispatcherHooks;
}());
exports.dispatcher = new DispatcherHooks();
