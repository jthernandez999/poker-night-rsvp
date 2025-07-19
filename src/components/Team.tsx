import React from "react";
import Image from "next/image";
import chase from "./images/APE.png";
import tanjiro from "./images/tanjiroo.png";
import art from "./images/art.png";
import nick from "./images/nick2.png";
import dunes from "./images/dunes.png";
import headerLine from "./images/headerLine.svg";
import coinsBottom from "./images/coinsTeam.png";
import huth from "./images/huth.png";
import flemm from "./images/flemm.jpg";
import logo from "./images/logo.png";
import discord from "./images/discordcoin.png";
import twitter from "./images/twittercoin.png";
import button from "./images/button.png";

const team = [
  {
    name: "Flemm",
    title: "Community Manager",
    twtr: "degenflemm",
    desc: "Crypto enthusiast, NFT collector and football fanatic.",
    img: flemm,
  },
  {
    name: "Dunes",
    title: "Marketing & Strategy",
    twtr: "_dunes_",
    desc: "6 years of marketing experience, and what feels like a lifetime in NFTs.",
    img: dunes,
  },

  {
    name: "chase",
    title: "Front-End Developer",
    twtr: "_Chase_Donovan_",
    desc: "Web Developer, focused on building user experiences on Cardano.",
    img: chase,
  },
  {
    name: "HuthS0lo",
    title: "Back-End Developer",
    twtr: "Huth_S0lo",
    desc: " NASA IT Engineer by day, CNFT Creator, developer,  and SPO by night.",
    img: huth,
  },
  {
    name: "Nickthegreekx",
    title: "Lead Moderator",
    twtr: "NbaItIs1",
    desc: "NFT enthusiast. Civil engineer by day, NFT degen by night.",
    img: nick,
  },
  {
    name: "Tanjiro",
    title: "Public Relations",
    twtr: "MeltingTanjiro",
    desc: "Twitter ambassador, NFT investor, visionary and consultant.",
    img: tanjiro,
  },
];
const artius = {
  name: "Artius",
  title: "Artist",
  twtr: "ArtiusArt",
  desc: "Furious NFT artist. 3D graphic magician and 2D graphic enthusiast.",
  img: art,
};

type Props = {};

