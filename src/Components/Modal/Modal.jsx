import React  from 'react';
import MD from '../Modal/Modal.module.css';


const Modal = (props) => {
    const { children, visible, closeModal,} = props;

    function handleClick(event) {
        // close modal
        if (event.target === event.currentTarget) {
            closeModal();
        }
    }

    const modal = (
        <div className={MD.modal} onClick={handleClick}>
            {children}
        </div>
    );

    return <div>{visible && modal}</div>;
};

export default React.memo(Modal);