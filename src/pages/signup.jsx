import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../firebase'

export default function Signup() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGoogleSignup = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const result = await signInWithPopup(auth, googleProvider)
      console.log('User authenticated:', result.user)
      navigate('/dashboard')
    } catch (error) {
      console.error('Google sign-in error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-wrapper min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-[rgba(255,255,255,0.03)] backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-10">
        <h1 className="text-2xl font-bold text-white mb-1">Create a FlavorShift Account</h1>
        <p className="text-sm text-gray-300 mb-6">Join the computational flavor modeling platform</p>

        <div className="space-y-4">
          <button onClick={handleGoogleSignup} disabled={loading} className="w-full flex items-center justify-center gap-3 bg-white/6 hover:bg-white/8 transition rounded-full py-3 text-white font-semibold disabled:opacity-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 48 48" fill="none">
              <path fill="#EA4335" d="M24 9.5c3.6 0 6.59 1.24 8.98 3.26l6.7-6.7C35.75 2.62 30.16 0 24 0 14.87 0 6.9 5.39 2.76 13.3l7.78 6.03C12.9 13 17.97 9.5 24 9.5z"/>
            </svg>
            {loading ? 'Signing in...' : 'Continue with Google'}
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-white/6" />
            <div className="text-sm text-gray-400">or</div>
            <div className="flex-1 h-px bg-white/6" />
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
            <label className="sr-only">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-md bg-white/5 border border-white/8 text-white outline-none focus:ring-2 focus:ring-[rgba(45,208,122,0.12)]"
            />

            <label className="sr-only">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-md bg-white/5 border border-white/8 text-white outline-none focus:ring-2 focus:ring-[rgba(45,208,122,0.12)]"
            />

            <label className="sr-only">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full p-3 rounded-md bg-white/5 border border-white/8 text-white outline-none focus:ring-2 focus:ring-[rgba(45,208,122,0.12)]"
            />

            <button type="submit" className="w-full mt-2 bg-[var(--pill)] text-[#071014] font-semibold py-3 rounded-full hover:scale-[1.01] transition-transform">Create Account</button>
          </form>

          <div className="text-sm text-gray-300 text-center mt-3">
            Already have an account? <a href="/login" className="underline">Login</a>
          </div>
        </div>
      </div>
    </div>
  )
}
