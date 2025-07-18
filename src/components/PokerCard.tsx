"use client";

import { motion } from "framer-motion";
import { User, Mail, Trash2 } from "lucide-react";

interface PokerCardProps {
  id: string;
  name: string;
  email: string;
  rsvp: "yes" | "no" | "maybe";
  onRSVPChange: (id: string, rsvp: "yes" | "no" | "maybe") => void;
  onRemove: (id: string) => void;
}

export default function PokerCard({ id, name, email, rsvp, onRSVPChange, onRemove }: PokerCardProps) {
  const rsvpColors = {
    yes: "border-green-500/50 bg-green-500/10",
    maybe: "border-yellow-500/50 bg-yellow-500/10",
    no: "border-red-500/50 bg-red-500/10",
  };

  const rsvpText = {
    yes: "Confirmed",
    maybe: "Maybe",
    no: "Declined",
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      whileHover={{ scale: 1.02 }}
      className={`relative bg-white/5 backdrop-blur-lg rounded-xl p-4 border ${rsvpColors[rsvp]} transition-all duration-200`}
    >
      {/* Card Suit Decoration */}
      <div className="absolute top-2 right-2 text-white/20 text-2xl">
        {rsvp === "yes" ? "♠" : rsvp === "maybe" ? "♥" : "♦"}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <User className="w-4 h-4 text-green-300" />
            <p className="text-white font-semibold">{name}</p>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-green-300" />
            <p className="text-green-200 text-sm">{email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={rsvp}
            onChange={(e) => onRSVPChange(id, e.target.value as "yes" | "no" | "maybe")}
            className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
          >
            <option value="yes">Yes</option>
            <option value="maybe">Maybe</option>
            <option value="no">No</option>
          </select>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onRemove(id)}
            className="text-red-400 hover:text-red-300 p-1 transition-colors"
            title="Remove guest"
          >
            <Trash2 className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* RSVP Status Badge */}
      <div className="absolute bottom-2 left-2">
        <span className={`text-xs px-2 py-1 rounded-full ${
          rsvp === "yes" ? "bg-green-500/20 text-green-300" :
          rsvp === "maybe" ? "bg-yellow-500/20 text-yellow-300" :
          "bg-red-500/20 text-red-300"
        }`}>
          {rsvpText[rsvp]}
        </span>
      </div>
    </motion.div>
  );
} 