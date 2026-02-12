import React from 'react'
import '../App.css'

export default function Landing() {
  return (
    <div className="app-wrapper h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth">
      <div className="hero snap-start">
        <div className="bg-decor circle-a" />
        <div className="bg-decor circle-b" />
        <div className="bg-dots" />

        <main className="hero-inner">
          <header className="header">
            <h1 className="brand"><span className="brand--green">Flavor</span><span className="brand--white">Shift<span className="brand--dot">.</span></span></h1>
            <p className="subtitle">Rewriting Dishes in Chemical Flavor Space</p>
          </header>

          <div className="pill">A Computational Framework for Flavor Modeling and Transformation</div>
        </main>
      </div>

      <section className="panel snap-start h-screen flex items-center">
        <div className="max-w-6xl mx-auto px-6 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left column: academic text, vertically centered relative to card */}
            <div className="order-2 md:order-1 flex items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">What is FlavorShift?</h2>
                <ul className="list-disc list-inside text-gray-300 space-y-3 leading-relaxed text-lg">
                  <li>FlavorShift models dishes in molecular flavor space</li>
                  <li>Learns chemical flavor signatures that define cuisines</li>
                  <li>Transforms dishes across cuisines using flavor style transfer</li>
                  <li>Incorporates perception-aware flavor modeling</li>
                </ul>
              </div>
            </div>

            {/* Right column: glassmorphism auth card */}
            <div className="order-1 md:order-2">
              <div className="max-w-md mx-auto md:ml-auto bg-[rgba(255,255,255,0.04)] backdrop-blur-md border border-white/10 rounded-xl p-8 shadow-2xl">
                <h3 className="text-2xl font-semibold text-white mb-2">Access the Platform</h3>
                <p className="text-sm text-gray-300 mb-6">Sign in to explore computational flavor transformation</p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="/login" className="w-full sm:w-auto inline-block text-center bg-[var(--pill)] text-[#071014] font-semibold py-3 px-6 rounded-full shadow-md hover:brightness-95 transition">Login</a>
                  <a href="/signup" className="w-full sm:w-auto inline-block text-center border border-white/12 text-white/90 py-3 px-6 rounded-full hover:bg-white/5 transition">Sign Up</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
