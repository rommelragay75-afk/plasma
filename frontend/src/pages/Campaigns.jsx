import { useState } from 'react'
import { AdminOnly } from '../components/ProtectedRoute.jsx'

export default function Campaigns(){
  const [subject,setSubject]=useState('')
  const [content,setContent]=useState('')
  const send = async ()=>{
    const token = localStorage.getItem('accessToken')
    const r = await fetch('/api/campaigns/send', { method:'POST', headers:{ 'Content-Type':'application/json', Authorization:`Bearer ${token}` }, body: JSON.stringify({ subject, content, segment: 'all' }) })
    const j = await r.json()
    alert('Simulated send: ' + JSON.stringify(j))
  }
  return (
    <AdminOnly>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Email Campaigns</h1>
        <input className="w-full border rounded px-3 py-2 mb-3" placeholder="Subject" value={subject} onChange={e=>setSubject(e.target.value)} />
        <textarea className="w-full border rounded px-3 py-2 mb-3" rows="6" placeholder="Email content" value={content} onChange={e=>setContent(e.target.value)} />
        <button onClick={send} className="px-4 py-2 bg-indigo-600 text-white rounded">Send (Simulated)</button>
      </div>
    </AdminOnly>
  )
}
