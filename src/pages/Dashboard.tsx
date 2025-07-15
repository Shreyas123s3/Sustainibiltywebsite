import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Battery, 
  Recycle, 
  Leaf, 
  Droplets, 
  Zap, 
  TrendingUp,
  Target,
  Award
} from 'lucide-react';

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    energy: 0,
    water: 0,
    waste: 0,
    carbon: 0,
  });

  useEffect(() => {
    // Animate metrics on page load
    const timer = setTimeout(() => {
      setMetrics({
        energy: 85,
        water: 72,
        waste: 91,
        carbon: 68,
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const cards = [
    {
      title: 'Energy Efficiency',
      value: metrics.energy,
      icon: Zap,
      color: 'from-yellow-400 to-orange-500',
      unit: '%',
      description: 'Renewable energy usage'
    },
    {
      title: 'Water Conservation',
      value: metrics.water,
      icon: Droplets,
      color: 'from-blue-400 to-cyan-500',
      unit: '%',
      description: 'Water saving initiatives'
    },
    {
      title: 'Waste Reduction',
      value: metrics.waste,
      icon: Recycle,
      color: 'from-green-400 to-emerald-500',
      unit: '%',
      description: 'Waste diverted from landfills'
    },
    {
      title: 'Carbon Footprint',
      value: metrics.carbon,
      icon: Leaf,
      color: 'from-emerald-400 to-teal-500',
      unit: '%',
      description: 'CO2 emissions reduced'
    },
  ];

  const achievements = [
    { title: 'Green Pioneer', description: '30 days of sustainable choices', icon: Award },
    { title: 'Water Saver', description: '500L water conserved this month', icon: Droplets },
    { title: 'Eco Warrior', description: '10kg waste diverted from landfills', icon: Target },
  ];

  // For weekly progress
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const today = new Date();
  const jsDay = today.getDay();
  const dayIndex = jsDay === 0 ? 6 : jsDay - 1;
  // Responsive SVG width
  const dotCount = days.length;
  const svgWidth = 1000;
  const svgHeight = 56;
  const margin = 40;
  const trackLength = svgWidth - 2 * margin;
  const dotPositions = Array.from({ length: dotCount }, (_, i) => margin + (trackLength / (dotCount - 1)) * i);

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

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-wide">
            Sustainability <span className="text-neon-green text-glow">Dashboard</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Track your environmental impact with real-time metrics and insights
          </p>
        </motion.div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {cards.map((card, index) => (
            <MetricCard key={card.title} card={card} index={index} />
          ))}
        </div>

        {/* Timeline Tracker */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg mb-16 border border-gray-800"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Weekly Progress</h3>
          <div className="relative w-full" style={{ minHeight: svgHeight }}>
            {/* Only Dots, no lines */}
            <div className="absolute left-0 top-0 w-full h-14 flex justify-between items-center z-10">
              {days.map((day, idx) => (
                <div key={day} className="flex flex-col items-center">
                  <div className={`transition-all duration-300 mb-2 flex items-center justify-center
                    ${idx === dayIndex ? 'w-7 h-7 bg-neon-green border-4 border-white shadow-[0_0_18px_6px_#baff4e99] animate-pulse' : 'w-4 h-4 bg-gray-900 border-2 border-gray-600'}
                    rounded-full`}
                  />
                  <span className="text-sm text-gray-400 select-none mt-1">{day}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-800"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Recent Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + index * 0.2 }}
                className="flex items-center space-x-4 p-4 rounded-lg bg-gray-800/50 hover:bg-neon-green/10 transition-colors card-hover border border-gray-700"
              >
                <achievement.icon className="w-8 h-8 text-neon-green" />
                <div>
                  <h4 className="font-semibold text-white">{achievement.title}</h4>
                  <p className="text-sm text-gray-400">{achievement.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const MetricCard = ({ card, index }: { card: any; index: number }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg card-hover group border border-gray-800"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-r ${card.color} text-white`}>
          <card.icon className="w-6 h-6" />
        </div>
        <TrendingUp className="w-5 h-5 text-green-500" />
      </div>
      
      <h3 className="text-lg font-semibold text-white mb-2">{card.title}</h3>
      
      <div className="flex items-baseline space-x-2 mb-2">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 + index * 0.1 }}
          className="text-3xl font-bold text-white"
        >
          {card.value}
        </motion.span>
        <span className="text-lg text-gray-400">{card.unit}</span>
      </div>
      
      <p className="text-sm text-gray-400">{card.description}</p>
      
      {/* Progress Bar */}
      <div className="mt-4 bg-gray-700 rounded-full h-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${card.value}%` }}
          transition={{ delay: 0.8 + index * 0.1, duration: 1.5 }}
          className={`h-full rounded-full bg-gradient-to-r ${card.color}`}
        />
      </div>
    </motion.div>
  );
};

export default Dashboard;