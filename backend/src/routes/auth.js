import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { signAccess, signRefresh, verifyRefresh } from '../utils/jwt.js';
const prisma = new PrismaClient();
const router = Router();

router.post('/register', async (req,res,next)=>{
  try{
    const { email, password, firstName, lastName } = req.body;
    if(!email || !password || !firstName || !lastName) return res.status(400).json({ message: 'Missing fields' });
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return res.status(409).json({ message: 'Email already in use' });
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({ data: { email, passwordHash, firstName, lastName } });
    const accessToken = signAccess({ sub: user.id, role: user.role });
    const refreshToken = signRefresh({ sub: user.id });
    await prisma.refreshToken.create({ data: { token: refreshToken, userId: user.id, expiresAt: new Date(Date.now()+30*24*3600*1000) }});
    res.status(201).json({ accessToken, refreshToken });
  }catch(e){ next(e); }
});

router.post('/login', async (req,res,next)=>{
  try{
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    const accessToken = signAccess({ sub: user.id, role: user.role });
    const refreshToken = signRefresh({ sub: user.id });
    await prisma.refreshToken.create({ data: { token: refreshToken, userId: user.id, expiresAt: new Date(Date.now()+30*24*3600*1000) }});
    res.json({ accessToken, refreshToken });
  }catch(e){ next(e); }
});

router.post('/refresh', async (req,res,next)=>{
  try{
    const { refreshToken } = req.body;
    const payload = verifyRefresh(refreshToken);
    const db = await prisma.refreshToken.findUnique({ where: { token: refreshToken } });
    if (!db || db.revoked) return res.status(401).json({ message: 'Invalid refresh' });
    const accessToken = signAccess({ sub: payload.sub });
    res.json({ accessToken });
  }catch(e){ next(e); }
});

export default router;
