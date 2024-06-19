"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aviso = void 0;
const crypto_1 = __importDefault(require("crypto"));
class Aviso {
    constructor(type) {
        this.type = type;
    }
    static create(tipo, assunto, descricao) {
        return new Aviso({
            id: crypto_1.default.randomUUID().toString(),
            tipo,
            assunto,
            descricao,
            data: new Date()
        });
    }
    static with(id, tipo, assunto, descricao, data) {
        return new Aviso({ id, tipo, assunto, descricao, data });
    }
    get id() {
        return this.type.id;
    }
    get tipo() {
        return this.type.tipo;
    }
    get assunto() {
        return this.type.assunto;
    }
    get descricao() {
        return this.type.descricao;
    }
    get data() {
        return this.type.data;
    }
    edit(tipo, assunto, descricao) {
        this.type.tipo = tipo;
        this.type.assunto = assunto;
        this.type.descricao = descricao;
    }
}
exports.Aviso = Aviso;
