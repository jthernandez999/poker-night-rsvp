"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import PokerRegistrationModal from "../components/TwitterCheckModal";
import Slots from "../components/Slots";
import WinModal from "../components/WinModal";
import LModal from "../components/LModal";

export default function Home() {
  const [spin, setSpin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showWinModal, setShowWinModal] = useState(false);
  const [showLModal, setShowLModal] = useState(false);
  const [twitterCheck, setTwitterCheck] = useState(false);
  const [approved, setApproved] = useState(false);
  const [walletAddy, setWalletAddy] = useState("");
  const [checking, setChecking] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [audioStatus, setAudioStatus] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [showPP, setShowPP] = useState(false);
  const [mounted, setMounted] = useState(false);
  const myRef = useRef<HTMLAudioElement>(null);

  // Handle hydration mismatch by ensuring client-side rendering
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
    if (twitterCheck) {
      setSpinning(true);
      setSpin(true);
      setShowModal(false);
      setTwitterCheck(false);
    }
  }, [twitterCheck]);

  useEffect(() => {
    if (!showLModal && !showWinModal) {
      pauseAudio();
      }
  }, [showLModal, showWinModal]);

  useEffect(() => {
    if (showModal) {
      startAudio();
    } else if (!showModal && spinning === false) {
      pauseAudio();
    }
  }, [showModal, spinning]);

  const handleCheck = async () => {
    setChecking(true);
    // Simplified poker night check - always approve for demonstration
    setApproved(true);
    setTwitterCheck(true);
    setSpinning(true);
    setChecking(false);
    setClaimed(false);
    setWalletAddy("");
  };

  const handleModalOpen = () => {
    if (spinning === false) setShowModal(true);
  };

  // Direct spin handler that bypasses modal
  const handleDirectSpin = () => {
    if (spinning === false) {
      // Randomly decide if player wins (20% chance)
      const willWin = Math.random() < 0.2;
      setApproved(willWin);
      setSpinning(true);
      setSpin(true);
    }
  };

  // Prevent hydration mismatch during SSR
  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-max relative mx-auto max-w-[2000px]">
      <div id="home" />
      <div className=" pt-16 flex flex-col  lg:items-center justify-between md:h-screen md:max-h-[1198px] min-h-[676px] sm:min-h-[724px] md:min-h-[828px] 2xl:min-h-[998px] w-full scrollbar-hide  relative overflow-y-auto overflow-x-hidden md:overflow-x-visible md:overflow-y-visible ">
        <div className="lg:hidden relative z-20 flex flex-col mb-0 mt-6 px-4 ">
          <h1 className="font-myriad pt-2 font-[1100] break-normal leading-[1] text-[40px] sm:text-6xl text-transparent bg-clip-text bg-gradient-to-br from-[#D2B688] to-[#7A3F33] ">
            Join the Poker Night!
          </h1>

          <p className="hidden sm:flex px-6 font-myriad leading-[1.1] font-[1100] text-xl sm:text-2xl pt-4 min-w-max text-[#cf976a]">
            Place your bet
          </p>
        </div>
        <div className="flex flex-col-reverse lg:flex-row lg:px-[5%] w-full justify-end lg:justify-between  overflow-y-visible overflow-x-clip  lg:overflow-hidden h-max min-h-[416px] lg:min-h-[612px] 2xl:min-h-[798px] lg:my-auto ">
          <div className="relative z-30 lg:mt-[128px] flex flex-col  items-center lg:h-full min-h-max min-w-max scale-105 text-center lg:self-start xl:mr-12 2xl:scale-125 2xl:mt-[17.5%]">
            <h1 className="  hidden lg:flex cursor-default font-myriad leading-[1.1] font-[1100] text-[84px] font- text-transparent bg-clip-text bg-gradient-to-br from-[#D2B688] to-[#7A3F33] max-w-[372px]">
              Join the Poker Night!
            </h1>
            <p className=" hidden lg:flex font-myriadpro text-xl lg:text-2xl pt-4 min-w-max  text-[#cf976a]">
              Place your bet
            </p>
            <p className="hidden font-myriadpro md:flex text-xs md:text-base mt-0 mb-2 lg:mt-0 text-[#cf976a]">
              or..
            </p>
            <div className="relative z-50">
              <button className="golden-btn2" onClick={handleDirectSpin}>
                click to spin
              </button>
            </div>
          </div>
          <div className="2xl:scale-125 md:mt-16 lg:mt-0 xl:-translate-x-14 lg:z-40 relative min-h-[298px] lg:min-h-max lg:min-w-[712px] my-4 lg:my-0  lg:h-max w-full lg:w-[712px] flex flex-col xl:justify-center self-center mx-auto lg:pr-[5%] overflow-y-visible overflow-x-clip  md:overflow-visible">
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
          
        <div className="w-full max-h-[2px] h-[2px] absolute -translate-y-40 bottom-0 hidden z-0 md:flex justify-between  xl:pr-[0%] xl:pl-[7.5%] px-[.5%] pb-[2%]">
          <div className="-translate-y-12 md:-translate-y-0">
            <Image draggable={false} src="/coinL.png" alt="" width={100} height={100} />
          </div>
          <div className="-translate-y-12 md:-translate-y-20 ">
            <Image draggable={false} src="/coinR.png" alt="" width={100} height={100} />
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

      {/* Win Modal */}
      {showWinModal && (
        <WinModal 
          setShowModal={setShowWinModal}
          showModal={showWinModal}
          claimed={claimed}
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
