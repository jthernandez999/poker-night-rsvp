"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import Slots from "../../components/Slots";
import WinModal from "../../components/WinModal";
import LModal from "../../components/LModal";
import LanguageToggle from "../../components/LanguageToggle";
import { useLanguage } from "../../contexts/LanguageContext";

export default function HouseReel() {
  const { t } = useLanguage();
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

  // Handle win result from Slots component
  const handleWinResult = (winAmount: number, combination: string) => {
    // Add to game history
    const newHistory: GameHistory = {
      id: Date.now(),
      bet: betAmount,
      win: winAmount,
      timestamp: new Date().toLocaleTimeString(),
      combination: combination
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
  };

  // Handle spin with betting
  const handleSpin = () => {
    if (currentChips >= betAmount && !spinning) {
      // Deduct bet from chips
      setCurrentChips(prev => prev - betAmount);
      
      setApproved(false); // Let the Slots component determine the win
      setSpinning(true);
      setSpin(true);
      startAudio();
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
    // Don't reset bet amount - let user keep their preferred bet
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
    <div className="min-h-max relative mx-auto max-w-[3000px]">
      <Header />
      <LanguageToggle />
      
      <div className="pt-16 flex flex-col lg:items-center justify-between min-h-screen w-full scrollbar-hide relative overflow-y-auto overflow-x-hidden">
        {/* Title Section - Above everything */}
        <div className="relative z-50 flex flex-col items-center mb-8 mt-6 px-4">
          <h1 className="font-myriad pt-2 font-[1100] leading-[1] text-[80px] sm:text-8xl lg:text-[160px] text-transparent bg-clip-text bg-gradient-to-br from-[#D2B688] to-[#7A3F33] max-w-[1200px] text-center whitespace-nowrap">
            {t('houseReel')}
          </h1>
          <p className="font-myriadpro text-3xl sm:text-4xl lg:text-5xl pt-8 min-w-max text-[#cf976a] text-center">
            {t('placeYourBet')}
          </p>
        </div>
        
        <div className="flex flex-col-reverse lg:flex-row lg:px-[5%] w-full justify-between overflow-y-visible overflow-x-clip lg:overflow-hidden min-h-[800px] lg:min-h-[900px] 2xl:min-h-[1000px] lg:my-auto mb-16">
          {/* Left Side - Game Controls */}
          <div className="relative z-30 flex flex-col items-center min-h-[600px] lg:min-h-[700px] min-w-max scale-105 text-center lg:self-start lg:justify-self-start 2xl:scale-150 2xl:mt-[20%] pb-32 lg:pb-40 -translate-y-60">
            
            {/* Game Controls */}
            <div className="mt-8 space-y-4">
              {!gameStarted ? (
                // Starting chip selection
                <div className="space-y-4">
                  <div className="bg-[#5F000080] rounded-lg p-4 border border-[#b98459] bg-opacity-50">
                    <h3 className="text-lg font-bold text-[#c79a63] mb-3 font-casino">{t('chooseStartingChips')}</h3>
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
                      <span className="text-[#b98459] text-sm">{t('custom')}</span>
                      <input
                        type="number"
                        value={customStartingChips}
                        onChange={(e) => setCustomStartingChips(parseInt(e.target.value) || 100)}
                        className="w-20 px-2 py-1 text-center border border-[#b98459] rounded bg-transparent text-[#b98459]"
                        min="1"
                        max="1000"
                      />
                      <span className="text-[#b98459] text-sm">{t('chips')}</span>
                    </div>
                  </div>
                  
                  <button 
                    className="golden-btn2 w-full" 
                    onClick={handleStartGame}
                  >
                    {t('startGameWith')} {customStartingChips} {t('chips')}
                  </button>
                </div>
              ) : (
                // Game in progress
                <>
                  <div className="bg-[#5F000080] rounded-lg p-4 border border-[#b98459] bg-opacity-50">
                    <h3 className="text-lg font-bold text-[#c79a63] mb-3 font-casino">{t('yourChips')}</h3>
                    <div className="text-2xl font-bold text-[#D2B688] mb-2">
                      {currentChips} {t('chips')}
                    </div>
                    <div className="text-sm text-[#b98459]">
                      {t('starting')} {startingChips} {t('chips')}
                    </div>
                  </div>

                  <div className="bg-[#005F5F80] rounded-lg p-4 border border-[#b98459] bg-opacity-50">
                    <h3 className="text-lg font-bold text-[#c79a63] mb-3 font-casino">{t('betAmount')}</h3>
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
                      {t('currentBet')} {betAmount} {t('chips')}
                    </div>
                  </div>

                  <div className="bg-[#5F000080] rounded-lg p-4 border border-[#b98459] bg-opacity-50">
                    <h3 className="text-lg font-bold text-[#c79a63] mb-3 font-casino">{t('totalWinnings')}</h3>
                    <div className="text-xl font-bold text-[#D2B688]">
                      {totalWinnings} {t('chips')}
                    </div>
                  </div>

                  <div className="bg-[#005F5F80] rounded-lg p-4 border border-[#b98459] bg-opacity-50">
                    <h3 className="text-lg font-bold text-[#c79a63] mb-3 font-casino">{t('highScoreChallenge')}</h3>
                    <div className="text-sm text-[#b98459] mb-2">
                      {t('currentScore')} <span className="text-[#D2B688] font-bold">{currentScore}</span> {t('chips')}
                    </div>
                    <div className="text-sm text-[#b98459]">
                      {t('highScore')} <span className="text-[#FFDB24] font-bold">{highScore}</span> {t('chips')}
                    </div>
                    {showHighScore && (
                      <div className="mt-2 text-center">
                        <span className="text-[#FFDB24] font-bold animate-pulse">{t('newHighScore')}</span>
                      </div>
                    )}
                  </div>

                  {/* Game Buttons */}
                  <div className="space-y-3">
                    <button 
                      className="border-2 border-[#b98459] rounded-lg py-3 px-6 font-myriadpro bg-transparent hover:bg-[#b98459] hover:text-black text-[#b98459] font-bold transition-all duration-300 w-full"
                      onClick={handleCashout}
                    >
                      {t('cashOut')}
                    </button>
                    
                    <button 
                      className="border-2 border-red-500 rounded-lg py-3 px-6 font-myriadpro bg-transparent hover:bg-red-500 hover:text-black text-red-500 font-bold transition-all duration-300 w-full"
                      onClick={handleReset}
                    >
                      {t('newGame')}
                    </button>
                  </div>
                </>
              )}
            </div>

            <div className="mt-12 mb-12">
              <Link href="/">
                <button className="border-2 border-[#b98459] rounded-lg py-3 px-8 font-myriadpro bg-transparent hover:bg-[#b98459] hover:text-black text-[#b98459] font-bold transition-all duration-300">
                  {t('backToHome')}
                </button>
              </Link>
            </div>
          </div>
          
          {/* Center - Slot Machine */}
          <div className={`${gameStarted ? '2xl:scale-175' : '2xl:scale-127'} md:mt-16 lg:mt-0 lg:z-40 relative min-h-[298px] lg:min-h-max lg:min-w-[712px] my-4 lg:my-0 lg:h-max w-full lg:w-[712px] flex flex-col xl:justify-center self-center mx-auto overflow-y-visible overflow-x-clip md:overflow-visible`}>
            <Slots
              setMakeSpin={setSpin}
              makeSpin={spin}
              handleModalOpen={handleSpin}
              approved={approved}
              setSpinning={setSpinning}
              setShowWin={setShowWinModal}
              setShowL={setShowLModal}
              betAmount={betAmount}
              onWinResult={handleWinResult}
            />
            
            {/* Spin Button Below Reel */}
            {gameStarted && (
              <div className="mt-48 flex justify-center">
                <button 
                  className="golden-btn2 text-xl py-4 px-8 min-w-[200px]" 
                  onClick={handleSpin}
                  disabled={currentChips < betAmount || spinning}
                >
                  {spinning ? t('spinning') : `${t('spinFor')} ${betAmount} ${t('chips')}`}
                </button>
              </div>
            )}
          </div>
          
          {/* Current Bet Winning Combinations - Far Right */}
          {gameStarted && (
            <div className="hidden lg:flex flex-col mt-[10.6rem] min-w-[280px] lg:justify-self-end w-[20rem] translate-x-20">
              <div className="bg-[#5F000080] rounded-lg p-4 border border-[#b98459] bg-opacity-50">
                <h3 className="text-lg font-bold text-[#c79a63] mb-3 font-casino text-center">
                  {t('currentBet')} {betAmount} {t('chips')}
                </h3>
                <h4 className="text-md font-bold text-[#b98459] mb-2 font-casino text-center">
                  {t('potentialWins')}
                </h4>
                <div className="text-[#b98459] text-sm md:text-base space-y-1">
                  <div className="flex justify-between items-center">
                    <span>{t('frogFrogFrog')}:</span>
                    <span className="font-bold text-[#D2B688]">{betAmount * 10}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{t('diamondDiamondDiamond')}:</span>
                    <span className="font-bold text-[#D2B688]">{betAmount * 8}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{t('sevenSevenSeven')}:</span>
                    <span className="font-bold text-[#D2B688]">{betAmount * 6}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{t('diceDiceDice')}:</span>
                    <span className="font-bold text-[#D2B688]">{betAmount * 4}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{t('frogFrog')}:</span>
                    <span className="font-bold text-[#D2B688]">{betAmount * 3}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{t('diamondDiamond')}:</span>
                    <span className="font-bold text-[#D2B688]">{betAmount * 2.5}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{t('sevenSeven')}:</span>
                    <span className="font-bold text-[#D2B688]">{betAmount * 2}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{t('diceDice')}:</span>
                    <span className="font-bold text-[#D2B688]">{betAmount * 1.5}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Frog-Diamond-Seven:</span>
                    <span className="font-bold text-[#D2B688]">{betAmount * 1.8}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Dice-Frog-Diamond:</span>
                    <span className="font-bold text-[#D2B688]">{betAmount * 1.8}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Seven-Dice-Frog:</span>
                    <span className="font-bold text-[#D2B688]">{betAmount * 1.8}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Diamond-Seven-Dice:</span>
                    <span className="font-bold text-[#D2B688]">{betAmount * 1.8}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Frog-Seven-Diamond:</span>
                    <span className="font-bold text-[#D2B688]">{betAmount * 1.2}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Dice-Diamond-Seven:</span>
                    <span className="font-bold text-[#D2B688]">{betAmount * 1.2}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Seven-Frog-Dice:</span>
                    <span className="font-bold text-[#D2B688]">{betAmount * 1.2}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Diamond-Dice-Frog:</span>
                    <span className="font-bold text-[#D2B688]">{betAmount * 1.2}</span>
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
                {t('houseReelRules')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <div className="text-center">
                  <h3 className="text-lg md:text-xl font-bold text-[#b98459] mb-3 font-casino">{t('howToPlay')}</h3>
                  <div className="text-[#b98459] text-sm md:text-base space-y-2">
                    <p>{t('howToPlayDesc1')}</p>
                    <p>{t('howToPlayDesc2')}</p>
                    <p>{t('howToPlayDesc3')}</p>
                    <p>{t('howToPlayDesc4')}</p>
                    <p>{t('howToPlayDesc5')}</p>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-lg md:text-xl font-bold text-[#b98459] mb-3 font-casino">{t('winningCombinations')}</h3>
                  <div className="text-[#b98459] text-sm md:text-base space-y-1">
                    <p><strong>{t('frogFrogFrog')}:</strong> {t('jackpot')}</p>
                    <p><strong>{t('diamondDiamondDiamond')}:</strong> Win 8x</p>
                    <p><strong>{t('sevenSevenSeven')}:</strong> Win 6x</p>
                    <p><strong>{t('diceDiceDice')}:</strong> Win 4x</p>
                    <p><strong>{t('frogFrog')}:</strong> Win 3x</p>
                    <p><strong>{t('diamondDiamond')}:</strong> Win 2.5x</p>
                    <p><strong>{t('sevenSeven')}:</strong> Win 2x</p>
                    <p><strong>{t('diceDice')}:</strong> Win 1.5x</p>
                    <p><strong>Frog-Diamond-Seven:</strong> Win 1.8x</p>
                    <p><strong>Dice-Frog-Diamond:</strong> Win 1.8x</p>
                    <p><strong>Seven-Dice-Frog:</strong> Win 1.8x</p>
                    <p><strong>Diamond-Seven-Dice:</strong> Win 1.8x</p>
                    <p><strong>Frog-Seven-Diamond:</strong> Win 1.2x</p>
                    <p><strong>Dice-Diamond-Seven:</strong> Win 1.2x</p>
                    <p><strong>Seven-Frog-Dice:</strong> Win 1.2x</p>
                    <p><strong>Diamond-Dice-Frog:</strong> Win 1.2x</p>
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
              {t('cashOutSummary')}
            </h2>
            <div className="space-y-4 text-[#b98459]">
              <div className="flex justify-between">
                <span>{t('startingChips')}</span>
                <span className="font-bold">{startingChips}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('currentChips')}</span>
                <span className="font-bold">{currentChips}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('totalWinningsLabel')}</span>
                <span className="font-bold text-[#D2B688]">{totalWinnings}</span>
              </div>
              <div className="border-t border-[#b98459] pt-2">
                <div className="flex justify-between font-bold text-lg">
                  <span>{t('netProfitLoss')}</span>
                  <span className={currentChips - startingChips >= 0 ? 'text-green-400' : 'text-red-400'}>
                    {currentChips - startingChips >= 0 ? '+' : ''}{currentChips - startingChips} {t('chips')}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 space-y-3">
              <button
                onClick={() => setShowCashout(false)}
                className="w-full golden-btn text-lg py-3"
              >
                {t('close')}
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