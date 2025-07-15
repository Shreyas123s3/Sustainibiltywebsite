import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "../components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
// @ts-ignore
import confetti from "canvas-confetti";

const videos = [
  {
    embedUrl: "https://www.youtube.com/embed/K7d2eo3YQvA?si=w5VI0cjjP-_0rn7n",
    title: "Why Sustainability is Important | Second Nature",
    description: "A quick explainer on why sustainability matters for our future.",
  },
  {
    embedUrl: "https://www.youtube.com/embed/2NsBcVrPQok?si=08u_EraUpKaoIwU0",
    title: "Greenwashing: When Companies Fake It",
    description: "How brands fake sustainability – and how you can spot & avoid the trap.",
  },
  {
    embedUrl: "https://www.youtube.com/embed/kZIrIQDf1nQ?si=c7pJd5x4X-CvJcwC",
    title: "Sustainability in Everyday Life | Acciona",
    description: "This 2-min explainer shows how much plastic you use daily — and how to fix it.",
  },
  {
    embedUrl: "https://www.youtube.com/embed/Vl6VhCAeEfQ?si=lesTskiEdTiTWYiq",
    title: "The Tipping Points of Climate Change | TED",
    description: "How climate change can reach points of no return, and what we can do.",
  },
  {
    embedUrl: "https://www.youtube.com/embed/f0HjkFBZLek?si=9u_GsYpocCjuA8lr",
    title: "How Can Individuals Minimize Their Plastic Footprint?",
    description: "Bite-sized habits that save the planet (and actually save you money too).",
  },
  {
    embedUrl: "https://www.youtube.com/embed/7FTc8kriemI?si=9Mufn5ltEo_FPA6c",
    title: "Why Sustainability Is the Key to Our Future | What If?",
    description: "A college student goes plastic-free for 30 days. Here’s what happened.",
  },
];

const quizQuestions = [
  {
    question: "Which item is NOT recyclable curbside in most cities?",
    options: [
      "Aluminum can",
      "Glass bottle",
      "Greasy pizza box",
      "Plastic bottle",
    ],
    answer: 2,
  },
  {
    question: "Which action reduces your carbon footprint the most?",
    options: [
      "Taking shorter showers",
      "Switching to LED bulbs",
      "Eating less meat",
      "Recycling more",
    ],
    answer: 2,
  },
  {
    question: "What is the most water-efficient way to wash clothes?",
    options: [
      "Hand wash in sink",
      "Full loads in washing machine",
      "Half loads in washing machine",
      "Dry clean only",
    ],
    answer: 1,
  },
  {
    question: "Which of these is a renewable energy source?",
    options: [
      "Coal",
      "Natural gas",
      "Wind",
      "Diesel",
    ],
    answer: 2,
  },
  {
    question: "What is 'greenwashing'?",
    options: [
      "Washing clothes in cold water",
      "Misleading eco-friendly claims",
      "Using green cleaning products",
      "Composting food waste",
    ],
    answer: 1,
  },
  {
    question: "Which material breaks down fastest in a compost bin?",
    options: [
      "Plastic bag",
      "Banana peel",
      "Aluminum foil",
      "Glass jar",
    ],
    answer: 1,
  },
  {
    question: "What is the main environmental issue with fast fashion?",
    options: [
      "Expensive prices",
      "Limited styles",
      "High resource waste & pollution",
      "Long shipping times",
    ],
    answer: 2,
  },
  {
    question: "Which of these uses the most household energy annually?",
    options: [
      "Lighting",
      "Refrigerator",
      "Heating & cooling",
      "Television",
    ],
    answer: 2,
  },
  {
    question: "Which plastic type is most commonly recycled?",
    options: [
      "#1 PET (water bottles)",
      "#3 PVC (pipes)",
      "#5 PP (yogurt cups)",
      "#7 Other",
    ],
    answer: 0,
  },
  {
    question: "What is a simple way to reduce food waste at home?",
    options: [
      "Buy in bulk only",
      "Compost leftovers",
      "Throw away expired food immediately",
      "Cook more than needed",
    ],
    answer: 1,
  },
];

