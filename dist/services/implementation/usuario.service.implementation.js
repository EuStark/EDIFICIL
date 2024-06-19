"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioServiceImplementation = void 0;
const usuario_entity_1 = require("../../entities/usuario.entity");
class UsuarioServiceImplementation {
    constructor(repository) {
        this.repository = repository;
    }
    static build(repository) {
        return new UsuarioServiceImplementation(repository);
    }
    async register(nome, cpf, senha, apartamento) {
        const usuario = usuario_entity_1.Usuario.create(nome, cpf, senha, apartamento);
        await this.repository.save(usuario);
        const output = {
            id: usuario.id,
            nome: usuario.nome,
            cpf: usuario.cpf,
            senha: usuario.senha,
            apartamento: usuario.apartamento
        };
        return output;
    }
    async login(cpf, senha) {
        const usuario = await this.repository.findByCpf(cpf);
        if (!usuario || usuario.senha !== senha) {
            throw new Error('Usuário ou senha inválidos');
        }
        const output = {
            id: usuario.id,
            nome: usuario.nome,
            cpf: usuario.cpf,
            apartamento: usuario.apartamento
        };
        return output;
    }
    async list() {
        const usuarios = await this.repository.list();
        const output = {
            usuarios: usuarios.map(u => ({
                id: u.id,
                nome: u.nome,
                cpf: u.cpf,
                senha: u.senha,
                apartamento: u.apartamento
            }))
        };
        return output;
    }
    async delete(id) {
        await this.repository.delete(id);
    }
    async findByCpf(cpf) {
        const usuario = await this.repository.findByCpf(cpf);
        if (!usuario) {
            return undefined;
        }
        const output = {
            id: usuario.id,
            nome: usuario.nome,
            cpf: usuario.cpf,
            senha: usuario.senha,
            apartamento: usuario.apartamento
        };
        return output;
    }
    async findById(id) {
        const usuario = await this.repository.findById(id);
        if (!usuario) {
            return undefined;
        }
        const output = {
            id: usuario.id,
            nome: usuario.nome,
            cpf: usuario.cpf,
            senha: usuario.senha,
            apartamento: usuario.apartamento
        };
        return output;
    }
}
exports.UsuarioServiceImplementation = UsuarioServiceImplementation;
