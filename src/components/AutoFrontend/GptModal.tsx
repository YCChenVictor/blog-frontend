import React, { FC, useState, useEffect } from 'react';
import Modal from 'react-modal'
import ModalProps from '../Interfaces/Modal.tsx'
import superFetch from '../../utils/apiUtils.ts'; 

const GptModal: FC<ModalProps> = ({ isOpen, isLoggedIn, handleClose }) => {
  const [request, setRequest] = useState('')

  const handleRequestChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRequest(event.target.value);
  };

  const handleSendRequest = async () => {
    await superFetch('your-post-endpoint', {
      method: 'POST',
      headers: { "Authorization": `Bearer ${localStorage['blog logged in']}` },
      body: '', // This may be wrong
    });
  };

  return (
    <div>
      {isLoggedIn && (
        <div>
          <Modal isOpen={isOpen} onRequestClose={handleClose}>
            <textarea
              placeholder="Request GPT for component"
              value={request}
              onChange={handleRequestChange}
            />
            <button onClick={handleSendRequest}>Send Request</button>
          </Modal>
        </div>
      )}
    </div>
  );
};
  
export default GptModal;
