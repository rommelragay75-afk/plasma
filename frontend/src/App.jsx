import { Routes, Route, Link } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import BlogPage from './pages/BlogPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import Dashboard from './pages/Dashboard.jsx'

export default function App(){
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex gap-6 items-center">
          <Link to="/" className="font-bold">Plasma Industrial</Link>
          <nav className="text-sm gap-4 flex">
            <Link to="/blog">Blog</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/dashboard">Portal</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/blog" element={<BlogPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
      </main>
      <footer className="text-center text-sm py-6 text-slate-500">© 2025 Plasma Industrial Corporation</footer>
    </div>
  )
}
