import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

prisma.$connect()
    .then(() => console.log("Banco de dados conectado"))
    .catch((error) => {
        console.error("Erro ao conectar ao banco:", error)
        process.exit(1)
    })

export default prisma