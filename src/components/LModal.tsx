/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useLanguage } from "../contexts/LanguageContext";

type Props = {
  setShowModal: (showModal: boolean) => void;
  showModal: boolean;
};

export default function LModal({ showModal, setShowModal }: Props) {
  const { t } = useLanguage();
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-[#0A0B0F] px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl sm:p-6 md:p-8 border-4 border-red-500">
                <div className="relative z-10 text-center">
                  <div className="mx-auto flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-red-100 mb-6">
                    <span className="text-3xl md:text-4xl">😔</span>
                  </div>
                  
                  <Dialog.Title
                    as="h3"
                    className="text-3xl md:text-4xl lg:text-5xl font-bold leading-6 text-red-400 mb-6"
                  >
                    {t('betterLuckNextTime')}
                  </Dialog.Title>
                  
                  <div className="mb-8">
                    <p className="text-xl md:text-2xl lg:text-3xl text-white mb-4">
                      {t('houseWins')}
                    </p>
                    <p className="text-red-300 text-lg md:text-xl lg:text-2xl">
                      {t('fortuneNotInFavor')}
                    </p>
                    <p className="text-yellow-300 text-base md:text-lg lg:text-xl mt-4">
                      {t('nightIsYoung')}
                    </p>
                  </div>
                  

                </div>
                
                <div className="relative z-10 mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-6 py-4 md:px-8 md:py-5 text-lg md:text-xl lg:text-2xl font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition-colors duration-200"
                    onClick={() => setShowModal(false)}
                    ref={cancelButtonRef}
                  >
                    {t('tryAgain')}
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
