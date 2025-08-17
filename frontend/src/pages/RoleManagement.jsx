import { useEffect, useState } from 'react'
import { AdminOnly } from '../components/ProtectedRoute.jsx'

export default function RoleManagement(){
  const [users,setUsers]=useState([])
  const token = localStorage.getItem('accessToken')
  useEffect(()=>{
    fetch('/api/users',{ headers:{ Authorization:`Bearer ${token}` }}).then(r=>r.json()).then(setUsers).catch(()=>{})
  },[])
  const changeRole = async (id, role)=>{
    await fetch('/api/users/'+id, { method:'PATCH', headers:{ 'Content-Type':'application/json', Authorization:`Bearer ${token}` }, body: JSON.stringify({ role }) })
    setUsers(u=>u.map(x=> x.id===id ? { ...x, role } : x))
  }
  return (
    <AdminOnly>
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Role Management</h1>
        <table className="w-full text-sm">
          <thead><tr><th>Email</th><th>Name</th><th>Role</th><th>Action</th></tr></thead>
          <tbody>
            {users.map(u=>(<tr key={u.id} className="border-t"><td>{u.email}</td><td>{u.firstName} {u.lastName}</td><td>{u.role}</td><td><button className="mr-2" onClick={()=>changeRole(u.id,'ADMIN')}>Make Admin</button><button onClick={()=>changeRole(u.id,'CLIENT')}>Make Client</button></td></tr>))}
          </tbody>
        </table>
      </div>
    </AdminOnly>
  )
}
