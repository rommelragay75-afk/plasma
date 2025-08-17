import { useState } from 'react'

export default function RegisterPage(){
  const [form,setForm]=useState({ email:'', password:'', firstName:'', lastName:'' })
  const submit = async (e)=>{
    e.preventDefault()
    const r = await fetch('/api/auth/register',{ method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) })
    const j = await r.json()
    if(j.accessToken){
      localStorage.setItem('accessToken', j.accessToken)
      localStorage.setItem('refreshToken', j.refreshToken)
      location.href='/dashboard'
    } else alert('Registration failed')
  }
  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create Account</h1>
      <form onSubmit={submit} className="space-y-4">
        <input className="w-full border rounded px-3 py-2" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
        <input type="password" className="w-full border rounded px-3 py-2" placeholder="Password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} />
        <div className="flex gap-2">
          <input className="flex-1 border rounded px-3 py-2" placeholder="First name" value={form.firstName} onChange={e=>setForm({...form, firstName:e.target.value})} />
          <input className="flex-1 border rounded px-3 py-2" placeholder="Last name" value={form.lastName} onChange={e=>setForm({...form, lastName:e.target.value})} />
        </div>
        <button className="w-full bg-indigo-600 text-white py-2 rounded">Register</button>
      </form>
    </div>
  )
}
