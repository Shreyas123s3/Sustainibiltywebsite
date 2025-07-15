import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Shield, AlertTriangle, XCircle, CheckCircle, Zap } from 'lucide-react';

const Greenwashing = () => {
  const [brand, setBrand] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // --- Green Switch Finder State ---
  const [product, setProduct] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [searched, setSearched] = useState(false);

  const brandData = {
    'tesla': {
      score: 78,
      level: 'Trusted',
      color: 'green',
      icon: CheckCircle,
      breakdown: {
        transparency: 85,
        actions: 75,
        claims: 80,
        impact: 70
      },
      redFlags: [],
      positives: [
        'Concrete emission reduction targets',
        'Third-party verified sustainability reports',
        'Significant investment in renewable energy'
      ]
    },
    'exxon': {
      score: 32,
      level: 'High Risk',
      color: 'red',
      icon: XCircle,
      breakdown: {
        transparency: 25,
        actions: 30,
        claims: 40,
        impact: 35
      },
      redFlags: [
        'Vague environmental commitments',
        'Continued fossil fuel expansion',
        'History of climate misinformation'
      ],
      positives: [
        'Recent carbon capture investments'
      ]
    },
    'patagonia': {
      score: 89,
      level: 'Highly Trusted',
      color: 'green',
      icon: CheckCircle,
      breakdown: {
        transparency: 95,
        actions: 90,
        claims: 85,
        impact: 85
      },
      redFlags: [],
      positives: [
        'Lifetime repair guarantee',
        'Supply chain transparency',
        'Environmental activism funding',
        'Circular economy initiatives'
      ]
    },
    'coca-cola': {
      score: 45,
      level: 'Moderate Risk',
      color: 'yellow',
      icon: AlertTriangle,
      breakdown: {
        transparency: 50,
        actions: 40,
        claims: 45,
        impact: 45
      },
      redFlags: [
        'Plastic pollution concerns',
        'Water usage in drought areas',
        'Limited recycling infrastructure'
      ],
      positives: [
        'Pledge for 100% recyclable packaging',
        'Water replenishment programs'
      ]
    }
  };

  const handleAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!brand.trim()) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2500));

    const brandLower = brand.toLowerCase();
    let result = brandData['coca-cola']; // default

    for (const [key, value] of Object.entries(brandData)) {
      if (brandLower.includes(key)) {
        result = value;
        break;
      }
    }

    setAnalysis(result);
    setIsLoading(false);
  };

  const handleProductSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product.trim()) return;
    setSearching(true);
    setSearchError("");
    setResults([]);
    setSearched(false);
    try {
      const res = await fetch(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(product)}&search_simple=1&action=process&json=1`
      );
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      const filtered = (data.products || [])
        .filter((p: any) => p.product_name && (p.image_url || p.image_front_url))
        .slice(0, 5);
      setResults(filtered);
      setSearched(true);
    } catch (err) {
      setSearchError("Oops! Something went wrong. Please try again.");
    } finally {
      setSearching(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-500';
    if (score >= 40) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getCardColor = (color: string) => {
    switch (color) {
      case 'green': return 'from-green-400 to-emerald-500';
      case 'yellow': return 'from-yellow-400 to-orange-500';
      case 'red': return 'from-red-400 to-pink-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  return (
    <div 
      className="pt-24 pb-16 px-4 min-h-screen"
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

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-wide">
            Greenwashing <span className="text-neon-green text-glow">Exposer</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Analyze brand sustainability claims and get transparency scores with red flag detection
          </p>
        </motion.div>

        {/* Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg mb-12 border border-gray-800"
        >
          <form onSubmit={handleAnalysis} className="space-y-6">
            <div className="relative">
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Enter brand or company name (e.g., Tesla, Patagonia, Exxon)"
                className="w-full px-6 py-4 pr-16 border-2 border-gray-700 bg-gray-800/50 text-white rounded-xl focus:border-neon-green focus:outline-none text-lg transition-colors placeholder-gray-400"
              />
              <button
                type="submit"
                disabled={isLoading || !brand.trim()}
                className="absolute right-2 top-2 bottom-2 px-6 bg-neon-green text-deep-black rounded-lg hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Search className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <Search className="w-5 h-5" />
                )}
              </button>
            </div>
          </form>

          {/* Loading State */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 p-6 bg-gray-800/50 rounded-xl border border-gray-700"
            >
              <div className="flex items-center space-x-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Shield className="w-6 h-6 text-neon-green" />
                </motion.div>
                <p className="text-gray-300">Analyzing sustainability claims and transparency...</p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Analysis Results */}
        {analysis && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Trust Score Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                boxShadow: analysis.score < 50 ? [
                  "0 0 0 rgba(239, 68, 68, 0.4)",
                  "0 0 20px rgba(239, 68, 68, 0.4)",
                  "0 0 0 rgba(239, 68, 68, 0.4)"
                ] : "0 20px 40px rgba(0, 0, 0, 0.1)"
              }}
              transition={{ 
                duration: 0.6,
                boxShadow: { duration: 1.5, repeat: analysis.score < 50 ? Infinity : 0, repeatType: "reverse" }
              }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg text-center border border-gray-800"
            >
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className={`p-4 rounded-full bg-gradient-to-r ${getCardColor(analysis.color)} text-white`}>
                  <analysis.icon className="w-12 h-12" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">
                    Trust Score: <span className={getScoreColor(analysis.score)}>{analysis.score}/100</span>
                  </h3>
                  <p className={`text-xl font-semibold ${
                    analysis.color === 'green' ? 'text-green-400' :
                    analysis.color === 'yellow' ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {analysis.level}
                  </p>
                </div>
              </div>

              {/* Score Breakdown */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {Object.entries(analysis.breakdown).map(([key, value], index) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="relative w-16 h-16 mx-auto mb-2">
                      <svg className="w-16 h-16 transform -rotate-90">
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                          className="text-gray-700"
                        />
                        <motion.circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                          strokeLinecap="round"
                          className={getScoreColor(value as number).replace('text-', 'text-')}
                          initial={{ strokeDasharray: "0 175.93" }}
                          animate={{ strokeDasharray: `${(value as number) * 1.7593} 175.93` }}
                          transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-bold text-white">{value}%</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 capitalize">{key}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Red Flags */}
              {analysis.redFlags.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-800"
                >
                  <h4 className="text-xl font-bold text-red-400 mb-4 flex items-center">
                    <XCircle className="w-6 h-6 mr-2" />
                    Red Flags
                  </h4>
                  <ul className="space-y-3">
                    {analysis.redFlags.map((flag: string, index: number) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="flex items-start space-x-2"
                      >
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{flag}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Positive Actions */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-800"
              >
                <h4 className="text-xl font-bold text-green-400 mb-4 flex items-center">
                  <CheckCircle className="w-6 h-6 mr-2" />
                  Positive Actions
                </h4>
                <ul className="space-y-3">
                  {analysis.positives.map((positive: string, index: number) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="flex items-start space-x-2"
                    >
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{positive}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Example Companies */}
        {!analysis && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-800"
          >
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              Try Analyzing These Companies
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Tesla', 'Patagonia', 'Exxon', 'Coca-Cola'].map((company, index) => (
                <motion.button
                  key={company}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  onClick={() => setBrand(company)}
                  className="p-4 rounded-lg bg-gray-800/50 hover:bg-neon-green/10 transition-colors text-center group card-hover border border-gray-700"
                >
                  <Shield className="w-8 h-8 text-neon-green mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <p className="font-medium text-white">{company}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Greenwashing;