import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth, requireAdmin } from '../middleware/auth.js';
const prisma = new PrismaClient();
const router = Router();

router.get('/', requireAuth, requireAdmin, async (req,res,next)=>{
  try{
    const users = await prisma.user.findMany({ select: { id:true, email:true, firstName:true, lastName:true, role:true, createdAt:true }});
    res.json(users);
  }catch(e){ next(e); }
});

router.get('/:id', requireAuth, async (req,res,next)=>{
  try{
    const user = await prisma.user.findUnique({ where: { id: req.params.id }, select: { id:true, email:true, firstName:true, lastName:true, role:true }});
    if(!user) return res.status(404).json({ message:'Not found' });
    res.json(user);
  }catch(e){ next(e); }
});

router.patch('/:id', requireAuth, requireAdmin, async (req,res,next)=>{
  try{
    const { firstName, lastName, role } = req.body;
    const user = await prisma.user.update({ where: { id: req.params.id }, data: { firstName, lastName, role }});
    res.json({ id:user.id });
  }catch(e){ next(e); }
});

router.delete('/:id', requireAuth, requireAdmin, async (req,res,next)=>{
  try{
    await prisma.user.delete({ where: { id: req.params.id } });
    res.json({ ok:true });
  }catch(e){ next(e); }
});

export default router;
