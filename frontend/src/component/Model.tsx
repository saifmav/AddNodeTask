import React from "react";
import "../styles/Model.css"
import Button from "./Button";

export const Modal = ({ onClose, show, children }: any) => {
  if (!show) {
    return null;
  }
  return (
    <div className="modal">
      <div className="content">
        <div className="header">
            <h4>Document view</h4>
            <Button label="X" color={'#ef4444'} onClick={onClose} styles={{width: 40, padding: 0}} />
        </div>
        {children}
      </div>
    </div>
  );
};