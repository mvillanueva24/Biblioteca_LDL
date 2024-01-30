import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center">
      <div className="w-[500px] md:w-[600px] flex flex-col z-50">
        <button
          className="text-white text-xl md:text-2xl place-self-end"
          onClick={() => onClose()}
        >
          X
        </button>
        <div className="bg-white p-2 rounded">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
