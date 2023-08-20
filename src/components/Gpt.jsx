import React, { useState, useEffect } from "react"
import {diffLines, formatLines} from 'unidiff'
import {parseDiff, Diff, Hunk} from 'react-diff-view'
import Modal from "react-modal"

function Gpt() {
  const [modalOpen, setModalOpen] = useState(false)
  const [createRequest, setCreateRequest] = useState('Please help create an article about topic:')
  const handleInputChange = (e) => {
    setCreateRequest(e.target.value)
  }

  return (
    <div className="px-4" id="gpt">
      <button
        className="text-white transition"
        onClick={setModalOpen}
      >
        GPT
      </button>
      <Modal
        isOpen={Boolean(modalOpen)}
        onRequestClose={() => setModalOpen(false)}
        className="p-4"
        appElement={document.getElementById('root')}
      >
        <div className="modal-content">
          <h3>Create an article</h3>
          <textarea
            value={createRequest}
            onChange={(e) => handleInputChange(e)}
            rows={4}
            cols={50}
          />
      
          <div className="flex mt-4">
            <button
              className="mr-2 text-white bg-gray-500 px-4 py-2 rounded hover:bg-gray-700 transition"
              onClick={() => setModalOpen(false)}
            >
              Close
            </button>
            <button
              className="text-white bg-gray-500 px-4 py-2 rounded hover:bg-gray-700 transition"
              onClick={() => setModalOpen(false)}
            >
              Send
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Gpt;