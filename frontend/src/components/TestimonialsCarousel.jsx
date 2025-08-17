import { useEffect, useState } from 'react'
export default function TestimonialsCarousel(){
  const items=[
    { quote:'Cut scrap by 32% after plasma activation.', author:'QA Director', company:'ElectroFab' },
    { quote:'Bonding strength doubled vs. flame treatment.', author:'Process Eng', company:'PolyTech' }
  ]
  const [i,setI]=useState(0)
  useEffect(()=>{ const t=setInterval(()=>setI(x=>(x+1)%items.length),4000); return ()=>clearInterval(t)},[])
  const it=items[i]
  return (
    <div className="bg-white rounded-2xl p-6 shadow">
      <p className="italic">“{it.quote}”</p>
      <div className="mt-3 text-sm font-semibold">{it.author} — {it.company}</div>
    </div>
  )
}
