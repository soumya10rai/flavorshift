import React from 'react';
import Navbar from '../components/Navbar';

export default function HowItWorks() {
  return (
    <div className="app-wrapper h-screen overflow-hidden">
      <Navbar />
      <div className="hero snap-start">
        <div className="bg-decor circle-a" />
        <div className="bg-decor circle-b" />
        <div className="bg-dots" />
        <main className="hero-inner pt-24">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-10">How It Works</h1>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="bg-[rgba(255,255,255,0.04)] backdrop-blur-md border border-white/10 rounded-xl p-8 shadow-xl min-w-[320px] text-center">
              <div className="text-2xl font-bold text-white mb-2">1. Represent dish in flavor space</div>
              <div className="text-gray-300 text-lg">Analyze the molecular flavor profile of the recipe.</div>
            </div>
            <div className="bg-[rgba(255,255,255,0.04)] backdrop-blur-md border border-white/10 rounded-xl p-8 shadow-xl min-w-[320px] text-center">
              <div className="text-2xl font-bold text-white mb-2">2. Learn cuisine signatures from data</div>
              <div className="text-gray-300 text-lg">Identify the unique flavor patterns of each cuisine.</div>
            </div>
            <div className="bg-[rgba(255,255,255,0.04)] backdrop-blur-md border border-white/10 rounded-xl p-8 shadow-xl min-w-[320px] text-center">
              <div className="text-2xl font-bold text-white mb-2">3. Shift the dish toward target cuisine</div>
              <div className="text-gray-300 text-lg">Transform the recipe’s flavor profile to match the desired cuisine.</div>
            </div>
            <div className="bg-[rgba(255,255,255,0.04)] backdrop-blur-md border border-white/10 rounded-xl p-8 shadow-xl min-w-[320px] text-center">
              <div className="text-2xl font-bold text-white mb-2">4. Suggest ingredient additions & reductions</div>
              <div className="text-gray-300 text-lg">Recommend changes to ingredients for optimal flavor balance.</div>
            </div>
          </div>
        <div className="flex justify-center mt-12">
          <a
            href="/transform"
            className="px-8 py-3 rounded-full bg-[var(--pill)] text-[#071014] font-bold text-lg shadow transition hover:brightness-95 active:scale-95"
          >
            Let’s Transform a Dish!
          </a>
        </div>
      </main>
      </div>
    </div>
  );
}
