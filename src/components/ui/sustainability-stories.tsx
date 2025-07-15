import React from "react";
import { motion } from "framer-motion";
import { XCard } from "./x-gradient-card";

const stories = [
  {
    link: "https://repaircafe.org/en/",
    authorName: "Repair Café Crew",
    authorHandle: "repaircafe",
    authorImage: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=facearea&w=400&h=400&q=80",
    content: [
      "Fix, don’t toss! Local volunteers help you repair electronics, clothes, and more—saving money and the planet.",
      "#Repair #Community"
    ],
    isVerified: true,
    timestamp: "Today",
    tag: "Repair & Reuse"
  },
  {
    link: "https://www.thegoodtrade.com/features/clothing-swap-guide/",
    authorName: "Swap Squad",
    authorHandle: "swapszn",
    authorImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=400&h=400&q=80",
    content: [
      "Clothing swaps = new fits, zero waste. Trade your style, not the planet.",
      "#Fashion #Reuse"
    ],
    isVerified: true,
    timestamp: "2d ago",
    tag: "Clothing Swap"
  },
  {
    link: "https://www.litterless.com/wheretoshop",
    authorName: "Zero Waste Grocer",
    authorHandle: "plasticfree",
    authorImage: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=facearea&w=400&h=400&q=80",
    content: [
      "Bring your own jar, fill up, and skip the plastic. Groceries, but make it planet-friendly.",
      "#PlasticFree #Groceries"
    ],
    isVerified: true,
    timestamp: "3d ago",
    tag: "Plastic-Free"
  },
  {
    link: "https://www.nrdc.org/stories/urban-gardening-101",
    authorName: "Urban Grower",
    authorHandle: "urbangarden",
    authorImage: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=400&h=400&q=80",
    content: [
      "Turning city lots into green oases. Grow food, share vibes, build community.",
      "#UrbanGarden #GreenCity"
    ],
    isVerified: true,
    timestamp: "1w ago",
    tag: "Urban Gardens"
  },
  {
    link: "https://www.bikeleague.org/content/bike-work-day",
    authorName: "Cycle Collective",
    authorHandle: "biketowork",
    authorImage: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&h=400&q=80",
    content: [
      "Pedal power! Cities reward cycling with safe lanes and perks. Good for you, good for Earth.",
      "#BikeLife #CommuteGreen"
    ],
    isVerified: true,
    timestamp: "5d ago",
    tag: "Bike-to-Work"
  },
  {
    link: "https://www.epa.gov/recycle/composting-home",
    authorName: "Compost Crew",
    authorHandle: "compostlife",
    authorImage: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=facearea&w=400&h=400&q=80",
    content: [
      "Turn scraps into soil. Community composting = less landfill, more green.",
      "#Compost #SoilSquad"
    ],
    isVerified: true,
    timestamp: "4d ago",
    tag: "Composting"
  },
  {
    link: "https://generation180.org/solar-schools/",
    authorName: "Solar Schoolers",
    authorHandle: "solarschools",
    authorImage: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=facearea&w=400&h=400&q=80",
    content: [
      "Schools going solar = clean energy, lower bills, and climate lessons for all.",
      "#Solar #Education"
    ],
    isVerified: true,
    timestamp: "6d ago",
    tag: "Solar Schools"
  },
  {
    link: "https://www.loopstore.com/",
    authorName: "Loop Innovators",
    authorHandle: "loopstartups",
    authorImage: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=400&h=400&q=80",
    content: [
      "Reusable packaging for takeout and groceries. Close the loop, ditch the waste.",
      "#Reuse #Startup"
    ],
    isVerified: true,
    timestamp: "1w ago",
    tag: "Reusable Packaging"
  },
  {
    link: "https://localtools.org/",
    authorName: "Tool Library",
    authorHandle: "toollibrary",
    authorImage: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&h=400&q=80",
    content: [
      "Borrow, don’t buy! Tool libraries = less clutter, more sharing, more doing.",
      "#Tools #ShareMore"
    ],
    isVerified: true,
    timestamp: "2w ago",
    tag: "Tool Library"
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, type: "spring", stiffness: 60 }
  })
};

const SustainabilityStories = () => (
  <section className="w-full py-16 px-4 flex flex-col items-center justify-center bg-transparent">
    <h2
      className="text-4xl md:text-5xl font-extrabold uppercase tracking-widest mb-16 text-neon-green"
      style={{
        textShadow: '0 1px 6px #baff4e55, 0 0 12px #00ffd022',
        fontFamily: `'Oswald', 'Montserrat', 'Satoshi', 'Inter', 'sans-serif'`,
        filter: 'brightness(0.95) saturate(0.85)'
      }}
    >
      INSPIRE. ACT. REPEAT.
    </h2>
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl"
      initial="hidden"
      animate="visible"
      variants={{}}
    >
      {stories.map((story, i) => (
        <motion.div
          key={story.link}
          custom={i}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          whileHover={{ scale: 1.03 }}
        >
          <XCard {...story} />
        </motion.div>
      ))}
    </motion.div>
  </section>
);

export default SustainabilityStories; 