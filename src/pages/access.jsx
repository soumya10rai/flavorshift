import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Access() {
  const [selected, setSelected] = useState('')
  const navigate = useNavigate()

  const chooseRole = (role) => {
    setSelected(role)
    try {
      localStorage.setItem('flavorshift_role', role)
    } catch (e) {
      // ignore storage errors
    }
    // small delay so user sees the selection effect
    setTimeout(() => navigate('/login'), 250)
  }

  return (
    <div className="app-wrapper min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-[rgba(255,255,255,0.03)] backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">FlavorShift Access Portal</h1>
        <p className="text-sm text-gray-300 mb-6">Select your access role</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => chooseRole('research')}
            className={`text-left p-6 rounded-xl transition transform bg-[rgba(255,255,255,0.02)] border border-white/8 hover:-translate-y-1 hover:shadow-2xl focus:outline-none ${selected === 'research' ? 'ring-4 ring-[rgba(45,208,122,0.12)]' : ''}`}
          >
            <h3 className="text-white font-semibold text-lg">Research User</h3>
            <p className="text-sm text-gray-300 mt-2">For researchers and developers exploring flavor transformation.</p>
          </button>

          <button
            onClick={() => chooseRole('admin')}
            className={`text-left p-6 rounded-xl transition transform bg-[rgba(255,255,255,0.02)] border border-white/8 hover:-translate-y-1 hover:shadow-2xl focus:outline-none ${selected === 'admin' ? 'ring-4 ring-[rgba(45,208,122,0.12)]' : ''}`}
          >
            <h3 className="text-white font-semibold text-lg">System Admin</h3>
            <p className="text-sm text-gray-300 mt-2">Restricted access for system configuration and dataset management.</p>
          </button>
        </div>
      </div>
    </div>
  )
}
