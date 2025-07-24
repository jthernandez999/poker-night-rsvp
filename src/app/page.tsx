"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import PokerRegistrationModal from "../components/TwitterCheckModal";
import RSVPForm from "../components/RSVPForm";
import Header from "../components/Header";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [twitterCheck, setTwitterCheck] = useState(false);
  const [walletAddy, setWalletAddy] = useState("");
  const [checking, setChecking] = useState(false);
  const [_audioStatus, setAudioStatus] = useState(false);
  const [_claimed, setClaimed] = useState(false);
  const [_showPP, setShowPP] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [rsvpResponses, setRsvpResponses] = useState<RSVPResponse[]>([]);
  const [loadingRSVPs, setLoadingRSVPs] = useState(false);
  const [submittingRSVP, setSubmittingRSVP] = useState(false);
  const [showRSVPForm, setShowRSVPForm] = useState(false);
  const myRef = useRef<HTMLAudioElement>(null);

  // RSVP type definition
  type RSVPResponse = {
    id: number;
    name: string;
    email: string;
    response: "yes" | "no" | "maybe";
    message?: string;
    preferredGame?: "texas-holdem" | "blackjack" | "loteria" | "all";
    timestamp: string;
  };

  // Handle hydration mismatch by ensuring client-side rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch RSVP responses
  const fetchRSVPs = async () => {
    setLoadingRSVPs(true);
    try {
      const response = await fetch('/api/rsvp');
      const data = await response.json();
      setRsvpResponses(data);
    } catch (error) {
      console.error('Error fetching RSVPs:', error);
    } finally {
      setLoadingRSVPs(false);
    }
  };

  // Load RSVPs on mount
  useEffect(() => {
    if (mounted) {
      fetchRSVPs();
    }
  }, [mounted]);

  // Handle RSVP submission
  const handleRSVPSubmit = async (rsvpData: { name: string; email: string; response: "yes" | "no" | "maybe"; message?: string; preferredGame?: "texas-holdem" | "blackjack" | "loteria" | "all" }) => {
    setSubmittingRSVP(true);
    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rsvpData),
      });

      const result = await response.json();
      
      if (result.success) {
        alert('RSVP submitted successfully!');
        setShowRSVPForm(false);
        // Refresh the RSVP list
        fetchRSVPs();
      } else {
        alert('Failed to submit RSVP. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      alert('Failed to submit RSVP. Please try again.');
    } finally {
      setSubmittingRSVP(false);
    }
  };

  const startAudio = () => {
    if (myRef.current) {
      myRef.current.play();
    }
    setAudioStatus(true);
  };

  const pauseAudio = () => {
    if (myRef.current) {
      myRef.current.pause();
    }
    setAudioStatus(false);
  };

  const handleCheck = async () => {
    setChecking(true);
    // Simplified poker night check - always approve for demonstration
    setTwitterCheck(true);
    setChecking(false);
    setClaimed(false);
    setWalletAddy("");
  };

  const _handleModalOpen = () => {
    setShowModal(true);
  };



  // Prevent hydration mismatch during SSR
  if (!mounted) {
    return (
      <div className="min-h-max relative mx-auto max-w-[2000px]">
        <div id="home" />
        <div className="pt-16 flex flex-col lg:items-center justify-between md:h-screen md:max-h-[1198px] min-h-[676px] sm:min-h-[724px] md:min-h-[828px] 2xl:min-h-[998px] w-full scrollbar-hide relative overflow-y-auto overflow-x-hidden md:overflow-x-visible md:overflow-y-visible">
          <div className="flex items-center justify-center h-full">
            <div className="text-[#b98459] text-xl">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-max relative mx-auto max-w-[2000px]">
      <div id="home" />
      
      <Header />
      
      <div className=" pt-16 flex flex-col  lg:items-center justify-between md:h-screen md:max-h-[1198px] min-h-[676px] sm:min-h-[724px] md:min-h-[828px] 2xl:min-h-[998px] w-full scrollbar-hide  relative overflow-y-auto overflow-x-hidden md:overflow-x-visible md:overflow-y-visible ">
        <div className="flex flex-col items-center justify-center min-h-[400px] lg:min-h-[600px] text-center px-4">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#D2B688] to-[#7A3F33] font-myriad mb-6">
            Join the Poker Night!
          </h1>
          <p className="text-xl md:text-2xl text-[#cf976a] font-myriadpro mb-8 max-w-2xl">
            Experience the finest poker nights at Hernandez Casino
          </p>
          <div className="space-y-4">
            <Link href="/house-reel">
              <button className="golden-btn text-xl px-8 py-4">
                Play House Reel
              </button>
            </Link>
          </div>
        </div>

        <div className="w-full max-h-[2px] h-[2px] absolute -translate-y-40 bottom-0 hidden z-0 md:flex justify-between  xl:pr-[0%] xl:pl-[7.5%] px-[.5%] pb-[2%]">
          <div className="-translate-y-12 md:-translate-y-0">
            <Image draggable={false} src="/coinL.png" alt="" width={100} height={100} />
          </div>
          <div className="-translate-y-12 md:-translate-y-0">
            <Image draggable={false} src="/coinR.png" alt="" width={100} height={100} />
          </div>
        </div>

        {/* Casino Sections - 2x2 Grid */}
        <div className="w-full px-6 md:px-[28px] pt-6 md:pt-12">
          <div className="max-w-6xl mx-auto">
            {/* Intro Text */}
            <div className="text-center mb-12">
              <div className="flex justify-center mb-8">
                <Image
                  src="/headerLine.svg"
                  alt="Header Line"
                  width={200}
                  height={20}
                  className="h-8 w-auto"
                />
              </div>
              <p className="text-[#b98459] text-lg md:text-xl leading-relaxed max-w-4xl mx-auto font-myriadpro">
                Welcome to Hernandez Casino, where the finest poker nights come to life! Experience the thrill of Texas Hold&apos;em, the strategy of Blackjack, the excitement of Lotería, and the fortune of our legendary slot machines.
              </p>
            </div>

            {/* 2x2 Grid Layout for Hernandez Casino and Game Schedule */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Hernandez Casino Section */}
              <div className="bg-[#5F000080] rounded-[10%] p-6 md:p-8 border border-[#b98459] bg-opacity-50 relative overflow-hidden">
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
                  <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-[#c79a63] font-casino">
                    Hernandez Casino
                  </h2>
                  <h3 className="text-lg md:text-xl font-bold text-[#b98459] mb-4 font-casino">
                    What makes our poker nights special:
                  </h3>
                  <ul className="text-[#b98459] text-sm md:text-base space-y-2">
                    <li className="flex items-start">
                      <div className="min-h-[12px] min-w-[12px] max-h-[12px] max-w-[12px] w-4 mr-2 mt-[6px] border border-[#b98459] bg-[#b98459] rounded-full" />
                      Professional-grade poker tables with premium felt and authentic casino chips.
                    </li>
                    <li className="flex items-start">
                      <div className="min-h-[12px] min-w-[12px] max-h-[12px] max-w-[12px] w-4 mr-2 mt-[6px] border border-[#b98459] bg-[#b98459] rounded-full" />
                      Multiple game variations including Texas Hold&apos;em, Omaha, and Seven-Card Stud.
                    </li>
                    <li className="flex items-start">
                      <div className="min-h-[12px] min-w-[12px] max-h-[12px] max-w-[12px] w-4 mr-2 mt-[6px] border border-[#b98459] bg-[#b98459] rounded-full" />
                      Complimentary drinks and snacks to keep the energy high throughout the night.
                    </li>
                    <li className="flex items-start">
                      <div className="min-h-[12px] min-w-[12px] max-h-[12px] max-w-[12px] w-4 mr-2 mt-[6px] border border-[#b98459] bg-[#b98459] rounded-full" />
                      Regular tournaments with exciting prizes and bragging rights for the champions.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Game Schedule Section */}
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
                  <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-[#c79a63] font-casino">
                    Game Schedule
                  </h2>
                  <p className="text-[#b98459] text-sm md:text-base leading-relaxed mb-4">
                    Join us every weekend for the most exciting poker nights in town! Our schedule is designed to accommodate players of all skill levels, from beginners to seasoned pros.
                  </p>
                  <div className="space-y-3">
                    <p className="text-[#b98459] text-sm md:text-base">
                      <strong>Friday Nights:</strong> Texas Hold&apos;em tournaments with buy-ins starting at $20. Perfect for casual players looking to test their skills.
                    </p>
                    <p className="text-[#b98459] text-sm md:text-base">
                      <strong>Saturday Nights:</strong> High-stakes cash games and special events. Our most popular night featuring multiple tables and exciting side games.
                    </p>
                    <p className="text-[#b98459] text-sm md:text-base">
                      <strong>Sunday Afternoons:</strong> Family-friendly Lotería sessions and beginner-friendly poker lessons for those new to the game.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* House Rules Section - Full Width */}
            <div className="mb-12">
              <div className="bg-[#5F000080] rounded-[10%] p-6 md:p-8 border border-[#b98459] bg-opacity-50 relative overflow-hidden">
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
                  <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-[#c79a63] font-casino">
                    House Rules
                  </h2>
                  <p className="text-[#b98459] text-base md:text-lg leading-relaxed mb-6 text-center max-w-4xl mx-auto">
                    At Hernandez Casino, we believe in creating a welcoming and fair environment for all players. Our house rules ensure everyone has a great time while maintaining the integrity of the game.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    <div className="text-center">
                      <h3 className="text-lg md:text-xl font-bold text-[#b98459] mb-3 font-casino">Respect & Sportsmanship</h3>
                      <p className="text-[#b98459] text-sm md:text-base">
                        Treat all players with courtesy and respect. No trash talking or unsportsmanlike behavior will be tolerated.
                      </p>
                    </div>
                    <div className="text-center">
                      <h3 className="text-lg md:text-xl font-bold text-[#b98459] mb-3 font-casino">Buy-ins & Cashouts</h3>
                      <p className="text-[#b98459] text-sm md:text-base">
                        Minimum buy-in is $20, maximum is $500 per table. All cashouts are processed immediately at the end of each session.
                      </p>
                    </div>
                    <div className="text-center">
                      <h3 className="text-lg md:text-xl font-bold text-[#b98459] mb-3 font-casino">Game Integrity</h3>
                      <p className="text-[#b98459] text-sm md:text-base">
                        All games are monitored by professional dealers. Any suspicion of cheating will result in immediate removal from the premises.
                      </p>
                    </div>
                  </div>
                  <div className="text-center mt-8">
                    <p className="text-[#b98459] text-lg md:text-xl font-bold">
                      Age Requirement: 21+ with valid ID required for entry
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* House Reel Section - Full Width */}
            <div className="mb-12">
              <div className="bg-[#5F000080] rounded-[10%] p-6 md:p-8 border border-[#b98459] bg-opacity-50 relative overflow-hidden">
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
                  <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-[#c79a63] font-casino">
                    House Reel
                  </h2>
                  <div className="max-w-4xl mx-auto text-center">
                    <h3 className="text-xl md:text-2xl font-bold text-[#b98459] mb-4 font-casino">
                      Experience the Legendary House Reel!
                    </h3>
                    <p className="text-[#b98459] text-base md:text-lg leading-relaxed mb-6">
                      Test your luck and timing with our exclusive House Reel game. Watch the score climb as you keep the reel spinning, then cash out at the perfect moment to beat your high score!
                    </p>
                    <div className="space-y-3 text-[#b98459] text-sm md:text-base mb-8">
                      <p>🎰 <strong>Interactive Gameplay:</strong> Start and stop the reel at your own pace</p>
                      <p>🏆 <strong>High Score Challenge:</strong> Compete against yourself and others</p>
                      <p>🎵 <strong>Casino Atmosphere:</strong> Full audio experience with authentic sounds</p>
                      <p>💎 <strong>Beautiful Design:</strong> Stunning casino-style interface</p>
                    </div>
                    <div>
                      <Link href="/house-reel">
                        <button className="golden-btn text-lg px-8 py-4">
                          Play House Reel Now
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Who's Coming Section - Full Width */}
            <div className="mb-12">
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
                  <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-[#c79a63] font-casino">
                    Who&apos;s Coming
                  </h2>
                  
                  {loadingRSVPs ? (
                    <div className="text-center">
                      <p className="text-[#b98459] text-lg">Loading RSVPs...</p>
                    </div>
                  ) : rsvpResponses.length === 0 ? (
                    <div className="text-center">
                      <p className="text-[#b98459] text-lg">No RSVPs yet. Be the first to join!</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                      {rsvpResponses
                        .filter(rsvp => rsvp.response === "yes")
                        .map((rsvp, _index) => (
                        <div 
                          key={rsvp.id} 
                          className="bg-[#5F000080] rounded-lg p-4 border border-[#b98459] bg-opacity-30"
                        >
                          <div className="flex items-center mb-3">
                            <div className="w-12 h-12 bg-[#b98459] rounded-full flex items-center justify-center mr-3">
                              <span className="text-black font-bold text-lg">
                                {rsvp.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <span className="text-[#b98459] font-bold text-lg">{rsvp.name}</span>
                          </div>
                          <p className="text-[#b98459] text-sm mb-2">
                            <strong>Game:</strong> {rsvp.preferredGame === "all" ? "All Games" : 
                              rsvp.preferredGame === "texas-holdem" ? "Texas Hold'em" :
                              rsvp.preferredGame === "blackjack" ? "Blackjack" :
                              rsvp.preferredGame === "loteria" ? "Lotería" : "All Games"}
                          </p>
                          {rsvp.message && (
                            <p className="text-[#b98459] text-sm italic mb-2">
                              &quot;{rsvp.message}&quot;
                            </p>
                          )}
                          <p className="text-[#b98459] text-xs opacity-75">
                            {new Date(rsvp.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="text-center mt-8 flex flex-col sm:flex-row gap-4 sm:gap-0 sm:space-x-4">
                    <button 
                      onClick={() => setShowRSVPForm(!showRSVPForm)}
                      className="border-2 border-[#b98459] rounded-lg py-3 px-8 font-myriadpro bg-[#FFDB24] hover:bg-[#caa600] text-black font-bold transition-all duration-300"
                    >
                      {showRSVPForm ? "Hide RSVP Form" : "RSVP Now"}
                    </button>
                    <button 
                      onClick={fetchRSVPs}
                      className="border-2 border-[#b98459] rounded-lg py-3 px-8 font-myriadpro bg-transparent hover:bg-[#b98459] hover:text-black text-[#b98459] font-bold transition-all duration-300"
                    >
                      Refresh RSVPs
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* RSVP Form - Full Width Below Grid */}
            {showRSVPForm && (
              <div className="mt-8">
                <RSVPForm 
                  onRSVPSubmit={handleRSVPSubmit}
                  isSubmitting={submittingRSVP}
                />
              </div>
            )}
          </div>
        </div>

        {/* Footer Logos */}
        <div className="w-full px-6 md:px-[28px] pt-6 md:pt-12 pb-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <Image
                src="/headerLine.svg"
                alt="Header Line"
                width={200}
                height={20}
                className="h-8 w-auto"
              />
            </div>
            <div className="flex justify-center items-center space-x-8">
              <Image src="/logo.png" alt="Logo" width={120} height={60} className="h-12 w-auto" />
              <Image src="/logo.png" alt="Logo" width={120} height={60} className="h-12 w-auto" />
              <Image src="/logo.png" alt="Logo" width={120} height={60} className="h-12 w-auto" />
              <Image src="/logo.png" alt="Logo" width={120} height={60} className="h-12 w-auto" />
            </div>
          </div>
        </div>

      {/* Poker Registration Modal */}
      {showModal && (
        <PokerRegistrationModal
          checking={checking}
          setShowModal={setShowModal}
          showModal={showModal}
          walletAddy={walletAddy}
          setWalletAddy={setWalletAddy}
          handleCheck={handleCheck}
          myRef={myRef}
        />
        )}



      <audio ref={myRef} src="/bga2.mp3" className="hidden" loop />
    </div>
    </div>
  );
}
