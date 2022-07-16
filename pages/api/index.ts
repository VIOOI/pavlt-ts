import express, { json, Request, Response } from 'express'
import cors, { CorsOptions } from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
// import { dirname, join } from 'path'
// import { fileURLToPath } from 'url'

dotenv.config();

const app: express.Application = express()
const corsOptions: CorsOptions = {
	credentials: true,
	origin: process.env.URL || '*',
}

app.use(cors(corsOptions))
app.use(json())
app.use(cookieParser())

app.get( '/api', async ( req: Request, res: Response ) => {
	res.status(200).json({ mess: 'Hello' })
} )

export default app
