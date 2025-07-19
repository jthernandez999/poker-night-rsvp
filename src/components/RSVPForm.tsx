"use client";

import { useState } from "react";
import Image from "next/image";

interface RSVPData {
  name: string;
  email: string;
  response: "yes" | "no" | "maybe";
  message?: string;
  preferredGame?: "texas-holdem" | "blackjack" | "loteria" | "all";
}

interface RSVPFormProps {
  onRSVPSubmit: (data: RSVPData) => void;
  isSubmitting: boolean;
}

export default function RSVPForm({ onRSVPSubmit, isSubmitting }: RSVPFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    response: "yes" as "yes" | "no" | "maybe",
    message: "",
    preferredGame: "all" as "texas-holdem" | "blackjack" | "loteria" | "all"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRSVPSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-[#005F5F80] rounded-[10%] p-6 md:p-8 border border-[#b98459] bg-opacity-50 relative overflow-hidden">
      {/* Background image for mobile */}
      <div className="absolute inset-0 opacity-10 md:hidden">
        <Image
          src="/Background.png"
          alt="Background"
          fill
          className="object-cover"
        />
      </div>
      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-[#b98459] mb-6 text-center font-casino">
          RSVP for Poker Night
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-[#b98459] font-bold mb-2">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#b98459] rounded-lg text-[#b98459] placeholder-[#b98459]/50 focus:outline-none focus:border-[#FFDB24]"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-[#b98459] font-bold mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#b98459] rounded-lg text-[#b98459] placeholder-[#b98459]/50 focus:outline-none focus:border-[#FFDB24]"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label htmlFor="response" className="block text-[#b98459] font-bold mb-2">
              Will you attend? *
            </label>
            <select
              id="response"
              name="response"
              value={formData.response}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#b98459] rounded-lg text-[#b98459] focus:outline-none focus:border-[#FFDB24]"
            >
              <option value="yes">Yes, I&apos;ll be there!</option>
              <option value="maybe">Maybe, I&apos;ll let you know</option>
              <option value="no">No, I can&apos;t make it</option>
            </select>
          </div>

          <div>
            <label htmlFor="preferredGame" className="block text-[#b98459] font-bold mb-2">
              Preferred Game
            </label>
            <select
              id="preferredGame"
              name="preferredGame"
              value={formData.preferredGame}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#b98459] rounded-lg text-[#b98459] focus:outline-none focus:border-[#FFDB24]"
            >
              <option value="all">All Games</option>
              <option value="texas-holdem">Texas Hold&apos;em</option>
              <option value="blackjack">Blackjack</option>
              <option value="loteria">Lotería</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-[#b98459] font-bold mb-2">
              Message (Optional)
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#b98459] rounded-lg text-[#b98459] placeholder-[#b98459]/50 focus:outline-none focus:border-[#FFDB24] resize-none"
              placeholder="Any special requests or comments..."
            />
          </div>

          <div className="text-center pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="border-2 border-[#b98459] rounded-lg py-3 px-8 font-myriadpro bg-[#FFDB24] hover:bg-[#caa600] disabled:bg-[#b98459] disabled:opacity-50 text-black font-bold transition-all duration-300"
            >
              {isSubmitting ? "Submitting..." : "Submit RSVP"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 