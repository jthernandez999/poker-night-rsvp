/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";

type Props = {
  setShowModal: (showModal: boolean) => void;
  showModal: boolean;
};

export default function LModal({ showModal, setShowModal }: Props) {
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-[#0A0B0F] px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 border-4 border-red-500">
                <div className="relative z-10 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4">
                    <span className="text-2xl">😔</span>
                  </div>
                  
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-bold leading-6 text-red-400 mb-4"
                  >
                    Better Luck Next Time!
                  </Dialog.Title>
                  
                  <div className="mb-6">
                    <p className="text-lg text-white mb-2">
                      🎰 House Wins 🎰
                    </p>
                                         <p className="text-red-300 text-base">
                       Fortune wasn&apos;t in your favor this round at Hernandez Casino.
                     </p>
                    <p className="text-yellow-300 text-sm mt-2">
                      The night is young - come back to the poker tables! 🎲
                    </p>
                  </div>
                  
                  <div className="flex justify-center space-x-4 mb-6">
                    <a
                      href="https://discord.gg/poker-night"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <span>🎮</span>
                      <span>Join Discord</span>
                    </a>
                    <a
                      href="https://twitter.com/poker-night"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <span>🐦</span>
                      <span>Follow Updates</span>
                    </a>
                  </div>
                </div>
                
                <div className="relative z-10 mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition-colors duration-200"
                    onClick={() => setShowModal(false)}
                    ref={cancelButtonRef}
                  >
                    Try Again! 🎰
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
