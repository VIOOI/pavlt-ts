
import express, { json, Request, Response } from 'express'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import cors, { CorsOptions } from 'cors'
import cookieParser from 'cookie-parser'
import { PrismaClient, Prisma } from '@prisma/client'
import { authorizationToken } from '../_middleware/authorization'

dotenv.config();
export const prisma = new PrismaClient()
const app: express.Application = express()

app.get( '/api/users', authorizationToken, async ( _req: Request, res: Response ) => {
	try {
		const users = await prisma.users.findMany({})
		res.json(users)
		prisma.$disconnect()
	} catch (error: any) {
		/* handle error */
		res.status(500).json({ error: error.message })
		prisma.$disconnect()
	}
} )

app.post( '/api/users', async ( req: Request, res: Response ) => {
	try {
		console.log( req.body )
		const heshedPassword = await bcrypt.hash( req.body.password, 10 )
		const newUser = await prisma.users.create({
			data: {
				user_name: req.body.name,
				user_email: req.body.email,
				user_password: heshedPassword,
				user_first_name: req.body.first_name,
				user_last_name: req.body.last_name,
			}
		})
		res.json(newUser)
	} catch (error: any) {
		/* handle error */
		res.status(500).json({ error: error.message })
		prisma.$disconnect()
	}
} )

export default app

