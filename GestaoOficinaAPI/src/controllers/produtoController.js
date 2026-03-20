import prisma from "../lib/prisma.js";

export const getProdutos = async (req, res) =>{
    try{
        const produtos = await prisma.produto.findMany()
        res.json(produtos)
    } catch(error){
        res.status(500).json({ error: 'Erro ao buscar produtos' })
    }
}

export const getProdutoById = async (req, res) => {
    try {
        const { id } = req.params
        const produto = await prisma.produto.findUnique({
            where: { id: Number(id) }
        })
        if (!produto) return res.status(404).json({ error: 'Produto não encontrado' })
        res.json(produto)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar produto' })
    }
}

export const getProdutosByCategoria = async (req, res) => {
    try {
        const { categoria } = req.params
        const produtos = await prisma.produto.findMany({
            where: { categoria }
        })
        res.json(produtos)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar produtos por categoria' })
    }
}

export const getCategorias = async (req, res) => {
    try {
        const categorias = await prisma.produto.findMany({
            select: { categoria: true },
            distinct: ['categoria'],
        })
        res.json(categorias.map(c => c.categoria))
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar categorias' })
    }
}

export const createProduto = async (req, res) => {
    try {
        const { nome, quantidade, categoria, precoCompra, precoVenda } = req.body
        const produto = await prisma.produto.create({
            data: { nome, quantidade, categoria, precoCompra, precoVenda }
        })
        res.status(201).json(produto)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar produto' })
    }
}

export const updateProduto = async (req, res) => {
    try {
        const { id } = req.params
        const { nome, quantidade, categoria, precoCompra, precoVenda } = req.body
        const produto = await prisma.produto.update({
            where: { id: Number(id) },
            data: { nome, quantidade, categoria, precoCompra, precoVenda }
        })
        res.json(produto)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar produto' })
    }
}

export const deleteProduto = async (req, res) => {
    try {
        const { id } = req.params
        await prisma.produto.delete({
            where: { id: Number(id) }
        })
        res.json({ message: 'Produto deletado com sucesso' })
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar produto' })
    }
}