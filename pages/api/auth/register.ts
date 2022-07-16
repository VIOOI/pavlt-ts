import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'

dotenv.config();

const app: Express = express()

app.post('/api/user/auth/register', ( req, res ) => {
	res.send( 'Register' )
})

export default app

