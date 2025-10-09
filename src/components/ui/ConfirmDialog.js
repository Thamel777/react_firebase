import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  loading = false,
  onConfirm,
  onClose,
}) {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center px-4 py-8">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="glass-card w-full max-w-md p-8 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-danger/10 text-danger">
                  <ExclamationTriangleIcon className="h-7 w-7" aria-hidden="true" />
                </div>
                <Dialog.Title className="mt-6 text-xl font-semibold text-slate-900 dark:text-slate-100">
                  {title}
                </Dialog.Title>
                {description ? (
                  <Dialog.Description className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                    {description}
                  </Dialog.Description>
                ) : null}

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <button
                    type="button"
                    className={`btn-danger sm:min-w-[7.5rem] ${loading ? 'pointer-events-none opacity-80' : ''}`}
                    onClick={onConfirm}
                    disabled={loading}
                  >
                    {confirmLabel}
                  </button>
                  <button
                    type="button"
                    className={`btn-navigate sm:min-w-[7.5rem] ${loading ? 'pointer-events-none opacity-70' : ''}`}
                    onClick={onClose}
                    disabled={loading}
                  >
                    {cancelLabel}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default ConfirmDialog;
