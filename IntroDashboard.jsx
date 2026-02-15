
import React from "react";
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import '../App.css';

const glassCard =
  "bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-20 rounded-xl shadow-lg p-6 m-2 transition-transform hover:-translate-y-1 hover:shadow-2xl";
const heading = "text-4xl md:text-5xl font-bold text-white mb-2";
const subheading = "text-xl md:text-2xl text-gray-300 mb-4";
const sectionTitle = "text-2xl font-semibold text-white mb-2";
const sectionDesc = "text-gray-300 mb-4";
const cardTitle = "text-lg font-bold text-white mb-1";
const cardDesc = "text-gray-300 text-sm";
const ctaBtn =
  "bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-full shadow-md hover:scale-105 hover:shadow-xl transition-all m-2";


export default function IntroDashboard() {
  return (
    <div className="app-wrapper h-screen overflow-hidden">
      <Navbar />
      <div className="hero snap-start">
        <div className="bg-decor circle-a" />
        <div className="bg-decor circle-b" />
        <div className="bg-dots" />

        <main className="hero-inner pt-24">
          <header className="header">
            <p className="subtitle">Rewriting Dishes in Chemical Flavor Space</p>
          </header>
          <div className="pill mb-10">FlavorShift transforms recipes across cuisines by modeling flavor at the molecular level — not just ingredients.</div>

          {/* WHAT IS FLAVORSHIFT? */}
          <div className="flex flex-col items-center w-full">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">What is FlavorShift?</h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10">
              <div className="bg-[rgba(255,255,255,0.04)] backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-xl min-w-[160px] text-center">
                <div className="text-lg font-bold text-white mb-1">Dish</div>
                <div className="text-gray-300 text-sm">A recipe as you know it</div>
              </div>
              <span className="text-2xl text-gray-400 mx-2">→</span>
              <div className="bg-[rgba(255,255,255,0.04)] backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-xl min-w-[160px] text-center">
                <div className="text-lg font-bold text-white mb-1">Flavor Fingerprint</div>
                <div className="text-gray-300 text-sm">Unique chemical profile of the dish</div>
              </div>
              <span className="text-2xl text-gray-400 mx-2">→</span>
              <div className="bg-[rgba(255,255,255,0.04)] backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-xl min-w-[160px] text-center">
                <div className="text-lg font-bold text-white mb-1">Cuisine Signature</div>
                <div className="text-gray-300 text-sm">Data-driven flavor identity of a cuisine</div>
              </div>
              <span className="text-2xl text-gray-400 mx-2">→</span>
              <div className="bg-[rgba(255,255,255,0.04)] backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-xl min-w-[160px] text-center">
                <div className="text-lg font-bold text-white mb-1">Transformed Dish</div>
                <div className="text-gray-300 text-sm">Recipe shifted toward a new cuisine</div>
              </div>
            </div>
          </div>

          {/* WHY IT'S DIFFERENT */}
          <div className="flex flex-col items-center w-full">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Why It’s Different</h2>
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <div className="bg-[rgba(255,255,255,0.04)] backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-xl min-w-[220px] text-center">
                <div className="font-bold text-white mb-1">Flavor is treated as data</div>
                <div className="text-gray-300 text-sm">Recipes are analyzed at the molecular level, not just ingredient lists.</div>
              </div>
              <div className="bg-[rgba(255,255,255,0.04)] backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-xl min-w-[220px] text-center">
                <div className="font-bold text-white mb-1">Cuisines have chemical signatures</div>
                <div className="text-gray-300 text-sm">Each cuisine is defined by its unique flavor profile, learned from data.</div>
              </div>
              <div className="bg-[rgba(255,255,255,0.04)] backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-xl min-w-[220px] text-center">
                <div className="font-bold text-white mb-1">Recipes are transformed, not replaced</div>
                <div className="text-gray-300 text-sm">Original dishes are adapted to new cuisines, preserving their essence.</div>
              </div>
              <div className="bg-[rgba(255,255,255,0.04)] backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-xl min-w-[220px] text-center">
                <div className="font-bold text-white mb-1">Perception-aware flavor balancing</div>
                <div className="text-gray-300 text-sm">Adjustments consider how flavors are perceived, not just chemical changes.</div>
              </div>
            </div>
          </div>

          {/* HOW IT WORKS */}
          <div className="flex flex-col items-center w-full">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">How It Works</h2>
            <div className="flex flex-col md:flex-row gap-4 mb-10">
              <div className="bg-[rgba(255,255,255,0.04)] backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-xl min-w-[220px] text-center">
                <div className="font-bold text-white mb-1">1. Represent dish in flavor space</div>
                <div className="text-gray-300 text-sm">Analyze the molecular flavor profile of the recipe.</div>
              </div>
              <div className="bg-[rgba(255,255,255,0.04)] backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-xl min-w-[220px] text-center">
                <div className="font-bold text-white mb-1">2. Learn cuisine signatures from data</div>
                <div className="text-gray-300 text-sm">Identify the unique flavor patterns of each cuisine.</div>
              </div>
              <div className="bg-[rgba(255,255,255,0.04)] backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-xl min-w-[220px] text-center">
                <div className="font-bold text-white mb-1">3. Shift the dish toward target cuisine</div>
                <div className="text-gray-300 text-sm">Transform the recipe’s flavor profile to match the desired cuisine.</div>
              </div>
              <div className="bg-[rgba(255,255,255,0.04)] backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-xl min-w-[220px] text-center">
                <div className="font-bold text-white mb-1">4. Suggest ingredient additions & reductions</div>
                <div className="text-gray-300 text-sm">Recommend changes to ingredients for optimal flavor balance.</div>
              </div>
            </div>
          </div>

          {/* CALL TO ACTION */}
          <div className="flex flex-col items-center w-full mt-8">
            <div className="flex justify-center gap-4">
              <Link to="/transform" className="pill text-lg font-bold">Try the Transformer</Link>
              <Link to="/sample-demo" className="pill text-lg font-bold bg-transparent border border-[var(--pill)] text-[var(--pill)] hover:bg-[var(--pill)] hover:text-[#071014] transition">Try a Sample</Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
