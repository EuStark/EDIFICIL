"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reserva = void 0;
const crypto_1 = __importDefault(require("crypto"));
class Reserva {
    constructor(type) {
        this.type = type;
    }
    static create(area, data, usuario) {
        return new Reserva({
            id: crypto_1.default.randomUUID().toString(),
            area,
            data,
            usuario
        });
    }
    static with(id, area, data, usuario) {
        return new Reserva({ id, area, data, usuario });
    }
    get id() {
        return this.type.id;
    }
    get area() {
        return this.type.area;
    }
    get data() {
        return this.type.data;
    }
    get usuario() {
        return this.type.usuario;
    }
    edit(area, data) {
        this.type.area = area;
        this.type.data = data;
    }
}
exports.Reserva = Reserva;
