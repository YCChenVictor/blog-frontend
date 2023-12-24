import React, { useEffect, useState } from 'react'
import ImageUpload from './ImageUpload'
import RenderOneComponent from './RenderOneComponent'
import GptModal from './GptModal.tsx';

const RenderFrontend = () => {
  // Because GPT cannot read image, the ImageUpload wont work now
  // I will try to render a component posted by GPT first

  const [isModalOpen, setModalOpen] = useState(false);
  const [position, setPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
  const [loggedIn, setLoggedIn] = useState(false); // Add this line

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setModalOpen(true);
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div onContextMenu={handleRightClick}>
      <h1>Your Content Goes Here</h1>
      <GptModal isOpen={isModalOpen} handleClose={handleCloseModal}>
        <p>Modal Content</p>
      </GptModal>
      <div className="px-4" id="gpt">
        {loggedIn ? (
          <button
            className="text-white transition"
            onClick={() => setModalOpen(true)} // Pass the function instead of invoking it
          >
            GPT
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default RenderFrontend
