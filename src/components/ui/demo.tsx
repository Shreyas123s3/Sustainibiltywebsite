import { XCard } from "./x-gradient-card";

const XCardDummyData = {
    link: "https://x.com/dorian_baffier/status/1880291036410572934",
    authorName: "Dorian",
    authorHandle: "dorian_baffier",
    authorImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=400&h=400&q=80",
    content: [
        "All components from KokonutUI can now be open in @v0 🎉",
        "1. Click on 'Open in V0'",
        "2. Customize with prompts",
        "3. Deploy to your app",
    ],
    isVerified: true,
    timestamp: "Jan 18, 2025",
    reply: {
        authorName: "shadcn",
        authorHandle: "shadcn",
        authorImage:
            "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=400&h=400&q=80",
        content: "Awesome.",
        isVerified: true,
        timestamp: "Jan 18",
    },
};

function XCardDemoDefault() {
    return <XCard {...XCardDummyData} />;
}

const XCardDummyDataTwo = {
    link: "https://x.com/serafimcloud/status/1880291036410572935",
    authorName: "serafim",
    authorHandle: "serafimcloud",
    authorImage: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&h=400&q=80",
    content: [
        "I spent 70 days full-time curating the ultimate library of @shadcn/ui-like components.",
        "And today, I'm launching it publicly.",
        "Here's what it is:",
        "• 730+ production-ready components from 50+ top design engineers",
        "• Each component is yours to own - just like shadcn/ui",
        "• Install everything with shadcn CLI: code, dependencies, hooks, global css and tailwind config extensions",
        "It's also optimized for AI code editors like @lovable_dev, @stackblitz's bolt. new, and @vercel's @v0, with tailored prompts for effortless integration.",
        "👉 http://21st.dev is live now. Build faster, own your code, and never struggle with UI setup again."
    ],
    isVerified: true,
    timestamp: "Apr 6",
    reply: {
        authorName: "shadcn",
        authorHandle: "shadcn",
        authorImage: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=400&h=400&q=80",
        content: "Great work. CLI support is a nice touch.",
        isVerified: true,
        timestamp: "Jan 9"
    }
};

function XCardDemoTwo() {
    return <XCard {...XCardDummyDataTwo} />;
}

export { XCardDemoDefault, XCardDemoTwo };