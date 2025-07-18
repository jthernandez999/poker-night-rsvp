"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, X, Coins, Users, Clock, Gamepad2 } from "lucide-react";

interface GameSettings {
  buyIn: number;
  maxPlayers: number;
  gameType: string;
  timeLimit: string;
}

interface GameSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: GameSettings;
  onSave: (settings: GameSettings) => void;
}

const gameTypes = [
  "Texas Hold'em",
  "Omaha",
  "Seven Card Stud",
  "Five Card Draw",
  "Razz",
  "Mixed Games"
];

const timeLimits = [
  "2 hours",
  "3 hours", 
  "4 hours",
  "5 hours",
  "6 hours",
  "All night"
];

export default function GameSettingsModal({ isOpen, onClose, settings, onSave }: GameSettingsModalProps) {
  const [formData, setFormData] = useState<GameSettings>(settings);
  const [errors, setErrors] = useState<{ buyIn?: string; maxPlayers?: string }>({});

  const validateForm = () => {
    const newErrors: { buyIn?: string; maxPlayers?: string } = {};
    
    if (formData.buyIn < 0) {
      newErrors.buyIn = "Buy-in cannot be negative";
    }
    
    if (formData.maxPlayers < 2 || formData.maxPlayers > 10) {
      newErrors.maxPlayers = "Max players must be between 2 and 10";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
      onClose();
    }
  };

  const handleClose = () => {
    setFormData(settings);
    setErrors({});
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 w-full max-w-lg border border-white/20"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Game Settings
              </h3>
              <button
                onClick={handleClose}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Game Type */}
              <div>
                <label className="block text-green-200 text-sm font-medium mb-2">
                  Game Type
                </label>
                <div className="relative">
                  <Gamepad2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-300" />
                  <select
                    value={formData.gameType}
                    onChange={(e) => setFormData({ ...formData, gameType: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
                  >
                    {gameTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Buy-in */}
              <div>
                <label className="block text-green-200 text-sm font-medium mb-2">
                  Buy-in Amount ($)
                </label>
                <div className="relative">
                  <Coins className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-300" />
                  <input
                    type="number"
                    value={formData.buyIn}
                    onChange={(e) => setFormData({ ...formData, buyIn: parseInt(e.target.value) || 0 })}
                    className={`w-full pl-10 pr-4 py-3 bg-white/10 border rounded-lg text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors ${
                      errors.buyIn ? "border-red-400" : "border-white/20"
                    }`}
                    placeholder="Enter buy-in amount"
                    min="0"
                  />
                </div>
                {errors.buyIn && (
                  <p className="text-red-400 text-sm mt-1">{errors.buyIn}</p>
                )}
              </div>

              {/* Max Players */}
              <div>
                <label className="block text-green-200 text-sm font-medium mb-2">
                  Maximum Players
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-300" />
                  <input
                    type="number"
                    value={formData.maxPlayers}
                    onChange={(e) => setFormData({ ...formData, maxPlayers: parseInt(e.target.value) || 2 })}
                    className={`w-full pl-10 pr-4 py-3 bg-white/10 border rounded-lg text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors ${
                      errors.maxPlayers ? "border-red-400" : "border-white/20"
                    }`}
                    placeholder="Enter max players"
                    min="2"
                    max="10"
                  />
                </div>
                {errors.maxPlayers && (
                  <p className="text-red-400 text-sm mt-1">{errors.maxPlayers}</p>
                )}
              </div>

              {/* Time Limit */}
              <div>
                <label className="block text-green-200 text-sm font-medium mb-2">
                  Time Limit
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-300" />
                  <select
                    value={formData.timeLimit}
                    onChange={(e) => setFormData({ ...formData, timeLimit: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
                  >
                    {timeLimits.map((limit) => (
                      <option key={limit} value={limit}>{limit}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
                >
                  Save Settings
                </motion.button>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleClose}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-lg font-semibold border border-white/20 transition-colors"
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 