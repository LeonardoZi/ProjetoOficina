import { Router } from 'express'
import {
    getOrdens, getOrdemById, getOrdensByCliente, getOrdensByStatus,
    createOrdem, updateOrdem, deleteOrdem,
    addItem, removeItem,
    addServico, removeServico
} from '../controllers/ordemServicoController.js'

const router = Router()

router.get('/', getOrdens)
router.get('/status/:status', getOrdensByStatus)
router.get('/cliente/:clienteId', getOrdensByCliente)
router.get('/:id', getOrdemById)
router.post('/', createOrdem)
router.put('/:id', updateOrdem)
router.delete('/:id', deleteOrdem)

router.post('/itens', addItem)
router.delete('/itens/:id', removeItem)

router.post('/servicos', addServico)
router.delete('/servicos/:id', removeServico)

export default router