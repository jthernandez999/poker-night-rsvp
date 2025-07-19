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
}

const Slots: React.FC<SlotsProps> = ({ 
  setMakeSpin, 
  makeSpin, 
  handleModalOpen, 
  approved, 
  setSpinning, 
  setShowWin, 
  setShowL 
}) => {
    const [spin, setSpin] = useState(false);
    const [ring1, setRing1] = useState<number | undefined>();
    const [ring2, setRing2] = useState<number | undefined>();
    const [ring3, setRing3] = useState<number | undefined>();
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
    }, [bgPlaying, ring3, spin, rand]);

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

    function row1() {
        if (!spin) {
            return (
                <>
                    <div className='ringEnd'>
                        {" "}
                        <img
                            draggable={false} src='/Seven_Left.png' alt='' className='ml-2' />
                    </div>
                    <div className='ringEnd'>
                        <img
                            draggable={false}
                            src='/Dice.png'
                            alt=''
                            className='md:h-max h-[72px] md:mt-0 mt-2'
                        />
                    </div>
                    <div className='ringEnd'>
                        <img
                            draggable={false}
                            src='/Frog_middle.png'
                            className='mt-4 -translate-x-4'
                            alt=''
                        />
                    </div>
                    <div className='ringEnd'>
                        <img
                            draggable={false}
                            src='/Diamond.png'
                            alt=''
                            className='-translate-x-3 '
                        />
                    </div>
                </>
            );
        } else if (spin && ring1 == undefined) {
            return (
                <>
                    <div className='ringMoving'>
                        {" "}
                        <img
                            draggable={false} src='/Seven_Left.png' alt='' className='ml-2' />
                    </div>
                    <div className='ringMoving'>
                        <img
                            draggable={false}
                            src='/Dice.png'
                            alt=''
                            className='md:h-max h-[72px] md:mt-0 mt-2'
                        />
                    </div>
                    <div className='ringMoving'>
                        <img
                            draggable={false}
                            src='/Frog_middle.png'
                            className='mt-4 -translate-x-4'
                            alt=''
                        />
                    </div>
                    <div className='ringMoving'>
                        <img
                            draggable={false}
                            src='/Diamond.png'
                            alt=''
                            className='-translate-x-3 '
                        />
                    </div>
                </>
            );
        } else if (ring1 && ring1 >= 1 && ring1 <= 50) {
            return (
                <>
                    <div className='ringEnd'>
                        {" "}
                        <img
                            draggable={false} src='/Seven_Left.png' alt='' className='ml-2' />
                    </div>
                    <div className='ringEnd'>
                        <img
                            draggable={false}
                            src='/Dice.png'
                            alt=''
                            className='md:h-max h-[72px] md:mt-0 mt-2'
                        />
                    </div>
                    <div className='ringEnd'>
                        <img
                            draggable={false}
                            src='/Frog_middle.png'
                            className='mt-4 -translate-x-4'
                            alt=''
                        />
                    </div>
                    <div className='ringEnd'>
                        <img
                            draggable={false}
                            src='/Diamond.png'
                            alt=''
                            className='-translate-x-3 '
                        />
                    </div>
                </>
            );
        } else if (ring1 && ring1 > 50 && ring1 <= 75) {
            return (
                <>
                    <div className='ringEnd'>
                        <img
                            draggable={false}
                            src='/Dice.png'
                            alt=''
                            className='md:h-max h-[72px] md:mt-0 mt-2'
                        />
                    </div>
                    <div className='ringEnd'>
                        <img
                            draggable={false}
                            src='/Frog_middle.png'
                            className='mt-4 -translate-x-4'
                            alt=''
                        />
                    </div>
                    <div className='ringEnd'>
                        <img
                            draggable={false}
                            src='/Diamond.png'
                            alt=''
                            className='-translate-x-3 '
                        />
                    </div>
                    <div className='ringEnd'>
                        {" "}
                        <img
                            draggable={false} src='/Seven_Left.png' alt='' className='ml-2' />
                    </div>
                </>
            );
        } else if (ring1 && ring1 > 75 && ring1 <= 95) {
            return (
                <>
                    <div className='ringEnd'>
                        <img
                            draggable={false}
                            src='/Frog_middle.png'
                            className='mt-4 -translate-x-4'
                            alt=''
                        />
                    </div>
                    <div className='ringEnd'>
                        <img
                            draggable={false}
                            src='/Diamond.png'
                            alt=''
                            className='-translate-x-3 '
                        />
                    </div>
                    <div className='ringEnd'>
                        {" "}
                        <img
                            draggable={false} src='/Seven_Left.png' alt='' className='ml-2' />
                    </div>
                    <div className='ringEnd'>
                        <img
                            draggable={false}
                            src='/Dice.png'
                            alt=''
                            className='md:h-max h-[72px] md:mt-0 mt-2'
                        />
                    </div>
                </>
            );
        } else if (ring1 && ring1 > 95 && ring1 <= 100) {
            return (
                <>
                    <div className='ringEnd'>
                        <img
                            draggable={false}
                            src='/Diamond.png'
                            alt=''
                            className='-translate-x-3 '
                        />
                    </div>
                    <div className='ringEnd'>
                        {" "}
                        <img
                            draggable={false} src='/Seven_Left.png' alt='' className='ml-2' />
                    </div>
                    <div className='ringEnd'>
                        <img
                            draggable={false}
                            src='/Dice.png'
                            alt=''
                            className='md:h-max h-[72px] md:mt-0 mt-2'
                        />
                    </div>
                    <div className='ringEnd'>
                        <img
                            draggable={false}
                            src='/Frog_middle.png'
                            className='mt-4 -translate-x-4'
                            alt=''
                        />
                    </div>
                </>
            );
        }
    }

    function row2() {
        if (!spin) {
            return (
                <>
                    <div className='ringEnd'>
                        {" "}
                        <img
                            draggable={false} src='/Seven_middle.png' alt='' />
                    </div>
                    <div className='ringEnd'>
                        <img
                            draggable={false}
                            src='/Dice.png'
                            alt=''
                            className='md:h-max h-[72px] md:mt-0 mt-2'
                        />
                    </div>
                    <div className='ringEnd'>
                        <img
                            draggable={false}
                            src='/Frog_middle.png'
                            className='mt-4 -translate-x-4'
                            alt=''
                        />
                    </div>
                    <div className='ringEnd'>
                        <img
                            draggable={false}
                            src='/Diamond.png'
                            alt=''
                            className='-translate-x-3 '
                        />
                    </div>
                </>
            );
        } else if (spin && ring2 == undefined) {
            return (
                <>
                    <div className='ringMoving'>
                        {" "}
                        <img
                            draggable={false} src='/Seven_middle.png' alt='' />
                    </div>
                    <div className='ringMoving'>
                        <img
                            draggable={false}
                            src='/Dice.png'
                            alt=''
                            className='md:h-max h-[72px] md:mt-0 mt-2'
                        />
                    </div>
                    <div className='ringMoving'>
                        <img
                            draggable={false}
                            src='/Frog_middle.png'
                            className='mt-4 -translate-x-4'
                            alt=''
                        />
                    </div>
                    <div className='ringMoving'>
                        <img
                            draggable={false}
                            src='/Diamond.png'
                            alt=''
                            className='-translate-x-3 '
                        />
                    </div>
                </>
            );
        } else if (ring2 && ring2 >= 1 && ring2 <= 50) {
            return (
                <>
                    <div className='ringEnd'>
                        {" "}
                        <img
                            draggable={false} src='/Seven_middle.png' alt='' />
                    </div>
                    <div className='ringEnd'>
                        <img
                            draggable={false}
                            src='/Dice.png'
                            alt=''
                            className='md:h-max h-[72px] md:mt-0 mt-2'
                        />
                    </div>
                    <div className='ringEnd'>
                        <img
                            draggable={false}
                            src='/Frog_middle.png'
                            className='mt-4 -translate-x-4'
                            alt=''
                        />
                    </div>
                    <div className='ringEnd'>
                        <img
                            draggable={false}
                            src='/Diamond.png'
                            alt=''
                            className='-translate-x-3 '
                        />
                    </div>
                </>
            );
        } else if (ring2 && ring2 > 50 && ring2 <= 75) {
            return (
                <>
                    <div className='ringEnd'>
                        <img
                            draggable={false}
                            src='/Dice.png'
                            alt=''
                            className='md:h-max h-[72px] md:mt-0 mt-2'
                        />
                    </div>
                    <div className='ringEnd'>
                        <img
                            draggable={false}
                            src='/Frog_middle.png'
                            className='mt-4 -translate-x-4'
                            alt=''
                        />
                    </div>
                    <div className='ringEnd'>
                        <img
                            draggable={false}
                            src='/Diamond.png'
                            alt=''
                            className='-translate-x-3 '
                        />
                    </div>
                    <div className='ringEnd'>
                        {" "}
                        <img
                            draggable={false} src='/Seven_middle.png' alt='' />
                    </div>
                </>
            );
        } else if (ring2 && ring2 > 75 && ring2 <= 95) {
            return (
                <>
                    <div className='ringEnd'>
                        <img
                            draggable={false}
                            src='/Frog_middle.png'
                            className='mt-4 -translate-x-4'
                            alt=''
                        />
                    </div>
                    <div className='ringEnd'>
                        <img
                            draggable={false}
                            src='/Diamond.png'
                            alt=''
                            className='-translate-x-3 '
                        />
                    </div>
                    <div className='ringEnd'>
                        {" "}
                        <img
                            draggable={false} src='/Seven_middle.png' alt='' />
                    </div>
                    <div className='ringEnd'>
                        <img
                            draggable={false}
                            src='/Dice.png'
                            alt=''
                            className='md:h-max h-[72px] md:mt-0 mt-2'
                        />
                    </div>
                </>
            );
        } else if (ring2 && ring2 > 95 && ring2 <= 100) {
            return (
                <>
                    <div className='ringEnd'>
                        <img
                            draggable={false}
                            src='/Diamond.png'
                            alt=''
                            className='-translate-x-3 '
                        />
                    </div>
                    <div className='ringEnd'>
                        {" "}
                        <img
                            draggable={false} src='/Seven_middle.png' alt='' />
                    </div>
                    <div className='ringEnd'>
                        <img
                            draggable={false}
                            src='/Dice.png'
                            alt=''
                            className='md:h-max h-[72px] md:mt-0 mt-2'
                        />
                    </div>
                    <div className='ringEnd'>
                        <img
                            draggable={false}
                            src='/Frog_middle.png'
                            className='mt-4 -translate-x-4'
                            alt=''
                        />
                    </div>
                </>
            );
        }
    }

    function row3() {
        if (!spin) {
            return (
                <>
                    <div className='ringEnd'>
                        {" "}
                        <img
                            draggable={false} src='/Seven_Right.png' alt='' />
                    </div>
                    <div className='ringEnd'>
                        <img
                            draggable={false}
                            src='/Dice.png'
                            alt=''
                            className='md:h-max h-[72px] md:mt-0 mt-2'
                        />
                    </div>
                    <div className='ringEnd'>
                        <img
                            draggable={false}
                            src='/Frog_middle.png'
                            className='mt-4 md:-translate-x-[20px] -translate-x-[10px] '
                            alt=''
                        />
                    </div>
                    <div className='ringEnd'>
                        <img
                            draggable={false}
                            src='/Diamond.png'
                            alt=''
                            className='-translate-x-3 '
                        />
                    </div>
                </>
            );
        } else if (spin && ring3 == undefined) {
            return (
                <>
                    <div className='ringMoving'>
                        {" "}
                        <img
                            draggable={false} src='/Seven_Right.png' alt='' />
                    </div>
                    <div className='ringMoving'>
                        <img
                            draggable={false}
                            src='/Dice.png'
                            alt=''
                            className='md:h-max h-[72px] md:mt-0 mt-2'
                        />
                    </div>
                    <div className='ringMoving'>
                        <img
                            draggable={false}
                            src='/Frog_middle.png'
                            className='mt-4 md:-translate-x-[20px] -translate-x-[10px] '
                            alt=''
                        />
                    </div>
                    <div className='ringMoving'>
                        <img
                            draggable={false}
                            src='/Diamond.png'
                            alt=''
                            className='-translate-x-3 '
                        />
                    </div>
                </>
            );
        } else if (ring3 && ring3 >= 1 && ring3 <= 50) {
            return (
                <>
                    <div className='ringEnd'>
                        {" "}
                        <img
                            draggable={false} src='/Seven_Right.png' alt='' />
                    </div>
                    <div className='ringEnd'>
                        <img
                            draggable={false}
                            src='/Dice.png'
                            alt=''
                            className='md:h-max h-[72px] md:mt-0 mt-2'
                        />
                    </div>
                    <div className='ringEnd'>
                        <img
                            draggable={false}
                            src='/Frog_middle.png'
                            className='mt-4 md:-translate-x-[20px] -translate-x-[10px] '
                            alt=''
                        />
                    </div>
                    <div className='ringEnd'>
                        <img
                            draggable={false}
                            src='/Diamond.png'
                            alt=''
                            className='-translate-x-3 '
                        />
                    </div>
                </>
            );
        } else if (ring3 && ring3 > 50 && ring3 <= 75) {
            return (
                <>
                    <div className='ringEnd'>
                        <img
                            draggable={false}
                            src='/Dice.png'
                            alt=''
                            className='md:h-max h-[72px] md:mt-0 mt-2'
                        />
                    </div>
                    <div className='ringEnd'>
                        <img
                            draggable={false}
                            src='/Frog_middle.png'
                            className='mt-4 md:-translate-x-[20px] -translate-x-[10px] '
                            alt=''
                        />
                    </div>
                    <div className='ringEnd'>
                        <img
                            draggable={false}
                            src='/Diamond.png'
                            alt=''
                            className='-translate-x-3 '
                        />
                    </div>
                    <div className='ringEnd'>
                        {" "}
                        <img
                            draggable={false} src='/Seven_Right.png' alt='' />
                    </div>
                </>
            );
        } else if (ring3 && ring3 > 75 && ring3 <= 95) {
            return (
                <>
                    <div className='ringEnd'>
                        <img
                            draggable={false}
                            src='/Frog_middle.png'
                            className='mt-4 md:-translate-x-[20px] -translate-x-[10px] '
                            alt=''
                        />
                    </div>
                    <div className='ringEnd'>
                        <img
                            draggable={false}
                            src='/Diamond.png'
                            alt=''
                            className='-translate-x-3 '
                        />
                    </div>
                    <div className='ringEnd'>
                        {" "}
                        <img
                            draggable={false} src='/Seven_Right.png' alt='' />
                    </div>
                    <div className='ringEnd'>
                        <img
                            draggable={false}
                            src='/Dice.png'
                            alt=''
                            className='md:h-max h-[72px] md:mt-0 mt-2'
                        />
                    </div>
                </>
            );
        } else if (ring3 && ring3 > 95 && ring3 <= 100) {
            return (
                <>
                    <div className='ringEnd'>
                        <img
                            draggable={false}
                            src='/Diamond.png'
                            alt=''
                            className='-translate-x-3 '
                        />
                    </div>
                    <div className='ringEnd'>
                        <img
                            draggable={false} src='/Seven_Right.png' alt='' />
                    </div>
                    <div className='ringEnd'>
                        <img
                            draggable={false}
                            src='/Dice.png'
                            alt=''
                            className='md:h-max h-[72px] md:mt-0 mt-2'
                        />
                    </div>
                    <div className='ringEnd'>
                        <img
                            draggable={false}
                            src='/Frog_middle.png'
                            className='mt-4 md:-translate-x-[20px] -translate-x-[10px] '
                            alt=''
                        />
                    </div>
                </>
            );
        }
    }

    function rand() {
        if (approved == true) {
            setRing1(60);
            boop();
            setTimeout(function () {
                setRing2(60);
                boop();
            }, 1000);
            setTimeout(function () {
                setRing3(60);
                boop();
            }, 2000);
            setTimeout(function () {
                win();
                setShowWin(true);
            }, 2500);
            setTimeout(function () {
                setSpinning(false);
            }, 3500);
        } else {
            const rand1 = Math.floor(Math.random() * 100) + 1;
            const rand2 = Math.floor(Math.random() * 100) + 1;
            setRing1(rand1);
            boop();
            setTimeout(function () {
                setRing2(rand2);
                boop();
            }, 1000);
            setTimeout(function () {
                if (rand1 <= 50 && rand2 <= 50) {
                    setRing3(95);
                } else if (rand1 > 50 && rand2 > 50) {
                    setRing3(3);
                } else {
                    setRing3(Math.floor(Math.random() * 100) + 1);
                }
                boop();
            }, 2000);
            setTimeout(function () {
                l()
                setShowL(true);
            }, 2750);
            setTimeout(function () {
                setSpinning(false);
            }, 3500);
        }
    }

    return (
        <div
        className={`flex flex-col w-full h-full max-w-[300px] md:max-w-[800px] m-auto items-center justify-center duration-300 overflow-y-visible`}
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
                className={`absolute z-30 -translate-x-[4px] -translate-y-[135px] xs:-translate-y-[100px] sm:-translate-y-[135px] md:-translate-x-[105px] md:-translate-y-[15px] max-w-[386px] md:max-w-[800px] self-center min-w-[384px] ${
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