import express, {Request, Response} from "express";
import { router } from './routes';

const app = express()

app.use(express.json()) // Permitir arquivos json
app.use(router) // Utilizar as rotas da pasta routes

// Conferindo express
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({success: 'connected...'})
})

// Config portas
const port: number = 4000
app.listen(port, () => {
    console.log(`Application running on: http://localhost:${port}`)
})