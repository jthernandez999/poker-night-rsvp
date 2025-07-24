"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import Slots from "../../components/Slots";
import WinModal from "../../components/WinModal";
import LModal from "../../components/LModal";

export default function HouseReel() {
  const [spin, setSpin] = useState(false);
  const [showWinModal, setShowWinModal] = useState(false);
  const [showLModal, setShowLModal] = useState(false);
  const [approved, setApproved] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [audioStatus, setAudioStatus] = useState(false);
  const [mounted, setMounted] = useState(false);
  const myRef = useRef<HTMLAudioElement>(null);

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

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

  useEffect(() => {
    if (!showLModal && !showWinModal) {
      pauseAudio();
    }
  }, [showLModal, showWinModal]);

  // Direct spin handler
  const handleDirectSpin = () => {
    if (spinning === false) {
      // Randomly decide if player wins (20% chance)
      const willWin = Math.random() < 0.2;
      setApproved(willWin);
      setSpinning(true);
      setSpin(true);
      startAudio();
    }
  };

  // Prevent hydration mismatch during SSR
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] flex items-center justify-center">
        <div className="text-[#b98459] text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-max relative mx-auto max-w-[2000px]">
      <Header />
      
      <div className="pt-16 flex flex-col lg:items-center justify-between md:h-screen md:max-h-[1198px] min-h-[676px] sm:min-h-[724px] md:min-h-[828px] 2xl:min-h-[998px] w-full scrollbar-hide relative overflow-y-auto overflow-x-hidden md:overflow-x-visible md:overflow-y-visible">
        <div className="lg:hidden relative z-20 flex flex-col mb-0 mt-6 px-4">
          <h1 className="font-myriad pt-2 font-[1100] break-normal leading-[1] text-[40px] sm:text-6xl text-transparent bg-clip-text bg-gradient-to-br from-[#D2B688] to-[#7A3F33]">
            House Reel
          </h1>

          <p className="hidden sm:flex px-6 font-myriad leading-[1.1] font-[1100] text-xl sm:text-2xl pt-4 min-w-max text-[#cf976a]">
            Test your luck
          </p>
        </div>
        
        <div className="flex flex-col-reverse lg:flex-row lg:px-[5%] w-full justify-end lg:justify-between overflow-y-visible overflow-x-clip lg:overflow-hidden h-max min-h-[416px] lg:min-h-[612px] 2xl:min-h-[798px] lg:my-auto">
          <div className="relative z-30 lg:mt-[128px] flex flex-col items-center lg:h-full min-h-max min-w-max scale-105 text-center lg:self-start xl:mr-12 2xl:scale-125 2xl:mt-[17.5%]">
            <h1 className="hidden lg:flex cursor-default font-myriad leading-[1.1] font-[1100] text-[84px] text-transparent bg-clip-text bg-gradient-to-br from-[#D2B688] to-[#7A3F33] max-w-[372px]">
              House Reel
            </h1>
            <p className="hidden lg:flex font-myriadpro text-xl lg:text-2xl pt-4 min-w-max text-[#cf976a]">
              Test your luck
            </p>
            <p className="hidden font-myriadpro md:flex text-xs md:text-base mt-0 mb-2 lg:mt-0 text-[#cf976a]">
              Ready to spin?
            </p>
            <div className="relative z-50">
              <button className="golden-btn2" onClick={handleDirectSpin}>
                click to spin
              </button>
            </div>
            <div className="mt-8">
              <Link href="/">
                <button className="border-2 border-[#b98459] rounded-lg py-3 px-8 font-myriadpro bg-transparent hover:bg-[#b98459] hover:text-black text-[#b98459] font-bold transition-all duration-300">
                  Back to Home
                </button>
              </Link>
            </div>
          </div>
          
          <div className="2xl:scale-125 md:mt-16 lg:mt-0 xl:-translate-x-14 lg:z-40 relative min-h-[298px] lg:min-h-max lg:min-w-[712px] my-4 lg:my-0 lg:h-max w-full lg:w-[712px] flex flex-col xl:justify-center self-center mx-auto lg:pr-[5%] overflow-y-visible overflow-x-clip md:overflow-visible">
            <Slots
              setMakeSpin={setSpin}
              makeSpin={spin}
              handleModalOpen={handleDirectSpin}
              approved={approved}
              setSpinning={setSpinning}
              setShowWin={setShowWinModal}
              setShowL={setShowLModal}
            />
          </div>
        </div>

        <div className="w-full max-h-[2px] h-[2px] absolute -translate-y-40 bottom-0 hidden z-0 md:flex justify-between xl:pr-[0%] xl:pl-[7.5%] px-[.5%] pb-[2%]">
          <div className="-translate-y-12 md:-translate-y-0">
            <Image draggable={false} src="/coinL.png" alt="" width={100} height={100} />
          </div>
          <div className="-translate-y-12 md:-translate-y-0">
            <Image draggable={false} src="/coinR.png" alt="" width={100} height={100} />
          </div>
        </div>

        {/* House Reel Description */}
        <div className="w-full px-6 md:px-[28px] pt-6 md:pt-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#5F000080] rounded-[10%] p-6 md:p-8 border border-[#b98459] bg-opacity-50">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-[#c79a63] font-casino">
                About the House Reel
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <div className="text-center">
                  <h3 className="text-lg md:text-xl font-bold text-[#b98459] mb-3 font-casino">Legendary Slot Machine</h3>
                  <p className="text-[#b98459] text-sm md:text-base">
                    Our House Reel is the crown jewel of Hernandez Casino. This authentic slot machine brings the excitement of Vegas right to your screen.
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="text-lg md:text-xl font-bold text-[#b98459] mb-3 font-casino">Win Big!</h3>
                  <p className="text-[#b98459] text-sm md:text-base">
                    With every spin, you have a chance to win big! The House Reel features multiple winning combinations and exciting bonus rounds.
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="text-lg md:text-xl font-bold text-[#b98459] mb-3 font-casino">Authentic Experience</h3>
                  <p className="text-[#b98459] text-sm md:text-base">
                                         Complete with authentic casino sounds, stunning graphics, and smooth animations that make you feel like you&apos;re in a real casino.
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="text-lg md:text-xl font-bold text-[#b98459] mb-3 font-casino">Free to Play</h3>
                  <p className="text-[#b98459] text-sm md:text-base">
                    No real money required! Enjoy the thrill of the House Reel completely free. Perfect for practicing before hitting the real casino.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Win Modal */}
      {showWinModal && (
        <WinModal
          setShowModal={setShowWinModal}
          showModal={showWinModal}
          claimed={false}
        />
      )}

      {/* Lose Modal */}
      {showLModal && (
        <LModal
          setShowModal={setShowLModal}
          showModal={showLModal}
        />
      )}

      <audio ref={myRef} src="/bga2.mp3" className="hidden" loop />
    </div>
  );
} 