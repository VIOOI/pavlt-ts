import jwt from 'jsonwebtoken'
import {Express, Request, Response, NextFunction} from 'express';

declare module 'jsonwebtoken' {
	export interface UserJwtPayload extends jwt.JwtPayload {
		user_id: string,
		user_email: string,
		user_name: string,
		user_role: string,
	}
}

export const authorizationToken = ( 
		req: Request, 
		res: Response, 
		next: NextFunction 
	): any => {
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]
	if ( token == null ) return res.status(401).json({ error: 'Token отсутствует' })
	else {
		jwt.verify( token, process.env.ACSSES_TOKEN_SECRET as string, 
			( error, user ) => {
				if ( error ) return res.status(401).json({ error: error.message })
				else {
					req.user! = user
					next()
				}
		} )
	}
}
