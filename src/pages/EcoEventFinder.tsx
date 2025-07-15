import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Users } from 'lucide-react'
import { motion } from 'framer-motion'

const events = [
  {
    id: '1',
    name: 'Global Green Tech Summit 2024',
    organizer: 'EcoFuture Alliance',
    date: '2024-08-10T15:00:00Z',
    location: 'Online',
    about: 'A virtual summit bringing together innovators, startups, and policy makers to discuss the future of green technology and climate action.',
    faq: 'Q: Who can attend?\nA: Anyone interested in sustainability and technology.\nQ: Is it free?\nA: Yes, registration is free.',
    url: 'https://www.eventbrite.com/e/green-tech-summit-2024-1234567890',
  },
  {
    id: '2',
    name: 'Zero Waste Home Workshop',
    organizer: 'Sustainability Now',
    date: '2024-07-22T18:30:00Z',
    location: 'Online',
    about: 'Learn practical tips and DIY hacks to reduce waste at home. Includes live Q&A and downloadable resources.',
    faq: 'Q: Do I need any materials?\nA: A list will be sent after registration.\nQ: Will there be a recording?\nA: Yes, all registrants get access.',
    url: 'https://www.eventbrite.com/e/zero-waste-home-workshop-2345678901',
  },
  {
    id: '3',
    name: 'Sustainable Investing 101',
    organizer: 'Green Finance Network',
    date: '2024-08-05T17:00:00Z',
    location: 'Online',
    about: 'An introduction to ESG investing, green bonds, and how your money can drive positive change.',
    faq: 'Q: Is this for beginners?\nA: Yes, no prior experience needed.\nQ: Will there be a certificate?\nA: Yes, on request.',
    url: 'https://www.eventbrite.com/e/sustainable-investing-101-3456789012',
  },
  {
    id: '4',
    name: 'Plastic-Free July Challenge',
    organizer: 'Ocean Guardians',
    date: '2024-07-15T12:00:00Z',
    location: 'Online',
    about: 'Join a global community for a month-long challenge to reduce single-use plastics. Includes weekly check-ins and prizes.',
    faq: 'Q: How do I participate?\nA: Register and join the online group.\nQ: Are there prizes?\nA: Yes, for top participants.',
    url: 'https://www.eventbrite.com/e/plastic-free-july-challenge-4567890123',
  },
  {
    id: '5',
    name: 'Urban Gardening for Beginners',
    organizer: 'Green City Collective',
    date: '2024-08-12T16:00:00Z',
    location: 'Online',
    about: 'A hands-on webinar for city dwellers to start their own balcony or rooftop gardens. Includes live demo and Q&A.',
    faq: 'Q: Do I need a garden?\nA: No, any small space works.\nQ: Will I get a starter kit?\nA: First 100 signups get a kit.',
    url: 'https://www.eventbrite.com/e/urban-gardening-for-beginners-5678901234',
  },
  {
    id: '6',
    name: 'Circular Economy Bootcamp',
    organizer: 'Circularity Lab',
    date: '2024-08-20T14:00:00Z',
    location: 'Online',
    about: 'A 2-day intensive bootcamp on circular economy principles, business models, and case studies.',
    faq: 'Q: Is this for businesses?\nA: Open to all, but especially useful for entrepreneurs.\nQ: Will there be networking?\nA: Yes, via breakout rooms.',
    url: 'https://www.eventbrite.com/e/circular-economy-bootcamp-6789012345',
  },
  {
    id: '7',
    name: 'Youth Climate Leaders Forum',
    organizer: 'Youth4Earth',
    date: '2024-08-18T13:00:00Z',
    location: 'Online',
    about: 'A global forum for young leaders to share projects, ideas, and solutions for climate action. Includes keynote speakers and workshops.',
    faq: 'Q: Is there an age limit?\nA: 15-30 years recommended.\nQ: Can I present?\nA: Submit your project after registering.',
    url: 'https://www.eventbrite.com/e/youth-climate-leaders-forum-7890123456',
  },
  {
    id: '8',
    name: 'Eco-Art Virtual Gallery',
    organizer: 'Art for Earth',
    date: '2024-08-25T19:00:00Z',
    location: 'Online',
    about: 'An interactive online exhibition of eco-themed art, with live artist talks and virtual tours.',
    faq: 'Q: Can I submit my art?\nA: Yes, open call until August 10.\nQ: Is it family-friendly?\nA: Yes, all ages welcome.',
    url: 'https://www.eventbrite.com/e/eco-art-virtual-gallery-8901234567',
  },
  {
    id: '9',
    name: 'Sustainable Fashion Masterclass',
    organizer: 'Green Threads',
    date: '2024-08-28T18:00:00Z',
    location: 'Online',
    about: 'Discover the world of sustainable fashion, ethical brands, and how to build a conscious wardrobe.',
    faq: 'Q: Do I need fashion experience?\nA: No, open to all.\nQ: Will there be discounts?\nA: Yes, for attendees.',
    url: 'https://www.eventbrite.com/e/sustainable-fashion-masterclass-9012345678',
  },
  {
    id: '10',
    name: 'Green Coding Hackathon',
    organizer: 'Code for Climate',
    date: '2024-09-02T10:00:00Z',
    location: 'Online',
    about: 'A 24-hour virtual hackathon to build apps and tools for sustainability. Open to all coders and designers.',
    faq: 'Q: Do I need a team?\nA: You can join solo or with friends.\nQ: Are there prizes?\nA: Yes, for top 3 teams.',
    url: 'https://www.eventbrite.com/e/green-coding-hackathon-0123456789',
  },
]

