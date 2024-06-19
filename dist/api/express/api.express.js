"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiExpress = void 0;
const express_1 = __importDefault(require("express"));
class ApiExpress {
    constructor(app) {
        this.app = app;
    }
    static build() {
        const app = (0, express_1.default)();
        app.use(express_1.default.json());
        return new ApiExpress(app);
    }
    addGetRoute(path, handler) {
        this.app.get(path, handler);
    }
    addPostRoute(path, handler) {
        this.app.post(path, handler);
    }
    addPutRoute(path, handler) {
        this.app.put(path, handler);
    }
    addDeleteRoute(path, handler) {
        this.app.delete(path, handler);
    }
    start(port) {
        this.app.listen(port, () => {
            console.log("Server runing on port " + port);
            this.printRoutes();
        });
    }
    printRoutes() {
        const routes = this.app._router.stack
            .filter((route) => route.route)
            .map((route) => {
            return {
                path: route.route.path,
                method: route.route.stack[0].method,
            };
        });
        console.log(routes);
    }
}
exports.ApiExpress = ApiExpress;
