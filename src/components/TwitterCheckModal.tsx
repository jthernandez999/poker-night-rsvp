/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

type Props = {
  setShowModal: (showModal: boolean) => void;
  showModal: boolean;
  walletAddy: string;
  setWalletAddy: (walletAddy: string) => void;
  handleCheck: () => void;
  checking: boolean;
  myRef: React.RefObject<HTMLAudioElement | null>;
};

export default function PokerRegistrationModal({
  checking,
  showModal,
  setShowModal,
  walletAddy: _walletAddy,
  setWalletAddy,
  handleCheck,
  myRef,
}: Props) {
  const cancelButtonRef = useRef(null);
  const [_isVisible, _setIsVisible] = useState(false);
  const [volume, setVolume] = useState(myRef?.current?.volume || 0.5);
  const [playerName, setPlayerName] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (playerName.trim()) {
      setWalletAddy(playerName); // Reuse existing prop for player name
      handleCheck();
    }
  };

  const handleVolumeChange = () => {
    if (!myRef.current) return;
    
    if (volume === 0) {
      setVolume(1);
      myRef.current.volume = 1;
    } else if (volume === 0.3) {
      setVolume(0);
      myRef.current.volume = 0;
    } else if (volume === 1) {
      setVolume(0.3);
      myRef.current.volume = 0.3;
    }
  };

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
          <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
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
              <Dialog.Panel className="relative transform overflow-hidden bg-gradient-to-br from-green-900 to-green-800 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 border border-yellow-500/20">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500">
                    <svg
                      className="h-6 w-6 text-black"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.228a25.118 25.118 0 012.16-.470m-2.16.47a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-white"
                    >
                      Join the Poker Game
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-yellow-200">
                        Enter your player name to join the poker night!
                      </p>
                    </div>
                  </div>
                </div>
                <form onSubmit={handleSubmit} className="mt-5 sm:mt-6">
                  <div className="mb-4">
                    <label
                      htmlFor="playerName"
                      className="block text-sm font-medium text-yellow-200 mb-2"
                    >
                      Player Name
                    </label>
                    <input
                      type="text"
                      id="playerName"
                      value={playerName}
                      onChange={(e) => setPlayerName(e.target.value)}
                      className="w-full px-3 py-2 bg-black/50 border border-yellow-500/20 text-white placeholder-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="Enter your poker name..."
                      required
                    />
                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button
                      type="submit"
                      disabled={checking || !playerName.trim()}
                      className="inline-flex w-full justify-center golden-btn2 text-base font-medium shadow-sm disabled:opacity-50 sm:col-start-2 sm:text-sm"
                    >
                      {checking ? "Joining..." : "Join Game"}
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center border border-yellow-500/20 bg-black/50 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-black/70 sm:col-start-1 sm:mt-0 sm:text-sm"
                      onClick={() => setShowModal(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
                
                {/* Volume Control */}
                <div className="absolute top-4 right-4">
                  <button
                    onClick={handleVolumeChange}
                    className="text-yellow-400 hover:text-yellow-300"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.383 3.076A1 1 0 0111 4v12a1 1 0 01-1.617.924L6.707 15H4a1 1 0 01-1-1V6a1 1 0 011-1h2.707l2.676-1.924z"/>
                      {volume > 0 && (
                        <path d="M14 8a2 2 0 012 2v0a2 2 0 01-2 2"/>
                      )}
                      {volume > 0.5 && (
                        <path d="M16 6a4 4 0 014 4v0a4 4 0 01-4 4"/>
                      )}
                    </svg>
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
