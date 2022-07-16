import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
// import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'
import { jwtTokens } from '../_utils/jwt-helpers';
import jwt from 'jsonwebtoken'

dotenv.config();
export const prisma = new PrismaClient()
const app: express.Application = express()

app.get( '/api/auth/refresh_token', ( req: Request, res: Response ) => {
	try {
		const refreshToken = req.cookies.refresh_token; 
		if ( refreshToken === null ) return res.status(401).json({ error: 'RefreshToken отсутствует' })
		jwt.verify( refreshToken, process.env.REFRESH_TOKEN_SECRET!,
			( error: any, user: any ): any => {
				if (error) return res.status(403).json({ errorq: error.message })
				else{
					console.log( user )
					let tokens = jwtTokens({
						user_id: user.user_id,
						user_name: user.user_name,
						user_email: user.user_email,
						user_role: user.user_role,
					})
					res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true })
					res.json(tokens)
				}
		} )
	} catch (error: any) {
		/* handle error */
		res.status(401).json({ errorc: error.message })
	}
} )

app.delete( '/api/auth/refresh_token', ( req: Request, res: Response ) => {
	try {
		res.clearCookie('refresh_token')
		return res.status(200).json({ message: 'RefreshToken удалён' })
	} catch (error: any) {
		/* handle error */
		res.status(401).json({ errorc: error.message })
	}
} )

export default app
