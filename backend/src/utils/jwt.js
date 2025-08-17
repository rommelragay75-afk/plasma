import jwt from 'jsonwebtoken'

const ACCESS_TTL = '15m'
const REFRESH_TTL = '30d'
const SECRET = process.env.JWT_SECRET || 'devsecret'
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'devrefresh'

export const signAccess = (claims)=> jwt.sign({ ...claims }, SECRET, { expiresIn: ACCESS_TTL })
export const signRefresh = (claims)=> jwt.sign({ ...claims }, REFRESH_SECRET, { expiresIn: REFRESH_TTL })
export const verifyRefresh = (token)=> jwt.verify(token, REFRESH_SECRET)
