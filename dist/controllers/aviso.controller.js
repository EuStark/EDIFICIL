"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvisoController = void 0;
const aviso_repository_prisma_1 = require("../repositories/prisma/aviso.repository.prisma");
const prisma_util_1 = require("../utils/prisma.util");
const aviso_service_implementation_1 = require("../services/implementation/aviso.service.implementation");
class AvisoController {
    constructor() { }
    static build() {
        return new AvisoController();
    }
    async criarAviso(req, res) {
        const { tipo, assunto, descricao } = req.body;
        const repository = aviso_repository_prisma_1.AvisoRepositoryPrisma.build(prisma_util_1.prisma);
        const avisoService = aviso_service_implementation_1.AvisoServiceImplementation.build(repository);
        const output = await avisoService.criarAviso(tipo, assunto, descricao);
        const data = {
            id: output.id,
            tipo: output.tipo,
            assunto: output.assunto,
            descricao: output.descricao,
            data: output.data
        };
        res.status(201).json(data);
    }
    async listarAvisos(req, res) {
        const repository = aviso_repository_prisma_1.AvisoRepositoryPrisma.build(prisma_util_1.prisma);
        const avisoService = aviso_service_implementation_1.AvisoServiceImplementation.build(repository);
        const output = await avisoService.listarAvisos();
        const data = {
            avisos: output.avisos
        };
        res.status(200).json(data);
    }
    async buscarAviso(req, res) {
        const { id } = req.params;
        const repository = aviso_repository_prisma_1.AvisoRepositoryPrisma.build(prisma_util_1.prisma);
        const avisoService = aviso_service_implementation_1.AvisoServiceImplementation.build(repository);
        const output = await avisoService.buscarAviso(id);
        if (!output) {
            res.status(404).json({ message: "Aviso não encontrado" });
            return;
        }
        const data = {
            id: output.id,
            tipo: output.tipo,
            assunto: output.assunto,
            descricao: output.descricao,
            data: output.data
        };
        res.status(200).json(data);
    }
    async editarAviso(req, res) {
        const { id } = req.params;
        const { tipo, assunto, descricao } = req.body;
        const repository = aviso_repository_prisma_1.AvisoRepositoryPrisma.build(prisma_util_1.prisma);
        const avisoService = aviso_service_implementation_1.AvisoServiceImplementation.build(repository);
        await avisoService.editarAviso(id, tipo, assunto, descricao);
        res.status(204).send();
    }
    async deletarAviso(req, res) {
        const { id } = req.params;
        const repository = aviso_repository_prisma_1.AvisoRepositoryPrisma.build(prisma_util_1.prisma);
        const avisoService = aviso_service_implementation_1.AvisoServiceImplementation.build(repository);
        await avisoService.deletarAviso(id);
        res.status(204).send();
    }
}
exports.AvisoController = AvisoController;
