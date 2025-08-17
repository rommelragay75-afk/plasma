import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth, requireAdmin } from '../middleware/auth.js';
const prisma = new PrismaClient();
const router = Router();

router.get('/metrics', requireAuth, requireAdmin, async (req,res,next)=>{
  try{
    const [users, posts, appts, payments] = await Promise.all([
      prisma.user.count(),
      prisma.blogPost.count({ where: { published: true }}),
      prisma.appointment.count(),
      prisma.payment.count({ where: { status: 'SUCCEEDED' }}),
    ]);
    const revenueAgg = await prisma.payment.aggregate({ _sum: { amountCents: true }, where: { status: 'SUCCEEDED' } });
    res.json({
      users, posts, appts, payments,
      revenueCents: revenueAgg._sum.amountCents || 0
    });
  }catch(e){ next(e); }
});

export default router;