function getScoreMessage(score: number) {
  if (score <= 4) {
    return {
      title: "Thanks for taking the quiz! You’re just getting started 🌱",
      advice:
        "Start with basics — try our Easy Sustainability Hacks, and learn to spot greenwashing!",
      color: "from-red-500/30 to-red-900/40 border-red-400/30",
    };
  } else if (score <= 8) {
    return {
      title: "Nice! You have a growing awareness 🎯",
      advice:
        "Keep exploring! Check our videos on recycling, fast fashion, and food waste.",
      color: "from-yellow-400/30 to-yellow-900/40 border-yellow-400/30",
    };
  } else {
    return {
      title: "You’re an Eco Champ! 💚🌎",
      advice:
        "Explore deeper topics — maybe start a local green initiative or mentor others.",
      color: "from-green-400/30 to-green-900/40 border-green-400/30",
    };
  }
}

function SustainabilityQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(number|null)[]>(Array(quizQuestions.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const quizRef = useRef<HTMLDivElement>(null);

  // Removed auto-scroll to quiz section on mount
  // useEffect(() => {
  //   if (quizRef.current) {
  //     quizRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  //   }
  // }, []);

  useEffect(() => {
    if (showResult) {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 },
        zIndex: 9999,
      });
    }
  }, [showResult]);

  const score = answers.filter((a, i) => a === quizQuestions[i].answer).length;
  const scoreMsg = getScoreMessage(score);

  return (
    <div ref={quizRef} className="w-full flex flex-col items-center mt-20 mb-16">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="font-extrabold text-3xl md:text-5xl lg:text-6xl text-white/90 tracking-tight leading-tight text-center mb-4 drop-shadow-lg uppercase relative"
        style={{ letterSpacing: '0.03em' }}
      >
        CHECK YOUR SUSTAINABILITY KNOWLEDGE
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 bottom-0 w-2/3 h-1 bg-gradient-to-r from-neon-green/60 via-neon-green/20 to-transparent rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
        />
      </motion.h2>
      <div className="w-full flex justify-center">
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -40, scale: 0.98 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full max-w-3xl"
            >
              <Card className="bg-white/5 border-0 rounded-3xl shadow-2xl backdrop-blur-2xl px-10 py-14 flex flex-col items-center relative overflow-hidden"
                style={{ boxShadow: '0 8px 48px 0 rgba(186,255,78,0.10), 0 1.5px 8px 0 rgba(186,255,78,0.10)' }}
              >
                <div className="mb-4 text-neon-green font-semibold text-lg tracking-wide">
                  Question {step + 1} of {quizQuestions.length}
                </div>
                <div className="text-2xl md:text-3xl font-extrabold text-white text-center mb-10">
                  {quizQuestions[step].question}
                </div>
                <div className="flex flex-col gap-4 w-full">
                  {quizQuestions[step].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        const newAns = [...answers];
                        newAns[step] = idx;
                        setAnswers(newAns);
                      }}
                      className={`w-full text-left px-8 py-5 text-lg md:text-xl font-semibold rounded-2xl transition-all duration-200
                        ${answers[step] === idx
                          ? "bg-neon-green/90 text-black shadow-lg scale-[1.03]"
                          : "bg-white/0 text-white/90 hover:bg-neon-green/20 hover:text-neon-green/90"}
                        focus:outline-none focus:ring-2 focus:ring-neon-green/60
                        `}
                      style={{
                        border: 'none',
                        boxShadow: answers[step] === idx ? '0 0 0 2px #baff4e, 0 2px 16px 0 #baff4e33' : 'none',
                        fontFamily: 'inherit',
                        letterSpacing: '0.01em',
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between w-full mt-10">
                  <button
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                    disabled={step === 0}
                    className="px-7 py-3 rounded-xl bg-white/10 text-white/80 font-medium hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    Previous
                  </button>
                  {step < quizQuestions.length - 1 ? (
                    <button
                      onClick={() => setStep((s) => Math.min(quizQuestions.length - 1, s + 1))}
                      disabled={answers[step] === null}
                      className="px-7 py-3 rounded-xl bg-neon-green text-black font-bold hover:bg-green-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowResult(true)}
                      disabled={answers[step] === null}
                      className="px-7 py-3 rounded-xl bg-neon-green text-black font-bold hover:bg-green-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow"
                    >
                      Submit
                    </button>
                  )}
                </div>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="w-full max-w-2xl"
            >
              <Card className={`rounded-3xl shadow-2xl px-10 py-16 text-center border-0 ${scoreMsg.color} backdrop-blur-2xl`}>
                <div className="text-5xl md:text-7xl font-extrabold mb-4 text-white drop-shadow-lg">
                  {score} / {quizQuestions.length}
                </div>
                <div className="text-2xl md:text-3xl font-bold mb-4 text-white/90">
                  {scoreMsg.title}
                </div>
                <div className="text-lg text-white/80 mb-6">
                  {scoreMsg.advice}
                </div>
                <button
                  onClick={() => {
                    setStep(0);
                    setAnswers(Array(quizQuestions.length).fill(null));
                    setShowResult(false);
                  }}
                  className="mt-4 px-8 py-3 rounded-xl bg-neon-green text-black font-bold hover:bg-green-400 transition-colors"
                >
                  Try Again
                </button>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Score Key */}
      <div className="mt-10 w-full flex justify-center">
        <div className="rounded-2xl px-8 py-3 bg-white/10 border-0 text-white/80 text-center text-base font-semibold shadow backdrop-blur-xl max-w-xl w-full tracking-wide flex items-center justify-center gap-6">
          <span className="text-neon-green font-bold">🎯 Score Key:</span>
          <span className="text-red-400 font-bold">0–4 = Poor</span>
          <span className="text-yellow-300 font-bold">4–8 = Average</span>
          <span className="text-green-400 font-bold">8–10 = Excellent</span>
        </div>
      </div>
    </div>
  );
}

