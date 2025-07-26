"use client";

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Slot_trans from "./images/Slot_trans.png";

interface SlotsProps {
  setMakeSpin: (spin: boolean) => void;
  makeSpin: boolean;
  handleModalOpen: () => void;
  approved: boolean;
  setSpinning: (spinning: boolean) => void;
  setShowWin: (show: boolean) => void;
  setShowL: (show: boolean) => void;
  betAmount: number;
  onWinResult: (winAmount: number, combination: string) => void;
}

const Slots: React.FC<SlotsProps> = ({ 
  setMakeSpin, 
  makeSpin, 
  handleModalOpen, 
  approved, 
  setSpinning, 
  setShowWin, 
  setShowL,
  betAmount,
  onWinResult
}) => {
  // DEBUG: Log when betAmount prop changes
  useEffect(() => {
    console.log(`DEBUG: Slots component betAmount prop changed to: ${betAmount}`);
  }, [betAmount]);

  const [spin, setSpin] = useState(false);
  const [ring1, setRing1] = useState<number | undefined>();
  const [ring2, setRing2] = useState<number | undefined>();
  const [ring3, setRing3] = useState<number | undefined>();
  // Add state to store the intended symbols for visual rendering
  const [intendedSymbols, setIntendedSymbols] = useState<{ring1: string, ring2: string, ring3: string}>({
    ring1: 'dice',
    ring2: 'dice', 
    ring3: 'dice'
  });
  const [leverPull, setLeverPull] = useState(false);
  const [bgPlaying, setBgPlaying] = useState(false);

  function lever() {
      if (typeof window !== 'undefined') {
          new Audio("/pull.mp3").play();
      }
  }
  
  function boop() {
      if (typeof window !== 'undefined') {
          new Audio("/boop.mp3").play();
      }
  }

  function win() {
      if (typeof window !== 'undefined') {
          new Audio("/win.wav").play();
      }
  }
  
  function l() {
      if (typeof window !== 'undefined') {
          new Audio("/l.wav").play();
      }
  }

  const play = useCallback(() => {
      if (bgPlaying === false) {
          setBgPlaying(true);
      }
      if (ring3 && ring3 > 1 || !spin) {
          setSpin(true);
          setRing1(undefined);
          setRing2(undefined);
          setRing3(undefined);
          setTimeout(function () {
              rand();
          }, 2000);
      }
  }, [bgPlaying, ring3, spin, betAmount, rand]);

  useEffect(() => {
      if (makeSpin) {
          setMakeSpin(false);
          lever();
          setLeverPull(true);
          setSpinning(true);
          play();
          setTimeout(() => {
              setLeverPull(false);
          }, 400);
      }
  }, [makeSpin, setMakeSpin, setSpinning, play]);

  // Function to render the correct symbol set for ring 1 (left)
  const renderSymbolSet1 = (symbol: string, isMoving: boolean = false) => {
      const className = isMoving ? 'ringMoving' : 'ringEnd';
      
      switch(symbol) {
          case 'seven':
              return (
                  <>
                      <div className={className}>
                          <img draggable={false} src='/Dice.png' alt='' className='md:h-max h-[72px] md:mt-0 mt-2' />
                      </div>
                      <div className={className}>
                          <img draggable={false} src='/Seven_Left.png' alt='' className='ml-2' />
                      </div>
                      <div className={className}>
                          <img draggable={false} src='/Frog_middle.png' className='mt-4 -translate-x-4' alt='' />
                      </div>
                      <div className={className}>
                          <img draggable={false} src='/Diamond.png' alt='' className='-translate-x-3' />
                      </div>
                  </>
              );
          case 'diamond':
              return (
                  <>
                      <div className={className}>
                          <img draggable={false} src='/Seven_Left.png' alt='' className='ml-2' />
                      </div>
                      <div className={className}>
                          <img draggable={false} src='/Diamond.png' alt='' className='-translate-x-3' />
                      </div>
                      <div className={className}>
                          <img draggable={false} src='/Dice.png' alt='' className='md:h-max h-[72px] md:mt-0 mt-2' />
                      </div>
                      <div className={className}>
                          <img draggable={false} src='/Frog_middle.png' className='mt-4 -translate-x-4' alt='' />
                      </div>
                  </>
              );
          case 'dice':
              return (
                  <>
                      <div className={className}>
                          <img draggable={false} src='/Frog_middle.png' className='mt-4 -translate-x-4' alt='' />
                      </div>
                      <div className={className}>
                          <img draggable={false} src='/Dice.png' alt='' className='md:h-max h-[72px] md:mt-0 mt-2' />
                      </div>
                      <div className={className}>
                          <img draggable={false} src='/Diamond.png' alt='' className='-translate-x-3' />
                      </div>
                      <div className={className}>
                          <img draggable={false} src='/Seven_Left.png' alt='' className='ml-2' />
                      </div>
                  </>
              );
          case 'frog':
              return (
                  <>
                      <div className={className}>
                          <img draggable={false} src='/Diamond.png' alt='' className='-translate-x-3' />
                      </div>
                      <div className={className}>
                          <img draggable={false} src='/Frog_middle.png' className='mt-4 -translate-x-4' alt='' />
                      </div>
                      <div className={className}>
                          <img draggable={false} src='/Seven_Left.png' alt='' className='ml-2' />
                      </div>
                      <div className={className}>
                          <img draggable={false} src='/Dice.png' alt='' className='md:h-max h-[72px] md:mt-0 mt-2' />
                      </div>
                  </>
              );
          default:
              return (
                  <>
                      <div className={className}>
                          <img draggable={false} src='/Frog_middle.png' className='mt-4 -translate-x-4' alt='' />
                      </div>
                      <div className={className}>
                          <img draggable={false} src='/Dice.png' alt='' className='md:h-max h-[72px] md:mt-0 mt-2' />
                      </div>
                      <div className={className}>
                          <img draggable={false} src='/Diamond.png' alt='' className='-translate-x-3' />
                      </div>
                      <div className={className}>
                          <img draggable={false} src='/Seven_Left.png' alt='' className='ml-2' />
                      </div>
                  </>
              );
      }
  };

  // Function to render the correct symbol set for ring 2 (middle)
  const renderSymbolSet2 = (symbol: string, isMoving: boolean = false) => {
      const className = isMoving ? 'ringMoving' : 'ringEnd';
      
      switch(symbol) {
          case 'seven':
              return (
                  <>
                      <div className={className}>
                          <img draggable={false} src='/Dice.png' alt='' className='md:h-max h-[72px] md:mt-0 mt-2' />
                      </div>
                      <div className={className}>
                          <img draggable={false} src='/Seven_middle.png' alt='' />
                      </div>
                      <div className={className}>
                          <img draggable={false} src='/Frog_middle.png' className='mt-4 -translate-x-4' alt='' />
                      </div>
                      <div className={className}>
                          <img draggable={false} src='/Diamond.png' alt='' className='-translate-x-3' />
                      </div>
                  </>
              );
          case 'diamond':
              return (
                  <>
                      <div className={className}>
                          <img draggable={false} src='/Seven_middle.png' alt='' />
                      </div>
                      <div className={className}>
                          <img draggable={false} src='/Diamond.png' alt='' className='-translate-x-3' />
                      </div>
                      <div className={className}>
                          <img draggable={false} src='/Dice.png' alt='' className='md:h-max h-[72px] md:mt-0 mt-2' />
                      </div>
                      <div className={className}>
                          <img draggable={false} src='/Frog_middle.png' className='mt-4 -translate-x-4' alt='' />
                      </div>
                  </>
              );
          case 'dice':
              return (
                  <>
                      <div className={className}>
                          <img draggable={false} src='/Frog_middle.png' className='mt-4 -translate-x-4' alt='' />
                      </div>
                      <div className={className}>
                          <img draggable={false} src='/Dice.png' alt='' className='md:h-max h-[72px] md:mt-0 mt-2' />
                      </div>
                      <div className={className}>
                          <img draggable={false} src='/Diamond.png' alt='' className='-translate-x-3' />
                      </div>
                      <div className={className}>
                          <img draggable={false} src='/Seven_middle.png' alt='' />
                      </div>
                  </>
              );
          case 'frog':
              return (
                  <>
                      <div className={className}>
                          <img draggable={false} src='/Diamond.png' alt='' className='-translate-x-3' />
                      </div>
                      <div className={className}>
                          <img draggable={false} src='/Frog_middle.png' className='mt-4 -translate-x-4' alt='' />
                      </div>
                      <div className={className}>
                          <img draggable={false} src='/Seven_middle.png' alt='' />
                      </div>
                      <div className={className}>
                          <img draggable={false} src='/Dice.png' alt='' className='md:h-max h-[72px] md:mt-0 mt-2' />
                      </div>
                  </>
              );
          default:
              return (
                  <>
                      <div className={className}>
                          <img draggable={false} src='/Frog_middle.png' className='mt-4 -translate-x-4' alt='' />
                      </div>
                      <div className={className}>
                          <img draggable={false} src='/Dice.png' alt='' className='md:h-max h-[72px] md:mt-0 mt-2' />
                      </div>
                      <div className={className}>
                          <img draggable={false} src='/Diamond.png' alt='' className='-translate-x-3' />
                      </div>
                      <div className={className}>
                          <img draggable={false} src='/Seven_middle.png' alt='' />
                      </div>
                  </>
              );
      }
  };

  // Function to render the correct symbol set for ring 3 (right)
  const renderSymbolSet3 = (symbol: string, isMoving: boolean = false) => {
      const className = isMoving ? 'ringMoving' : 'ringEnd';
      
      switch(symbol) {
          case 'seven':
              return (
                  <>
                      <div className={className}>
                          <img draggable={false} src='/Dice.png' alt='' className='md:h-max h-[72px] md:mt-0 mt-2' />
                      </div>
                      <div className={className}>
                          <img draggable={false} src='/Seven_Right.png' alt='' />
                      </div>
                      <div className={className}>
                          <img draggable={false} src='/Frog_middle.png' className='mt-4 md:-translate-x-[20px] -translate-x-[10px]' alt='' />
                      </div>
                      <div className={className}>
                          <img draggable={false} src='/Diamond.png' alt='' className='-translate-x-3' />
                      </div>
                  </>
              );
          case 'diamond':
              return (
                  <>
                      <div className={className}>
                          <img draggable={false} src='/Seven_Right.png' alt='' />
                      </div>
                      <div className={className}>
                          <img draggable={false} src='/Diamond.png' alt='' className='-translate-x-3' />
                      </div>
                      <div className={className}>
                          <img draggable={false} src='/Dice.png' alt='' className='md:h-max h-[72px] md:mt-0 mt-2' />
                      </div>
                      <div className={className}>
                          <img draggable={false} src='/Frog_middle.png' className='mt-4 md:-translate-x-[20px] -translate-x-[10px]' alt='' />
                      </div>
                  </>
              );
          case 'dice':
              return (
                  <>
                      <div className={className}>
                          <img draggable={false} src='/Frog_middle.png' className='mt-4 md:-translate-x-[20px] -translate-x-[10px]' alt='' />
                      </div>
                      <div className={className}>
                          <img draggable={false} src='/Dice.png' alt='' className='md:h-max h-[72px] md:mt-0 mt-2' />
                      </div>
                      <div className={className}>
                          <img draggable={false} src='/Diamond.png' alt='' className='-translate-x-3' />
                      </div>
                      <div className={className}>
                          <img draggable={false} src='/Seven_Right.png' alt='' />
                      </div>
                  </>
              );
          case 'frog':
              return (
                  <>
                      <div className={className}>
                          <img draggable={false} src='/Diamond.png' alt='' className='-translate-x-3' />
                      </div>
                      <div className={className}>
                          <img draggable={false} src='/Frog_middle.png' className='mt-4 md:-translate-x-[20px] -translate-x-[10px]' alt='' />
                      </div>
                      <div className={className}>
                          <img draggable={false} src='/Seven_Right.png' alt='' />
                      </div>
                      <div className={className}>
                          <img draggable={false} src='/Dice.png' alt='' className='md:h-max h-[72px] md:mt-0 mt-2' />
                      </div>
                  </>
              );
          default:
              return (
                  <>
                      <div className={className}>
                          <img draggable={false} src='/Frog_middle.png' className='mt-4 md:-translate-x-[20px] -translate-x-[10px]' alt='' />
                      </div>
                      <div className={className}>
                          <img draggable={false} src='/Dice.png' alt='' className='md:h-max h-[72px] md:mt-0 mt-2' />
                      </div>
                      <div className={className}>
                          <img draggable={false} src='/Diamond.png' alt='' className='-translate-x-3' />
                      </div>
                      <div className={className}>
                          <img draggable={false} src='/Seven_Right.png' alt='' />
                      </div>
                  </>
              );
      }
  };

  function row1() {
      if (!spin) {
          return renderSymbolSet1('seven', false);
      } else if (spin && ring1 == undefined) {
          return renderSymbolSet1('seven', true);
      } else {
          return renderSymbolSet1(intendedSymbols.ring1, false);
      }
  }

  function row2() {
      if (!spin) {
          return renderSymbolSet2('seven', false);
      } else if (spin && ring2 == undefined) {
          return renderSymbolSet2('seven', true);
      } else {
          return renderSymbolSet2(intendedSymbols.ring2, false);
      }
  }

  function row3() {
      if (!spin) {
          return renderSymbolSet3('seven', false);
      } else if (spin && ring3 == undefined) {
          return renderSymbolSet3('seven', true);
      } else {
          return renderSymbolSet3(intendedSymbols.ring3, false);
      }
  }

  function rand() {
      // DEBUG: Log the bet amount being received
      console.log(`DEBUG: Slots component received betAmount=${betAmount}`);
      
      if (approved == true) {
          // Force a win when approved (for testing/demo purposes)
          // Create a realistic winning pattern - all sevens
          setRing1(25); // Seven position (1-50 range)
          boop();
          setTimeout(function () {
              setRing2(25); // Seven position (1-50 range)
              boop();
          }, 1000);
          setTimeout(function () {
              setRing3(25); // Seven position (1-50 range)
              boop();
          }, 2000);
          setTimeout(function () {
              win();
              setShowWin(true);
              // Communicate win result to parent with correct multiplier
              onWinResult(betAmount * 15, "SEVEN-SEVEN-SEVEN");
              // Track the win
              const currentWins = sessionStorage.getItem('slotWins') ? parseInt(sessionStorage.getItem('slotWins')!) : 0;
              sessionStorage.setItem('slotWins', (currentWins + 1).toString());
          }, 2500);
          setTimeout(function () {
              setSpinning(false);
          }, 3500);
      } else {
          // NEW ALGORITHM: Lookup table approach for exact multipliers
          const random = Math.random();
          let willWin = false;
          let winAmount = 0;
          let winningCombination = "No Win";
          let ring1Symbol: string = 'dice', ring2Symbol: string = 'dice', ring3Symbol: string = 'dice';
          
          // Lookup table for exact multipliers matching the display
          const winningTable: Array<{
              probability: number;
              combination: string;
              multiplier: number;
              symbols: [string, string, string];
          }> = [
              { probability: 0.005, combination: "FROG-FROG-FROG", multiplier: 25, symbols: ['frog', 'frog', 'frog'] },
              { probability: 0.015, combination: "DIAMOND-DIAMOND-DIAMOND", multiplier: 20, symbols: ['diamond', 'diamond', 'diamond'] },
              { probability: 0.025, combination: "SEVEN-SEVEN-SEVEN", multiplier: 15, symbols: ['seven', 'seven', 'seven'] },
              { probability: 0.040, combination: "DICE-DICE-DICE", multiplier: 10, symbols: ['dice', 'dice', 'dice'] },
              { probability: 0.060, combination: "FROG-FROG", multiplier: 8, symbols: ['frog', 'frog', 'dice'] },
              { probability: 0.085, combination: "DIAMOND-DIAMOND", multiplier: 6, symbols: ['diamond', 'diamond', 'dice'] },
              { probability: 0.115, combination: "SEVEN-SEVEN", multiplier: 5, symbols: ['seven', 'seven', 'dice'] },
              { probability: 0.150, combination: "DICE-DICE", multiplier: 3, symbols: ['dice', 'dice', 'seven'] },
              { probability: 0.180, combination: "FROG-DIAMOND-SEVEN", multiplier: 4, symbols: ['frog', 'diamond', 'seven'] },
              { probability: 0.210, combination: "DICE-FROG-DIAMOND", multiplier: 4, symbols: ['dice', 'frog', 'diamond'] },
              { probability: 0.240, combination: "SEVEN-DICE-FROG", multiplier: 4, symbols: ['seven', 'dice', 'frog'] },
              { probability: 0.270, combination: "DIAMOND-SEVEN-DICE", multiplier: 4, symbols: ['diamond', 'seven', 'dice'] },
              { probability: 0.295, combination: "FROG-SEVEN-DIAMOND", multiplier: 2, symbols: ['frog', 'seven', 'diamond'] },
              { probability: 0.320, combination: "DICE-DIAMOND-SEVEN", multiplier: 2, symbols: ['dice', 'diamond', 'seven'] },
              { probability: 0.345, combination: "SEVEN-FROG-DICE", multiplier: 2, symbols: ['seven', 'frog', 'dice'] },
              { probability: 0.370, combination: "DIAMOND-DICE-FROG", multiplier: 2, symbols: ['diamond', 'dice', 'frog'] }
          ];
          
          // Check each winning combination
          for (let i = 0; i < winningTable.length; i++) {
              const entry = winningTable[i];
              const prevProbability = i > 0 ? winningTable[i-1].probability : 0;
              
              if (random >= prevProbability && random < entry.probability) {
                  willWin = true;
                  winAmount = betAmount * entry.multiplier;
                  winningCombination = entry.combination;
                  ring1Symbol = entry.symbols[0];
                  ring2Symbol = entry.symbols[1];
                  ring3Symbol = entry.symbols[2];
                  
                  // DEBUG: Log the win calculation
                  console.log(`DEBUG: Random=${random}, Combination=${entry.combination}, Multiplier=${entry.multiplier}, betAmount=${betAmount}, winAmount=${winAmount}`);
                  
                  break;
              }
          }
          
          // If no win, create losing combination
          if (!willWin) {
              const symbols = ['seven', 'diamond', 'dice', 'frog'];
              ring1Symbol = symbols[Math.floor(Math.random() * symbols.length)];
              do {
                  ring2Symbol = symbols[Math.floor(Math.random() * symbols.length)];
              } while (ring2Symbol === ring1Symbol);
              
              do {
                  ring3Symbol = symbols[Math.floor(Math.random() * symbols.length)];
              } while (ring3Symbol === ring1Symbol || ring3Symbol === ring2Symbol);
          }
          
          // Convert symbols to ring positions
          const symbolToPosition = (symbol: string) => {
              switch(symbol) {
                  case 'seven': return Math.floor(Math.random() * 50) + 1;   // Seven position (1-50)
                  case 'diamond': return Math.floor(Math.random() * 5) + 96; // Diamond position (96-100)
                  case 'dice': return Math.floor(Math.random() * 25) + 51;   // Dice position (51-75)
                  case 'frog': return Math.floor(Math.random() * 20) + 76;   // Frog position (76-95)
                  default: return Math.floor(Math.random() * 100) + 1;
              }
          };
          
          const ring1Pos = symbolToPosition(ring1Symbol);
          const ring2Pos = symbolToPosition(ring2Symbol);
          const ring3Pos = symbolToPosition(ring3Symbol);
          
          // Store the intended symbols for visual rendering
          setIntendedSymbols({
              ring1: ring1Symbol,
              ring2: ring2Symbol,
              ring3: ring3Symbol
          });
          
          // DEBUG: Log the symbols and positions
          console.log(`DEBUG: Symbols: ${ring1Symbol}, ${ring2Symbol}, ${ring3Symbol}`);
          console.log(`DEBUG: Positions: ${ring1Pos}, ${ring2Pos}, ${ring3Pos}`);
          
          setRing1(ring1Pos);
          boop();
          setTimeout(function () {
              setRing2(ring2Pos);
              boop();
          }, 1000);
          setTimeout(function () {
              setRing3(ring3Pos);
              boop();
          }, 2000);
          
          // DEBUG: Log which ring gets which position
          console.log(`DEBUG: Ring1=${ring1Pos} (${ring1Symbol}), Ring2=${ring2Pos} (${ring2Symbol}), Ring3=${ring3Pos} (${ring3Symbol})`);
          
          setTimeout(function () {
              if (willWin) {
                  win();
                  setShowWin(true);
                  // Communicate win result to parent
                  console.log(`DEBUG: Sending win result - winAmount=${winAmount}, combination=${winningCombination}`);
                  onWinResult(winAmount, winningCombination);
                  // Track the win
                  const currentWins = sessionStorage.getItem('slotWins') ? parseInt(sessionStorage.getItem('slotWins')!) : 0;
                  sessionStorage.setItem('slotWins', (currentWins + 1).toString());
              } else {
                  l();
                  setShowL(true);
              }
          }, 2750);
          setTimeout(function () {
              setSpinning(false);
          }, 3500);
      }
  }

  return (
      <div
      className={`slot-container flex flex-col w-full h-full max-w-[300px] md:max-w-[800px] m-auto items-center justify-center duration-300 overflow-y-visible`}
  >
          {/* <h1 className="price">{"Jackpot: " + jackpot + "€"}</h1> */}
          <div className='hidden sm:block absolute z-30 md:-translate-x-[300px] -translate-x-[194px] -translate-y-10 w-[84px]'>
              <img
                  draggable={false}
                  src='/lever_knob.png'
                  onClick={() => {
                      // setMakeSpin(true);
                      handleModalOpen();
                  }}
                  alt=''
                  className={`cursor-pointer absolute h-[72px] md:h-[84px] z-40 -translate-x-4 md:-translate-y-10 md:-translate-x-6 ease-linear duration-200 ${
                      leverPull
                          ? "cursor-default translate-y-[121px] md:translate-y-[156px]"
                          : " "
                  }`}
              />
              {/* <Image src={LeverKnob} onClick={()=>{setMakeSpin(true)}} alt="" className={`cursor-pointer absolute h-[72px] md:h-[84px] z-30 ease-linear duration-200 ${leverPull ? ( 'cursor-default translate-y-[121px] md:translate-y-[156px]') :( ' ')}`} /> */}

              <img
                  draggable={false}
                  src='/lever_handle.png'
                  alt=''
                  className={`h-[98px] md:h-[112px] ease-linear duration-200 ${
                      leverPull
                          ? "origin-right -rotate-[125deg] -translate-x-4 translate-y-6 md:-translate-x-6 md:translate-y-12"
                          : "translate-y-10 translate-x-4  md:translate-x-2  md:translate-y-2"
                  }`}
              />
          </div>

          <div
              className={`slot-machine absolute z-30 -translate-x-[4px] max-w-[386px] md:max-w-[800px] self-center min-w-[384px] -translate-y-[10px] md:-translate-x-[105px] md:-translate-y-[15px] ${
                  leverPull
                      ? "md:rotate-[5deg] rotate-[-1deg]"
                      : "md:rotate-6"
              }`}
          >
              <Image 
                  draggable={false}
                  src={Slot_trans}
                  quality={100}
                  priority={true}
                  alt='slot'
                  className='z-30 absolute self-center max-w-[386px] md:max-w-[800px]'
              />
          </div>

          <div className='h-24 w-24 md:h-32 md:w-max flex z-40 absolute translate-x-24 -translate-y-[148px] md:translate-x-48 md:-translate-y-56'>
              <Image 
                  draggable={false} 
                  className='' 
                  src="/dice2.png" 
                  width={128}
                  height={128}
                  alt='dice2' 
              />
          </div>
          <div className='h-28 w-28 md:h-max md:w-max  flex z-40 absolute translate-x-28 translate-y-20 md:translate-x-[156px] md:translate-y-[156px]'>
              {" "}
              <Image 
                  draggable={false} 
                  src="/dice1.png" 
                  width={112}
                  height={112}
                  alt='dice1' 
                  className=' ' 
              />
          </div>

          {/* <div className="slot"> */}
          <div
              className={`margin-0 min-h-[248px] max-h-[364px] relative z-20 flex flex-row-nowrap justify-center w-full h-[80%] overflow-hidden ${
                  leverPull
                      ? "md:rotate-[5deg] rotate-[-1deg]"
                      : "md:rotate-6"
              }`}
          >
              <div className='row1'>{row1()}</div>
              <div className='row2'>{row2()}</div>
              <div className='row3'>{row3()}</div>
          </div>
          <div className='absolute z-20 md:h-[600px]  md:max-h-[864px] flex flex-col items-center justify-center'>
              <Image 
                  draggable={false} 
                  src="/Shine.png" 
                  width={800}
                  height={864}
                  alt='shine' 
                  className='self-center h-full' 
              />
          </div>
          <div
              className={`absolute z-10 min-w-[656px] md:min-h-[600px] md:min-w-[864px] md:h-[642px] flex flex-col items-center justify-center  duration-300 overflow-y-visible overflow-x-hidden`}
          >
              <Image 
                  draggable={false}
                  priority
                  src="/Coins.png"
                  width={864}
                  height={642}
                  alt='coins'
                  className={`absolute z-10`}
              />
          </div>
      </div>
  );
};

export default Slots; 