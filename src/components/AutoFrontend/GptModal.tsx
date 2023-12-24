import React, { FC, useState, useEffect } from 'react';
import Modal from 'react-modal'

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

const GptModal: FC<ModalProps> = ({ isOpen, handleClose }) => {
    const [loggedIn, setLoggedIn] = useState(false);
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
        .then((data) => {
          setLoggedIn(data.loggedIn); // Use data.loggedIn instead of data['loggedIn']
        })
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
