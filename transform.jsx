
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Dashboard() {
  const recipes = [
    'Spaghetti Carbonara', 'Pad Thai', 'Tacos al Pastor',
    'Butter Chicken', 'Ratatouille', 'Pho', 'Sushi', 'Beef Stroganoff',
    'Falafel', 'Paella', 'Jollof Rice', 'Peking Duck', 'Baklava',
    'Fish and Chips', 'Goulash', 'Kimchi Stew', 'Tom Yum Soup',
    'Moussaka', 'Ceviche', 'Lasagna', 'Shakshuka', 'Bibimbap',
    'Coq au Vin', 'Lamb Tagine', 'Pierogi', 'Enchiladas', 'Rendang',
    'Laksa', 'Cassoulet', 'Okonomiyaki','Chicken Biryani', 'Arepas', 'Empanadas',
    'Katsu Curry', 'Bouillabaisse', 'Tteokbokki', 'Mapo Tofu',
    'Pav Bhaji', 'Chow Mein', 'Koshari', 'Tamales', 'Borscht'
  ];

  const cuisineOptions = [
    'Indian Subcontinent',
    'Mediterranean',
    'East Asia',
    'Southeast Asia',
    'Western Europe',
    'Eastern Europe',
    'Latin America',
    'Northern Africa',
    'Middle East'
  ];

  const [selectedRecipe, setSelectedRecipe] = useState('');
  const [targetCuisine, setTargetCuisine] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [result, setResult] = useState(null); // keep for error only
  const handleTransform = async () => {
    setIsLoading(true);
    setResult(null);

    try {
      const res = await fetch('http://localhost:8000/transform', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipe_title: selectedRecipe,
          target_cuisine: targetCuisine
        })
      });

      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      navigate('/result', { state: data });
    } catch {
      setResult({ error: 'Failed to transform recipe. Please try again.' });
    }

    setIsLoading(false);
  };

  const [showExplanation, setShowExplanation] = useState(false);

  return (
    <div className="app-wrapper min-h-screen w-full bg-transparent overflow-hidden" style={{ display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div className="bg-decor circle-a absolute" />
      <div className="bg-decor circle-b absolute" />
      <div className="bg-dots absolute" />

      <main
        className="flex flex-col items-center justify-center w-full"
        style={{
          minHeight: 'calc(100vh - 64px)',
          paddingTop: 64,
          overflow: 'hidden',
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <header className="header mb-8 text-center">
          <h1 className="brand">
            <span className="brand--green">Flavor</span>
            <span className="brand--white">
              Shift<span className="brand--dot">.</span>
            </span>
          </h1>
          <p className="subtitle">ML-Powered Recipe Transformation</p>
        </header>

        <div className="pill mb-10 text-lg text-center">
          Transform any dish into a new cuisine using AI flavor space
        </div>

        <div className="max-w-xl w-full mx-auto flex flex-col items-center">
          <div className="bg-[rgba(255,255,255,0.04)] backdrop-blur-md border border-white/10 rounded-xl p-8 shadow-2xl mb-8 w-full">
            <label className="block text-gray-300 mb-2">Select Recipe</label>
            <select
              className="w-full rounded p-2 bg-gray-800 text-white mb-4"
              value={selectedRecipe}
              onChange={e => setSelectedRecipe(e.target.value)}
            >
              <option value="" disabled>Select a recipe…</option>
              {recipes.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>

            <label className="block text-gray-300 mb-2">Target Cuisine</label>
            <select
              className="w-full rounded p-2 bg-gray-800 text-white mb-6"
              value={targetCuisine}
              onChange={e => setTargetCuisine(e.target.value)}
            >
              <option value="" disabled>Select a cuisine...</option>
              {cuisineOptions.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <button
              onClick={handleTransform}
              disabled={isLoading || !selectedRecipe || !targetCuisine}
              className="w-full bg-[var(--pill)] text-[#071014] font-bold py-3 rounded-full transition hover:brightness-95 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? '⏳ Transforming…' : 'Transform Recipe'}
            </button>
          </div>

          {result && result.error && (
            <div className="bg-[rgba(255,255,255,0.04)] backdrop-blur-md border border-white/10 rounded-xl p-8 shadow-2xl mb-8 w-full">
              <div className="text-red-400 font-bold">{result.error}</div>
            </div>
          )}

          <button
            className="mt-2 mb-2 px-6 py-2 rounded-full bg-[var(--pill)] text-[#071014] font-semibold shadow transition hover:brightness-95 active:scale-95"
            onClick={() => setShowExplanation((v) => !v)}
          >
            {showExplanation ? 'Hide ML Model Explanation' : 'How does the ML model work?'}
          </button>

          {showExplanation && (
            <div className="bg-[rgba(255,255,255,0.04)] backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-2xl mt-2 w-full text-center">
              <h3 className="text-xl font-bold text-[#2ed07a] mb-2">
                How does the ML model work?
              </h3>
              <p className="text-gray-300">
                FlavorShift embeds recipes into a high-dimensional flavor space using NLP and statistical learning. It learns cuisine signatures and transforms dishes by shifting ingredient distributions toward the target cuisine using a trained ML model.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
