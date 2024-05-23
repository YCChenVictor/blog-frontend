import React, { FC, useEffect, useState } from 'react';
import GptModal from './GptModal';
import StandardRender from '../Interfaces/StandardRender';

const RenderFrontend: FC<StandardRender> = ({ isLoggedIn }) => {
  // Because GPT cannot read image, the ImageUpload wont work now
  // I will try to render a component posted by GPT first

  const [isModalOpen, setModalOpen] = useState(false);
  // const [position, setPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setModalOpen(true);
    // setPosition({ x: e.clientX, y: e.clientY });
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen p-8 m-4" onContextMenu={handleRightClick}>
      {isLoggedIn && (
        <div>
          <h1>Your Content Goes Here</h1>
          <GptModal
            isOpen={isModalOpen}
            isLoggedIn={isLoggedIn}
            handleClose={handleCloseModal}
          >
            <p>Modal Content</p>
          </GptModal>
        </div>
      )}
    </div>
  );
};

export default RenderFrontend;
