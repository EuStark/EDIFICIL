"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvisoServiceImplementation = void 0;
const aviso_entity_1 = require("../../entities/aviso.entity");
class AvisoServiceImplementation {
    constructor(repository) {
        this.repository = repository;
    }
    static build(repository) {
        return new AvisoServiceImplementation(repository);
    }
    async criarAviso(tipo, assunto, descricao) {
        const aviso = aviso_entity_1.Aviso.create(tipo, assunto, descricao);
        await this.repository.save(aviso);
        const output = {
            id: aviso.id,
            tipo: aviso.tipo,
            assunto: aviso.assunto,
            descricao: aviso.descricao,
            data: aviso.data
        };
        return output;
    }
    async listarAvisos() {
        const avisos = await this.repository.list();
        const output = {
            avisos: avisos.map(a => ({
                id: a.id,
                tipo: a.tipo,
                assunto: a.assunto,
                descricao: a.descricao,
                data: a.data
            }))
        };
        return output;
    }
    async buscarAviso(id) {
        const aviso = await this.repository.findById(id);
        if (!aviso) {
            return undefined;
        }
        const output = {
            id: aviso.id,
            tipo: aviso.tipo,
            assunto: aviso.assunto,
            descricao: aviso.descricao,
            data: aviso.data
        };
        return output;
    }
    async editarAviso(id, tipo, assunto, descricao) {
        const avisoEdit = await this.repository.findById(id);
        if (!avisoEdit) {
            throw new Error('Product not found!');
        }
        avisoEdit.edit(tipo, assunto, descricao);
        await this.repository.update(avisoEdit);
    }
    async deletarAviso(id) {
        const aviso = await this.repository.findById(id);
        if (!aviso) {
            throw new Error('Product not found!');
        }
        await this.repository.delete(id);
    }
}
exports.AvisoServiceImplementation = AvisoServiceImplementation;
