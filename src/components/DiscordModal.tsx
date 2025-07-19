/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
//

type Props = {
  setShowModal: (showModal: boolean) => void;
  showModal: boolean;
  walletAddy: string;
  setWalletAddy: (walletAddy: string) => void;
  handleCheck: () => void;
  checking: boolean;
};

export default function TwitterCheckModal({
  checking: _checking,
  showModal,
  setShowModal,
  walletAddy: _walletAddy,
  setWalletAddy: _setWalletAddy,
  handleCheck: _handleCheck,
}: Props) {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={showModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
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

        <div className="fixed inset-0 z-50 overflow-y-auto">
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
              {/* <Dialog.Panel className="min-w-min min-h-min relative transform overflow-hidden rounded-lg bg-[#0D0D0D] text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm  border border-[#b98459]"> */}
              <Dialog.Panel className="block2">
                <div className="bg-[#0D0D0D] p-2 pr-4 pb-6 h-full">
                  <div className="flex flex-row-reverse justify-between ">
                    {/* x button to close modal */}
                    <button
                      type="button"
                      className="hover:opacity-50 hover:text-[#b98459] text-white focus:ring-0 border-transparent focus:border-transparent px-2"
                      onClick={() => setShowModal(false)}
                    >
                      X
                    </button>
                  </div>
                  <div className="flex sm:items-start justify-center text-center pt-4 px-4">
                    <div className=" text-center sm:mt-0 sm:ml-4 sm:text-left">
                      {/* <Dialog.Title
                        as="h3"
                        className="text-2xl text-center font-medium leading-6 text-white"
                      >
                        Are you whitelisted?
                      </Dialog.Title> */}
                      <div className="flex flex-col overflow-scroll scrollbar-hide px-4">
                        <label className=" text-lg font-medium text-white text-center mb-2 sm:mt-2">
                          You won!
                        </label>

                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-[#b98459] bg-white px-3 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setShowModal(false)}
                    ref={cancelButtonRef}
                  >
                    Go back
                  </button>
                </div> */}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
