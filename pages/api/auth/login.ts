import express, { json, Request, Response } from 'express'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import { PrismaClient, Prisma } from '@prisma/client'
import { jwtTokens } from '../_utils/jwt-helpers';

dotenv.config();
export const prisma = new PrismaClient()
const app: express.Application = express()

app.post( '/api/auth/login', async ( req: Request, res: Response ) => {
	try {
		console.log( req.body )
		const { email, password } = req.body
		// Проверка электронной почты
		const user = await prisma.users.findFirst({
			where: { user_email: email }
		})
		if (!user) { res.status(401).json({ error: 'Email некоректный' }) }
		else{
			// Проверка пороля
			const validPassword = await bcrypt.compare( password, user.user_password )
			if (!validPassword) { res.status(401).json({ error: 'Пароль неверный' }) }
			else{
				// JWT
				let tokens = jwtTokens({
					user_id: user.user_id,
					user_name: user.user_name,
					user_email: user.user_email,
					user_role: user.user_role,
				})
				res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true })
				res.json(tokens)
			}
			
		}
	} catch (error: any) {
		/* handle error */
		res.status(401).json({ error: error.message })
		prisma.$disconnect()
	}
} )

export default app

