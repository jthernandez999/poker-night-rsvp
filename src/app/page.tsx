"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Users, Calendar, MapPin, CheckCircle, XCircle, Clock, Coins, Trophy, Star, Crown, Sparkles, Building2, Car, Dice1 } from "lucide-react";

interface RSVPResponse {
  name: string;
  email: string;
  response: "yes" | "no" | "maybe";
  message?: string;
  preferredGame?: "texas-holdem" | "blackjack" | "loteria" | "all";
}

export default function Home() {
  const [rsvpForm, setRsvpForm] = useState({
    name: "",
    email: "",
    response: "yes" as "yes" | "no" | "maybe",
    message: "",
    preferredGame: "all" as "texas-holdem" | "blackjack" | "loteria" | "all",
  });
  const [showRSVPForm, setShowRSVPForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [responses, setResponses] = useState<RSVPResponse[]>([]);
  const [loading, setLoading] = useState(true);

  // Load responses from API on component mount
  useEffect(() => {
    const loadResponses = async () => {
      try {
        const response = await fetch('/api/rsvp');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Ensure data is an array
        if (Array.isArray(data)) {
          setResponses(data);
        } else {
          console.error('Expected array but got:', typeof data, data);
          setResponses([]);
        }
      } catch (error) {
        console.error('Failed to load responses:', error);
        setResponses([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadResponses();
  }, []);

  const handleRSVPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rsvpForm.name && rsvpForm.email) {
      try {
        const response = await fetch('/api/rsvp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(rsvpForm),
        });
        
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.response) {
            // Ensure we're adding a valid response object
            const newResponse = {
              name: result.response.name,
              email: result.response.email,
              response: result.response.response,
              message: result.response.message || '',
              preferredGame: result.response.preferredGame || 'all'
            };
            setResponses(prev => [...prev, newResponse]);
            setSubmitted(true);
            setRsvpForm({ name: "", email: "", response: "yes", message: "", preferredGame: "all" });
            setShowRSVPForm(false);
            setTimeout(() => setSubmitted(false), 3000);
          } else {
            console.error('RSVP submission failed:', result.message);
          }
        } else {
          console.error('Failed to submit RSVP');
        }
      } catch (error) {
        console.error('Error submitting RSVP:', error);
      }
    }
  };

  const responseCounts = {
    yes: Array.isArray(responses) ? responses.filter(r => r && r.response === "yes").length : 0,
    maybe: Array.isArray(responses) ? responses.filter(r => r && r.response === "maybe").length : 0,
    no: Array.isArray(responses) ? responses.filter(r => r && r.response === "no").length : 0,
  };

  const gamePreferences = {
    "texas-holdem": Array.isArray(responses) ? responses.filter(r => r && r.preferredGame === "texas-holdem").length : 0,
    "blackjack": Array.isArray(responses) ? responses.filter(r => r && r.preferredGame === "blackjack").length : 0,
    "loteria": Array.isArray(responses) ? responses.filter(r => r && r.preferredGame === "loteria").length : 0,
    "all": Array.isArray(responses) ? responses.filter(r => r && r.preferredGame === "all").length : 0,
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Pure black background with gold accents */}
      <div className="fixed inset-0 bg-black"></div>
      
      {/* Gold gradient overlays for depth */}
      <div className="fixed inset-0 bg-gradient-to-tr from-transparent via-yellow-900/15 to-transparent"></div>
      <div className="fixed inset-0 bg-gradient-to-bl from-transparent via-yellow-800/10 to-transparent"></div>
      
      {/* Subtle gold mesh gradient */}
      <div className="fixed inset-0 opacity-25" style={{
        background: `
          radial-gradient(circle at 20% 80%, rgba(212, 175, 55, 0.2) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 215, 0, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(184, 134, 11, 0.1) 0%, transparent 50%)
        `
      }}></div>
      
      {/* Classic luxury pattern overlay */}
      <div className="fixed inset-0 opacity-5" style={{
        backgroundImage: `
          repeating-linear-gradient(
            45deg,
            transparent,
            transparent 2px,
            rgba(212, 175, 55, 0.1) 2px,
            rgba(212, 175, 55, 0.1) 4px
          )
        `
      }}></div>
      
      {/* Casino background assets */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <img src="/4aces copy.png" alt="Four Aces" className="w-full h-full object-cover" />
        </div>
        <div className="absolute top-[100%] left-0 w-full h-[30%] opacity-25">
          <img src="/3d285c3bf1733b96597c0d7059568ca1 copy.png" alt="Casino Card" className="w-full h-full object-contain" />
        </div>
        <div className="absolute top-[130%] left-0 w-full h-[30%] opacity-20">
          <img src="/R copy.png" alt="Royal Card" className="w-full h-full object-contain" />
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto p-6">
        {/* Header with Sparkles */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          
          <div className="text-center mb-8 mt-16">
            <div className="inline-block border-t-2 border-b-2 border-yellow-500/30 px-8 py-2 mb-4">
              <span className="text-yellow-300 text-sm tracking-widest font-light">EST. 1987-1989</span>
            </div>
          </div>
          
          <div className="relative w-full mb-8">
            {/* Title container with light border */}
            <div className="relative inline-block mx-auto">
              {/* Casino-style light border around the title container */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Corner lights only - no duplicates */}
                {/* Top-left corner */}
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-2 -left-2 w-3 h-3 sm:w-4 sm:h-4 bg-yellow-300 rounded-full shadow-lg shadow-yellow-300/60"
                />
                
                {/* Top-right corner */}
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute -top-2 -right-2 w-3 h-3 sm:w-4 sm:h-4 bg-yellow-300 rounded-full shadow-lg shadow-yellow-300/60"
                />
                
                {/* Bottom-left corner */}
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1.0 }}
                  className="absolute -bottom-2 -left-2 w-3 h-3 sm:w-4 sm:h-4 bg-yellow-300 rounded-full shadow-lg shadow-yellow-300/60"
                />
                
                {/* Bottom-right corner */}
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                  className="absolute -bottom-2 -right-2 w-3 h-3 sm:w-4 sm:h-4 bg-yellow-300 rounded-full shadow-lg shadow-yellow-300/60"
                />
              </div>
              
              {/* Title container with padding for the light border */}
              <div className="px-8 py-6 sm:px-12 sm:py-8 md:px-16 md:py-10 lg:px-20 lg:py-12">
                <motion.h1 
                  className="text-[8vh] sm:text-[10vh] md:text-[12vh] lg:text-[14vh] font-black bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent cursor-pointer font-serif leading-none tracking-tight text-center"
                  initial={{ opacity: 0, scale: 0.5, y: -100, rotateX: -90 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    y: 0,
                    rotateX: 0,
                    textShadow: [
                      "0 0 20px rgba(255, 215, 0, 0.6), 0 0 40px rgba(255, 215, 0, 0.4)",
                      "0 0 30px rgba(255, 215, 0, 0.8), 0 0 60px rgba(255, 215, 0, 0.6)",
                      "0 0 20px rgba(255, 215, 0, 0.6), 0 0 40px rgba(255, 215, 0, 0.4)"
                    ]
                  }}
                  transition={{ 
                    duration: 2.0, 
                    ease: "easeOut",
                    delay: 0.3,
                    textShadow: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    textShadow: "0 0 30px rgba(255, 215, 0, 0.8), 0 0 60px rgba(255, 215, 0, 0.6)"
                  }}
                  style={{
                    filter: "drop-shadow(0 0 20px rgba(255, 215, 0, 0.4)) drop-shadow(0 0 40px rgba(255, 215, 0, 0.2))"
                  }}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const deltaX = (x - centerX) / centerX;
                    const deltaY = (y - centerY) / centerY;
                    
                    e.currentTarget.style.filter = `
                      drop-shadow(0 0 20px rgba(255, 215, 0, 0.4)) 
                      drop-shadow(0 0 40px rgba(255, 215, 0, 0.2))
                      drop-shadow(${deltaX * 10}px ${deltaY * 10}px 20px rgba(255, 215, 0, 0.3))
                    `;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = "drop-shadow(0 0 20px rgba(255, 215, 0, 0.4)) drop-shadow(0 0 40px rgba(255, 215, 0, 0.2))";
                  }}
                >
                  HERNANDEZ CASINO
                </motion.h1>
              </div>
            </div>
          </div>
          
          <p className="text-2xl text-yellow-200 mb-2 font-serif">Birthday Edition</p>
          
          {/* Birthday Celebration Description */}
          <div className="bg-gradient-to-br from-red-950/80 to-red-900/70 p-6 mb-6 border-l-4 border-r-4 border-red-800/50 shadow-lg shadow-red-900/30 backdrop-blur-sm">
            <p className="text-lg text-yellow-100 max-w-4xl mx-auto leading-relaxed">
              <span className="text-yellow-300 font-semibold">In celebration of Joe & Ayde&apos;s birthday,</span> we are inviting you to celebrate our revolutions around the sun. 
              Join us for an evening of luxury, excitement, and unforgettable memories at Hernandez Casino!
            </p>
          </div>
          
          <p className="text-lg text-yellow-100 max-w-3xl mx-auto font-light leading-relaxed">
            Experience the thrill of Texas Hold&apos;em, the excitement of Blackjack, and the fun of Lotería. 
            Whether you&apos;re a high roller or just looking for a good time, everyone&apos;s welcome!
          </p>
        </motion.div>

        {/* Event Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-green-900/40 backdrop-blur-lg p-8 mb-8 border border-yellow-500/20 shadow-2xl relative overflow-hidden"
        >
          {/* Classic luxury corner accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-yellow-500/40"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-yellow-500/40"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-yellow-500/40"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-yellow-500/40"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-700 flex items-center justify-center border border-yellow-400/30">
                  <Calendar className="w-6 h-6 text-black" />
                </div>
                <div>
                  <p className="text-yellow-300 text-sm font-medium">DATE & TIME</p>
                  <p className="text-white text-xl font-bold">Saturday, July 26th, 2025</p>
                  <p className="text-yellow-100">3:00 PM - 11:00 PM</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-700 flex items-center justify-center border border-yellow-400/30">
                  <MapPin className="w-6 h-6 text-black" />
                </div>
                <div>
                  <p className="text-yellow-300 text-sm font-medium">LOCATION</p>
                  <p className="text-white text-xl font-bold">Hernandez Casino</p>
                  <p className="text-yellow-100">11811 Beverly Blvd</p>
                  <p className="text-yellow-100">APT 1</p>
                  <p className="text-yellow-100">Whittier, CA 90601</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-700 flex items-center justify-center border border-yellow-400/30">
                  <Coins className="w-6 h-6 text-black" />
                </div>
                <div>
                  <p className="text-yellow-300 text-sm font-medium">MINIMUM BUY-IN</p>
                  <p className="text-white text-xl font-bold">$5</p>
                  <p className="text-yellow-100">Cash prizes and jackpots</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-700 flex items-center justify-center border border-yellow-400/30">
                  <Users className="w-6 h-6 text-black" />
                </div>
                <div>
                  <p className="text-yellow-300 text-sm font-medium">CAPACITY</p>
                  <p className="text-white text-xl font-bold">100+ Guests</p>
                  <p className="text-yellow-100">Multiple gaming rooms</p>
                </div>
              </div>
            </div>
        </div>
        </motion.div>

        {/* Gaming Rooms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-green-900/40 backdrop-blur-lg p-8 mb-8 border border-yellow-500/20 shadow-2xl relative overflow-hidden"
        >
          {/* Classic luxury corner accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-yellow-500/40"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-yellow-500/40"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-yellow-500/40"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-yellow-500/40"></div>
                      <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3 font-serif">
              <Car className="w-8 h-8 text-yellow-400" />
              Gaming Rooms
            </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Texas Hold'em Room */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-green-800/50 p-6 border border-yellow-500/20"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-700 flex items-center justify-center mx-auto mb-4 border border-yellow-400/30">
                  <Car className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Texas Hold&apos;em</h3>
                <p className="text-yellow-200 text-sm mb-4">High-stakes poker action</p>
                <div className="text-center">
                  <p className="text-yellow-400 font-semibold">{gamePreferences["texas-holdem"]} interested</p>
                </div>
              </div>
            </motion.div>

            {/* Blackjack Room */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-green-800/50 p-6 border border-yellow-500/20"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-700 flex items-center justify-center mx-auto mb-4 border border-yellow-400/30">
                  <Car className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Blackjack</h3>
                <p className="text-yellow-200 text-sm mb-4">Beat the dealer to 21</p>
                <div className="text-center">
                  <p className="text-yellow-400 font-semibold">{gamePreferences["blackjack"]} interested</p>
                </div>
              </div>
            </motion.div>

            {/* Lotería Room */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-green-800/50 p-6 border border-yellow-500/20"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-700 flex items-center justify-center mx-auto mb-4 border border-yellow-400/30">
                  <Dice1 className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Lotería</h3>
                <p className="text-yellow-200 text-sm mb-4">Traditional Mexican bingo</p>
                <div className="text-center">
                  <p className="text-yellow-400 font-semibold">{gamePreferences["loteria"]} interested</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* RSVP Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-green-900/40 backdrop-blur-lg p-8 mb-8 border border-yellow-500/20 shadow-2xl relative overflow-hidden"
        >
          {/* Classic luxury corner accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-yellow-500/40"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-yellow-500/40"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-yellow-500/40"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-yellow-500/40"></div>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3 font-serif">
              <Crown className="w-8 h-8 text-yellow-400" />
              Will You Join Us?
            </h2>
            <p className="text-yellow-100">Let us know if you can make it to our birthday celebration!</p>
          </div>

          {/* RSVP Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-green-800/50 p-4 text-center border border-yellow-500/20">
              <CheckCircle className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-yellow-400">{responseCounts.yes}</p>
              <p className="text-yellow-200 text-sm">Coming</p>
            </div>
            <div className="bg-green-800/50 p-4 text-center border border-yellow-500/20">
              <Clock className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-yellow-400">{responseCounts.maybe}</p>
              <p className="text-yellow-200 text-sm">Maybe</p>
            </div>
            <div className="bg-green-800/50 p-4 text-center border border-yellow-500/20">
              <XCircle className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-yellow-400">{responseCounts.no}</p>
              <p className="text-yellow-200 text-sm">Can&apos;t Make It</p>
            </div>
          </div>

          {/* RSVP Button */}
          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowRSVPForm(true)}
              className="bg-gradient-to-r from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-yellow-800 text-black py-4 px-8 font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl border border-yellow-400/30"
            >
              RSVP Now
            </motion.button>
          </div>
        </motion.div>

        {/* Guest Responses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-green-900/40 backdrop-blur-lg p-8 border border-yellow-500/20 shadow-2xl relative overflow-hidden"
        >
          {/* Classic luxury corner accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-yellow-500/40"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-yellow-500/40"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-yellow-500/40"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-yellow-500/40"></div>
                      <h3 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2 font-serif">
              <Star className="w-6 h-6 text-yellow-400" />
              Who&apos;s Coming
            </h3>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
              <p className="text-yellow-200 mt-2">Loading responses...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {Array.isArray(responses) && responses.length > 0 ? (
                responses.map((response, index) => {
                  // Ensure response is a valid object with required properties
                  if (!response || typeof response !== 'object' || !response.name || !response.response) {
                    return null;
                  }
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="p-4 border border-yellow-500/20 bg-green-800/50"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-semibold">{String(response.name)}</p>
                          {response.message && (
                            <p className="text-yellow-100 text-sm mt-1">{String(response.message)}</p>
                          )}
                          {response.preferredGame && response.preferredGame !== "all" && (
                            <p className="text-yellow-200 text-xs mt-1">
                              Interested in: {
                                response.preferredGame === "texas-holdem" ? "Texas Hold'em" :
                                response.preferredGame === "blackjack" ? "Blackjack" :
                                response.preferredGame === "loteria" ? "Lotería" : "All games"
                              }
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {response.response === "yes" && <CheckCircle className="w-5 h-5 text-yellow-400" />}
                          {response.response === "maybe" && <Clock className="w-5 h-5 text-yellow-400" />}
                          {response.response === "no" && <XCircle className="w-5 h-5 text-yellow-400" />}
                          <span className="text-sm font-medium text-yellow-400">
                            {response.response === "yes" ? "Coming" : 
                             response.response === "maybe" ? "Maybe" : "Can&apos;t Make It"}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <div className="text-center py-8">
                  <p className="text-yellow-200">No responses yet. Be the first to RSVP!</p>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>

      {/* RSVP Modal */}
      <AnimatePresence>
        {showRSVPForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowRSVPForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-black p-8 w-full max-w-md border border-yellow-500/20 shadow-2xl"
            >
              <h3 className="text-2xl font-bold text-white mb-6 text-center">RSVP</h3>
              
              <form onSubmit={handleRSVPSubmit} className="space-y-6">
                <div>
                  <label className="block text-yellow-200 text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={rsvpForm.name}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                    className="w-full px-4 py-3 bg-black/50 border border-yellow-500/20 text-white placeholder-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-yellow-200 text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={rsvpForm.email}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, email: e.target.value })}
                    className="w-full px-4 py-3 bg-black/50 border border-yellow-500/20 text-white placeholder-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-yellow-200 text-sm font-medium mb-2">Preferred Game</label>
                  <select
                    value={rsvpForm.preferredGame}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, preferredGame: e.target.value as "texas-holdem" | "blackjack" | "loteria" | "all" })}
                    className="w-full px-4 py-3 bg-black/50 border border-yellow-500/20 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  >
                    <option value="all">All games - I&apos;ll try everything!</option>
                    <option value="texas-holdem">Texas Hold&apos;em</option>
                    <option value="blackjack">Blackjack</option>
                    <option value="loteria">Lotería</option>
                  </select>
                </div>

                <div>
                  <label className="block text-yellow-200 text-sm font-medium mb-2">Response</label>
                  <select
                    value={rsvpForm.response}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, response: e.target.value as "yes" | "no" | "maybe" })}
                    className="w-full px-4 py-3 bg-black/50 border border-yellow-500/20 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  >
                    <option value="yes">I&apos;ll be there! 🎰</option>
                    <option value="maybe">Maybe, I&apos;ll let you know</option>
                    <option value="no">Sorry, I can&apos;t make it</option>
                  </select>
                </div>

                <div>
                  <label className="block text-yellow-200 text-sm font-medium mb-2">Message (Optional)</label>
                  <textarea
                    value={rsvpForm.message}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, message: e.target.value })}
                    className="w-full px-4 py-3 bg-black/50 border border-yellow-500/20 text-white placeholder-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Any message for the casino?"
                    rows={3}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-yellow-800 text-black py-3 px-4 font-semibold transition-all duration-300 border border-yellow-400/30"
                  >
                    Submit RSVP
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowRSVPForm(false)}
                    className="flex-1 bg-black/50 hover:bg-black/70 text-white py-3 px-4 font-semibold border border-yellow-500/20 transition-colors"
                  >
                    Cancel
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Message */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-yellow-700 text-black px-6 py-3 shadow-lg z-50 border border-yellow-400/30"
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>RSVP submitted successfully!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