export default function WatchPage() {
  return (
    <main className="w-full px-6 py-16 min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white relative overflow-x-hidden scroll-smooth">
      {/* Add extra top margin below navbar */}
      <div className="h-10 md:h-16" />
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(18)].map((_, i) => (
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
      <h1 className="text-4xl font-extrabold text-center mb-4 z-10 relative drop-shadow-[0_2px_16px_rgba(186,255,78,0.4)]">
        🎥 Watch & Learn
      </h1>
      <p className="text-center text-zinc-400 mb-10 max-w-2xl mx-auto z-10 relative">
        Binge short, punchy videos that make sustainability simple, personal, and surprisingly fun.
      </p>
      {/* Add more vertical gap between video cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-y-14 gap-x-10 z-10 relative scroll-smooth">
        {videos.map((video, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-neon-green/40 group">
              <div className="w-full aspect-video relative overflow-hidden">
                <iframe
                  className="w-full h-full rounded-t-2xl border-b-2 border-neon-green/20 shadow-lg"
                  src={video.embedUrl}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
                {/* Neon glow effect */}
                <div className="absolute inset-0 pointer-events-none rounded-t-2xl border-t-4 border-neon-green/20 opacity-40 blur-sm animate-pulse" />
              </div>
              <CardContent>
                <h3 className="text-lg font-bold text-white drop-shadow-[0_2px_8px_rgba(186,255,78,0.2)]">
                  {video.title}
                </h3>
                <p className="text-sm text-zinc-300 mt-1">
                  {video.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      {/* Sustainability Knowledge Quiz Section */}
      <SustainabilityQuiz />
    </main>
  );
} 