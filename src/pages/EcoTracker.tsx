// NOTE: Requires 'react-chartjs-2' and 'chart.js' to be installed in your project.
import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const COMMUTE_FACTORS = {
  Car: 2.5,
  Bike: 0.1,
  'Public Transport': 0.7,
  Walk: 0.05,
} as const;
const FLY_FACTORS = {
  Never: 0,
  'Once a year': 1.2,
  'Few times a year': 2.5,
  Monthly: 6,
} as const;
const DIET_FACTORS = {
  Vegan: 0.8,
  Vegetarian: 1.1,
  Mixed: 1.7,
  'Meat-heavy': 2.5,
} as const;
const SHOP_FACTORS = {
  'Rarely': 0.2,
  'Sometimes': 0.7,
  'Often': 1.2,
} as const;

type CommuteType = keyof typeof COMMUTE_FACTORS;
type FlyType = keyof typeof FLY_FACTORS;
type DietType = keyof typeof DIET_FACTORS;
type ShopType = keyof typeof SHOP_FACTORS;

const EcoTracker: React.FC = () => {
  // Survey state
  const [commute, setCommute] = useState<CommuteType>('Car');
  const [fly, setFly] = useState<FlyType>('Never');
  const [diet, setDiet] = useState<DietType>('Mixed');
  const [energy, setEnergy] = useState(80); // $/month
  const [shop, setShop] = useState<ShopType>('Sometimes');
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [connected, setConnected] = useState(false);

  // Carbon calculation (dummy logic)
  const transport = COMMUTE_FACTORS[commute] * 12 + FLY_FACTORS[fly];
  const home = (energy / 100) * 1.5; // 1.5 tonnes/year per $100/month
  const food = DIET_FACTORS[diet] * 12;
  const shopping = SHOP_FACTORS[shop] * 12;
  const total = transport + home + food + shopping;

  // Chart data
  const chartData = {
    labels: ['Transport', 'Home Energy', 'Food', 'Shopping & Lifestyle'],
    datasets: [
      {
        data: [transport, home, food, shopping],
        backgroundColor: [
          'rgba(132, 255, 99, 0.8)',
          'rgba(56, 189, 98, 0.8)',
          'rgba(186, 255, 78, 0.8)',
          'rgba(34, 197, 94, 0.8)',
        ],
        borderColor: [
          'rgba(132, 255, 99, 1)',
          'rgba(56, 189, 98, 1)',
          'rgba(186, 255, 78, 1)',
          'rgba(34, 197, 94, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  // Recommendations (dummy)
  const recommendations = [
    'You can reduce 1.2 tonnes CO₂/year by shifting to public transport 3x/week.',
    'You’ll save 100 kg CO₂ by replacing beef meals with plant-based alternatives twice a week.',
  ];

  // Achievements (dummy)
  const achievements = [
    { label: '🌿 Green Beginner Badge', earned: true },
    { label: '🌎 Eco Warrior – Save 50 kg more CO₂', earned: false },
  ];

  // Progress (dummy)
  const monthlySavings = 3.5;

  // Survey options
  const commuteOptions = ['Car', 'Bike', 'Public Transport', 'Walk'];
  const flyOptions = ['Never', 'Once a year', 'Few times a year', 'Monthly'];
  const dietOptions = ['Vegan', 'Vegetarian', 'Mixed', 'Meat-heavy'];
  const shopOptions = ['Rarely', 'Sometimes', 'Often'];

  return (
    <div 
      className="pt-24 pb-16 px-4 min-h-screen relative"
      style={{ 
        background: `
          radial-gradient(ellipse at top left, rgba(34, 197, 94, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse at top right, rgba(184, 255, 78, 0.1) 0%, transparent 50%),
          radial-gradient(ellipse at bottom left, rgba(22, 163, 74, 0.1) 0%, transparent 50%),
          radial-gradient(ellipse at bottom right, rgba(34, 197, 94, 0.05) 0%, transparent 50%),
          linear-gradient(135deg, #0A0A0A 0%, #1a2e1a 25%, #0f1f0f 50%, #1a2e1a 75%, #0A0A0A 100%)
        `
      }}
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 bg-neon-green/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
      <div className="max-w-3xl mx-auto">
        {/* Welcome */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-wide">
            Eco Tracker <span className="text-neon-green text-glow">– Monitor Your Impact</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Track your carbon emissions, discover how your lifestyle contributes to climate change, and take steps to reduce your footprint.
          </p>
        </div>

        {/* Carbon Footprint Estimator */}
        <div className="bg-gray-900/60 backdrop-blur-md rounded-2xl p-8 shadow-lg mb-10 border border-neon-green/20">
          <h2 className="text-2xl font-bold text-neon-green mb-6 text-center">Estimate Your Carbon Footprint</h2>
          <form className="grid gap-6">
            {/* Commute */}
            <div>
              <label className="block text-white/80 font-semibold mb-2">How do you commute daily?</label>
              <div className="flex flex-wrap gap-3">
                {commuteOptions.map((option) => (
                  <button
                    type="button"
                    key={option}
                    className={`px-4 py-2 rounded-xl font-medium border transition-colors focus:outline-none ${commute === option ? 'bg-neon-green text-black border-neon-green' : 'bg-gray-800/60 text-white border-gray-700 hover:bg-neon-green/20'}`}
                    onClick={() => setCommute(option as CommuteType)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            {/* Fly */}
            <div>
              <label className="block text-white/80 font-semibold mb-2">How often do you fly?</label>
              <div className="flex flex-wrap gap-3">
                {flyOptions.map((option) => (
                  <button
                    type="button"
                    key={option}
                    className={`px-4 py-2 rounded-xl font-medium border transition-colors focus:outline-none ${fly === option ? 'bg-neon-green text-black border-neon-green' : 'bg-gray-800/60 text-white border-gray-700 hover:bg-neon-green/20'}`}
                    onClick={() => setFly(option as FlyType)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            {/* Diet */}
            <div>
              <label className="block text-white/80 font-semibold mb-2">What’s your diet like?</label>
              <div className="flex flex-wrap gap-3">
                {dietOptions.map((option) => (
                  <button
                    type="button"
                    key={option}
                    className={`px-4 py-2 rounded-xl font-medium border transition-colors focus:outline-none ${diet === option ? 'bg-neon-green text-black border-neon-green' : 'bg-gray-800/60 text-white border-gray-700 hover:bg-neon-green/20'}`}
                    onClick={() => setDiet(option as DietType)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            {/* Energy */}
            <div>
              <label className="block text-white/80 font-semibold mb-2">What’s your average monthly electricity/gas bill? <span className="text-xs text-gray-400">(USD)</span></label>
              <input
                type="number"
                min={0}
                max={1000}
                value={energy}
                onChange={e => setEnergy(Number(e.target.value))}
                className="w-32 px-4 py-2 rounded-xl border border-gray-700 bg-gray-800/60 text-white focus:border-neon-green focus:outline-none text-lg transition-colors placeholder-gray-400"
              />
            </div>
            {/* Shopping */}
            <div>
              <label className="block text-white/80 font-semibold mb-2">How often do you shop for clothes or gadgets?</label>
              <div className="flex flex-wrap gap-3">
                {shopOptions.map((option) => (
                  <button
                    type="button"
                    key={option}
                    className={`px-4 py-2 rounded-xl font-medium border transition-colors focus:outline-none ${shop === option ? 'bg-neon-green text-black border-neon-green' : 'bg-gray-800/60 text-white border-gray-700 hover:bg-neon-green/20'}`}
                    onClick={() => setShop(option as ShopType)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </form>
          {/* Dynamic Carbon Estimate */}
          <div className="mt-8 text-center">
            <div className="inline-block bg-black/60 border border-neon-green/30 rounded-2xl px-8 py-6 shadow-lg">
              <span className="text-3xl font-bold text-neon-green">{total.toFixed(1)} </span>
              <span className="text-lg text-white/80">tonnes CO₂/year (est.)</span>
            </div>
          </div>
        </div>

        {/* Carbon Breakdown Chart */}
        <div className="bg-gray-900/60 backdrop-blur-md rounded-2xl p-8 shadow-lg mb-10 border border-neon-green/20 flex flex-col items-center">
          <h2 className="text-2xl font-bold text-neon-green mb-6 text-center">Your Carbon Breakdown</h2>
          <div className="w-full max-w-xs mx-auto">
            <Pie data={chartData} options={{ plugins: { legend: { labels: { color: '#baff4e', font: { size: 16, weight: 'bold' } } } } }} />
          </div>
        </div>

        {/* Real-Time Tracking Button */}
        <div className="flex flex-col items-center mb-10">
          <button
            className={`w-full max-w-md py-5 px-8 rounded-2xl text-lg font-bold bg-gradient-to-r from-neon-green/80 to-green-400/80 text-black shadow-lg border-2 border-neon-green/40 hover:scale-105 transition-transform mb-4 ${connected ? 'opacity-60 cursor-not-allowed' : ''}`}
            onClick={() => {
              if (!connected) setShowConnectModal(true);
            }}
            disabled={connected}
          >
            📲 Connect with Google Fit / Apple Health
          </button>
          {connected ? (
            <span className="text-green-300 font-semibold mt-2">Connected!</span>
          ) : (
            <span className="text-gray-400 font-medium mt-2">Not Connected</span>
          )}
        </div>
        {/* Connect Modal */}
        {showConnectModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-gray-900/90 rounded-2xl p-8 shadow-2xl border border-neon-green/30 max-w-sm w-full text-center">
              <h3 className="text-2xl font-bold text-neon-green mb-4">Choose between Google Fit and Apple Health</h3>
              <p className="text-gray-200 mb-6">Select your preferred health platform to connect.</p>
              <div className="flex flex-col gap-4">
                <button
                  className="w-full py-3 rounded-xl bg-white text-black font-bold text-lg flex items-center justify-center gap-3 shadow hover:bg-gray-200 transition-colors border-2 border-gray-300"
                  onClick={() => {
                    window.open('https://www.google.com/fit/', '_blank');
                    setConnected(true);
                    setShowConnectModal(false);
                  }}
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/Google_Fit_icon.svg" alt="Google Fit" className="w-7 h-7" />
                  Google Fit
                </button>
                <button
                  className="w-full py-3 rounded-xl bg-white text-black font-bold text-lg flex items-center justify-center gap-3 shadow hover:bg-gray-200 transition-colors border-2 border-gray-300"
                  onClick={() => {
                    window.open('https://www.apple.com/ios/health/', '_blank');
                    setConnected(true);
                    setShowConnectModal(false);
                  }}
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/3/3e/Apple_Health_logo.png" alt="Apple Health" className="w-7 h-7 rounded" />
                  Apple Health
                </button>
              </div>
              <button
                className="w-full mt-6 py-2 rounded-xl bg-gray-800 text-white font-medium hover:bg-gray-700 transition-colors"
                onClick={() => setShowConnectModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Personal Progress + Nudges */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div className="bg-gradient-to-br from-neon-green/10 to-green-900/20 border border-neon-green/20 rounded-2xl p-6 shadow-lg flex flex-col items-center">
            <div className="text-2xl font-bold text-neon-green mb-2">You’ve saved {monthlySavings} kg CO₂ this month 🚀</div>
            <div className="text-gray-200 text-center">Keep up the great work! Every small change adds up.</div>
          </div>
          <div className="bg-gradient-to-br from-green-400/10 to-green-900/20 border border-neon-green/20 rounded-2xl p-6 shadow-lg">
            <div className="text-xl font-bold text-neon-green mb-3">Personalized Recommendations</div>
            <ul className="list-disc pl-5 space-y-2 text-gray-200">
              {recommendations.map((rec, i) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Achievements / Motivation */}
        <div className="bg-gray-900/60 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-neon-green/20 flex flex-col items-center">
          <h2 className="text-2xl font-bold text-neon-green mb-4 text-center">Achievements</h2>
          <div className="flex flex-wrap gap-6 justify-center">
            {achievements.map((ach, i) => (
              <div
                key={i}
                className={`px-6 py-4 rounded-xl font-semibold text-lg shadow border-2 transition-all ${ach.earned ? 'bg-neon-green/20 border-neon-green text-neon-green' : 'bg-gray-800/60 border-gray-700 text-gray-400'}`}
              >
                {ach.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcoTracker; 