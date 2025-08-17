import { useEffect, useState } from 'react'

export default function Dashboard(){
  const [appts,setAppts]=useState([])
  const token = localStorage.getItem('accessToken')
  useEffect(()=>{
    if(!token){ location.href='/login'; return; }
    fetch('/api/appointments', { headers:{ Authorization: `Bearer ${token}`}})
      .then(r=>r.json()).then(setAppts).catch(()=>{})
  },[])
  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-6">
      <h1 className="text-3xl font-bold">Client Portal</h1>
      <div className="bg-white rounded-xl border p-4 shadow">
        <div className="font-semibold mb-3">Your Appointments</div>
        <ul className="text-sm space-y-2">
          {appts.map(a=>(<li key={a.id}>• {a.title} — {new Date(a.start).toLocaleString()}</li>))}
        </ul>
      </div>
    </div>
  )
}
