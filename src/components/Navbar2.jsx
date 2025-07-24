import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import logo from "./images/logo.png";
//get route from url
import { useRouter } from "next/router";


const Navbar = ({ play, setPlay }) => {
  const [nav, setNav] = useState(false);
  const [shadow, setShadow] = useState(false);
  const [linkColor, setLinkColor] = useState("#1f2937");
  // const [play, setPlay] = useState(false);
  const router = useRouter();
  const { route } = router;

  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    const handleShadow = () => {
      if (window.scrollY >= 15) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };
    window.addEventListener("scroll", handleShadow);
  }, []);

  return (
    <div
      // style={{ backgroundColor: `${navBg}`}}
      className={
        shadow
          ? " fixed w-full h-20 z-[60] ease-in-out duration-300  bg-[rgb(24,39,36)] bg-cover bg-center bg-no-repeat shadow-black shadow-xl"
          : " fixed w-full h-20 z-[60]  bg-cover bg-center bg-no-repeat"
      }
    >
      <div className="flex justify-between items-center w-full h-full px-2 2xl:px-4 max-w-[2000px] mx-auto">
        <Link href="/">
          <a>
            <Image
              draggable={false}
              src={logo}
              alt="/"
              width="164"
              height="60"
              className="cursor-pointer hover:scale-105 duration-500 ease-in-out"
            />
          </a>
        </Link>
        <div>
          <ul className="hidden lg:flex mr-2">
            <li className="mx-2 text-sm uppercase group hover:cursor-pointer font-myriad text-transparent bg-clip-text bg-gradient-to-br from-[#f0c0a6] to-[#9E6343] hover:text-[#985E3E] self-center ">
              <Link href="/">
                <a>
                  {/* Home */}
                  <div className="w-max h-8  flex ">
                    <div className="h-[28px] self-center">
                      <Image
                        draggable={false}
                        priority
                        src="/home.png"
                        height={"28px"}
                        width={"28px"}
                        alt="home"
                        className="min-w-max"
                      />
                    </div>

                    <p className="self-center group-hover:scale-105 font-myriad text-base  pt-[6px] duration-300 ease-in-out pl-3">
                      Home
                    </p>
                  </div>
                </a>
              </Link>
            </li>
            <p className="self-center cursor-default text-[#985E3E] mx-">
              {" "}
              |{" "}
            </p>

            <li className="ml-2 group text-sm uppercase hover:cursor-pointer font-myriad text-transparent bg-clip-text bg-gradient-to-br from-[#f0c0a6] to-[#9E6343]  hover:text-[#985E3E] self-center">
              {router.asPath != "/" ? (
                <Link href="/#info">
                  <a href="#info">
                    <div className="w-max h-max flex ">
                      <img
                        draggable={false}
                        src="/info.png"
                        alt="info"
                        className="min-w-max"
                      />
                      <p className="self-center group-hover:scale-105 font-myriad text-base  pt-[6px] duration-300 ease-in-out pl-2">
                        Information
                      </p>
                    </div>{" "}
                  </a>
                </Link>
              ) : (
                <a href="#info">
                  <div className="w-max h-max flex ">
                    <img
                      draggable={false}
                      src="/info.png"
                      alt="info"
                      className="min-w-max"
                    />
                    <p className="self-center group-hover:scale-105 font-myriad text-base  pt-[6px] duration-300 ease-in-out pl-2">
                      Information
                    </p>
                  </div>{" "}
                </a>
              )}
            </li>
            <p className="self-center cursor-default  text-[#985E3E] mx-2">
              {" "}
              |{" "}
            </p>

            <li className="mr-2 text-sm group uppercase hover:cursor-pointer font-myriad text-transparent bg-clip-text bg-gradient-to-br from-[#f0c0a6] to-[#9E6343]  hover:text-[#985E3E] self-center">
              {router.asPath != "/" ? (
                <Link href="/#team">
                  <a href="#team">
                    <div className="w-max h-max flex ">
                      <img
                        draggable={false}
                        src="/team.png"
                        alt="team"
                        className=" min-w-max"
                      />
                      <p className="self-center group-hover:scale-105 font-myriad text-base  pt-[6px] duration-300 ease-in-out pl-2">
                        Team
                      </p>
                    </div>{" "}
                  </a>
                </Link>
              ) : (
                <a href="#team">
                  <div className="w-max h-max flex ">
                    <img
                      draggable={false}
                      src="/team.png"
                      alt="team"
                      className=" min-w-max"
                    />
                    <p className="self-center group-hover:scale-105 font-myriad text-base  pt-[6px] duration-300 ease-in-out pl-2">
                      Team
                    </p>
                  </div>{" "}
                </a>
              )}
            </li>
            <p className="self-center cursor-default text-[#985E3E] mx-2">
              {" "}
              |{" "}
            </p>
            <li className="mr-2 text-sm group uppercase hover:cursor-pointer font-myriad text-transparent bg-clip-text bg-gradient-to-br from-[#f0c0a6] to-[#9E6343]  hover:text-[#985E3E] self-center">
              <Link href="/house-reel">
                <a>
                  <div className="w-max h-max flex ">
                    <img
                      draggable={false}
                      src="/Lever.png"
                      alt="house-reel"
                      className=" min-w-max max-h-[28px]"
                    />
                    <p className="self-center group-hover:scale-105 font-myriad text-base  pt-[6px] duration-300 ease-in-out pl-2">
                      House Reel
                    </p>
                  </div>{" "}
                </a>
              </Link>
            </li>
            <p className="self-center cursor-default text-[#985E3E] mx-">
              {" "}
              |{" "}
            </p>
            {/* <li className="ml-2 text-sm group uppercase hover:cursor-pointer font-myriad text-transparent bg-clip-text bg-gradient-to-br from-[#f0c0a6] to-[#9E6343]  hover:text-[#985E3E] self-center">
              <Link href="/leaderboard">
                <a>
                  <div className="w-max h-max flex pt-1">
                    <img
                      draggable={false}
                      src="/lbicon.png"
                      alt="team"
                      className=" min-w-max max-h-[28px]"
                    />
                    <p className="self-center group-hover:scale-105 font-myriad text-base  pt-[2px] duration-300 ease-in-out pl-2">
                      Leaderboard
                    </p>
                  </div>{" "}
                </a>
              </Link>
            </li>
            <p className="self-center cursor-default text-[#985E3E] mx-3">
              {" "}
              |{" "}
            </p> */}
            <li className="ml-2 text-sm group uppercase hover:cursor-pointer font-myriad text-transparent bg-clip-text bg-gradient-to-br from-[#f0c0a6] to-[#9E6343]  hover:text-[#985E3E] self-center">
              <Link href="https://dapp.cardanoriver.io/#partner_program">
                <a>
                  <div className="w-max h-max flex pt-1">
                    <img
                      draggable={false}
                      src="/handshake.png"
                      alt="team"
                      className=" min-w-max max-h-[28px]"
                    />
                    <p className="self-center group-hover:scale-105 font-myriad text-base pt-[2px] duration-300 ease-in-out pl-2">
                      Partner Program
                    </p>
                  </div>{" "}
                </a>
              </Link>
            </li>
            <p className="self-center cursor-default text-[#985E3E] mx-2">
              {" "}
              |{" "}
            </p>
            <li className=" text-sm group uppercase hover:cursor-pointer font-myriad text-transparent bg-clip-text bg-gradient-to-br from-[#f0c0a6] to-[#9E6343] hover:scale-105 ease-in-out duration-100  hover:text-[#985E3E] self-center">
              <Link href="/leaderboard">
                <a>
                  <div className="w-max h-max flex ">
                    <img
                      draggable={false}
                      src="/lbicon.png"
                      alt="team"
                      className=" min-w-max max-h-[28px]"
                    />
                    {/* <p className="self-center group-hover:scale-105 font-myriad text-base  pt-[2px] duration-300 ease-in-out pl-2">
                      Leaderboard
                    </p> */}
                  </div>{" "}
                </a>
              </Link>
            </li>

            <p className="self-center cursor-default text-[#985E3E] mx-2">
              {" "}
              |{" "}
            </p>
            
            <a
              href="https://discord.gg/KjTjqme33z"
              target="_blank"
              rel="noopener noreferrer"
              className={`font-myriad text-white lg:text-lg hover:text-[#985E3E] hover:scale-105 ease-in-out duration-100 self-center`}
              // className={`font-myriad text-white lg:text-lg cursor-not-allowed ease-in-out duration-100 self-center`}
            >
              <img
                draggable={false}
                src="/discord.png"
                alt="discord"
                className=" min-w-max self-center ease-in-out duration-100 "
              />
            </a>
            <p className="self-center cursor-default text-[#985E3E] mx-2">
              {" "}
              |{" "}
            </p>
            <a
              href="https://twitter.com/CardanoRiver"
              className={`font-myriad text-white lg:text-lg hover:text-[#985E3E] self-center hover:scale-105 ease-in-out duration-100`}
            >
              <img
                draggable={false}
                src="/twitter.png"
                alt="twitter"
                className="min-w-max"
              />
            </a>
            <p className="self-center cursor-default text-[#985E3E] mx-2">
              {" "}
              |{" "}
            </p>
            <li className="ml-2 relative">
              {/* play button with gold border and glow effect on hover */}
              {/* <div className="flex justify-center items-center border rounded-3xl  bg-black text-[#985E3E] ">
                              <Image
                                draggable={false}
                                src={casino}
                                alt="casino"
                                width="30"
                                height="30"
                                className="cursor-pointer hover:scale-105 duration-500 ease-in-out"
                              />
                              play
                            </div> */}
              <Link href="https://dapp.cardanoriver.io">
                <button className="golden-btn">play</button>
              </Link>
              {/* {play && (
                <div className="absolute z-90 p-4 top-[78px] font-myriadpro bg-[rgb(24,39,36)] right-0 w-max h-max flex flex-col justify-center items-end border rounded  border-[#985E3E]">
                  <p className="text-transparent bg-clip-text bg-gradient-to-br from-[#f0c0a6] to-[#9E6343]">
                    Not so hasty there big slick, this platform opens in Q1/Q2 
                    2023.{" "}
                  </p>
                  <p className="self-start text-transparent bg-clip-text bg-gradient-to-br from-[#f0c0a6] to-[#9E6343]">Keep up on  <a className="italic" href="https://twitter.com/CardanoRiver"  target="_blank" rel="noopener noreferrer">Twitter</a> to be notified of updates!</p>
                  <div className="flex">
                    <a
                      href="https://twitter.com/CardanoRiver"
                      target="_blank" rel="noopener noreferrer"
                      className={`flex font-myriad text-white lg:text-lg hover:text-[#985E3E] self-center hover:scale-105 ease-in-out duration-100 mt-2`}
                    >
                      <div><img
                        draggable={false}
                        src="/twitter.png"
                        alt="twitter"
                        className="min-w-max mt-1 mr-1"
                      /></div>
                      
                      <p className="text-[#985E3F]">@CardanoRiver</p>
                    </a>
                  </div>
                </div>               
              )} */}
            </li>
          </ul>
          {/* Hamburger Icon */}
          <div className="lg:hidden flex flex-row w-full">
            <div
              onClick={handleNav}
              className="lg:hidden  text-[#d48459] hover:text-[#985E3E] scale-110 mr-2 "
            >
              <AiOutlineMenu size={25} className="cursor-pointer ml-10" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {/* Overlay */}
      <div
        className={
          nav ? "lg:hidden fixed left-0 top-0 w-full h-screen bg-black/70" : ""
        }
      >
        {/* Side Drawer Menu */}
        <div
          className={
            nav
              ? " fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-[rgb(24,39,36)] bg-cover bg-center p-10 ease-in duration-500 "
              : "fixed left-[-100%] top-0 p-10 ease-in duration-500"
          }
        >
          <div>
            <div className="flex w-full items-center justify-between">
              <Link href="/">
                <a>
                  <Image
                    draggable={false}
                    src={logo}
                    width="112"
                    height="54"
                    alt="/"
                  />
                </a>
              </Link>
              <div
                onClick={handleNav}
                className="rounded-full font-myriadpro text-xl  shadow-md shadow-[#985E3E] text-[#d48459] hover:text-[#985E3E] p-2 px-4 cursor-pointer"
              >
                X
              </div>
            </div>
            <div className="border-b border-gray-300 mb-2 dark:border-[#985E3E]">
              <p className="w-[85%] md:w-[90%] py-4"></p>
            </div>
          </div>
          <div className="py-4 flex flex-col">
            <ul className="uppercase text-transparent bg-clip-text bg-gradient-to-br from-[#f0c0a6] to-[#9E6343] flex flex-col gap-4">
              <Link href="/">
                <a className="group" onClick={handleNav}>
                  {/* Home */}
                  <div className="w-max h-8  flex ">
                    <Image
                      draggable={false}
                      priority
                      src="/home.png"
                      height={"12px"}
                      width={"28px"}
                      alt="home"
                      className="min-w-max"
                    />
                    <p className="group-hover:text-[#985E3E] font-myriad text-base pt-1 self-center pl-[13px]">
                      Home
                    </p>
                  </div>
                </a>
              </Link>
              {router.asPath != "/" ? (
                <Link href="/#info">
                  <a href="#info" className="group" onClick={handleNav}>
                    <div className="w-max h-max flex ">
                      <img
                        draggable={false}
                        src="/info.png"
                        alt="info"
                        className="min-w-max"
                      />
                      <p className="group-hover:text-[#985E3E] font-myriad text-base pt-1 self-center pl-2">
                        Information
                      </p>
                    </div>{" "}
                  </a>
                </Link>
              ) : (
                <a href="#info" className="group" onClick={handleNav}>
                  <div className="w-max h-max flex ">
                    <img
                      draggable={false}
                      src="/info.png"
                      alt="info"
                      className="min-w-max"
                    />
                    <p className="group-hover:text-[#985E3E] font-myriad text-base pt-1 self-center pl-2">
                      Information
                    </p>
                  </div>{" "}
                </a>
              )}
              {router.asPath != "/" ? (
                <Link href="/#team">
                  <a href="#team" className="group" onClick={handleNav}>
                    <div className="w-max h-max flex ">
                      <img
                        draggable={false}
                        src="/team.png"
                        alt="team"
                        className=" min-w-max"
                      />
                      <p className="group-hover:text-[#985E3E] font-myriad text-base pt-1 self-center pl-2">
                        Team
                      </p>
                    </div>{" "}
                  </a>
                </Link>
              ) : (
                <a href="#team" className="group" onClick={handleNav}>
                  <div className="w-max h-max flex ">
                    <img
                      draggable={false}
                      src="/team.png"
                      alt="team"
                      className=" min-w-max "
                    />
                    <p className="group-hover:text-[#985E3E] font-myriad text-base pt-1 self-center pl-2">
                      Team
                    </p>
                  </div>{" "}
                </a>
              )}
              <Link href="/house-reel">
                <a className="group" onClick={handleNav}>
                  <div className="w-max h-max flex ">
                    <img
                      draggable={false}
                      src="/Lever.png"
                      alt="house-reel"
                      className=" min-w-max max-h-[28px]"
                    />
                    <p className="group-hover:text-[#985E3E] font-myriad text-base pt-1 self-center pl-2">
                      House Reel
                    </p>
                  </div>{" "}
                </a>
              </Link>
                            <Link href="https://dapp.cardanoriver.io/#partner_program">
                <a className="group" onClick={handleNav}>
                  <div className="w-max h-max flex ">
                    <img
                      draggable={false}
                      src="/handshake.png"
                      alt="lbicon"
                      className=" min-w-max max-h-[28px]"
                    />
                    <p className="group-hover:text-[#985E3E] font-myriad text-base ml-1 pt-1 self-center pl-2">
                      Partner Program
                    </p>
                  </div>{" "}
                </a>
              </Link>
              <Link href="/leaderboard">
                <a className="group" onClick={handleNav}>
                  <div className="w-max h-max flex ">
                    <img
                      draggable={false}
                      src="/lbicon.png"
                      alt="lbicon"
                      className=" min-w-max max-h-[28px]"
                    />
                    <p className="group-hover:text-[#985E3E] font-myriad text-base ml-1 pt-1 self-center pl-2">
                      Leaderboard
                    </p>
                  </div>{" "}
                </a>
              </Link>
            </ul>
            <div className="pt-20 w-full">
              <div className="flex gap-2 items-center justify-center  sm:ml-1 md:ml-0 my-4 w-full   ">
                <a
                  href="https://discord.gg/KjTjqme33z"
                  target="_blank"
                  rel="noopener noreferrer"
                  // className={`font-myriad text-white lg:text-lg self-center cursor-not-allowed ease-in-out duration-100 mr-2`}
                  className={`font-myriad text-white lg:text-lg hover:text-[#985E3E] self-center hover:scale-105 ease-in-out duration-100 mr-2`}
                >
                  <img
                    draggable={false}
                    src="/discord.png"
                    alt="discord"
                    className=" min-w-max self-center ease-in-out duration-100 "
                  />
                </a>

                <a
                  href="https://twitter.com/CardanoRiver"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`font-myriad text-white lg:text-lg hover:text-[#985E3E] self-center hover:scale-105 ease-in-out duration-100 ml-2`}
                >
                  <img
                    draggable={false}
                    src="/twitter.png"
                    alt="twitter"
                    className="min-w-max"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
