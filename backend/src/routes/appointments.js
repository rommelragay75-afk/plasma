import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth } from '../middleware/auth.js';
const prisma = new PrismaClient();
const router = Router();

router.get('/', requireAuth, async (req,res,next)=>{
  try{
    const where = req.user.role === 'ADMIN' ? {} : { userId: req.user.sub };
    const appts = await prisma.appointment.findMany({ where, orderBy: { start: 'asc' }});
    res.json(appts);
  }catch(e){ next(e); }
});

router.post('/', requireAuth, async (req,res,next)=>{
  try{
    const { title, description, start, end } = req.body;
    const appt = await prisma.appointment.create({ data: { title, description, start: new Date(start), end: new Date(end), userId: req.user.sub }});
    res.status(201).json(appt);
  }catch(e){ next(e); }
});

router.patch('/:id', requireAuth, async (req,res,next)=>{
  try{
    const data = req.body;
    const appt = await prisma.appointment.update({ where: { id: req.params.id }, data });
    res.json(appt);
  }catch(e){ next(e); }
});

router.delete('/:id', requireAuth, async (req,res,next)=>{
  try{
    await prisma.appointment.delete({ where: { id: req.params.id } });
    res.json({ ok:true });
  }catch(e){ next(e); }
});

export default router;
