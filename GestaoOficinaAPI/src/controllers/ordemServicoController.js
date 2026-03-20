import prisma from '../lib/prisma.js'

export const getOrdens = async (req, res) => {
    try {
        const ordens = await prisma.ordemServico.findMany({
            include: {
                cliente: true,
                veiculo: true,
                itens: { include: { produto: true } },
                servicos: true
            }
        })
        res.json(ordens)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar ordens' })
    }
}

export const getOrdemById = async (req, res) => {
    try {
        const { id } = req.params
        const ordem = await prisma.ordemServico.findUnique({
            where: { id: Number(id) },
            include: {
                cliente: true,
                veiculo: true,
                itens: { include: { produto: true } },
                servicos: true
            }
        })
        if (!ordem) return res.status(404).json({ error: 'Ordem não encontrada' })
        res.json(ordem)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar ordem' })
    }
}

export const getOrdensByCliente = async (req, res) => {
    try {
        const { clienteId } = req.params
        const ordens = await prisma.ordemServico.findMany({
            where: { clienteId: Number(clienteId) },
            include: { veiculo: true, itens: true, servicos: true }
        })
        if (!ordens) return res.status(404).json({ error: 'Nenhuma ordem encontrada' })
        res.json(ordens)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar ordens do cliente' })
    }
}

export const getOrdensByStatus = async (req, res) => {
    try {
        const { status } = req.params
        const ordens = await prisma.ordemServico.findMany({
            where: { status },
            include: { cliente: true, veiculo: true }
        })
        res.json(ordens)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar ordens por status' })
    }
}

export const createOrdem = async (req, res) => {
    try {
        const { clienteId, veiculoId, kmEntrada, tipo, reclamacao, descricao, dataAgendada } = req.body
        const ordem = await prisma.ordemServico.create({
            data: {
                clienteId: Number(clienteId),
                veiculoId: veiculoId ? Number(veiculoId) : null,
                kmEntrada,
                tipo,
                reclamacao,
                descricao,
                dataAgendada: dataAgendada ? new Date(dataAgendada) : null,
            }
        })
        res.status(201).json(ordem)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar ordem' })
    }
}

export const updateOrdem = async (req, res) => {
    try {
        const { id } = req.params
        const { kmEntrada, kmSaida, tipo, reclamacao, descricao, status, dataAgendada, dataConclusao, valorTotal } = req.body
        const ordem = await prisma.ordemServico.update({
            where: { id: Number(id) },
            data: {
                kmEntrada,
                kmSaida,
                tipo,
                reclamacao,
                descricao,
                status,
                dataAgendada: dataAgendada ? new Date(dataAgendada) : undefined,
                dataConclusao: dataConclusao ? new Date(dataConclusao) : undefined,
                valorTotal
            }
        })
        res.json(ordem)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar ordem' })
    }
}

export const deleteOrdem = async (req, res) => {
    try {
        const { id } = req.params
        await prisma.ordemServico.delete({
            where: { id: Number(id) }
        })
        res.json({ message: 'Ordem deletada com sucesso' })
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar ordem' })
    }
}

export const addItem = async (req, res) => {
    try {
        const { ordemId, produtoId, quantidade, valorUnitario } = req.body
        
        const item = await prisma.itemOS.create({
            data: {
                ordemId: Number(ordemId),
                produtoId: Number(produtoId),
                quantidade,
                valorUnitario
            }
        })

        await prisma.produto.update({
            where: { id: Number(produtoId) },
            data: { quantidade: { decrement: quantidade } }
        })

        res.status(201).json(item)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao adicionar item' })
    }
}

export const removeItem = async (req, res) => {
    try {
        const { id } = req.params
        const item = await prisma.itemOS.findUnique({ where: { id: Number(id) } })

        await prisma.produto.update({
            where: { id: item.produtoId },
            data: { quantidade: { increment: item.quantidade } }
        })

        await prisma.itemOS.delete({ where: { id: Number(id) } })
        res.json({ message: 'Item removido com sucesso' })
    } catch (error) {
        res.status(500).json({ error: 'Erro ao remover item' })
    }
}


export const addServico = async (req, res) => {
    try {
        const { ordemId, descricao, valor } = req.body
        const servico = await prisma.servicoOS.create({
            data: { ordemId: Number(ordemId), descricao, valor }
        })
        res.status(201).json(servico)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao adicionar serviço' })
    }
}

export const removeServico = async (req, res) => {
    try {
        const { id } = req.params
        await prisma.servicoOS.delete({ where: { id: Number(id) } })
        res.json({ message: 'Serviço removido com sucesso' })
    } catch (error) {
        res.status(500).json({ error: 'Erro ao remover serviço' })
    }
}