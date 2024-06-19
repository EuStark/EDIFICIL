"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioController = void 0;
const usuario_repository_prisma_1 = require("../repositories/prisma/usuario.repository.prisma");
const prisma_util_1 = require("../utils/prisma.util");
const usuario_service_implementation_1 = require("../services/implementation/usuario.service.implementation");
class UsuarioController {
    constructor() { }
    static build() {
        return new UsuarioController();
    }
    async register(req, res) {
        const { nome, cpf, senha, apartamento } = req.body;
        const repository = usuario_repository_prisma_1.UsuarioRepositoryPrisma.build(prisma_util_1.prisma);
        const usuarioService = usuario_service_implementation_1.UsuarioServiceImplementation.build(repository);
        const output = await usuarioService.register(nome, cpf, senha, apartamento);
        const data = {
            id: output.id,
            nome: output.nome,
            cpf: output.cpf,
            senha: output.senha,
            apartamento: output.apartamento
        };
        res.status(201).json(data);
    }
    async login(req, res) {
        const { cpf, senha } = req.body;
        const repository = usuario_repository_prisma_1.UsuarioRepositoryPrisma.build(prisma_util_1.prisma);
        const usuarioService = usuario_service_implementation_1.UsuarioServiceImplementation.build(repository);
        const output = await usuarioService.login(cpf, senha);
        if (!output) {
            res.status(401).json({ message: "Usuário não encontrado" });
            return;
        }
        const data = {
            id: output.id,
            nome: output.nome,
            cpf: output.cpf,
            apartamento: output.apartamento
        };
        res.status(200).json(data);
    }
    async list(req, res) {
        const repository = usuario_repository_prisma_1.UsuarioRepositoryPrisma.build(prisma_util_1.prisma);
        const usuarioService = usuario_service_implementation_1.UsuarioServiceImplementation.build(repository);
        const output = await usuarioService.list();
        const data = {
            usuarios: output.usuarios
        };
        res.status(200).json(data);
    }
    async delete(req, res) {
        const { id } = req.params;
        const repository = usuario_repository_prisma_1.UsuarioRepositoryPrisma.build(prisma_util_1.prisma);
        const usuarioService = usuario_service_implementation_1.UsuarioServiceImplementation.build(repository);
        await usuarioService.delete(id);
        res.status(204).send();
    }
    async findByCpf(req, res) {
        const { cpf } = req.params;
        const repository = usuario_repository_prisma_1.UsuarioRepositoryPrisma.build(prisma_util_1.prisma);
        const usuarioService = usuario_service_implementation_1.UsuarioServiceImplementation.build(repository);
        const output = await usuarioService.findByCpf(cpf);
        if (!output) {
            res.status(404).json({ message: "Usuário não encontrado" });
            return;
        }
        const data = {
            id: output.id,
            nome: output.nome,
            cpf: output.cpf,
            senha: output.senha,
            apartamento: output.apartamento
        };
        res.status(200).json(data);
    }
    async findById(req, res) {
        const { id } = req.params;
        const repository = usuario_repository_prisma_1.UsuarioRepositoryPrisma.build(prisma_util_1.prisma);
        const usuarioService = usuario_service_implementation_1.UsuarioServiceImplementation.build(repository);
        const output = await usuarioService.findById(id);
        if (!output) {
            res.status(404).json({ message: "Usuário não encontrado" });
            return;
        }
        const data = {
            id: output.id,
            nome: output.nome,
            cpf: output.cpf,
            senha: output.senha,
            apartamento: output.apartamento
        };
        res.status(200).json(data);
    }
}
exports.UsuarioController = UsuarioController;
