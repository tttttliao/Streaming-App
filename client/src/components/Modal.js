import React from 'react';
import ReactDOM from 'react-dom';
import history from '../history';
import './Modal.css';

const Modal = props => {
    return ReactDOM.createPortal(
        <div OnClick={props.onDismiss} className="modal-body">
            <div OnClick={(e) => e.stopPropagation()} className="modal-main">
                <div className="header">{props.title}</div>
                <div className="modal-text">{props.content}</div>
                {props.actions}
            </div>
        </div>,
        document.querySelector('#modal')
    );
};

export default Modal;