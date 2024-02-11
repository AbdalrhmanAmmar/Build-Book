import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactNode } from "react";
import Button from "../UI_Shared/Button";
import { IoCloseCircleOutline } from "react-icons/io5";

interface Iprops {
  MoreInfo: boolean;
  closeModal: () => void;
  children: ReactNode;
}
function MoreInfodata({ closeModal, MoreInfo, children }: Iprops) {
  return (
    <div>
      <div>
        <Transition appear show={MoreInfo} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className=" transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900 flex items-center justify-between gap-4 "
                    >
                      <h2 className="text-indigo-500 text-2xl">
                        Your Book
                      </h2>
                      <Button Color="Close" onClick={closeModal}>
                        <IoCloseCircleOutline size={35} />
                      </Button>
                    </Dialog.Title>
                    <div className="mt-4">{children}</div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </div>
  );
}

export default MoreInfodata;
