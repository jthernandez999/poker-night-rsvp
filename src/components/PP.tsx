/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
//

type Props = {
  setShowModal: (showModal: boolean) => void;
  showModal: boolean;
};

export default function PP({ showModal, setShowModal }: Props) {
  const cancelButtonRef = useRef(null);
  const [projectName, setProjectName] = useState("");
  const [website, setWebsite] = useState("");
  const [twitter, setTwitter] = useState("");
  const [otherLinks, setOtherLinks] = useState("");
  const [whitelists, setWhitelists] = useState("");
  const [why, setWhy] = useState("");
  const [token, setToken] = useState("Yes");
  const [contact, setContact] = useState("");
  const [valid, setValid] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    //validated the form to ensure all have been filled out
    if (
      projectName &&
      website &&
      twitter &&
      otherLinks &&
      whitelists &&
      why &&
      token &&
      contact
    ) {
      //if all fields are filled out, enable the submit button
      setValid(true);
    } else 
    {
      setValid(false);
    }
  }, [projectName, website, twitter, otherLinks, whitelists, why, token, contact]);

  const submitForm = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    //if the form is valid, submit the form
    if (valid) {
      try {
        const response = await fetch('/api/partnership', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            projectName,
            website,
            twitter,
            otherLinks,
            whitelists,
            why,
            token,
            contact
          })
        });
        
        const result = await response.json();
        
        if (result.success) {
          setValidationMessage(result.message || "Form submitted successfully");
        } else {
          setValidationMessage(result.message || "Form submission failed");
        }
        
        setSubmitted(true);
      } catch (error) {
        console.error('Partnership submission error:', error);
        setValidationMessage("Form submission failed. Please try again.");
        setSubmitted(true);
      }
    }
  }

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

        <div className="fixed inset-0 z-[70] overflow-y-auto">
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
              <Dialog.Panel className="">
              <div className="w-full h-max sm:px-12 sm:pt-24  pt-20  relative z-10 flex justify-center items-center my-auto  ">
        <div className="md:min-h-[356px]  h-max w-full flex flex-col items-center justify-center md:pt- md:pb-12">
          <div className="relative flex h-max w-full justify-center ">
            <form className="rounded-lg w-full  md:w-full sm:min-w-[636px] max-w-max relative p-4 flex justify-center items-center">
              <div className="rbox" />
              { !submitted &&
              <div className="rbox2">
                <div className="h-8 md:h-16 text-2xl md:text-4xl flex justify-center font-myriad ">
                  <p className="text-transparent bg-clip-text bg-gradient-to-br from-[#ffdbbd] to-[#b77946]">
                    THE RIVER PARTNERSHIP PROGRAM
                  </p>
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-center w-full ">
                  <label className="flex sm:w-[556px]  text-transparent bg-clip-text bg-gradient-to-br from-[#ffe6d2] to-[#b98459]  font-medium  mb-2">
                    Project Name:
                  </label>
                  <div className="relative flex w-full text-base mb-2 h-">
                    <div className="ibox2">
                      <input
                        className="outline-none placeholder:text-[#ffd3b17c] bg-transparent text-[#ffe6d2]   p-2 px-3 w-full"
                        type="text"
                        placeholder="Project Name"
                        value={projectName}
                        onChange={(e) => {
                          setProjectName(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-center w-full ">
                  <label className="flex sm:w-[556px]  text-transparent bg-clip-text bg-gradient-to-br from-[#ffe6d2] to-[#b98459]  font-medium mb-2 ">
                    Link to Website:
                  </label>
                  <div className="relative flex w-full text-base mb-2 h-">
                    <div className="ibox" />
                    <div className="ibox2">
                      <input
                        className="outline-none placeholder:text-[#ffd3b17c] bg-transparent rounded-[56deg] text-[#ffe6d2]   p-2 px-3 w-full"
                        type="text"
                        value={website}
                        onChange={(e) => {
                          setWebsite(e.target.value);
                        }}
                        placeholder="Link to Website"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-center w-full ">
                  <label className="flex sm:w-[556px]  text-transparent bg-clip-text bg-gradient-to-br from-[#ffe6d2] to-[#b98459]  font-medium mb-2 ">
                    Link to Twitter:
                  </label>
                  <div className="relative flex w-full text-base mb-2 h-">
                    <div className="ibox" />
                    <div className="ibox2">
                      <input
                        className="outline-none placeholder:text-[#ffd3b17c] bg-transparent rounded-[56deg] text-[#ffe6d2]   p-2 px-3 w-full"
                        type="text"
                        value={twitter}
                        onChange={(e) => {
                          setTwitter(e.target.value);
                        }}
                        placeholder="Link to Twitter"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-center w-full ">
                  <label className="flex sm:w-[556px]  text-transparent bg-clip-text bg-gradient-to-br from-[#ffe6d2] to-[#b98459]  font-medium mb-2 ">
                    Other relevant links:
                  </label>
                  <div className="relative flex w-full text-base mb-2 h-">
                    <div className="ibox" />
                    <div className="ibox2">
                      <input
                        className="outline-none placeholder:text-[#ffd3b17c] bg-transparent rounded-[56deg] text-[#ffe6d2]   p-2 px-3 w-full"
                        type="text"
                        value={otherLinks}
                        onChange={(e) => {
                          setOtherLinks(e.target.value);
                        }}
                        placeholder="Other relevant links"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-center w-full ">
                  <label className="flex sm:w-[556px]  text-transparent bg-clip-text bg-gradient-to-br from-[#ffe6d2] to-[#b98459]  font-medium mb-2 ">
                    How many whitelists are you requesting?
                  </label>
                  <div className="relative flex w-full text-base mb-2 h-">
                    <div className="ibox" />
                    <div className="ibox2">
                      <input
                        className="outline-none placeholder:text-[#ffd3b17c] bg-transparent rounded-[56deg] text-[#ffe6d2]   p-2 px-3 w-full"
                        type="text"
                        value={whitelists}
                        onChange={(e) => {
                          setWhitelists(e.target.value);
                        }}
                        placeholder="How many whitelists are you requesting?"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-center w-full ">
                  <label className="flex sm:w-[556px]  text-transparent bg-clip-text bg-gradient-to-br from-[#ffe6d2] to-[#b98459]  font-medium mb-2 ">
                    Why should we choose your project?
                  </label>
                  <div className="relative flex w-full text-base mb-2 h-">
                    <div className="ibox" />
                    <div className="ibox2">
                      <textarea
                        className="outline-none placeholder:text-[#ffd3b17c] bg-transparent rounded-[56deg] text-[#ffe6d2]   p-2 px-3 w-full max-h-[156px] min-h-[42px]"
                        value={why}
                        onChange={(e) => {
                          setWhy(e.target.value);
                        }}
                        placeholder="Why should we choose your project?"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-center w-full ">
                  <label className="flex sm:w-[556px]  text-transparent bg-clip-text bg-gradient-to-br from-[#ffe6d2] to-[#b98459]  font-medium mb-2 ">
                    Does your project have their own token?
                  </label>
                  <div className="relative flex w-full text-base mb-2 h-">
                    <div className="ibox" />
                    <div className="ibox2">
                      <select
                        className="outline-none placeholder:text-[#ffd3b17c] bg-transparent rounded-[56deg] text-[#ffe6d2]   p-2 px-3  w-[98%] mr-2"
                        onChange={(e) => {
                          setToken(e.target.value);
                        }}
                      >
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-center w-full ">
                  <label className="flex sm:w-[556px]  text-transparent bg-clip-text bg-gradient-to-br from-[#ffe6d2] to-[#b98459]  font-medium mb-2 ">
                    Contact preference:
                  </label>
                  <div className="relative flex w-full text-base mb-2 h-">
                    <div className="ibox" />
                    <div className="ibox2">
                      <input
                        className=" p-2 px-3 outline-none placeholder:text-[#ffd3b17c] bg-transparent rounded-[56deg] text-[#ffe6d2]   w-full"
                        type="text"
                        value={contact}
                        onChange={(e) => {
                          setContact(e.target.value);
                        }}
                        placeholder="Contact preference"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex text-center items-center justify-center w-full text-transparent bg-clip-text bg-gradient-to-br from-[#ffe6d2] to-[#b98459]  font-medium my-2 ">
                  To confirm application, please DM us on twitter from your
                  project&apos;s official account on submission.
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-center">
                  <div className="flex flex-col items-center justify-center w-full pt-3 relative">
                    {!valid && (
                      <div className="absolute  w-full h-full z-10 left-0 rounded-sm"></div>
                    )}
                    <div className={` ${!valid && 'opacity-50'}`}>
                      <button className="golden-btn2" onClick={(e)=>{submitForm(e)}}>Submit</button>
                    </div>
                    {validationMessage && (
                      <div className="text-red-800 text-sm text-center">
                        {validationMessage}
                      </div>
                    )}
                  </div>
                </div>
              </div>}
              {submitted &&
              <div className="rbox2">
              <div className="flex flex-col items-center justify-center w-full pt-3 text-center relative min-h-[256px]">
                <div className="text-transparent bg-clip-text bg-gradient-to-br from-[#ffe6d2] to-[#b98459]  font-medium my-2 ">
                  Thank you for your application. <br/>
                   We will get back to you soon.
                  </div>
                  </div></div>
                  }
            </form>
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
