"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioRepositoryPrisma = void 0;
const usuario_entity_1 = require("../../entities/usuario.entity");
class UsuarioRepositoryPrisma {
    constructor(prisma) {
        this.prisma = prisma;
    }
    static build(prisma) {
        return new UsuarioRepositoryPrisma(prisma);
    }
    async save(usuario) {
        const usuarios = await this.prisma.usuario.findMany();
        if (usuarios.some(u => u.cpf === usuario.cpf)) {
            throw new Error('CPF já cadastrado');
        }
        if (usuario.cpf.length !== 11) {
            throw new Error('CPF inválido');
        }
        await this.prisma.usuario.create({
            data: {
                nome: usuario.nome,
                cpf: usuario.cpf,
                senha: usuario.senha,
                apartamento: usuario.apartamento
            }
        });
    }
    async list() {
        const usuarios = await this.prisma.usuario.findMany();
        return usuarios.map(u => usuario_entity_1.Usuario.with(u.id, u.nome, u.cpf, u.senha, u.apartamento));
    }
    async delete(id) {
        const usuario = await this.prisma.usuario.findUnique({
            where: {
                id
            }
        });
        if (!usuario) {
            throw new Error('Usuário não encontrado');
        }
        await this.prisma.usuario.delete({
            where: {
                id
            }
        });
    }
    async findByCpf(cpf) {
        const usuario = await this.prisma.usuario.findUnique({
            where: {
                cpf
            }
        });
        if (!usuario) {
            throw new Error('Usuário não encontrado');
        }
        return usuario_entity_1.Usuario.with(usuario.id, usuario.nome, usuario.cpf, usuario.senha, usuario.apartamento);
    }
    async findById(id) {
        const usuario = await this.prisma.usuario.findUnique({
            where: {
                id
            }
        });
        if (!usuario) {
            throw new Error('Usuário não encontrado');
        }
        return usuario_entity_1.Usuario.with(usuario.id, usuario.nome, usuario.cpf, usuario.senha, usuario.apartamento);
    }
}
exports.UsuarioRepositoryPrisma = UsuarioRepositoryPrisma;
