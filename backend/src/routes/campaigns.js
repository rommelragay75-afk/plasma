import { Router } from 'express'
import { requireAuth, requireAdmin } from '../middleware/auth.js'
// Placeholder: use @sendgrid/mail in production
const router = Router()

router.post('/send', requireAuth, requireAdmin, async (req,res,next)=>{
  try{
    const { subject, content, segment } = req.body
    // In production: fetch users by segment, call SendGrid API to send templated mail
    console.log('Campaign send requested', subject, segment)
    res.json({ sentToCount: 0, message: 'Simulated send (configure SendGrid in production)' })
  }catch(e){ next(e) }
})

export default router
