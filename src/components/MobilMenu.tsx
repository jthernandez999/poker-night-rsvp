import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";

type Props = {
  setMobileMenuOpen: (value: boolean) => void;
};

function MobilMenu({
  setMobileMenuOpen,
}: Props) {
  const router = useRouter();

  return (
    <div className="absolute z-50 md:hidden overflow-hidden w-full pt-2  bg-[url(/Background.png)] bg-cover bg-center bg-no-repeat">
      <div className="mt-2 flex flex-col justify-center items-center  w-full  pt-2 px-6">
        <div className="flex flex-row justify-center items-center h-max w-full gap-4">
          <a
            href="#"
            className= {`${router.pathname === '/' && 'text-[#985E3E]'} font-myriad text-white  hover:text-[#985E3E] self-center `}
          >
            Home
          </a>
          <p className="self-center text-[#985E3E] mx-2"> | </p>
          <a
            href="#"
            className= {`${router.pathname === '/info' && 'text-[#985E3E]'} font-myriad text-white  hover:text-[#985E3E] self-center`}
          >
            Information
          </a>
          <p className="self-center text-[#985E3E] mx-2"> | </p>
          <a
            href="#"
            className= {`${router.pathname === '/team' && 'text-[#985E3E]'} font-myriad text-white  hover:text-[#985E3E] self-center`}
          >
            Team
          </a>
        </div>
        <div className="flex flex-row justify-center items-center h-max w-full gap-4 my-2 mb-4 min-w-max">
          {/* <a
            href="#"
            className={`font-myriad text-white  hover:text-[#985E3E] self-center`}
          > */}
            <Image src="/discord.png" alt="discord" width={24} height={24} className="h-6 min-w-max" />
          {/* </a> */}
          <p className="self-center text-[#985E3E] mx-2"> | </p>
          <a
            href="#"
            className={`font-myriad text-white  hover:text-[#985E3E] self-center`}
          >
            <Image src="/twitter.png" alt="twitter" width={24} height={24} className="h-6 min-w-max" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default MobilMenu;
