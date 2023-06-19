import express, {Request, Response} from "express";
import { router } from './routes';
import cors from 'cors';
import * as dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT

const app = express()

app.use(cors())
app.use(express.json()) // Permitir arquivos json
app.use(router) // Utilizar as rotas da pasta routes

// Conferindo express
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({success: 'connected...'})
})

// Config portas
app.listen(port, () => {
    console.log(`Application running on: http://localhost:${port}`)
})