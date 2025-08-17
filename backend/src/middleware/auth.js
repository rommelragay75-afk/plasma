import jwt from 'jsonwebtoken'

export function requireAuth(req,res,next){
  const hdr = req.headers.authorization || ''
  const token = hdr.startsWith('Bearer ') ? hdr.slice(7) : null
  if(!token) return res.status(401).json({ message:'Unauthorized' })
  try{
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'devsecret')
    req.user = payload
    next()
  }catch(e){ return res.status(401).json({ message:'Invalid token' })}
}

export function requireAdmin(req,res,next){
  if(req.user?.role === 'ADMIN' || req.user?.isAdmin) return next()
  return res.status(403).json({ message:'Forbidden' })
}
