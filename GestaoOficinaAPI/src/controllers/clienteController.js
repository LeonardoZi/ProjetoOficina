import prisma from '../lib/prisma.js'

export const getClients = async (req, res) => {
    try {
        const clientes = await prisma.cliente.findMany({
            include: { veiculos: true}
        })
        res.json(clientes)
    }   catch (error) {
            res.status(500).json({ error: 'Erro ao buscar clientes' })
    }
}

export const getClientById = async (req, res) => {
    try {
        const { id } = req.params
        const cliente = await prisma.cliente.findUnique({
            where: { id: Number(id)},
            include: { veiculos: true, ordens: true}
        })
        if (!cliente) return res.status(404).json({error: 'Cliente não encontrado'})
        res.json(cliente)
    }   catch (error) {
            res.status(500).json({error: 'Erro ao buscar cliente'})
    }
}

export const createClient = async (req, res) => {
    try{
        const {nome, telefone, email, cpf} = req.body
        const cliente = await prisma.cliente.create({
            data: { nome, telefone, email, cpf}
        })
        res.status(201).json(cliente)
    } catch(error) {
        res.status(500).json({ error: 'Erro ao criar cliente'})
    }
}

export const updateClient = async (req, res) => {
    try{
        const {id} = req.params
        const {nome, telefone, email, cpf} = req.body
        const cliente = await prisma.cliente.update({
            where: {id: Number(id)},
            data: {nome, telefone, email, cpf}
        })
        res.json(cliente)
    } catch(error) {
        res.status(500).json({error: 'Erro ao atualizar cliente'})
    }
}

export const deleteClient = async (req, res) => {
    try{
        const {id} = req.params
        await prisma.cliente.delete({
            where: {id: Number(id)}
        })
        res.json({message: 'Cliente deletado com sucesso'})
    } catch(error){
        res.status(500).json({error: 'Erro ao deletar cliente'})
    }
}

