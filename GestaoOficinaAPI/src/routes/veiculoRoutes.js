import { Router } from "express";
import { getVeiculos, getVeiculoById, getVeiculosByCliente, createVeiculo, updateVeiculo, deleteVeiculo } from "../controllers/veiculoController.js";

const router = Router()

router.get('/', getVeiculos)
router.get('/:id', getVeiculoById)
router.get('/cliente/:clienteId', getVeiculosByCliente)
router.post('/', createVeiculo)
router.put('/:id', updateVeiculo)
router.delete('/:id', deleteVeiculo)

export default router