import React, { FC, useState, useEffect } from 'react';
import Modal from 'react-modal'
import ModalProps from '../Interfaces/Modal.tsx'

const GptModal: FC<ModalProps> = ({ isOpen, isLoggedIn, handleClose }) => {
  return (
    <div>
      {isLoggedIn && (
        <div>
          <Modal
            isOpen={isOpen}
            onRequestClose={handleClose}
          >
             <textarea
              placeholder="Request GPT for component"
            />
          </Modal>
        </div>
      )}
    </div>
  );
};
  
export default GptModal;
