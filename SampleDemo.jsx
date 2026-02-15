import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const samples = [
  {
    dish_name: 'Chicken Biryani',
    source_cuisine: 'Indian Subcontinent',
    target_cuisine: 'Northern Africa',
    add_ingredients: ['olive', 'black pepper', 'olive oil', 'garbanzo bean'],
    reduce_ingredients: ['seed', 'yogurt', 'chile', 'tamarind'],
    explanation: "The recipe 'Chicken Biryani' was classified as Indian Subcontinent. To transform it toward Northern Africa, the model enhances ingredients commonly found in Northern Africa cuisine and reduces those less characteristic, resulting in a culturally aligned dish."
  },
  {
    dish_name: 'Pasta Carbonara',
    source_cuisine: 'Western Europe',
    target_cuisine: 'Mediterranean',
    add_ingredients: ['tomato', 'basil', 'olive oil', 'garlic'],
    reduce_ingredients: ['cream', 'bacon'],
    explanation: "Pasta Carbonara is shifted toward Mediterranean by adding classic regional flavors like tomato, basil, and olive oil, while reducing heavier ingredients."
  },
  {
    dish_name: 'Sushi',
    source_cuisine: 'East Asia',
    target_cuisine: 'Southeast Asia',
    add_ingredients: ['lemongrass', 'cilantro', 'chili', 'lime'],
    reduce_ingredients: ['wasabi', 'soy sauce'],
    explanation: "Sushi is transformed by infusing Southeast Asian aromatics and reducing traditional Japanese condiments, creating a fusion flavor profile."
  },
  {
    dish_name: 'Tacos',
    source_cuisine: 'Latin America',
    target_cuisine: 'Indian Subcontinent',
    add_ingredients: ['garam masala', 'coriander', 'ginger'],
    reduce_ingredients: ['cheddar', 'sour cream'],
    explanation: "Tacos are reimagined with Indian spices and aromatics, while dairy-based toppings are reduced for a more authentic subcontinental taste."
  },
  {
    dish_name: 'Falafel',
    source_cuisine: 'Middle East',
    target_cuisine: 'Western Europe',
    add_ingredients: ['parsley', 'lemon zest', 'thyme'],
    reduce_ingredients: ['cumin', 'coriander'],
    explanation: "Falafel is adapted for Western Europe by brightening with herbs and citrus, and reducing the intensity of traditional Middle Eastern spices."
  },
  {
    dish_name: 'Jollof Rice',
    source_cuisine: 'West Africa',
    target_cuisine: 'East Asia',
    add_ingredients: ['soy sauce', 'ginger', 'scallion'],
    reduce_ingredients: ['tomato', 'curry powder'],
    explanation: "Jollof Rice is given an East Asian twist by adding umami-rich and aromatic ingredients, while reducing tomato and curry for a lighter profile."
  }
];

export default function SampleDemo() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="app-wrapper min-h-screen w-full bg-transparent overflow-hidden flex flex-col" style={{ minHeight: '100vh' }}>
      <Navbar />
      <div className="bg-decor circle-a absolute" />
      <div className="bg-decor circle-b absolute" />
      <div className="bg-dots absolute" />
      <main
        className="flex flex-col flex-grow items-center justify-center w-full"
        style={{
          minHeight: 'calc(100vh - 64px)',
          paddingTop: 64,
          paddingBottom: 0,
          overflow: 'hidden',
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h2 className="text-3xl font-bold text-center text-white mb-8">Try a Sample Transformation</h2>
        <div className="max-w-4xl w-full flex justify-center items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {samples.map((s, i) => (
              <button
                key={i}
                className={`bg-[rgba(255,255,255,0.04)] backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-2xl text-left transition hover:scale-105 hover:border-[#2ed07a] focus:outline-none ${selected === i ? 'border-[#2ed07a] scale-105' : ''}`}
                onClick={() => setSelected(i)}
              >
                <div className="text-lg font-semibold text-white mb-1">{s.dish_name}</div>
                <div className="text-gray-400 text-sm mb-2">{s.source_cuisine} → <span className="text-[#2ed07a]">{s.target_cuisine}</span></div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {s.add_ingredients.slice(0,2).map((ing, idx) => (
                    <span key={idx} className="bg-[#2ed07a]/10 text-[#2ed07a] px-2 py-0.5 rounded text-xs font-medium">+{ing}</span>
                  ))}
                  {s.reduce_ingredients.slice(0,2).map((ing, idx) => (
                    <span key={idx} className="bg-red-400/10 text-red-300 px-2 py-0.5 rounded text-xs font-medium">-{ing}</span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>
        {selected !== null && (
          <div className="max-w-xl w-full flex flex-col items-center justify-center mt-8">
            <div className="flex justify-end mb-2 w-full">
              <span className="bg-[#2ed07a]/20 text-[#2ed07a] px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase">Demo Mode – Mock Result</span>
            </div>
            <div className="bg-[rgba(255,255,255,0.04)] backdrop-blur-md border border-white/10 rounded-xl p-8 shadow-2xl mb-8 w-full">
              <h3 className="text-2xl font-bold text-[#2ed07a] mb-3">Transformed Dish</h3>
              <p className="text-white"><b>Source Cuisine:</b> {samples[selected].source_cuisine}</p>
              <p className="text-white"><b>Target Cuisine:</b> {samples[selected].target_cuisine}</p>
              <p className="text-white"><b>Add:</b> {samples[selected].add_ingredients.join(', ') || 'None'}</p>
              <p className="text-white"><b>Reduce:</b> {samples[selected].reduce_ingredients.join(', ') || 'None'}</p>
              <p className="text-gray-300 mt-3">{samples[selected].explanation}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
