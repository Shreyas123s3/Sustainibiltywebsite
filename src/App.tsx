import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import ParallaxShapes from './components/ParallaxShapes';
import ChatbotProvider from './components/ChatbotProvider';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Repair from './pages/Repair';
import Packaging from './pages/Packaging';
import Switch from './pages/Switch';
import Greenwashing from './pages/Greenwashing';
import WatchPage from "./pages/Watch";
import SustainabilityStories from './components/ui/sustainability-stories';
import EcoEventFinder from './pages/EcoEventFinder';
import EcoTracker from './pages/EcoTracker';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 30,
    scale: 0.98
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1
  },
  out: {
    opacity: 0,
    y: -30,
    scale: 1.02
  }
};

const pageTransition = {
  type: "tween",
  ease: [0.25, 0.46, 0.45, 0.94],
  duration: 0.6
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <LandingPage />
            </motion.div>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Dashboard />
            </motion.div>
          } 
        />
        <Route 
          path="/repair" 
          element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Repair />
            </motion.div>
          } 
        />
        <Route 
          path="/packaging" 
          element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Packaging />
            </motion.div>
          } 
        />
        <Route 
          path="/switch" 
          element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Switch />
            </motion.div>
          } 
        />
        <Route 
          path="/greenwashing" 
          element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Greenwashing />
            </motion.div>
          } 
        />
        <Route 
          path="/watch" 
          element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <WatchPage />
              <SustainabilityStories />
            </motion.div>
          } 
        />
        <Route 
          path="/events" 
          element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <EcoEventFinder />
            </motion.div>
          } 
        />
        <Route 
          path="/eco-tracker" 
          element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <EcoTracker />
            </motion.div>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white font-satoshi overflow-x-hidden relative">
        <ScrollProgress />
        <ParallaxShapes />
        <Navbar />
        <AnimatedRoutes />
        <ChatbotProvider />
      </div>
    </Router>
  );
}

export default App;