import { Router } from "express";
import { getProdutos, getProdutoById, getProdutosByCategoria, getCategorias, createProduto, updateProduto, deleteProduto } from '../controllers/produtoController.js'

const router = Router()

router.get('/', getProdutos)
router.get('/categorias', getCategorias)
router.get('/categoria/:categoria', getProdutosByCategoria)
router.get('/:id', getProdutoById)
router.post('/', createProduto)
router.put('/:id', updateProduto)
router.delete('/:id', deleteProduto)

export default router