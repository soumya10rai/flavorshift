import React, { useState } from 'react'
import '../App.css'

export default function Dashboard() {
  const [dishInput, setDishInput] = useState('')
  const [ingredientsInput, setIngredientsInput] = useState('')
  const [spiceSlider, setSpiceSlider] = useState(50)
  const [umami, setUmami] = useState(50)
  const [sour, setSour] = useState(50)
  const [herbal, setHerbal] = useState(50)
  const [creamy, setCreamy] = useState(50)
  const [targetCuisine, setTargetCuisine] = useState('Indian')
  const [isLoading, setIsLoading] = useState(false)

  const cuisines = ['Indian', 'Mexican', 'Thai', 'Italian', 'Japanese', 'Mediterranean']

  return (
    <div className="app-wrapper min-h-screen">
      {/* Decorative glow circles - same as landing */}
      <div className="bg-decor circle-a" style={{ position: 'fixed', right: '-80px', top: '-60px' }} />
      <div className="bg-decor circle-b" style={{ position: 'fixed', left: '-90px', bottom: '-80px' }} />

      {/* Navigation */}
      <nav className="relative z-50 backdrop-blur-sm bg-[rgba(15,23,32,0.8)] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="brand text-4xl">
              <span className="brand--green">Flavor</span>
              <span className="brand--white">Shift<span className="brand--dot">.</span></span>
            </h1>
          </div>
          <div className="flex gap-12 text-sm text-gray-300">
            <a href="#" className="hover:text-white transition">Dashboard</a>
            <a href="#" className="hover:text-white transition">History</a>
            <a href="#" className="hover:text-white transition">About</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-20">
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
            Computational Flavor <span className="text-[#2ed07a]">Transformation</span> Studio
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl">
            Analyze dishes in chemical flavor space. Transform across cuisines. Discover new flavor combinations.
          </p>
        </div>

        {/* 3-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* LEFT PANEL - Input & Preferences */}
          <div className="lg:col-span-3 space-y-6">
            {/* Dish Analysis Card */}
            <div className="bg-[rgba(255,255,255,0.04)] backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-2xl">
              <h3 className="text-[#2ed07a] font-bold mb-4 text-sm uppercase tracking-wide">🍽️ Analyze Dish</h3>
              <input
                type="text"
                placeholder="Dish name"
                value={dishInput}
                onChange={(e) => setDishInput(e.target.value)}
                className="w-full bg-[rgba(0,0,0,0.3)] border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 text-sm mb-3 focus:outline-none focus:border-[#2ed07a]/50 transition"
              />
              <textarea
                placeholder="Ingredients (comma-separated)"
                value={ingredientsInput}
                onChange={(e) => setIngredientsInput(e.target.value)}
                className="w-full bg-[rgba(0,0,0,0.3)] border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 text-sm h-24 mb-4 focus:outline-none focus:border-[#2ed07a]/50 transition resize-none"
              />
              <button 
                onClick={() => setIsLoading(true)}
                className="w-full bg-[var(--pill)] text-[#071014] font-bold py-3 rounded-full transition hover:brightness-95 active:scale-95"
              >
                {isLoading ? '⏳ Analyzing...' : '→ Analyze'}
              </button>
            </div>

            {/* Preferences Card */}
            <div className="bg-[rgba(255,255,255,0.04)] backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-2xl">
              <h3 className="text-[#2ed07a] font-bold mb-4 text-sm uppercase tracking-wide">⚙️ Preferences</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-gray-400 block mb-2">Spice Tolerance</label>
                  <input type="range" min="0" max="100" value={spiceSlider} onChange={(e) => setSpiceSlider(e.target.value)} className="w-full" />
                  <div className="text-xs text-[#2ed07a] mt-1 font-bold">{spiceSlider}%</div>
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-2">Diet Type</label>
                  <div className="flex gap-2">
                    {['Veg', 'Non-Veg', 'Vegan'].map(d => (
                      <button key={d} className="flex-1 text-xs py-1.5 rounded-lg bg-[rgba(255,255,255,0.04)] border border-white/10 text-gray-300 hover:border-[#2ed07a]/50 transition">
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CENTER PANEL - Flavor Analysis */}
          <div className="lg:col-span-5 space-y-6">
            {/* Flavor Vectors Card */}
            <div className="bg-[rgba(255,255,255,0.04)] backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-2xl">
              <h3 className="text-[#2ed07a] font-bold mb-4 text-sm uppercase tracking-wide">🧪 Flavor Vectors</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { name: 'Umami', value: umami, setter: setUmami },
                  { name: 'Sour', value: sour, setter: setSour },
                  { name: 'Herbal', value: herbal, setter: setHerbal },
                  { name: 'Creamy', value: creamy, setter: setCreamy }
                ].map(({ name, value, setter }) => (
                  <div key={name}>
                    <div className="flex justify-between mb-1">
                      <label className="text-xs text-gray-400">{name}</label>
                      <span className="text-xs text-[#2ed07a] font-bold">{value}</span>
                    </div>
                    <input type="range" min="0" max="100" value={value} onChange={(e) => setter(e.target.value)} className="w-full" />
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 pt-4">
                <label className="text-xs text-gray-400 block mb-2">Target Cuisine</label>
                <select value={targetCuisine} onChange={(e) => setTargetCuisine(e.target.value)} className="w-full bg-[rgba(0,0,0,0.3)] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#2ed07a]/50 transition">
                  {cuisines.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            {/* Flavor Fingerprint Card */}
            <div className="bg-[rgba(255,255,255,0.04)] backdrop-blur-md border border-white/10 rounded-xl p-8 shadow-2xl flex flex-col items-center justify-center min-h-64">
              <h3 className="text-[#2ed07a] font-bold mb-6 text-sm uppercase tracking-wide">📊 Flavor Fingerprint</h3>
              <div className="relative w-40 h-40 flex items-center justify-center mb-6">
                {/* Outer ring */}
                <div className="absolute inset-0 rounded-full border-2 border-white/20"></div>
                {/* Middle ring */}
                <div className="absolute inset-8 rounded-full border border-white/15"></div>
                {/* Inner dot */}
                <div className="w-3 h-3 rounded-full bg-[#d9ff4a] shadow-lg"></div>
              </div>
              <p className="text-xs text-gray-500">Projected in chemical flavor space</p>
            </div>
          </div>

          {/* RIGHT PANEL - Recommendations & Insights */}
          <div className="lg:col-span-4 space-y-6">
            {/* AI Recommendations Card */}
            <div className="bg-[rgba(255,255,255,0.04)] backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-2xl">
              <h3 className="text-[#2ed07a] font-bold mb-4 text-sm uppercase tracking-wide">🤖 AI Recommendations</h3>
              <div className="space-y-3">
                {['Transform 1', 'Transform 2', 'Transform 3'].map((rec, i) => (
                  <div key={i} className="bg-[rgba(0,0,0,0.3)] border border-white/10 rounded-lg p-3 cursor-pointer hover:border-[#2ed07a]/50 transition">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-300">{rec}</span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#d9ff4a] text-[#071014]">{85 - i * 5}%</span>
                    </div>
                    <p className="text-xs text-gray-500">Adjust spice and umami levels</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Insights Card */}
            <div className="bg-[rgba(255,255,255,0.04)] backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-2xl">
              <h3 className="text-[#2ed07a] font-bold mb-4 text-sm uppercase tracking-wide">✨ Insights</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Vector Distance</p>
                  <p className="text-[#d9ff4a] font-bold text-lg">0.342</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Top Alternatives</p>
                  <p className="text-[#2ed07a] font-semibold text-sm">Thai, Mexican, Mediterranean</p>
                </div>
                <button className="w-full bg-[var(--pill)] text-[#071014] font-bold py-2.5 rounded-full transition hover:brightness-95 active:scale-95 mt-4">
                  💾 Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 bg-[rgba(15,23,32,0.5)] backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-8 py-8 text-center text-xs text-gray-500">
          <p>© 2025 FlavorShift • Computational Framework for Flavor Transformation</p>
        </div>
      </footer>
    </div>
  )
}
