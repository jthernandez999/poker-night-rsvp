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
};

export default function WinModal({
  showModal,
  setShowModal,
  claimed,
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-[#0A0B0F] px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 border-4 border-yellow-500">
                <div className="absolute inset-0 overflow-hidden">
                  <Coins />
                </div>
                
                <div className="relative z-10 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 mb-4">
                    <span className="text-2xl">🎉</span>
                  </div>
                  
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-bold leading-6 text-yellow-400 mb-4"
                  >
                    JACKPOT!
                  </Dialog.Title>
                  
                  <div className="mb-6">
                    <p className="text-lg text-white mb-2">
                      🎰 YOU WIN! 🎰
                    </p>
                    <p className="text-yellow-300 text-base">
                      Congratulations! You hit the jackpot at Hernandez Casino!
                    </p>
                    <p className="text-yellow-300 text-sm mt-2">
                      Time to celebrate at the poker tables! 🎲
                    </p>
                  </div>
                </div>
               
                <div className="relative z-10 mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-yellow-600 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600 transition-colors duration-200"
                    onClick={() => setShowModal(false)}
                    ref={cancelButtonRef}
                  >
                    Collect Winnings! 💰
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
