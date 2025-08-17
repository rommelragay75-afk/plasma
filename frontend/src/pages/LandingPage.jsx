import HeroSection from '../components/HeroSection.jsx'
import TestimonialsCarousel from '../components/TestimonialsCarousel.jsx'
import BookingCalendar from '../components/BookingCalendar.jsx'

export default function LandingPage(){
  return (
    <div className="space-y-12">
      <HeroSection onCTA={()=>alert('Open booking modal')} />
      <section className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold">Our Services</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border p-4 bg-white shadow"><div className="font-semibold">Line Integration</div><div className="text-sm mt-2">Custom inline plasma modules.</div></div>
            <div className="rounded-xl border p-4 bg-white shadow"><div className="font-semibold">Process Development</div><div className="text-sm mt-2">Surface activation programs.</div></div>
          </div>
          <h2 className="text-2xl font-bold">Testimonials</h2>
          <TestimonialsCarousel />
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Book a Consultation</h2>
          <BookingCalendar onDateClick={(d)=>alert(`Selected ${d}`)} />
        </div>
      </section>
    </div>
  )
}
