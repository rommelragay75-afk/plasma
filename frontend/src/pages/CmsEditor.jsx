import { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

export default function CmsEditor(){
  const [title,setTitle]=useState('')
  const [content,setContent]=useState('')
  const save = async ()=>{
    const token = localStorage.getItem('accessToken')
    await fetch('/api/blog', { method:'POST', headers:{ 'Content-Type':'application/json', Authorization:`Bearer ${token}` }, body: JSON.stringify({ title, slug: title.toLowerCase().replace(/\s+/g,'-'), excerpt: '', content, published: true, categories: [], tags: [] })})
    alert('Saved')
  }
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">CMS Editor</h1>
      <input className="w-full border rounded px-3 py-2 mb-3" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
      <ReactQuill theme="snow" value={content} onChange={setContent} />
      <div className="mt-4"><button onClick={save} className="px-4 py-2 bg-indigo-600 text-white rounded">Publish</button></div>
    </div>
  )
}
