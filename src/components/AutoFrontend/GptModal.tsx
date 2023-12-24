import React, { FC, useState, useEffect } from 'react';
import Modal from 'react-modal'
import ModalProps from '../Interfaces/Modal.tsx'

const GptModal: FC<ModalProps> = ({ isOpen, isLoggedIn, handleClose }) => {
    const [previewArticle, setPreviewArticle] = useState('');
  
    useEffect(() => {
      const token = localStorage['blog logged in'];
      fetch(`${process.env.REACT_APP_ENDPOINT_DEV}/gpt-init`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
    }, []);
  
    return (
      <Modal
        isOpen={isOpen} // Use isOpen directly
        onRequestClose={handleClose}
        className="p-4"
        appElement={document.getElementById('root')}
      >
        {/* ... (unchanged code) */}
      </Modal>
    );
  };
  
export default GptModal;
