"use client"
import { useEffect, useRef } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({isOpen, onClose, children}) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if(e.key === 'Escape') {
                onClose();
            }
        }
        if(isOpen) {
            window.addEventListener('keydown', handleEscape);
        }
        return () => {
            window.removeEventListener('keydown', handleEscape)
        }
    }, [isOpen, onClose])
    if (!isOpen) return null;

    return(
        <div
        className="fixed inset-0 flex items-center justify-center backdrop-blur-sm "
        // onClick={handleBackdropClick}
      >
        <div
          ref={modalRef}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg max-w-md w-full relative"
        >
          <button
            onClick={onClose}
            className="absolute text-2xl top-4 right-6 text-gray-500 hover:text-gray-700 transition"
          >
            &times;
          </button>
          <div className="flex flex-col">{children}</div>
        </div>
      </div>
    )
}

export default Modal;