import React from "react";
import "./Modal.css";

export default function Modal({ isOpen, onClose, content }) {
  if (!isOpen) return null;
  return (
    <div className="modal">
      <div className="modal-content">
      <button onClick={onClose} className="close">X</button>
        <div className="modal-body">{content}</div>
      </div>
    </div>
  );
}
