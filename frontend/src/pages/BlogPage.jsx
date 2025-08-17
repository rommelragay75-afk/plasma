import { useEffect, useState } from 'react'

export default function BlogPage(){
  const [posts,setPosts]=useState([])
  useEffect(()=>{ fetch('/api/blog').then(r=>r.json()).then(setPosts).catch(()=>{}) },[])
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Engineering Blog</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {posts.map(p=>(
          <article key={p.id} className="bg-white rounded-xl border p-4 shadow">
            <h3 className="text-xl font-semibold">{p.title}</h3>
            <p className="text-sm mt-2 opacity-80">{p.excerpt}</p>
            <div className="text-xs mt-3 opacity-60">{new Date(p.createdAt).toLocaleDateString()}</div>
          </article>
        ))}
      </div>
    </div>
  )
}
