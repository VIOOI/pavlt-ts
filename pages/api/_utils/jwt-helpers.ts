import jwt from 'jsonwebtoken'

interface IPropsJwtTokens {
	user_id: string,
	user_name: string,
	user_email: string,
	user_role: string
}

type TJwtTokens = ( 
		user: IPropsJwtTokens
	) => { 
		acssesToken: string,
		refreshToken: string
	}

export const jwtTokens: TJwtTokens = ( user ) => {
	const acssesToken = jwt.sign( 
		user, 
		process.env.ACSSES_TOKEN_SECRET!, 
		{ expiresIn: '15m' }  // 15 минут
	)
	const refreshToken = jwt.sign( 
		user, 
		process.env.REFRESH_TOKEN_SECRET!, 
		{ expiresIn: '14d' }  // 14 дней
	)
	return { acssesToken, refreshToken }
}
