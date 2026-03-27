import 'dotenv/config'
import cors from "cors"
import express from "express";
import clienteRoutes from './routes/clienteRoutes.js'
import veiculoRoutes from './routes/veiculoRoutes.js'
import produtoRoutes from './routes/produtoRoutes.js'
import ordemServicoRoutes from './routes/ordemServicoRoutes.js'

const app = express()
const port = 3000;

app.use(cors())
app.use(express.json())

app.use('/clientes', clienteRoutes)
app.use('/veiculos', veiculoRoutes)
app.use('/produtos', produtoRoutes)
app.use('/ordens', ordemServicoRoutes)

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));