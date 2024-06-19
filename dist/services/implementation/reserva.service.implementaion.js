"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservaServiceImplementation = void 0;
const reserva_entity_1 = require("../../entities/reserva.entity");
class ReservaServiceImplementation {
    constructor(reservaRepository, usuarioRepository) {
        this.reservaRepository = reservaRepository;
        this.usuarioRepository = usuarioRepository;
    }
    static build(reservaRepository, usuarioRepository) {
        return new ReservaServiceImplementation(reservaRepository, usuarioRepository);
    }
    async criarReserva(area, data, usuarioId) {
        const usuario = await this.usuarioRepository.findById(usuarioId);
        if (!usuario) {
            throw new Error("Usuário não encontrado");
        }
        const reserva = reserva_entity_1.Reserva.create(area, data, usuario);
        await this.reservaRepository.save(reserva);
        return {
            id: reserva.id,
            area: reserva.area,
            data: reserva.data,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                apartamento: usuario.apartamento
            }
        };
    }
    async listarReservas() {
        const reservas = await this.reservaRepository.list();
        return {
            reservas: reservas.map(r => ({
                id: r.id,
                area: r.area,
                data: r.data,
                usuario: {
                    id: r.usuario.id,
                    nome: r.usuario.nome,
                    apartamento: r.usuario.apartamento
                }
            }))
        };
    }
    async buscarReserva(id) {
        const reserva = await this.reservaRepository.findById(id);
        if (!reserva)
            return undefined;
        return {
            id: reserva.id,
            area: reserva.area,
            data: reserva.data,
            usuario: {
                id: reserva.usuario.id,
                nome: reserva.usuario.nome,
                apartamento: reserva.usuario.apartamento
            }
        };
    }
    async editarReserva(id, area, data) {
        const reserva = await this.reservaRepository.findById(id);
        if (!reserva)
            throw new Error("Reserva não encontrada");
        reserva.edit(area, data);
        await this.reservaRepository.update(reserva);
    }
    async cancelarReserva(id) {
        const reserva = await this.reservaRepository.findById(id);
        if (!reserva)
            throw new Error("Reserva não encontrada");
        await this.reservaRepository.delete(id);
    }
}
exports.ReservaServiceImplementation = ReservaServiceImplementation;
