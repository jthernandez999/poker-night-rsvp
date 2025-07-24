/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import animationData from "./images/falling_coins.json";

function Coins() {
  return (
    <div className="w-full flex justify-center top-0 absolute ">
      <div className="w-[632px] h-[464px] bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
        <div className="text-6xl">💰</div>
      </div>
    </div>
  );
}

type Props = {
  setShowModal: (showModal: boolean) => void;
  showModal: boolean;
  claimed: boolean;
  winAmount?: number;
};

export default function WinModal({
  showModal,
  setShowModal,
  claimed,
  winAmount = 0,
}: Props) {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={showModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[70]"
        initialFocus={cancelButtonRef}
        onClose={setShowModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-[#0A0B0F] px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl sm:p-6 md:p-8 border-4 border-yellow-500">
                <div className="absolute inset-0 overflow-hidden">
                  <Coins />
                </div>
                
                <div className="relative z-10 text-center">
                  <div className="mx-auto flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-yellow-100 mb-6 animate-bounce">
                    <span className="text-3xl md:text-4xl">🎉</span>
                  </div>
                  
                  <Dialog.Title
                    as="h3"
                    className="text-3xl md:text-4xl lg:text-5xl font-bold leading-6 text-yellow-400 mb-6 animate-pulse"
                  >
                    🎰 JACKPOT! 🎰
                  </Dialog.Title>
                  
                  {/* Win Amount Display */}
                  <div className="mb-8">
                    <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg p-6 md:p-8 mb-6 border-4 border-yellow-300 shadow-2xl">
                      <p className="text-2xl md:text-3xl lg:text-4xl text-black font-bold mb-2">
                        YOU WON
                      </p>
                      <div className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-black animate-pulse">
                        {winAmount} CHIPS!
                      </div>
                      <p className="text-lg md:text-xl lg:text-2xl text-black font-semibold mt-2">
                        💰 CASH OUT NOW! 💰
                      </p>
                    </div>
                    
                    <p className="text-xl md:text-2xl lg:text-3xl text-white mb-4 font-bold">
                      🎰 CONGRATULATIONS! 🎰
                    </p>
                    <p className="text-yellow-300 text-lg md:text-xl lg:text-2xl">
                      You hit the jackpot at Hernandez Casino!
                    </p>
                    <p className="text-yellow-300 text-base md:text-lg lg:text-xl mt-4">
                      Time to celebrate at the poker tables! 🎲
                    </p>
                  </div>
                </div>
               
                <div className="relative z-10 mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-yellow-600 px-6 py-4 md:px-8 md:py-5 text-lg md:text-xl lg:text-2xl font-semibold text-black shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600 transition-colors duration-200"
                    onClick={() => setShowModal(false)}
                    ref={cancelButtonRef}
                  >
                    Collect {winAmount} Chips! 💰
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
