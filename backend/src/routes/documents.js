import { Router } from 'express';
import multer from 'multer';
import { PrismaClient } from '@prisma/client';
import { requireAuth } from '../middleware/auth.js';
const prisma = new PrismaClient();
const router = Router();

const upload = multer({ dest: 'uploads/', limits: { fileSize: 10 * 1024 * 1024 } });

router.get('/', requireAuth, async (req,res,next)=>{
  try{
    const where = req.user.role === 'ADMIN' ? {} : { userId: req.user.sub };
    const docs = await prisma.document.findMany({ where, orderBy: { createdAt: 'desc' }});
    res.json(docs);
  }catch(e){ next(e); }
});

router.post('/upload', requireAuth, upload.single('file'), async (req,res,next)=>{
  try{
    const file = req.file;
    const doc = await prisma.document.create({
      data: {
        userId: req.user.sub,
        filename: file.originalname,
        mimeType: file.mimetype,
        url: file.path
      }
    });
    res.status(201).json(doc);
  }catch(e){ next(e); }
});

router.delete('/:id', requireAuth, async (req,res,next)=>{
  try{
    await prisma.document.delete({ where: { id: req.params.id }});
    res.json({ ok:true });
  }catch(e){ next(e); }
});

export default router;
