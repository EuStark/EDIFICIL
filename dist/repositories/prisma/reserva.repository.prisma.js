"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservaRepositoryPrisma = void 0;
const reserva_entity_1 = require("../../entities/reserva.entity");
const usuario_entity_1 = require("../../entities/usuario.entity");
class ReservaRepositoryPrisma {
    constructor(prisma) {
        this.prisma = prisma;
    }
    static build(prisma) {
        return new ReservaRepositoryPrisma(prisma);
    }
    async save(reserva) {
        await this.prisma.reserva.create({
            data: {
                area: reserva.area,
                data: reserva.data,
                usuario: {
                    connect: {
                        id: reserva.usuario.id,
                    },
                },
            },
        });
    }
    async list() {
        const reservas = await this.prisma.reserva.findMany({
            include: { usuario: true },
        });
        return reservas.map((r) => reserva_entity_1.Reserva.with(r.id, r.area, r.data, usuario_entity_1.Usuario.with(r.usuario.id, r.usuario.nome, r.usuario.cpf, r.usuario.senha, r.usuario.apartamento)));
    }
    async findById(id) {
        const reserva = await this.prisma.reserva.findUnique({
            where: { id },
            include: { usuario: true },
        });
        if (!reserva) {
            throw new Error("Reserva não encontrada");
        }
        return reserva_entity_1.Reserva.with(reserva.id, reserva.area, reserva.data, usuario_entity_1.Usuario.with(reserva.usuario.id, reserva.usuario.nome, reserva.usuario.cpf, reserva.usuario.senha, reserva.usuario.apartamento));
    }
    async delete(id) {
        const reserva = await this.prisma.reserva.findUnique({
            where: { id },
        });
        if (!reserva) {
            throw new Error("Reserva não encontrada");
        }
        await this.prisma.reserva.delete({
            where: { id },
        });
    }
    async update(reserva) {
        await this.prisma.reserva.update({
            where: { id: reserva.id },
            data: {
                area: reserva.area,
                data: reserva.data,
                usuario: {
                    connect: {
                        id: reserva.usuario.id,
                    },
                },
            },
        });
    }
}
exports.ReservaRepositoryPrisma = ReservaRepositoryPrisma;
