"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import PokerRegistrationModal from "../components/TwitterCheckModal";
import RSVPForm from "../components/RSVPForm";
import Header from "../components/Header";
import LanguageToggle from "../components/LanguageToggle";
import { useLanguage } from "../contexts/LanguageContext";

export default function Home() {
  const { t } = useLanguage();
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

  // Intersection Observer for revolution text on mobile
  useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      const revolutionText = document.getElementById('revolution-text');
      if (revolutionText) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                // Only show on mobile (screen width < 768px)
                if (window.innerWidth < 768) {
                  revolutionText.style.opacity = '1';
                }
              }
            });
          },
          {
            threshold: 0.5, // Trigger when 50% of the element is visible
            rootMargin: '0px 0px -20% 0px' // Trigger when element is near the top
          }
        );
        
        observer.observe(revolutionText);
        
        return () => observer.disconnect();
      }
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
      <LanguageToggle />
      
      <div className=" pt-16 flex flex-col  lg:items-center justify-between md:h-screen md:max-h-[1198px] min-h-[676px] sm:min-h-[724px] md:min-h-[828px] 2xl:min-h-[998px] w-full scrollbar-hide  relative overflow-y-auto overflow-x-hidden md:overflow-x-visible md:overflow-y-visible ">
        
        {/* Background Images from Slot Component */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Coins Background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-80">
            <Image 
              draggable={false}
              priority
              src="/Coins.png"
              width={864}
              height={642}
              alt="coins background"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Shine Effect */}
          <div className="absolute inset-0 flex items-center justify-center opacity-60">
            <Image 
              draggable={false} 
              src="/Shine.png" 
              width={800}
              height={864}
              alt="shine effect"
              className="w-full h-full object-cover" 
            />
          </div>
          
          {/* Dice Decorations */}
          <div className="absolute top-20 right-10 opacity-90">
            <Image 
              draggable={false} 
              className="w-16 h-16 md:w-20 md:h-20" 
              src="/dice2.png" 
              width={128}
              height={128}
              alt="dice decoration" 
            />
          </div>
          <div className="absolute bottom-20 left-10 opacity-90">
            <Image 
              draggable={false} 
              src="/dice1.png" 
              width={112}
              height={112}
              alt="dice decoration" 
              className="w-14 h-14 md:w-16 md:h-16" 
            />
          </div>
        </div>
        {/* <div className="flex flex-col items-center justify-center min-h-[400px] lg:min-h-[600px] text-center px-4">
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
        </div> */}

        <div className="w-full max-h-[2px] h-[2px] absolute -translate-y-40 bottom-0 hidden z-0 md:flex justify-between  xl:pr-[0%] xl:pl-[7.5%] px-[.5%] pb-[2%]">
          <div className="-translate-y-12 md:-translate-y-0">
            <Image draggable={false} src="/coinL.png" alt="" width={100} height={100} />
          </div>
          <div className="-translate-y-12 md:-translate-y-0">
            <Image draggable={false} src="/coinR.png" alt="" width={100} height={100} />
          </div>
        </div>

        {/* Casino Sections - 2x2 Grid */}
        <div className="w-full px-4 sm:px-6 md:px-[28px] pt-6 md:pt-12">
          <div className="max-w-6xl mx-auto">
            {/* Intro Text */}
            <div className="text-center mb-12 relative z-10 flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px] rounded-3xl overflow-hidden">
              {/* Beautiful Expensive Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a0a] via-[#2a0a0a] to-[#3a0a0a] rounded-3xl"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-[#b98459]/20 via-transparent to-[#c79a63]/30 rounded-3xl"></div>
              <div className="absolute inset-0 bg-gradient-to-bl from-[#FFDB24]/10 via-transparent to-[#D2B688]/20 rounded-3xl"></div>
              
              {/* Animated Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse rounded-3xl"></div>
              
              {/* Border Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#b98459] via-[#c79a63] to-[#FFDB24] p-[2px] rounded-3xl">
                <div className="bg-gradient-to-br from-[#1a0a0a] via-[#2a0a0a] to-[#3a0a0a] rounded-3xl h-full w-full"></div>
              </div>
              
              {/* Content */}
              <div className="relative z-20 p-8 md:p-12">
                              <p className="text-[#b98459] text-3xl md:text-4xl lg:text-6xl xl:text-7xl leading-relaxed max-w-4xl mx-auto font-myriadpro group font-bold px-4 text-center mb-8 drop-shadow-lg">
                <span className="block text-center">{t('mainTitle')}</span> <span id="revolution-text" className="opacity-0 group-hover:opacity-100 md:group-hover:opacity-100 transition-opacity duration-300 block text-center">{t('revolutionText')}</span>
              </p>
                
                {/* Welcome Text Between Header Lines */}
                <div className="text-center mb-8">
                  <p className="text-[#b98459] text-lg md:text-xl leading-relaxed max-w-4xl mx-auto font-myriadpro drop-shadow-md">
                    {t('welcomeText')}
                  </p>
                </div>
                
                {/* Date and Location */}
                <div className="text-center mb-8 space-y-4">
                  <div>
                    <p className="text-[#c79a63] text-lg md:text-xl font-bold font-myriadpro drop-shadow-md">
                      📅 {t('date')}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#c79a63] text-lg md:text-xl font-bold font-myriadpro drop-shadow-md">
                      📍 {t('location')}
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <Image
                    src="/headerLine.svg"
                    alt="Header Line"
                    width={200}
                    height={20}
                    className="h-8 w-auto drop-shadow-lg"
                  />
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
                    {t('rsvp')}
                  </h2>
                  
                  {loadingRSVPs ? (
                    <div className="text-center">
                      <p className="text-[#b98459] text-lg">{t('loadingRSVPs')}</p>
                    </div>
                  ) : rsvpResponses.length === 0 ? (
                    <div className="text-center">
                      <p className="text-[#b98459] text-lg">{t('noRSVPs')}</p>
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
                            <strong>Game:</strong> {rsvp.preferredGame === "all" ? t('allGames') : 
                              rsvp.preferredGame === "texas-holdem" ? t('texasHoldem') :
                              rsvp.preferredGame === "blackjack" ? t('blackjackGame') :
                              rsvp.preferredGame === "loteria" ? t('loteriaGame') : t('allGames')}
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
                      {showRSVPForm ? t('hideRSVPForm') : t('rsvpNow')}
                    </button>
                    <button 
                      onClick={fetchRSVPs}
                      className="border-2 border-[#b98459] rounded-lg py-3 px-8 font-myriadpro bg-transparent hover:bg-[#b98459] hover:text-black text-[#b98459] font-bold transition-all duration-300"
                    >
                      {t('refreshRSVPs')}
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

            {/* Birthday Edition Schedule Section */}
            <div className="mb-12">
              {/* Game Schedule Section */}
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
                    {t('birthdaySchedule')}
                  </h2>
                  
                  {/* Timeline */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-16 text-center">
                        <div className="bg-[#c79a63] text-[#2a0a0a] font-bold text-sm px-2 py-1 rounded-full">
                          3-5 PM
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-[#c79a63] font-bold text-base">{t('foodRefreshments')}</h4>
                        <p className="text-[#b98459] text-sm">{t('foodDescription')}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-16 text-center">
                        <div className="bg-[#c79a63] text-[#2a0a0a] font-bold text-sm px-2 py-1 rounded-full">
                          6 PM
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-[#c79a63] font-bold text-base">{t('gamingBegins')}</h4>
                        <p className="text-[#b98459] text-sm">{t('gamingDescription')}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-16 text-center">
                        <div className="bg-[#c79a63] text-[#2a0a0a] font-bold text-sm px-2 py-1 rounded-full">
                          10 PM
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-[#c79a63] font-bold text-base">{t('casinoCloses')}</h4>
                        <p className="text-[#b98459] text-sm">{t('casinoDescription')}</p>
                      </div>
                    </div>
                  </div>

                  {/* Activities Grid */}
                  <div className="mb-6">
                    <h3 className="text-[#c79a63] font-bold text-lg mb-3 text-center">{t('activitiesGames')}</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-[#2a0a0a80] p-2 rounded text-center border border-[#b98459]">
                        <span className="text-[#b98459] text-sm font-medium">{t('karaoke')}</span>
                      </div>
                      <div className="bg-[#2a0a0a80] p-2 rounded text-center border border-[#b98459]">
                        <span className="text-[#b98459] text-sm font-medium">{t('dancing')}</span>
                      </div>
                      <div className="bg-[#2a0a0a80] p-2 rounded text-center border border-[#b98459]">
                        <span className="text-[#b98459] text-sm font-medium">{t('poker')}</span>
                      </div>
                      <div className="bg-[#2a0a0a80] p-2 rounded text-center border border-[#b98459]">
                        <span className="text-[#b98459] text-sm font-medium">{t('blackjack')}</span>
                      </div>
                      <div className="bg-[#2a0a0a80] p-2 rounded text-center border border-[#b98459]">
                        <span className="text-[#b98459] text-sm font-medium">{t('slotMachines')}</span>
                      </div>
                      <div className="bg-[#2a0a0a80] p-2 rounded text-center border border-[#b98459]">
                        <span className="text-[#b98459] text-sm font-medium">{t('videoGames')}</span>
                      </div>
                      <div className="bg-[#2a0a0a80] p-2 rounded text-center border border-[#b98459]">
                        <span className="text-[#b98459] text-sm font-medium">{t('loteria')}</span>
                      </div>
                      <div className="bg-[#2a0a0a80] p-2 rounded text-center border border-[#b98459]">
                        <span className="text-[#b98459] text-sm font-medium">{t('pirinola')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Game Info */}
                  <div className="space-y-3 bg-[#2a0a0a40] p-4 rounded-lg border border-[#b98459]">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-[#c79a63] rounded-full"></div>
                      <p className="text-[#b98459] text-sm">
                        <strong>{t('buyInRequired')}</strong> - <a href="#house-rules" className="text-[#c79a63] hover:text-[#FFDB24] underline transition-colors duration-200">{t('seeHouseRules')}</a>
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-[#c79a63] rounded-full"></div>
                      <p className="text-[#b98459] text-sm">
                        <strong>Prizes:</strong> 2 winners based on total chip value
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-[#c79a63] rounded-full"></div>
                      <p className="text-[#b98459] text-sm">
                        <strong>Game Buy-ins:</strong> Varies per game
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* House Rules Section - Full Width */}
            <div id="house-rules" className="mb-12">
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
                    {t('houseRules')}
                  </h2>
                  
                  {/* Game Rules & Pricing */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
                    <div className="text-center bg-[#2a0a0a40] p-4 rounded-lg border border-[#b98459]">
                      <h3 className="text-lg md:text-xl font-bold text-[#c79a63] mb-3 font-casino">{t('buyIn')}</h3>
                      <p className="text-[#b98459] text-sm md:text-base">
                        <strong>{t('baseBuyIn')}</strong><br/>
                        <strong>{t('bonusBuyIn')}</strong><br/>
                        <strong>{t('vipBuyIn')}</strong><br/>
                        <em>{t('betterValue')}</em>
                      </p>
                    </div>
                    <div className="text-center bg-[#2a0a0a40] p-4 rounded-lg border border-[#b98459]">
                      <h3 className="text-lg md:text-xl font-bold text-[#c79a63] mb-3 font-casino">{t('prizes')}</h3>
                      <p className="text-[#b98459] text-sm md:text-base">
                        {t('twoWinners')}
                      </p>
                    </div>
                    <div className="text-center bg-[#2a0a0a40] p-4 rounded-lg border border-[#b98459]">
                      <h3 className="text-lg md:text-xl font-bold text-[#c79a63] mb-3 font-casino">{t('gameBuyIns')}</h3>
                      <p className="text-[#b98459] text-sm md:text-base">
                        <strong>{t('variesPerGame')}</strong><br/>
                        {t('pokerChips')}<br/>
                        {t('blackjackChips')}<br/>
                        {t('loteriaChips')}<br/>
                        {t('slotChips')}
                      </p>
                    </div>
                  </div>
                  
                  {/* Family-Friendly House Rules */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    <div className="text-center">
                      <h3 className="text-lg md:text-xl font-bold text-[#b98459] mb-3 font-casino">{t('beKind')}</h3>
                      <p className="text-[#b98459] text-sm md:text-base">
                        {t('beKindDesc')}
                      </p>
                    </div>
                    <div className="text-center">
                      <h3 className="text-lg md:text-xl font-bold text-[#b98459] mb-3 font-casino">{t('keepItFair')}</h3>
                      <p className="text-[#b98459] text-sm md:text-base">
                        {t('keepItFairDesc')}
                      </p>
                    </div>
                    <div className="text-center">
                      <h3 className="text-lg md:text-xl font-bold text-[#b98459] mb-3 font-casino">{t('haveABlast')}</h3>
                      <p className="text-[#b98459] text-sm md:text-base">
                        {t('haveABlastDesc')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* House Reel Section - Full Width */}
            {/* <div className="mb-12">
              <div className="bg-[#5F000080] rounded-[10%] p-6 md:p-8 border border-[#b98459] bg-opacity-50 relative overflow-hidden">
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
                  </div>
                </div>
              </div>
            </div> */}


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
