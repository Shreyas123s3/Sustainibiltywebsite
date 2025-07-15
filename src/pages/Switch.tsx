import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const Switch = () => {
  const [product, setProduct] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [searched, setSearched] = useState(false);

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
            Greener <span className="text-neon-green text-glow">Switch Finder</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Discover eco-friendly alternatives to everyday products with impact metrics
          </p>
        </motion.div>

        {/* Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg mb-12 border border-gray-800"
        >
          <form onSubmit={handleProductSearch} className="space-y-6">
            <div className="relative">
              <input
                type="text"
                value={product}
                onChange={e => setProduct(e.target.value)}
                placeholder="Search for an everyday product (e.g., bottle, toothbrush, shampoo)"
                className="w-full px-6 py-4 pr-16 border-2 border-gray-700 bg-gray-800/50 text-white rounded-xl focus:border-neon-green focus:outline-none text-lg transition-colors placeholder-gray-400"
              />
              <button
                type="submit"
                disabled={searching || !product.trim()}
                className="absolute right-2 top-2 bottom-2 px-6 bg-neon-green text-deep-black rounded-lg hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
              >
                {searching ? (
                  <span className="text-white/80">Searching…</span>
                ) : (
                  <Search className="w-5 h-5" />
                )}
              </button>
            </div>
          </form>

          {/* Results Section */}
          <div className="mt-8">
            {searchError && (
              <div className="p-4 bg-red-800/40 border border-red-400/20 rounded-xl text-center text-red-200">
                {searchError}
              </div>
            )}
            {!searchError && searched && results.length === 0 && !searching && (
              <div className="p-4 bg-gray-800/40 border border-gray-400/20 rounded-xl text-center text-white/80">
                Couldn’t find eco-friendly alternatives for ‘{product}’. Try a more general term or check again later.
              </div>
            )}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              animate={results.length > 0 ? "visible" : "hidden"}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
              }}
            >
              {results.map((item, idx) => (
                <motion.div
                  key={item.code || idx}
                  className="bg-gray-900/60 backdrop-blur-md rounded-2xl shadow-lg border border-white/10 p-6 flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
          >
                  <img
                    src={item.image_url || item.image_front_url || "/public/image.png"}
                    alt={item.product_name}
                    className="w-28 h-28 object-cover rounded-xl mb-4 border border-neon-green/30 bg-black/30"
                    onError={e => (e.currentTarget.src = "/public/image.png")}
                  />
                  <h3 className="text-lg font-bold text-white mb-2">{item.product_name}</h3>
                  {item.labels_tags && item.labels_tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 justify-center mb-2">
                      {item.labels_tags.slice(0, 4).map((label: string) => (
                        <span key={label} className="px-2 py-1 bg-neon-green/20 text-neon-green rounded-lg text-xs font-semibold shadow">
                          {label.replace(/_/g, ' ')}
                        </span>
                      ))}
                    </div>
                  )}
                  {item.packaging_tags && item.packaging_tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 justify-center mb-2">
                      {item.packaging_tags.slice(0, 2).map((tag: string) => (
                        <span key={tag} className="px-2 py-1 bg-green-800/30 text-green-300 rounded-lg text-xs font-semibold shadow">
                          {tag.replace(/_/g, ' ')}
                        </span>
                      ))}
                    </div>
                  )}
                  {item.environment_impact_level_tags && item.environment_impact_level_tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 justify-center mb-2">
                      {item.environment_impact_level_tags.map((tag: string) => (
                        <span key={tag} className="px-2 py-1 bg-blue-800/30 text-blue-300 rounded-lg text-xs font-semibold shadow">
                          {tag.replace(/_/g, ' ')}
                        </span>
                    ))}
                  </div>
                  )}
                  {item.ingredients_text && (
                    <div className="text-xs text-white/70 mt-2 mb-1">
                      <span className="font-semibold text-white/80">Ingredients:</span> {item.ingredients_text}
                    </div>
                  )}
                  {item.packaging_text && (
                    <div className="text-xs text-white/70 mb-1">
                      <span className="font-semibold text-white/80">Packaging:</span> {item.packaging_text}
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
            </div>
          </motion.div>
      </div>
    </div>
  );
};

export default Switch;