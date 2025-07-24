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
  const [currentChips, setCurrentChips] = useState(100); // Starting chips
  const [betAmount, setBetAmount] = useState(5); // Default bet
  const [totalWinnings, setTotalWinnings] = useState(0);
  const [gameHistory, setGameHistory] = useState<GameHistory[]>([]);
  const [showCashout, setShowCashout] = useState(false);
  const [startingChips, setStartingChips] = useState(100);
  const [gameStarted, setGameStarted] = useState(false);
  const [customStartingChips, setCustomStartingChips] = useState(100);
  const [currentWinAmount, setCurrentWinAmount] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [showHighScore, setShowHighScore] = useState(false);
  const myRef = useRef<HTMLAudioElement>(null);

  // Game history type
  type GameHistory = {
    id: number;
    bet: number;
    win: number;
    timestamp: string;
    combination: string;
  };

  // Winning combinations and their multipliers (casino-style)
  const winningCombinations = {
    "FROG-FROG-FROG": 25,      // Rarest - highest payout (25x bet)
    "DIAMOND-DIAMOND-DIAMOND": 20,  // Very rare (20x bet)
    "SEVEN-SEVEN-SEVEN": 15,    // Rare (15x bet)
    "DICE-DICE-DICE": 10,       // Uncommon (10x bet)
    "FROG-FROG": 8,             // Two frogs (8x bet)
    "DIAMOND-DIAMOND": 6,       // Two diamonds (6x bet)
    "SEVEN-SEVEN": 5,           // Two sevens (5x bet)
    "DICE-DICE": 3,             // Two dice (3x bet)
  };

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true);
    // Load high score from localStorage
    const savedHighScore = localStorage.getItem('houseReelHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
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

  // Update high score and current score
  const updateScores = (winAmount: number) => {
    const newCurrentScore = currentScore + winAmount;
    setCurrentScore(newCurrentScore);
    
    if (newCurrentScore > highScore) {
      setHighScore(newCurrentScore);
      localStorage.setItem('houseReelHighScore', newCurrentScore.toString());
      setShowHighScore(true);
      setTimeout(() => setShowHighScore(false), 3000); // Show for 3 seconds
    }
  };

  useEffect(() => {
    if (!showLModal && !showWinModal) {
      pauseAudio();
    }
  }, [showLModal, showWinModal]);

  // Handle bet amount changes
  const handleBetChange = (amount: number) => {
    if (amount <= currentChips && amount > 0) {
      setBetAmount(amount);
    }
  };

  // Handle spin with betting
  const handleSpin = () => {
    if (currentChips >= betAmount && !spinning) {
      // Deduct bet from chips
      setCurrentChips(prev => prev - betAmount);
      
      // Casino-style winning algorithm
      const random = Math.random();
      let willWin = false;
      let winAmount = 0;
      let winningCombination = "No Win";
      
      // Determine win based on probability (house edge ~15%)
      if (random < 0.05) {
        // 5% chance for FROG-FROG-FROG (highest payout)
        willWin = true;
        winAmount = betAmount * winningCombinations["FROG-FROG-FROG"];
        winningCombination = "FROG-FROG-FROG";
      } else if (random < 0.12) {
        // 7% chance for DIAMOND-DIAMOND-DIAMOND
        willWin = true;
        winAmount = betAmount * winningCombinations["DIAMOND-DIAMOND-DIAMOND"];
        winningCombination = "DIAMOND-DIAMOND-DIAMOND";
      } else if (random < 0.20) {
        // 8% chance for SEVEN-SEVEN-SEVEN
        willWin = true;
        winAmount = betAmount * winningCombinations["SEVEN-SEVEN-SEVEN"];
        winningCombination = "SEVEN-SEVEN-SEVEN";
      } else if (random < 0.30) {
        // 10% chance for DICE-DICE-DICE
        willWin = true;
        winAmount = betAmount * winningCombinations["DICE-DICE-DICE"];
        winningCombination = "DICE-DICE-DICE";
      } else if (random < 0.45) {
        // 15% chance for FROG-FROG
        willWin = true;
        winAmount = betAmount * winningCombinations["FROG-FROG"];
        winningCombination = "FROG-FROG";
      } else if (random < 0.60) {
        // 15% chance for DIAMOND-DIAMOND
        willWin = true;
        winAmount = betAmount * winningCombinations["DIAMOND-DIAMOND"];
        winningCombination = "DIAMOND-DIAMOND";
      } else if (random < 0.75) {
        // 15% chance for SEVEN-SEVEN
        willWin = true;
        winAmount = betAmount * winningCombinations["SEVEN-SEVEN"];
        winningCombination = "SEVEN-SEVEN";
      } else if (random < 0.85) {
        // 10% chance for DICE-DICE
        willWin = true;
        winAmount = betAmount * winningCombinations["DICE-DICE"];
        winningCombination = "DICE-DICE";
      }
      // 15% chance of no win (house edge)
      
      setApproved(willWin);
      setSpinning(true);
      setSpin(true);
      startAudio();

      // Add to game history
      const newHistory: GameHistory = {
        id: Date.now(),
        bet: betAmount,
        win: winAmount,
        timestamp: new Date().toLocaleTimeString(),
        combination: winningCombination
      };
      
      setGameHistory(prev => [...prev, newHistory]);
      setTotalWinnings(prev => prev + winAmount);
      
      // Update scores for high score tracking
      if (winAmount > 0) {
        updateScores(winAmount);
      }
      
      // Set current win amount for modal
      if (winAmount > 0) {
        setCurrentWinAmount(winAmount);
        setTimeout(() => {
          setCurrentChips(prev => prev + winAmount);
        }, 2000);
      }
    }
  };

  // Handle cashout
  const handleCashout = () => {
    setShowCashout(true);
  };

  // Start new game with selected chips
  const handleStartGame = () => {
    setCurrentChips(customStartingChips);
    setStartingChips(customStartingChips);
    setBetAmount(5);
    setTotalWinnings(0);
    setCurrentScore(0);
    setGameHistory([]);
    setShowCashout(false);
    setGameStarted(true);
  };

  // Reset game
  const handleReset = () => {
    setGameStarted(false);
    setCustomStartingChips(100);
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
      
      <div className="pt-16 flex flex-col lg:items-center justify-between min-h-screen w-full scrollbar-hide relative overflow-y-auto overflow-x-hidden">
        <div className="lg:hidden relative z-20 flex flex-col mb-0 mt-6 px-4">
          <h1 className="font-myriad pt-2 font-[1100] break-normal leading-[1] text-[40px] sm:text-6xl text-transparent bg-clip-text bg-gradient-to-br from-[#D2B688] to-[#7A3F33]">
            House Reel
          </h1>
          <p className="hidden sm:flex px-6 font-myriad leading-[1.1] font-[1100] text-xl sm:text-2xl pt-4 min-w-max text-[#cf976a]">
            Place your bet
          </p>
        </div>
        
        <div className="flex flex-col-reverse lg:flex-row lg:px-[5%] w-full justify-between overflow-y-visible overflow-x-clip lg:overflow-hidden min-h-[800px] lg:min-h-[900px] 2xl:min-h-[1000px] lg:my-auto mb-16">
          {/* Left Side - Game Controls */}
          <div className="relative z-30 lg:mt-[128px] flex flex-col items-center min-h-[600px] lg:min-h-[700px] min-w-max scale-105 text-center lg:self-start lg:justify-self-start 2xl:scale-125 2xl:mt-[17.5%] pb-32 lg:pb-40">
            <h1 className="hidden lg:flex cursor-default font-myriad leading-[1.1] font-[1100] text-[84px] text-transparent bg-clip-text bg-gradient-to-br from-[#D2B688] to-[#7A3F33] max-w-[372px]">
              House Reel
            </h1>
            <p className="hidden lg:flex font-myriadpro text-xl lg:text-2xl pt-4 min-w-max text-[#cf976a]">
              Place your bet
            </p>
            
            {/* Game Controls */}
            <div className="mt-8 space-y-4">
              {!gameStarted ? (
                // Starting chip selection
                <div className="space-y-4">
                  <div className="bg-[#5F000080] rounded-lg p-4 border border-[#b98459] bg-opacity-50">
                    <h3 className="text-lg font-bold text-[#c79a63] mb-3 font-casino">Choose Starting Chips</h3>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      {[50, 100, 200, 500].map((amount) => (
                        <button
                          key={amount}
                          onClick={() => setCustomStartingChips(amount)}
                          className={`px-3 py-2 rounded border-2 transition-all duration-300 ${
                            customStartingChips === amount
                              ? 'border-[#b98459] bg-[#b98459] text-black'
                              : 'border-[#b98459] bg-transparent text-[#b98459] hover:bg-[#b98459] hover:text-black'
                          }`}
                        >
                          {amount}
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#b98459] text-sm">Custom:</span>
                      <input
                        type="number"
                        value={customStartingChips}
                        onChange={(e) => setCustomStartingChips(parseInt(e.target.value) || 100)}
                        className="w-20 px-2 py-1 text-center border border-[#b98459] rounded bg-transparent text-[#b98459]"
                        min="1"
                        max="1000"
                      />
                      <span className="text-[#b98459] text-sm">chips</span>
                    </div>
                  </div>
                  
                  <button 
                    className="golden-btn2 w-full" 
                    onClick={handleStartGame}
                  >
                    Start Game with {customStartingChips} chips
                  </button>
                </div>
              ) : (
                // Game in progress
                <>
                  <div className="bg-[#5F000080] rounded-lg p-4 border border-[#b98459] bg-opacity-50">
                    <h3 className="text-lg font-bold text-[#c79a63] mb-3 font-casino">Your Chips</h3>
                    <div className="text-2xl font-bold text-[#D2B688] mb-2">
                      {currentChips} chips
                    </div>
                    <div className="text-sm text-[#b98459]">
                      Starting: {startingChips} chips
                    </div>
                  </div>

                  <div className="bg-[#005F5F80] rounded-lg p-4 border border-[#b98459] bg-opacity-50">
                    <h3 className="text-lg font-bold text-[#c79a63] mb-3 font-casino">Bet Amount</h3>
                    <div className="flex space-x-2 mb-3">
                      {[1, 5, 10, 25].map((amount) => (
                        <button
                          key={amount}
                          onClick={() => handleBetChange(amount)}
                          className={`px-3 py-1 rounded border-2 transition-all duration-300 ${
                            betAmount === amount
                              ? 'border-[#b98459] bg-[#b98459] text-black'
                              : 'border-[#b98459] bg-transparent text-[#b98459] hover:bg-[#b98459] hover:text-black'
                          }`}
                        >
                          {amount}
                        </button>
                      ))}
                    </div>
                    <div className="text-sm text-[#b98459]">
                      Current bet: {betAmount} chips
                    </div>
                  </div>

                  <div className="bg-[#5F000080] rounded-lg p-4 border border-[#b98459] bg-opacity-50">
                    <h3 className="text-lg font-bold text-[#c79a63] mb-3 font-casino">Total Winnings</h3>
                    <div className="text-xl font-bold text-[#D2B688]">
                      {totalWinnings} chips
                    </div>
                  </div>

                  <div className="bg-[#005F5F80] rounded-lg p-4 border border-[#b98459] bg-opacity-50">
                    <h3 className="text-lg font-bold text-[#c79a63] mb-3 font-casino">🏆 High Score Challenge</h3>
                    <div className="text-sm text-[#b98459] mb-2">
                      Current Score: <span className="text-[#D2B688] font-bold">{currentScore}</span> chips
                    </div>
                    <div className="text-sm text-[#b98459]">
                      High Score: <span className="text-[#FFDB24] font-bold">{highScore}</span> chips
                    </div>
                    {showHighScore && (
                      <div className="mt-2 text-center">
                        <span className="text-[#FFDB24] font-bold animate-pulse">🎉 NEW HIGH SCORE! 🎉</span>
                      </div>
                    )}
                  </div>

                  {/* Game Buttons */}
                  <div className="space-y-3">
                    <button 
                      className="border-2 border-[#b98459] rounded-lg py-3 px-6 font-myriadpro bg-transparent hover:bg-[#b98459] hover:text-black text-[#b98459] font-bold transition-all duration-300 w-full"
                      onClick={handleCashout}
                    >
                      Cash Out
                    </button>
                    
                    <button 
                      className="border-2 border-red-500 rounded-lg py-3 px-6 font-myriadpro bg-transparent hover:bg-red-500 hover:text-black text-red-500 font-bold transition-all duration-300 w-full"
                      onClick={handleReset}
                    >
                      New Game
                    </button>
                  </div>
                </>
              )}
            </div>

            <div className="mt-12">
              <Link href="/">
                <button className="border-2 border-[#b98459] rounded-lg py-3 px-8 font-myriadpro bg-transparent hover:bg-[#b98459] hover:text-black text-[#b98459] font-bold transition-all duration-300">
                  Back to Home
                </button>
              </Link>
            </div>
          </div>
          
          {/* Center - Slot Machine */}
          <div className="2xl:scale-125 md:mt-16 lg:mt-0 lg:z-40 relative min-h-[298px] lg:min-h-max lg:min-w-[712px] my-4 lg:my-0 lg:h-max w-full lg:w-[712px] flex flex-col xl:justify-center self-center mx-auto overflow-y-visible overflow-x-clip md:overflow-visible">
            <Slots
              setMakeSpin={setSpin}
              makeSpin={spin}
              handleModalOpen={handleSpin}
              approved={approved}
              setSpinning={setSpinning}
              setShowWin={setShowWinModal}
              setShowL={setShowLModal}
            />
            
            {/* Spin Button Below Reel */}
            {gameStarted && (
              <div className="mt-48 flex justify-center">
                <button 
                  className="golden-btn2 text-xl py-4 px-8 min-w-[200px]" 
                  onClick={handleSpin}
                  disabled={currentChips < betAmount || spinning}
                >
                  {spinning ? 'Spinning...' : `Spin for ${betAmount} chips`}
                </button>
              </div>
            )}
          </div>
          
          {/* Current Bet Winning Combinations - Far Right */}
          {gameStarted && (
            <div className="hidden lg:flex flex-col mt-16 min-w-[280px] lg:justify-self-end">
              <div className="bg-[#5F000080] rounded-lg p-4 border border-[#b98459] bg-opacity-50">
                <h3 className="text-lg font-bold text-[#c79a63] mb-3 font-casino text-center">
                  Current Bet: {betAmount} chips
                </h3>
                <h4 className="text-md font-bold text-[#b98459] mb-2 font-casino text-center">
                  Potential Wins
                </h4>
                <div className="text-[#b98459] text-sm space-y-1">
                  <div className="flex justify-between items-center">
                    <span>🐸 FROG-FROG-FROG:</span>
                    <span className="font-bold text-[#D2B688]">{betAmount * 25}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>💎 DIAMOND-DIAMOND-DIAMOND:</span>
                    <span className="font-bold text-[#D2B688]">{betAmount * 20}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>🎲 SEVEN-SEVEN-SEVEN:</span>
                    <span className="font-bold text-[#D2B688]">{betAmount * 15}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>🎲 DICE-DICE-DICE:</span>
                    <span className="font-bold text-[#D2B688]">{betAmount * 10}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>🐸 FROG-FROG:</span>
                    <span className="font-bold text-[#D2B688]">{betAmount * 8}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>💎 DIAMOND-DIAMOND:</span>
                    <span className="font-bold text-[#D2B688]">{betAmount * 6}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>🎲 SEVEN-SEVEN:</span>
                    <span className="font-bold text-[#D2B688]">{betAmount * 5}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>🎲 DICE-DICE:</span>
                    <span className="font-bold text-[#D2B688]">{betAmount * 3}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="w-full max-h-[2px] h-[2px] absolute -translate-y-40 bottom-0 hidden z-0 md:flex justify-between xl:pr-[0%] xl:pl-[7.5%] px-[.5%] pb-[2%]">
          <div className="-translate-y-12 md:-translate-y-0">
            <Image draggable={false} src="/coinL.png" alt="" width={100} height={100} />
          </div>
          <div className="-translate-y-12 md:-translate-y-0">
            <Image draggable={false} src="/coinR.png" alt="" width={100} height={100} />
          </div>
        </div>

        {/* Game Rules */}
        <div className="w-full px-6 md:px-[28px] pt-12 md:pt-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#5F000080] rounded-[10%] p-6 md:p-8 border border-[#b98459] bg-opacity-50">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-[#c79a63] font-casino">
                House Reel Rules
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <div className="text-center">
                  <h3 className="text-lg md:text-xl font-bold text-[#b98459] mb-3 font-casino">How to Play</h3>
                  <div className="text-[#b98459] text-sm md:text-base space-y-2">
                    <p>• Exchange money for poker chips with the dealer</p>
                    <p>• Choose your bet amount (1, 5, 10, or 25 chips)</p>
                    <p>• Click &quot;Spin&quot; to play the slot machine</p>
                    <p>• Match 3 symbols to win!</p>
                    <p>• Click &quot;Cash Out&quot; when you&apos;re done</p>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-lg md:text-xl font-bold text-[#b98459] mb-3 font-casino">Winning Combinations</h3>
                  <div className="text-[#b98459] text-sm md:text-base space-y-1">
                    <p><strong>🐸 FROG-FROG-FROG:</strong> Win 25x your bet (Jackpot!)</p>
                    <p><strong>💎 DIAMOND-DIAMOND-DIAMOND:</strong> Win 20x your bet</p>
                    <p><strong>🎲 SEVEN-SEVEN-SEVEN:</strong> Win 15x your bet</p>
                    <p><strong>🎲 DICE-DICE-DICE:</strong> Win 10x your bet</p>
                    <p><strong>🐸 FROG-FROG:</strong> Win 8x your bet</p>
                    <p><strong>💎 DIAMOND-DIAMOND:</strong> Win 6x your bet</p>
                    <p><strong>🎲 SEVEN-SEVEN:</strong> Win 5x your bet</p>
                    <p><strong>🎲 DICE-DICE:</strong> Win 3x your bet</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cashout Modal */}
      {showCashout && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-[#5F000080] rounded-lg p-8 border-4 border-[#b98459] max-w-md w-full">
            <h2 className="text-3xl font-bold text-center mb-6 text-[#c79a63] font-casino">
              Cash Out Summary
            </h2>
            <div className="space-y-4 text-[#b98459]">
              <div className="flex justify-between">
                <span>Starting Chips:</span>
                <span className="font-bold">{startingChips}</span>
              </div>
              <div className="flex justify-between">
                <span>Current Chips:</span>
                <span className="font-bold">{currentChips}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Winnings:</span>
                <span className="font-bold text-[#D2B688]">{totalWinnings}</span>
              </div>
              <div className="border-t border-[#b98459] pt-2">
                <div className="flex justify-between font-bold text-lg">
                  <span>Net Profit/Loss:</span>
                  <span className={currentChips - startingChips >= 0 ? 'text-green-400' : 'text-red-400'}>
                    {currentChips - startingChips >= 0 ? '+' : ''}{currentChips - startingChips} chips
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 space-y-3">
              <button
                onClick={() => setShowCashout(false)}
                className="w-full golden-btn text-lg py-3"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Win Modal */}
      {showWinModal && (
        <WinModal
          setShowModal={setShowWinModal}
          showModal={showWinModal}
          claimed={false}
          winAmount={currentWinAmount}
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