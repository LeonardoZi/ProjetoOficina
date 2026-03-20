import prisma from "../lib/prisma.js";

export const getVeiculos = async (req, res) => {
    try{
        const veiculos = await prisma.veiculo.findMany({
            include: { cliente: true }
        })
        res.json(veiculos)
    } catch(error){
        res.status(500).json({error: 'Erro ao buscar veículos'})
    }
}

export const getVeiculoById = async (req, res) => {
    try {
        const {id} = req.params
        const veiculo = await prisma.veiculo.findUnique({
            where: { id: Number(id)},
            include: {cliente: true, ordens: true}
        })
        if (!veiculo) return res.status(404).json({ error: 'Veículo não encontrado'})
        res.json(veiculo)
    } catch(error){
        res.status(500).json({ error: 'Erro ao buscar veículo'})
    }
}

export const getVeiculosByCliente = async (req, res) => {
    try{
        const {clienteId} = req.params
        const veiculos = await prisma.veiculo.findMany({
            where: {clienteId: Number(clienteId)}
        })
        res.json(veiculos)
    } catch(error){
        res.status(500).json({ error: 'Erro ao buscar veículos do cliente' })
    }
}

export const createVeiculo = async (req, res) => {
    try{
        const {clienteId, marca, modelo, ano, placa, cor, observacao} = req.body
        const veiculo = await prisma.veiculo.create({
            data: { clienteId: Number(clienteId), marca, modelo, ano, placa, cor, observacao }
        })
        res.status(201).json(veiculo)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar veículo' })
    }
}

export const updateVeiculo = async (req, res) => {
    try {
        const { id } = req.params
        const { marca, modelo, ano, placa, cor, observacao } = req.body
        const veiculo = await prisma.veiculo.update({
            where: { id: Number(id) },
            data: { marca, modelo, ano, placa, cor, observacao }
        })
        res.json(veiculo)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar veículo' })
    }
}

export const deleteVeiculo = async (req, res) => {
    try {
        const { id } = req.params
        await prisma.veiculo.delete({
            where: { id: Number(id) }
        })
        res.json({ message: 'Veículo deletado com sucesso' })
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar veículo' })
    }
}
