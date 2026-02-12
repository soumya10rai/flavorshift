import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [selectedRole, setSelectedRole] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleRoleSelect = (role) => {
    setSelectedRole(role)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Store the role and login info
    localStorage.setItem('flavorshift_role', selectedRole)
    // UI-only: no authentication logic
    setEmail('')
    setPassword('')
  }

  const handleSignup = () => {
    navigate('/signup')
  }

  const handleBackToRoles = () => {
    setSelectedRole(null)
    setEmail('')
    setPassword('')
  }

  return (
    <div className="app-wrapper min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-[rgba(255,255,255,0.03)] backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12">
        <h1 className="text-2xl font-bold text-white mb-2 text-center">Login to FlavorShift</h1>

        {!selectedRole ? (
          <div>
            <p className="text-sm text-gray-400 text-center mb-8">Select your role to login</p>

            <div className="space-y-3">
              <button
                onClick={() => handleRoleSelect('research_user')}
                className="w-full px-4 py-3 rounded-full bg-[#c8ff00] hover:bg-[#d9ff33] text-black font-bold text-sm tracking-wide transition-all duration-200 shadow-lg hover:shadow-[0_0_20px_rgba(200,255,0,0.4)] active:scale-95"
              >
                Login as Research User
              </button>

              <button
                onClick={() => handleRoleSelect('system_admin')}
                className="w-full px-4 py-3 rounded-full bg-[#c8ff00] hover:bg-[#d9ff33] text-black font-bold text-sm tracking-wide transition-all duration-200 shadow-lg hover:shadow-[0_0_20px_rgba(200,255,0,0.4)] active:scale-95"
              >
                Login as System Admin
              </button>
            </div>

            <p className="text-sm text-gray-400 mt-8 text-center">
              New user?{' '}
              <button
                onClick={handleSignup}
                className="text-[#c8ff00] hover:text-[#d9ff33] font-semibold transition-colors"
              >
                Sign up
              </button>
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-gray-300">
                Role: <span className="font-semibold text-[#c8ff00] capitalize">{selectedRole.replace('_', ' ')}</span>
              </p>
              <button
                onClick={handleBackToRoles}
                className="text-xs text-gray-400 hover:text-[#c8ff00] underline transition-colors"
              >
                Change role
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="sr-only">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-[rgba(200,255,0,0.3)] focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="sr-only">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-[rgba(200,255,0,0.3)] focus:border-transparent transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full px-4 py-3 mt-6 rounded-full bg-[#c8ff00] hover:bg-[#d9ff33] text-black font-bold text-sm tracking-wide transition-all duration-200 shadow-lg hover:shadow-[0_0_20px_rgba(200,255,0,0.4)] active:scale-95"
              >
                Login
              </button>
            </form>

            <p className="text-sm text-gray-400 mt-8 text-center">
              New user?{' '}
              <button
                onClick={handleSignup}
                className="text-[#c8ff00] hover:text-[#d9ff33] font-semibold transition-colors"
              >
                Sign up
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}