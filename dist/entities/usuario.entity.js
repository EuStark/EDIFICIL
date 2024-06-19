"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
class Usuario {
    constructor(type) {
        this.type = type;
    }
    static create(nome, cpf, senha, apartamento) {
        return new Usuario({
            id: crypto.randomUUID().toString(),
            nome,
            cpf,
            senha,
            apartamento
        });
    }
    static with(id, nome, cpf, senha, apartamento) {
        return new Usuario({ id, nome, cpf, senha, apartamento });
    }
    get id() {
        return this.type.id;
    }
    get nome() {
        return this.type.nome;
    }
    get cpf() {
        return this.type.cpf;
    }
    get senha() {
        return this.type.senha;
    }
    get apartamento() {
        return this.type.apartamento;
    }
}
exports.Usuario = Usuario;