const Team = (props: Props) => {
  return (
    <div
      id="team"
      className="flex flex-col items-center justify-center w-full h-max relative pb-0 pt-4 md:pt-12"
    >
      <div className="flex flex-col  w-[94%] md:w-[97%] h-max absolute top-12 md:top-20">
        <Image
          draggable={false}
          src={headerLine}
          alt="headerLine"
          // layout="fill"
          // objectFit="cover"
          objectPosition="center"
          quality={100}
        />
      </div>
      <h1 className="cursor-default mt-8 text-[32px] sm:text-5xl xl:text-5xl 2xl:text-[56px] my-8 mb-2 md:mt-10 md:my-12 md:mb-6 font-myriad font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-[#dea679] to-[#8b5426]">
        Team
      </h1>
      <div className="w-full h-max flex flex-wrap justify-evenly px-4 z-10 mt-0">
        {team.map((member, index) => {
          return (
            <div
              className={`cursor-default  duration-500 m-2 pt-[50px] relative w-full lg:w-[46%] xl:w-[32%] min-h-[232px] min-w-[316px] md:min-w-[424px] max-w-[636px] font-myriad h-max flex flex-col rounded-3xl border border-[#b98459] bg-opacity-50 ${
                index % 2 != 0 || index === 6
                  ? "bg-[#005F5F80]"
                  : "bg-[#5F000080]"
              }`}
              key={index}
            >
              <span className="absolute top-3 self-center font-myriadpro text-[#b98459] text-lg lg:text-2xl   ml-2  opacity-90 ">
                {member.title}
              </span>
              <div className="flex p-2">
                <div className="relative flex min-w-max  h-max max-h-[128px] rounded-full overflow-hidden border-2 border-[#b98459] ">
                  <Image
                    draggable={false}
                    src={member.img}
                    alt={member.name}
                    width={128}
                    height={128}
                    className="rounded-full scale-[1.1]"
                  />
                  <div className="shadow-[inset_0px_0px_26px_0px_rgba(0,0,0,1)]  flex  w-full  h-full absolute rounded-full" />
                </div>
                <div className="flex h-full flex-col justify-around pl-2 lg:pl-4 pt-2">
                  {member.name != "chase" ? (
                    <p className="min-w-min text-[#b98459] font-myriad font-extrabold  text-lg sm:text-xl lg:text-2xl  items-center w-full border-b border-[#b98459] flex justify-between">
                      {member.name}
                      <span className="flex flex-col items-center justify-center mr-1 lg:mr-3 hover:scale-110 duration-300">
                        <a
                          href={`https://twitter.com/${member.twtr}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img
                            draggable={false}
                            src="/twitter.png"
                            alt="twitter"
                            className="min-w-max"
                          />
                        </a>
                      </span>
                    </p>
                  ) : (
                    <p className="min-w-min text-[#b98459] font-myriad font-extrabold  text-lg sm:text-xl lg:text-2xl font- items-center w-full border-b border-[#b98459] flex justify-between">
                      <span>
                        CH
                        {
                          <span className=" font-2xl md:font-2xl font-thin font-myriad">
                            ₳
                          </span>
                        }
                        SE
                      </span>
                      <span className="flex flex-col items-center justify-center mr-1 lg:mr-3 hover:scale-110 duration-300">
                        <a
                          href={`https://twitter.com/${member.twtr}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img
                            draggable={false}
                            src="/twitter.png"
                            alt="twitter"
                            className="min-w-max"
                          />
                        </a>
                      </span>
                    </p>
                  )}

                  <p className=" text-[#b98459] md:text-xl font-myriadpro text-sm md:text-base pt-2">
                    {member.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        <div
          className={`cursor-default  duration-500 m-2 pt-[50px] relative w-full lg:w-[46%] xl:w-[32%] min-h-[232px]  min-w-[316px] md:min-w-[424px] max-w-[636px] font-myriad h-max flex flex-col rounded-3xl border border-[#b98459] bg-opacity-50  lg:bg-[#005F5F80] bg-[#5F000080]`}
        >
          <span className="absolute top-3 self-center font-myriadpro text-[#b98459] lg:text-2xl text-lg  ml-2  opacity-90 ">
            {artius.title}
          </span>
          <div className="flex p-2  ">
            <div className="relative flex min-w-max  h-max max-h-[128px] rounded-full overflow-hidden border-2 border-[#b98459] ">
              <Image
                draggable={false}
                src={artius.img}
                alt={artius.name}
                width={128}
                height={128}
                className="rounded-full scale-[1.1]"
              />
              <div className="shadow-[inset_0px_0px_26px_0px_rgba(0,0,0,1)]  flex  w-full  h-full absolute rounded-full" />
            </div>

            <div className="flex h-full flex-col justify-around ml-4 pt-2">
              <p className="min-w-min text-[#b98459]  font-myriad font-extrabold text-lg sm:text-xl lg:text-2xl items-center w-full border-b border-[#b98459] flex justify-between">
                {artius.name}
                <span className="flex flex-col items-center justify-center mr-1 lg:mr-3 hover:scale-110 duration-300">
                  <a
                    href={`https://twitter.com/${artius.twtr}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      draggable={false}
                      src="/twitter.png"
                      alt="twitter"
                      className="min-w-max"
                    />
                  </a>
                </span>
              </p>

              <p className=" text-[#b98459] md:text-xl font-myriadpro text-sm md:text-base pt-2">
                {artius.desc}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-36 md:h-45 items-center flex flex-wrap-none gap-4 justify-between px-4 z-10 mt-6 md:mt-12 ">
        <div className="min-w-[124px] h-max flex mb-4 mr-2 ">
          <Image
            draggable={false}
            src={logo}
            alt="logo"
            width={498}
            height={228}
            className=""
          />
        </div>
        <div className="w-[85%] h-1 border-b border-[#b98459] self-center hidden md:flex " />
        <div className="mt-0 justify-center gap-4 w-full h-max z-10 relative hidden md:flex mr-6">
          <a
            href="https://discord.gg/KjTjqme33z"
            className="relative mr-4 rounded-full"
          >
            <div className=" h-24 md:h-32 min-w-max cursor-pointer ease-in duration-200 ">
              <Image
                draggable={false}
                src={discord}
                alt="logo"
                className=" h-24 md:h-32 mr-4 hover:scale-105 cursor-pointer ease-in duration-200"
              />
            </div>
          </a>
          <a
            href="https://twitter.com/CardanoRiver"
            className="rounded-full"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="h-max w-max group cursor-pointer ease-in duration-200">
              <Image
                draggable={false}
                src={twitter}
                alt="logo"
                className="group-hover:scale-110 duration-300"
              />
            </div>
          </a>
        </div>
        <div className="w-full h-1 border-b border-[#b98459] self-center" />
        <div className="min-w-[72px] h-max flex mt-2 cursor-pointer hover:scale-105 ease-in-out duration-300 ">
          <a href="#home">
            <Image
              draggable={false}
              quality={100}
              src={button}
              alt="logo"
              className="cursor-pointer hover:scale-105 ease-in-out duration-300"
            />
          </a>
        </div>
      </div>
      <div className="flex flex-col z-0 w-full h-full absolute justify-end translate-y-12 overflow-hidden lg:px-[10%] ">
        <Image
          src={coinsBottom}
          alt="headerLine"
          objectPosition="center"
          quality={100}
        />
      </div>
    </div>
  );
};

export default Team;
