import React, { useEffect } from 'react';
import { RxCross2 } from "react-icons/rx";

const Modal = ({ header, content, onSave, onClose, isOpen, okText = "Save", cancelText = "Cancel" }) => {
    return (
        <div>
            {/* Modal */}
            <div className={`modal fade ${isOpen ? 'show' : ''}`} style={{ display: isOpen ? 'block' : 'none', backgroundColor: "rgba(0, 0, 0, 0.5)" }} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden={!isOpen}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">{header ?? ""}</h5>
                            <RxCross2 className='cursor-pointer' onClick={onClose} />
                        </div>
                        <div className="modal-body">
                            {content}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>{cancelText}</button>
                            <button onClick={onSave} type="button" className="btn btn-primary">{okText}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
