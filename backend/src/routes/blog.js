import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth, requireAdmin } from '../middleware/auth.js';
const prisma = new PrismaClient();
const router = Router();

router.get('/', async (req,res,next)=>{
  try{
    const { tag, category } = req.query;
    const posts = await prisma.blogPost.findMany({
      where: {
        published: true,
        ...(tag ? { tags: { has: String(tag) }} : {}),
        ...(category ? { categories: { has: String(category) }} : {})
      },
      orderBy: { createdAt: 'desc' },
      select: { id:true, title:true, slug:true, excerpt:true, tags:true, categories:true, createdAt:true, coverImage:true }
    });
    res.json(posts);
  }catch(e){ next(e); }
});

router.get('/:slug', async (req,res,next)=>{
  try{
    const post = await prisma.blogPost.findUnique({ where: { slug: req.params.slug }});
    if(!post || !post.published) return res.status(404).json({ message:'Not found' });
    res.json(post);
  }catch(e){ next(e); }
});

router.post('/', requireAuth, requireAdmin, async (req,res,next)=>{
  try{
    const { title, slug, excerpt, content, coverImage, published, categories=[], tags=[] } = req.body;
    const post = await prisma.blogPost.create({ data: { title, slug, excerpt, content, coverImage, published: !!published, categories, tags, authorId: req.user.sub }});
    res.status(201).json({ id: post.id });
  }catch(e){ next(e); }
});

router.patch('/:id', requireAuth, requireAdmin, async (req,res,next)=>{
  try{
    const data = req.body;
    await prisma.blogPost.update({ where: { id: req.params.id }, data });
    res.json({ ok:true });
  }catch(e){ next(e); }
});

router.delete('/:id', requireAuth, requireAdmin, async (req,res,next)=>{
  try{
    await prisma.blogPost.delete({ where: { id: req.params.id } });
  res.json({ ok:true });
  }catch(e){ next(e); }
});

export default router;