export default function EcoEventFinder() {
  return (
    <section className="w-full py-16 px-4 md:px-12 bg-black bg-opacity-40 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 space-y-8 text-white">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 tracking-widest mt-16">
        ONLINE SUSTAINABILITY EVENTS
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pt-6">
        {events.map((event) => (
          <motion.div
            key={event.id}
            whileHover={{ scale: 1.025, boxShadow: '0 8px 32px 0 rgba(34,197,94,0.18)' }}
            className="relative bg-gradient-to-br from-white/10 to-green-900/10 border border-neon-green/20 rounded-3xl p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 group overflow-hidden flex flex-col min-h-[420px]"
          >
            {/* Online badge */}
            <span className="absolute top-5 right-5 bg-green-600/90 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1 z-10">
              <svg className="w-3 h-3 inline-block mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Online Event
            </span>
            {/* Date/Time */}
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-black/60 border border-green-400/30 rounded-lg px-3 py-1 flex items-center gap-2 text-neon-green font-semibold text-sm shadow">
                <Calendar className="w-4 h-4 mr-1 inline-block" />
                {new Date(event.date).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
              </div>
            </div>
            {/* Title */}
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-neon-green transition-colors duration-200">
              {event.name}
            </h3>
            {/* Organizer */}
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-green-300" />
              <span className="text-sm text-green-200 font-medium">Organized by: {event.organizer}</span>
            </div>
            {/* About */}
            <p className="text-sm text-gray-200 mb-3 line-clamp-3">{event.about}</p>
            {/* FAQ */}
            <details className="bg-black/30 rounded-lg p-3 mt-auto text-xs text-gray-200 border border-white/10">
              <summary className="cursor-pointer font-semibold text-neon-green">FAQs</summary>
              <pre className="whitespace-pre-wrap font-sans mt-2">{event.faq}</pre>
            </details>
            {/* Reserve & Invite */}
            <div className="flex flex-col sm:flex-row gap-3 pt-5 mt-4">
              <a
                href={event.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center px-5 py-3 bg-green-600 hover:bg-green-700 text-lg font-bold rounded-2xl shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-neon-green/60"
              >
                🌍 Reserve a Spot
              </a>
              <Button
                variant="ghost"
                className="flex-1 text-sm text-white border border-white/10 hover:bg-white/10 rounded-2xl"
                onClick={() => {
                  navigator.share?.({
                    title: event.name,
                    text: `Join this event: ${event.name}`,
                    url: event.url,
                  }) || window.open(`mailto:?subject=${event.name}&body=Check out this event: ${event.url}`)
                }}
              >
                <Users className="w-4 h-4 mr-1" /> Invite a Friend
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
} 