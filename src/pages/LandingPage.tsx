import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FeatureCards from '../components/FeatureCards';
import BackgroundMotion from '../components/BackgroundMotion';
import { BackgroundPaths } from '../components/ui/background-paths';

const LandingPage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 400], [1, 1.1]);

  return (
    <div className="relative">
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ zIndex: 20 }}
      >
        {/* Background Image - Layer 0 (as 2D background, not <img>) */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            height: '90%',
            width: 'auto',
            aspectRatio: '886/627', // matches provided image
            zIndex: 0,
            pointerEvents: 'none',
            userSelect: 'none',
            backgroundImage: 'url(/hero-line-bg.png)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            opacity: 0.92
          }}
        />
        {/* BackgroundPaths Animation - Layer 1 */}
        <div className="absolute inset-0" style={{ zIndex: 1 }}>
          <BackgroundPaths />
        </div>

        {/* Background Motion Canvas - Layer 2 */}
        <div className="absolute inset-0" style={{ zIndex: 2, opacity: 0.4 }}>
          <BackgroundMotion />
        </div>

        {/* Enhanced Background - Layer 3 */}
        <motion.div 
          className="absolute inset-0"
          style={{ 
            zIndex: 3,
            scale,
            background: `
              radial-gradient(ellipse at top left, rgba(34, 197, 94, 0.08) 0%, transparent 50%),
              radial-gradient(ellipse at top right, rgba(193, 248, 97, 0.06) 0%, transparent 50%),
              radial-gradient(ellipse at bottom left, rgba(22, 163, 74, 0.06) 0%, transparent 50%),
              radial-gradient(ellipse at bottom right, rgba(34, 197, 94, 0.03) 0%, transparent 50%),
              linear-gradient(135deg, rgba(10, 10, 10, 0.4) 0%, rgba(26, 46, 26, 0.4) 25%, rgba(15, 31, 15, 0.4) 50%, rgba(26, 46, 26, 0.4) 75%, rgba(10, 10, 10, 0.4) 100%)
            `
          }}
        />

        {/* Enhanced Animated Background Particles - Layer 4 */}
        <div className="absolute inset-0" style={{ zIndex: 4 }}>
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="particle absolute bg-neon-green/40 rounded-full particle-glow"
              style={{
                width: Math.random() * 4 + 2,
                height: Math.random() * 4 + 2,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -40, 0],
                x: [0, Math.random() * 30 - 15, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.8, 1],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Hero Content - Highest layer */}
        <motion.div
          className="relative text-center px-4"
          style={{ zIndex: 10 }}
        >
          {/* Enhanced Title */}
          <motion.h1
            initial={{ opacity: 0, y: 60, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              delay: 1, 
              duration: 1.2, 
              ease: [0.25, 0.46, 0.45, 0.94] 
            }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-wide"
          >
            A New Chapter in
            <br />
            <motion.span 
              className="text-neon-green text-glow"
              animate={{ 
                textShadow: [
                  "0 0 15px rgba(193, 248, 97, 0.6)",
                  "0 0 25px rgba(193, 248, 97, 0.8)",
                  "0 0 15px rgba(193, 248, 97, 0.6)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Sustainable Innovation
            </motion.span>
          </motion.h1>

          {/* Enhanced Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 1.8, 
              duration: 1,
              ease: "easeOut"
            }}
            className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Discover AI-powered tools for a greener future. Track your impact, 
            find sustainable alternatives, and join the movement toward environmental consciousness.
          </motion.p>

          {/* Call to Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.8 }}
            className="mb-5"
          >
            <motion.button
              className="btn-primary text-lg px-8 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Sustainability Tools
            </motion.button>
          </motion.div>

          {/* Scrolling Marquee */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8, duration: 0.8 }}
            className="py-2 overflow-hidden"
          >
            <div className="relative">
              <motion.div
                className="flex whitespace-nowrap"
                animate={{ x: [0, -1000] }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <span className="text-[#8fff81] font-medium text-lg px-8">
                  🌿 Small Actions. Big Impact. Choose Sustainability. 🌎
                </span>
                <span className="text-[#8fff81] font-medium text-lg px-8">
                  🌿 Small Actions. Big Impact. Choose Sustainability. 🌎
                </span>
                <span className="text-[#8fff81] font-medium text-lg px-8">
                  🌿 Small Actions. Big Impact. Choose Sustainability. 🌎
                </span>
                <span className="text-[#8fff81] font-medium text-lg px-8">
                  🌿 Small Actions. Big Impact. Choose Sustainability. 🌎
                </span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced Bottom Glow */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-40"
          style={{
            zIndex: 5,
            background: `linear-gradient(to top, 
              rgba(193, 248, 97, 0.15) 0%, 
              rgba(193, 248, 97, 0.08) 50%, 
              transparent 100%)`
          }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.section>

      {/* Feature Cards Section */}
      <FeatureCards />

      {/* Floating Concrete Slab Transition Section - NOW IN FRONT */}
      <section className="py-8 px-4 relative overflow-hidden">
        {/* Floating Concrete Slab - Brought to Front with High Z-Index */}
        <motion.div 
          className="relative flex items-center justify-center"
          style={{ zIndex: 20 }}
          initial={{ opacity: 0, scale: 0.7, y: 100 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.8, ease: "easeOut" }}
        >
          <motion.div
            className="relative w-full max-w-5xl h-80 md:h-96 lg:h-[500px]"
            animate={{ 
              y: [0, -15, 0],
              rotateX: [0, 3, 0],
              rotateY: [0, 2, 0]
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            whileHover={{
              scale: 1.05,
              rotateY: 5,
              transition: { duration: 0.5 }
            }}
          >
            {/* Main Concrete Slab Image - High Visibility */}
            <img
              src="https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg"
              alt="Floating concrete slab with sustainable plant growth"
              className="w-full h-full object-contain drop-shadow-2xl"
              style={{
                filter: 'brightness(1.2) contrast(1.3) saturate(1.2) hue-rotate(120deg)',
                opacity: 1
              }}
            />
            
            {/* Enhanced Glow Effects Around the Slab */}
            <div 
              className="absolute inset-0 rounded-lg"
              style={{
                background: 'radial-gradient(ellipse, rgba(193, 248, 97, 0.3) 0%, rgba(34, 197, 94, 0.15) 40%, transparent 70%)',
                filter: 'blur(40px)',
                transform: 'scale(1.2)'
              }}
            />

            {/* Secondary Glow Layer */}
            <div 
              className="absolute inset-0 rounded-lg"
              style={{
                background: 'radial-gradient(ellipse, rgba(193, 248, 97, 0.2) 0%, rgba(22, 163, 74, 0.12) 50%, transparent 80%)',
                filter: 'blur(60px)',
                transform: 'scale(1.4)'
              }}
            />

            {/* Interactive Floating Particles Around the Slab */}
            <div className="absolute inset-0">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 bg-neon-green/60 rounded-full shadow-lg"
                  style={{
                    left: `${15 + Math.random() * 70}%`,
                    top: `${15 + Math.random() * 70}%`,
                    boxShadow: '0 0 15px rgba(193, 248, 97, 0.8)'
                  }}
                  animate={{
                    y: [0, -30, 0],
                    x: [0, Math.random() * 40 - 20, 0],
                    opacity: [0.4, 1, 0.4],
                    scale: [1, 2, 1],
                  }}
                  transition={{
                    duration: 5 + Math.random() * 4,
                    repeat: Infinity,
                    delay: Math.random() * 3,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            {/* Decorative Corner Elements */}
            <div className="absolute top-4 left-4 w-4 h-4 bg-neon-green/70 rounded-full animate-pulse shadow-lg" />
            <div className="absolute top-4 right-4 w-3 h-3 bg-green-400/70 rounded-full animate-pulse shadow-lg" style={{ animationDelay: '0.5s' }} />
            <div className="absolute bottom-4 left-4 w-3 h-3 bg-emerald-400/70 rounded-full animate-pulse shadow-lg" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-4 right-4 w-4 h-4 bg-neon-green/70 rounded-full animate-pulse shadow-lg" style={{ animationDelay: '1.5s' }} />

            {/* Subtle Border Highlight */}
            <motion.div
              className="absolute inset-0 rounded-lg border-2 border-transparent"
              animate={{
                borderColor: [
                  'rgba(193, 248, 97, 0)',
                  'rgba(193, 248, 97, 0.3)',
                  'rgba(193, 248, 97, 0)'
                ]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.div>

        {/* Enhanced Background Elements for Context */}
        <div className="absolute inset-0" style={{ zIndex: 1 }}>
          {/* Subtle background pattern */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                radial-gradient(circle at 25% 25%, rgba(193, 248, 97, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, rgba(34, 197, 94, 0.08) 0%, transparent 50%)
              `
            }}
          />
          
          {/* Flowing background lines */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full h-px bg-gradient-to-r from-transparent via-neon-green/20 to-transparent"
              style={{
                top: `${20 + i * 10}%`,
              }}
              animate={{
                x: ['-100%', '100%'],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 12 + i * 2,
                repeat: Infinity,
                delay: i * 1.5,
                ease: "linear",
              }}
            />
          ))}
        </div>
      </section>

      {/* Additional Content Sections - Reduced top padding for minimal gap */}
      <section className="pt-8 pb-24 px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-neon-green/20 to-green-500/20 rounded-2xl p-12 border border-neon-green/30"
          >
            <h3 className="text-3xl font-bold text-white mb-6">
              🌱 Ready to Transform Your Impact?
            </h3>
            <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
              Join thousands of eco-conscious individuals using AI-powered tools to create 
              a more sustainable future. Every small action contributes to meaningful change.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-neon-green rounded-full animate-pulse" />
                <span className="text-gray-300">Real-time Impact Tracking</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span className="text-gray-300">AI-Powered Recommendations</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-gray-300">Community-Driven Solutions</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;