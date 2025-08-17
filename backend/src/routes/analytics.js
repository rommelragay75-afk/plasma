import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { requireAuth, requireAdmin } from '../middleware/auth.js'
const prisma = new PrismaClient()
const router = Router()

router.get('/kpis', requireAuth, requireAdmin, async (req,res,next)=>{
  try{
    const users = await prisma.user.count()
    const posts = await prisma.blogPost.count()
    res.json({ users, posts, timestamp: Date.now() })
  }catch(e){ next(e) }
})

router.get('/timeseries', requireAuth, requireAdmin, async (req,res,next)=>{
  try{
    // simple example: users created per day for last 7 days
    const now = new Date()
    const days = []
    for(let i=6;i>=0;i--){
      const d = new Date(now); d.setDate(now.getDate() - i)
      const start = new Date(d); start.setHours(0,0,0,0)
      const end = new Date(d); end.setHours(23,59,59,999)
      const count = await prisma.user.count({ where: { createdAt: { gte: start, lte: end } } })
      days.push({ date: start.toISOString().slice(0,10), count })
    }
    res.json(days)
  }catch(e){ next(e) }
})

export default router
