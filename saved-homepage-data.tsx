// SAVED HOMEPAGE DATA AND TITLE CODE
// This contains the RSVP functionality and title with lights that was replaced

interface RSVPResponse {
  name: string;
  email: string;
  response: "yes" | "no" | "maybe";
  message?: string;
  preferredGame?: "texas-holdem" | "blackjack" | "loteria" | "all";
}

// RSVP Form State
const rsvpForm = {
  name: "",
  email: "",
  response: "yes" as "yes" | "no" | "maybe",
  message: "",
  preferredGame: "all" as "texas-holdem" | "blackjack" | "loteria" | "all",
};

// RSVP Submit Handler
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
          // Handle successful submission
        }
      }
    } catch (error) {
      console.error('Error submitting RSVP:', error);
    }
  }
};

// TITLE WITH LIGHTS CODE
const TitleWithLights = () => (
  <div className="relative w-full mb-8">
    {/* Title container with light border */}
    <div className="relative inline-block mx-auto max-w-full overflow-visible">
      {/* Casino-style light border around the title container */}
      <div className="absolute inset-0 pointer-events-none overflow-visible">
        {/* Top border lights */}
        <div className="absolute -top-2 left-0 right-0 flex justify-between items-center">
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-100 rounded-full shadow-lg shadow-yellow-100/80"
          />
          <div className="flex gap-1 sm:gap-2 md:gap-3 lg:gap-4 flex-1 justify-between">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  backgroundColor: ["rgb(253 224 71)", "rgb(255 255 255)", "rgb(253 224 71)"],
                  boxShadow: [
                    "0 0 5px rgb(253 224 71), 0 0 10px rgb(253 224 71), 0 0 15px rgb(253 224 71)",
                    "0 0 8px rgb(255 255 255), 0 0 16px rgb(255 255 255), 0 0 24px rgb(255 255 255)",
                    "0 0 5px rgb(253 224 71), 0 0 10px rgb(253 224 71), 0 0 15px rgb(253 224 71)"
                  ]
                }}
                transition={{ 
                  duration: 0.5, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: i * 0.01
                }}
                className="w-2 h-2 sm:w-3 sm:h-3 rounded-full opacity-100"
              />
            ))}
          </div>
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
            className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-100 rounded-full shadow-lg shadow-yellow-100/80"
          />
        </div>
        
        {/* Right border lights */}
        <div className="absolute top-0 bottom-0 -right-2 flex flex-col justify-between items-center">
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
            className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-100 rounded-full shadow-lg shadow-yellow-100/80"
          />
          <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-6">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  backgroundColor: ["rgb(253 224 71)", "rgb(255 255 255)", "rgb(253 224 71)"],
                  boxShadow: [
                    "0 0 5px rgb(253 224 71), 0 0 10px rgb(253 224 71), 0 0 15px rgb(253 224 71)",
                    "0 0 8px rgb(255 255 255), 0 0 16px rgb(255 255 255), 0 0 24px rgb(255 255 255)",
                    "0 0 5px rgb(253 224 71), 0 0 10px rgb(253 224 71), 0 0 15px rgb(253 224 71)"
                  ]
                }}
                transition={{ 
                  duration: 0.5, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: i * 0.04 + 0.5
                }}
                className="w-2 h-2 sm:w-3 sm:h-3 rounded-full opacity-100"
              />
            ))}
          </div>
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 2.1 }}
            className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-100 rounded-full shadow-lg shadow-yellow-100/80"
          />
        </div>
        
        {/* Bottom border lights */}
        <div className="absolute -bottom-2 left-0 right-0 flex justify-between items-center">
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 2.4 }}
            className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-100 rounded-full shadow-lg shadow-yellow-100/80"
          />
          <div className="flex gap-1 sm:gap-2 md:gap-3 lg:gap-4 flex-1 justify-between">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  backgroundColor: ["rgb(253 224 71)", "rgb(255 255 255)", "rgb(253 224 71)"],
                  boxShadow: [
                    "0 0 5px rgb(253 224 71), 0 0 10px rgb(253 224 71), 0 0 15px rgb(253 224 71)",
                    "0 0 8px rgb(255 255 255), 0 0 16px rgb(255 255 255), 0 0 24px rgb(255 255 255)",
                    "0 0 5px rgb(253 224 71), 0 0 10px rgb(253 224 71), 0 0 15px rgb(253 224 71)"
                  ]
                }}
                transition={{ 
                  duration: 0.5, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: i * 0.01 + 1.0
                }}
                className="w-2 h-2 sm:w-3 sm:h-3 rounded-full opacity-100"
              />
            ))}
          </div>
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 3.6 }}
            className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-100 rounded-full shadow-lg shadow-yellow-100/80"
          />
        </div>
        
        {/* Left border lights */}
        <div className="absolute top-0 bottom-0 -left-2 flex flex-col justify-between items-center">
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 3.9 }}
            className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-100 rounded-full shadow-lg shadow-yellow-100/80"
          />
          <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-6">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  backgroundColor: ["rgb(253 224 71)", "rgb(255 255 255)", "rgb(253 224 71)"],
                  boxShadow: [
                    "0 0 5px rgb(253 224 71), 0 0 10px rgb(253 224 71), 0 0 15px rgb(253 224 71)",
                    "0 0 8px rgb(255 255 255), 0 0 16px rgb(255 255 255), 0 0 24px rgb(255 255 255)",
                    "0 0 5px rgb(253 224 71), 0 0 10px rgb(253 224 71), 0 0 15px rgb(253 224 71)"
                  ]
                }}
                transition={{ 
                  duration: 0.5, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: i * 0.04 + 1.5
                }}
                className="w-2 h-2 sm:w-3 sm:h-3 rounded-full opacity-100"
              />
            ))}
          </div>
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 4.8 }}
            className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-100 rounded-full shadow-lg shadow-yellow-100/80"
          />
        </div>
      </div>
      
      {/* Title container with padding for the light border */}
      <div className="px-6 py-6 sm:px-8 sm:py-6 md:px-12 md:py-8 lg:px-16 lg:py-10 relative">
        {/* Luxury background pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(255, 215, 0, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(255, 215, 0, 0.2) 0%, transparent 50%),
            linear-gradient(45deg, transparent 40%, rgba(255, 215, 0, 0.1) 50%, transparent 60%)
          `
        }}></div>
        
        {/* Luxury corner accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-yellow-500/60"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-yellow-500/60"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-yellow-500/60"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-yellow-500/60"></div>
        
        <motion.h1 
          className="text-3xl sm:text-[5vh] md:text-[7vh] lg:text-[9vh] font-black cursor-pointer font-serif leading-none tracking-wider text-center font-extrabold"
          style={{
            textShadow: `
              -2px -2px 0 #FFD700,
              2px -2px 0 #FFD700,
              -2px 2px 0 #FFD700,
              2px 2px 0 #FFD700,
              -1px -1px 0 #FFD700,
              1px -1px 0 #FFD700,
              -1px 1px 0 #FFD700,
              1px 1px 0 #FFD700,
              0 0 15px #FFD700,
              0 0 25px #FFD700,
              0 0 35px #FFD700,
              0 0 45px #FFD700,
              0 0 55px #FFD700,
              0 0 65px #FFD700
            `,
            WebkitTextStroke: '3px #FFD700',
            filter: 'drop-shadow(0 0 15px rgba(255, 215, 0, 0.9)) drop-shadow(0 0 25px rgba(255, 215, 0, 0.7)) drop-shadow(0 0 35px rgba(255, 215, 0, 0.5)) drop-shadow(0 0 45px rgba(255, 215, 0, 0.3))',
            color: '#000000',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontVariant: 'small-caps'
          }}
          initial={{ opacity: 0, scale: 0.5, y: -100, rotateX: -90 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: 0,
            rotateX: 0
          }}
          transition={{ 
            duration: 2.0, 
            ease: "easeOut",
            delay: 0.3
          }}
          whileHover={{ 
            scale: 1.02
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
);

// EVENT DETAILS
const eventDetails = {
  date: "Saturday, July 26th, 2025",
  time: "3:00 PM - 11:00 PM",
  location: "Hernandez Casino",
  address: "11811 Beverly Blvd",
  apartment: "APT 1",
  city: "Whittier, CA 90601",
  minBuyIn: "$5",
  capacity: "100+ Guests"
};

// GAMING ROOMS
const gamingRooms = [
  {
    name: "Texas Hold'em",
    description: "High-stakes poker action",
    icon: "Car"
  },
  {
    name: "Blackjack",
    description: "Beat the dealer to 21",
    icon: "Car"
  },
  {
    name: "Lotería",
    description: "Traditional Mexican bingo",
    icon: "Dice1"
  }
];

export { RSVPResponse, rsvpForm, handleRSVPSubmit, TitleWithLights, eventDetails, gamingRooms }; 