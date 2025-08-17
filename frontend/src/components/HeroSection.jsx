export default function HeroSection({ onCTA }){
  return (
    <section className="bg-gradient-to-r from-slate-900 to-indigo-800 text-white">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <h1 className="text-4xl md:text-6xl font-bold">Plasma Surface Treatment & Automation</h1>
        <p className="mt-4 max-w-2xl text-lg opacity-90">
          Raise adhesion, reduce defects, and accelerate throughput with advanced plasma systems.
        </p>
        <button onClick={onCTA} className="mt-8 px-6 py-3 bg-amber-400 text-slate-900 rounded-lg font-semibold">
          Book a Consultation
        </button>
      </div>
    </section>
  )
}
