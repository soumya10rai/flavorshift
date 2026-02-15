
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { GiKnifeFork, GiChemicalDrop, GiBookmarklet, GiSparkles } from 'react-icons/gi';

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  React.useEffect(() => {
    if (!data) {
      navigate('/dashboard');
    }
  }, [data, navigate]);


  if (!data) return null;

  // Mocked flavor profile (for visual only)
  const flavorProfile = [
    { label: 'Sweet', before: 2, after: 3 },
    { label: 'Sour', before: 1, after: 4 },
    { label: 'Umami', before: 3, after: 5 },
    { label: 'Spicy', before: 4, after: 2 },
    { label: 'Bitter', before: 1, after: 2 },
    { label: 'Salty', before: 3, after: 4 },
  ];

  // Fun fact mock
  const funFacts = {
    'Northern Africa': 'Did you know? North African cuisine is famous for its use of spices like cumin, coriander, and cinnamon, and for dishes like couscous and tagine.',
    'Indian Subcontinent': 'Did you know? The Indian Subcontinent is home to over 30 distinct regional cuisines, each with unique spice blends and cooking techniques.'
  };
  const funFact = funFacts[data.target_cuisine] || 'Exploring new cuisines unlocks a world of flavor!';

  return (
    <div className="app-wrapper min-h-screen w-full bg-transparent overflow-hidden flex flex-col">
      <Navbar />
      <div className="bg-decor circle-a absolute" />
      <div className="bg-decor circle-b absolute" />
      <div className="bg-dots absolute" />
      <main className="flex-1 flex flex-col md:flex-row gap-8 items-center justify-center w-full px-4 pt-24">
        {/* Recipe Card */}
        <div className="flex flex-col gap-6 items-center w-full max-w-xs">
          <div className="bg-[rgba(255,255,255,0.04)] backdrop-blur-md border border-white/10 rounded-2xl p-7 shadow-2xl w-full text-center relative">
            <div className="flex items-center justify-center mb-2">
              <GiKnifeFork className="text-3xl text-[#2ed07a] mr-2" />
              <span className="text-xl font-bold text-white">Transformed Dish</span>
            </div>
            <div className="flex justify-center gap-2 mb-2">
              <span className="bg-[#2ed07a]/10 text-[#2ed07a] px-3 py-1 rounded-full text-xs font-semibold">{data.target_cuisine}</span>
              <span className="bg-white/10 text-white px-3 py-1 rounded-full text-xs font-semibold">from {data.source_cuisine}</span>
            </div>
            <div className="text-left mt-2">
              <b className="text-white">Add:</b> <span className="text-gray-200">{data.add_ingredients?.join(', ') || 'None'}</span><br />
              <b className="text-white">Reduce:</b> <span className="text-gray-200">{data.reduce_ingredients?.join(', ') || 'None'}</span>
            </div>
            <div className="text-gray-300 text-sm mt-3">{data.explanation}</div>
          </div>
          {/* Flavor Profile (mocked) */}
          <div className="bg-[rgba(255,255,255,0.04)] backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-xl w-full">
            <div className="flex items-center mb-2"><GiChemicalDrop className="text-lg text-[#2ed07a] mr-2" /><span className="font-semibold text-white">Flavor Profile</span></div>
            <div className="space-y-2">
              {flavorProfile.map((f) => (
                <div key={f.label} className="flex items-center gap-2">
                  <span className="w-16 text-xs text-gray-300">{f.label}</span>
                  <div className="flex-1 flex gap-1">
                    <div className="h-2 rounded bg-[#2ed07a]" style={{ width: `${f.before * 12}px`, opacity: 0.5 }} />
                    <div className="h-2 rounded bg-[#d9ff4a]" style={{ width: `${f.after * 12}px` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="text-xs text-gray-400 mt-2">Green: before, Yellow: after</div>
          </div>
        </div>

        {/* Transformation Steps & Fun Fact */}
        <div className="flex flex-col gap-6 items-center w-full max-w-xs">
          {/* Steps */}
          <div className="bg-[rgba(255,255,255,0.04)] backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl w-full">
            <div className="flex items-center mb-2"><GiBookmarklet className="text-lg text-[#2ed07a] mr-2" /><span className="font-semibold text-white">Transformation Steps</span></div>
            <ol className="list-decimal list-inside text-gray-200 text-sm space-y-1 mt-2">
              <li>Analyze the original dish’s molecular flavor profile.</li>
              <li>Compare with the target cuisine’s signature.</li>
              <li>Suggest ingredient additions and reductions.</li>
              <li>Balance flavors for cultural alignment.</li>
            </ol>
          </div>
          {/* Fun Fact */}
          <div className="bg-[rgba(255,255,255,0.04)] backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-xl w-full flex items-center gap-2">
            <GiSparkles className="text-2xl text-[#d9ff4a] mr-2" />
            <span className="text-sm text-white font-semibold">{funFact}</span>
          </div>
          {/* ML Explanation */}
          <div className="bg-[rgba(255,255,255,0.04)] backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-xl w-full text-center">
            <h3 className="text-base font-bold text-[#2ed07a] mb-2">How does the ML model work?</h3>
            <p className="text-gray-300 text-sm">
              FlavorShift embeds recipes into a high-dimensional flavor space using NLP and statistical learning. It learns cuisine signatures and transforms dishes by shifting ingredient distributions toward the target cuisine using a trained ML model.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
