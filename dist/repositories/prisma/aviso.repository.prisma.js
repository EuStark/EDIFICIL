"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvisoRepositoryPrisma = void 0;
const aviso_entity_1 = require("../../entities/aviso.entity");
class AvisoRepositoryPrisma {
    constructor(prisma) {
        this.prisma = prisma;
    }
    static build(prisma) {
        return new AvisoRepositoryPrisma(prisma);
    }
    async save(aviso) {
        await this.prisma.aviso.create({
            data: {
                tipo: aviso.tipo,
                assunto: aviso.assunto,
                descricao: aviso.descricao,
                data: aviso.data,
            },
        });
    }
    async list() {
        const avisos = await this.prisma.aviso.findMany();
        return avisos.map((a) => aviso_entity_1.Aviso.with(a.id, a.tipo, a.assunto, a.descricao, a.data));
    }
    async findById(id) {
        const aviso = await this.prisma.aviso.findUnique({
            where: { id },
        });
        if (!aviso) {
            throw new Error("Aviso não encontrado");
        }
        return aviso_entity_1.Aviso.with(aviso.id, aviso.tipo, aviso.assunto, aviso.descricao, aviso.data);
    }
    async delete(id) {
        const aviso = await this.prisma.aviso.findUnique({
            where: { id },
        });
        if (!aviso) {
            throw new Error("Aviso não encontrado");
        }
        await this.prisma.aviso.delete({
            where: { id },
        });
    }
    async update(aviso) {
        await this.prisma.aviso.update({
            where: { id: aviso.id },
            data: {
                tipo: aviso.tipo,
                assunto: aviso.assunto,
                descricao: aviso.descricao,
                data: aviso.data,
            },
        });
    }
}
exports.AvisoRepositoryPrisma = AvisoRepositoryPrisma;
