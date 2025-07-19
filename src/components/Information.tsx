import React from "react";
import Image from "next/image";
import headerLine from "./images/headerLine.svg";
import frogMiddle from "./images/Frog_middle.svg";
import diamond from "./images/Diamond.svg";
import seven from "./images/Seven.svg";

const info = [
  {
    title: "The River",
    paragraph:
      "The River will be the first casino dapp tailored for the Cardano blockchain. At launch, The River will include several classic casino games such as Blackjack, Roulette, Slots, Spin & Win, and Poker tournaments, as well as cash games. Features to look forward to include:",
    bulletPoints: [
      "Wallet and smart contract integration to create a seamless experience for casino users.",
      "The addition of new games to the platform based on community recommendations and on-chain voting.",
      "Expanding to other cryptocurrencies after creating a worthy and effective platform for Cardano users.",
    ],
    image: [diamond, diamond, diamond],
    key: 1,
  },
  {
    title: "Alpha Toads",
    paragraph:
      "Alpha Toads are the whitelist token for The River’s NFT collection and are being dispersed to lucky members of the community.",
    bulletPoints: [
      "The Alpha Toads are a 777 collection of 5 animated toads. Each toad will provide a stackable whitelist and allow 2 mints for the holder.",
      "Alpha Toads will also maintain utility post mint, but Toads by The River will always build on the Alpha Toad utility.",
      "The Alpha Toads have 5 different unique looks and can be acquired through different methods on our Twitter and Discord.",
    ],
    image: [seven, seven, seven],
    key: 2,
  },
  {
    title: "Toads by The River",
    paragraph:
      "Toads by The River will be an NFT collection consisting of 6,000 high-resolution toads on the Cardano Blockchain. The collection is inspired by Jin-Chan, the money toad, which brings wealth and fortune to the holder.",
    bulletPoints: [
      "Toads by The River will bridge the NFT space with The River Casino and grant owners with unique access, perks, and prizes.",
      "Toads are created from over 100 unique traits, making each toad one of a kind. Toads will also have 5 one-of-ones for the most fortunate of fortunate.",
    ],
    extra: "Mint Date/Price: TBA",
    image: [frogMiddle, frogMiddle, frogMiddle],
    key: 3,
  },
];

function Information() {
  return (
    <div
      className="flex flex-col items-center justify-center w-full h-max relative  pb-6 "
      // id="info"
    >
      <div className="flex flex-col  w-[94%]  md:w-[97%] h-full absolute top-10 py-19">
        <Image
          draggable={false}
          src={headerLine}
          alt="headerLine"
          // objectFit="cover"
          objectPosition="center"
          quality={100}
        />
      </div>
      <h1 className="pt-2 font-myriad font-extrabold xl:hidden text-[32px] sm:text-6xl xl:text-7xl my-8 mb-2 md:mt-10 md:my-12 md:mb-6 text-transparent bg-clip-text bg-gradient-to-br from-[#dea679] to-[#8b5426]">
        Info
      </h1>
      <h1 className="hidden font-myriad font-extrabold xl:block text-4xl  xl:text-5xl 2xl:text-[56px] my-8  md:mt-12 md:pt-2 md:my-12 md:mb-6 text-transparent bg-clip-text bg-gradient-to-br from-[#dea679] to-[#8b5426]">
        Information
      </h1>
      <div className="w-full h-max flex flex-wrap justify-evenly px-4 z-10 mt-2">
        {info.map((card, index) => {
          return (
            <div
              // className={`cursor-default justify-between hover:shadow-lg hover:shadow-[#c79a63] hover:duration-500 m-2 flex flex-col items-center  w-full md:w-[75%] lg:w-[49%] xl:w-[32%] lg:min-h-[598px] min-h-[598px] min-w-[316px]  lg:min-w-[524px]  max-w-[498px] xl:max-w-[636px] font-myriad h-max pb-6 pt-4 px-5 p-2 rounded-[10%] border border-[#b98459] bg-opacity-50
              className={`cursor-default justify-between  m-2 flex flex-col items-center  w-full md:w-[75%] lg:w-[49%] xl:w-[32%] lg:min-h-[598px] min-h-[598px] min-w-[316px]  lg:min-w-[524px]  max-w-[498px] xl:max-w-[636px] font-myriad h-max pb-6 pt-4 px-5 p-2 rounded-[10%] border border-[#b98459] bg-opacity-50 
                            ${
                              index % 2 != 0
                                ? "bg-[#005F5F80]"
                                : "bg-[#5F000080]"
                            }`}
              key={index}
            >
              {/* <div className="flex flex-col items-center h-max lg:h-full j "> */}
              <div className="flex flex-col items-center h-full justify-between">
                <p className="text-[#b98459] text-3xl leading-none font- m-1 mb-4 font-myriad font-extrabold pt-1 text-center">
                  {card.title}
                </p>
                <p className="text-[#b98459] px-4 pb-2 sm:text-lg font-myriadpro">
                  {card.paragraph}
                </p>
                {card.bulletPoints?.map((c, i) => {
                  return (
                    <ul key={i}>
                      <li className="text-[#b98459] pr-4 ml-4 font-myriadpro flex mt-2">
                        <div className="font-myriadpro min-h-[12px] min-w-[12px] max-h-[12px] max-w-[12px] w-4 mr-2 mt-[6px] border border-[#b98459] bg-[#b98459] rounded-full" />
                        {c}
                      </li>
                    </ul>
                  );
                })}
              </div>

              {card.extra && (
                <p className="text-[#b98459] px-4 text-lg my-auto sm:text-xl font-myriad">
                  {card.extra}
                </p>
              )}
              {card.key === 2 && (
                <a
                  href="https://www.jpg.store/collection/alphatoads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" my-auto "
                >
                  {/* <p className="text-[#b98459]   text-xl border-[#b98459]">view collection on <span className="">jpg.store</span></p> */}
                  <button className="border-2 border-[#b98459] rounded-lg py-2 px-12 sm:px-16 font-myriadpro font- bg-[#FFDB24] hover:bg-[#caa600] ">
                    jpg.store
                  </button>
                </a>
              )}
              <div
                className={`flex flex-nowrap justify-self-end gap-6 md:gap-12 self-center justify-center pt-5 py-2  ${
                  card.key === 2 ? "mr-0" : "mr-0"
                }`}
              >
                {card.image?.map((image, i) => {
                  return (
                    <Image
                      draggable={false}
                      height={"72px"}
                      width={"98"}
                      key={i}
                      src={image}
                      alt=""
                      className="flex-row h-24 w-24 md:h-0 md:w-max "
                    />
                  );
                })}
                {/* </div> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Information;
