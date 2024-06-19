"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservaController = void 0;
const reserva_repository_prisma_1 = require("../repositories/prisma/reserva.repository.prisma");
const usuario_repository_prisma_1 = require("../repositories/prisma/usuario.repository.prisma");
const prisma_util_1 = require("../utils/prisma.util");
const reserva_service_implementaion_1 = require("../services/implementation/reserva.service.implementaion");
class ReservaController {
    constructor() { }
    static build() {
        return new ReservaController();
    }
    async criarReserva(req, res) {
        const { area, data, usuarioId } = req.body;
        const reservaRepository = reserva_repository_prisma_1.ReservaRepositoryPrisma.build(prisma_util_1.prisma);
        const usuarioRepository = usuario_repository_prisma_1.UsuarioRepositoryPrisma.build(prisma_util_1.prisma);
        const reservaService = reserva_service_implementaion_1.ReservaServiceImplementation.build(reservaRepository, usuarioRepository);
        const output = await reservaService.criarReserva(area, new Date(data), usuarioId);
        const responseData = {
            id: output.id,
            area: output.area,
            data: output.data,
            usuario: {
                id: output.usuario.id,
                nome: output.usuario.nome,
                apartamento: output.usuario.apartamento
            }
        };
        res.status(201).json(responseData);
    }
    async listarReservas(req, res) {
        const reservaRepository = reserva_repository_prisma_1.ReservaRepositoryPrisma.build(prisma_util_1.prisma);
        const usuarioRepository = usuario_repository_prisma_1.UsuarioRepositoryPrisma.build(prisma_util_1.prisma);
        const reservaService = reserva_service_implementaion_1.ReservaServiceImplementation.build(reservaRepository, usuarioRepository);
        const output = await reservaService.listarReservas();
        const responseData = {
            reservas: output.reservas
        };
        res.status(200).json(responseData);
    }
    async buscarReserva(req, res) {
        const { id } = req.params;
        const reservaRepository = reserva_repository_prisma_1.ReservaRepositoryPrisma.build(prisma_util_1.prisma);
        const usuarioRepository = usuario_repository_prisma_1.UsuarioRepositoryPrisma.build(prisma_util_1.prisma);
        const reservaService = reserva_service_implementaion_1.ReservaServiceImplementation.build(reservaRepository, usuarioRepository);
        const output = await reservaService.buscarReserva(id);
        if (!output) {
            res.status(404).json({ message: "Reserva não encontrada" });
            return;
        }
        const responseData = {
            id: output.id,
            area: output.area,
            data: output.data,
            usuario: {
                id: output.usuario.id,
                nome: output.usuario.nome,
                apartamento: output.usuario.apartamento
            }
        };
        res.status(200).json(responseData);
    }
    async editarReserva(req, res) {
        const { id } = req.params;
        const { area, data } = req.body;
        const reservaRepository = reserva_repository_prisma_1.ReservaRepositoryPrisma.build(prisma_util_1.prisma);
        const usuarioRepository = usuario_repository_prisma_1.UsuarioRepositoryPrisma.build(prisma_util_1.prisma);
        const reservaService = reserva_service_implementaion_1.ReservaServiceImplementation.build(reservaRepository, usuarioRepository);
        await reservaService.editarReserva(id, area, new Date(data));
        res.status(204).send();
    }
    async cancelarReserva(req, res) {
        const { id } = req.params;
        const reservaRepository = reserva_repository_prisma_1.ReservaRepositoryPrisma.build(prisma_util_1.prisma);
        const usuarioRepository = usuario_repository_prisma_1.UsuarioRepositoryPrisma.build(prisma_util_1.prisma);
        const reservaService = reserva_service_implementaion_1.ReservaServiceImplementation.build(reservaRepository, usuarioRepository);
        await reservaService.cancelarReserva(id);
        res.status(204).send();
    }
}
exports.ReservaController = ReservaController;
