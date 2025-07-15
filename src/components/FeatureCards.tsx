import React from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Shield, 
  BarChart3, 
  Wrench, 
  Package, 
  RefreshCw, 
  Target,
  Leaf,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';

const FeatureCards = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      title: 'Greenwashing Detector',
      description: 'Analyze brand sustainability claims with AI-powered transparency scoring',
      icon: Shield,
      color: 'from-red-400 to-pink-500',
      link: '/greenwashing',
      stats: '95% accuracy'
    },
    {
      title: 'Carbon Tracker',
      description: 'Real-time sustainability metrics and environmental impact dashboard',
      icon: BarChart3,
      color: 'from-blue-400 to-cyan-500',
      link: '/dashboard',
      stats: 'Live tracking'
    },
    {
      title: 'Repair Finder',
      description: 'AI-generated repair suggestions to extend product lifecycles',
      icon: Wrench,
      color: 'from-orange-400 to-yellow-500',
      link: '/repair',
      stats: '80% success rate'
    },
    {
      title: 'Eco Packaging',
      description: 'Smart packaging analysis with recyclability insights',
      icon: Package,
      color: 'from-green-400 to-emerald-500',
      link: '/packaging',
      stats: 'Instant analysis'
    },
    {
      title: 'Green Switch',
      description: 'Discover sustainable alternatives to everyday products',
      icon: RefreshCw,
      color: 'from-purple-400 to-indigo-500',
      link: '/switch',
      stats: '1000+ alternatives'
    },
    {
      title: 'Habit Tracker',
      description: 'Gamified sustainability habits with streak rewards',
      icon: Target,
      color: 'from-teal-400 to-green-500',
      link: '/habits',
      stats: 'Daily motivation'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.8,
      rotateX: -15
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8
      }
    }
  };

  return (
    <section 
      ref={ref}
      className="py-24 px-4 relative overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at top, rgba(193, 248, 97, 0.05) 0%, transparent 70%),
          linear-gradient(135deg, #0A0A0A 0%, #1a2e1a 25%, #0f1f0f 50%, #1a2e1a 75%, #0A0A0A 100%)
        `
      }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-neon-green/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header with Mossy Earth Background */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 relative"
        >
          {/* Mossy Earth Background Image - Positioned behind header content */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            style={{ zIndex: -1 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 1.5, ease: "easeOut" }}
          >
            <motion.div
              className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px]"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                rotate: { duration: 120, repeat: Infinity, ease: "linear" },
                scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <img
                src="/image.png"
                alt=""
                className="w-full h-full object-contain opacity-15 mix-blend-screen filter brightness-110 contrast-125"
                style={{
                  filter: 'brightness(1.1) contrast(1.25) hue-rotate(10deg) saturate(1.2)',
                  maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,0) 100%)',
                  WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,0) 100%)'
                }}
              />
              
              {/* Subtle glow effect around the earth */}
              <div 
                className="absolute inset-0 rounded-full opacity-20"
                style={{
                  background: 'radial-gradient(circle, rgba(193, 248, 97, 0.1) 0%, rgba(34, 197, 94, 0.05) 40%, transparent 70%)',
                  filter: 'blur(20px)'
                }}
              />
            </motion.div>
          </motion.div>

          {/* Header Content - Above the Earth image */}
          <div className="relative z-10">
            <motion.div
              className="inline-flex items-center space-x-2 bg-neon-green/10 border border-neon-green/20 rounded-full px-6 py-2 mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Leaf className="w-5 h-5 text-neon-green" />
              <span className="text-neon-green font-medium">Sustainability Tools</span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-wide">
              AI-Powered <span className="text-neon-green text-glow">Eco Solutions</span>
            </h2>
            
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Transform your environmental impact with intelligent tools designed for sustainable living
            </p>
          </div>
        </motion.div>

        {/* Feature Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              whileHover={{ 
                y: -12,
                rotateY: 5,
                scale: 1.02,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="group relative"
            >
              <Link to={feature.link}>
                <div className="relative bg-gradient-to-r from-neon-green/20 to-green-500/20 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-neon-green/30 transition-all duration-500 hover:shadow-card-hover overflow-hidden">
                  {/* Enhanced Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-neon-green/10 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Icon Container */}
                  <motion.div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 relative z-10`}
                    whileHover={{ 
                      rotate: [0, -10, 10, 0],
                      scale: 1.1
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-neon-green transition-colors">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-300 mb-4 leading-relaxed group-hover:text-gray-200 transition-colors">
                      {feature.description}
                    </p>

                    {/* Stats Badge */}
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-neon-green/20 text-neon-green border border-neon-green/30">
                        {feature.stats}
                      </span>
                      
                      <motion.div
                        className="w-8 h-8 rounded-full bg-gray-800/50 flex items-center justify-center group-hover:bg-neon-green/20 transition-colors border border-gray-700/50 group-hover:border-neon-green/30"
                        whileHover={{ scale: 1.2, rotate: 45 }}
                      >
                        <Zap className="w-4 h-4 text-gray-400 group-hover:text-neon-green transition-colors" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Enhanced Animated Border */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-neon-green/50 transition-colors duration-500"
                    initial={false}
                    whileHover={{
                      boxShadow: "0 0 30px rgba(193, 248, 97, 0.3)"
                    }}
                  />

                  {/* Corner Accent */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-neon-green/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Additional Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-neon-green/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center mt-16"
        >
          <motion.div
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-neon-green/20 to-green-500/20 border border-neon-green/30 rounded-full px-8 py-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Leaf className="w-5 h-5 text-neon-green" />
            <span className="text-white font-medium">Start your sustainable journey today</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Zap className="w-5 h-5 text-neon-green" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureCards;