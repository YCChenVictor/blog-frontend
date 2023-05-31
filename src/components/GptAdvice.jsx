import React, { useState, useEffect } from "react";
import {diffLines, formatLines} from 'unidiff';
import {parseDiff, Diff, Hunk} from 'react-diff-view';
import Modal from "react-modal";

function GptAdvice() {
  const [modalOpen, setModalOpen] = useState(false);
  const oldText = '[\n' +  // going to useState
    '    {\n' +
    '        "age": "22",\n' +
    '        "name": "Niroj"\n' +
    '    },\n' +
    '    {\n' +
    '        "age": "20",\n' +
    '        "name": "Dey"\n' +
    '    }\n' +
    ']\n';
  const newText = '[\n' +
    '    {\n' +
    '        "age": "22",\n' +
    '        "name": "Niroj"\n' +
    '    },\n' +
    '    {\n' +
    '        "age": "20",\n' +
    '        "name": "Dey1"\n' +
    '    }\n' +
    ']\n';

  const diffText = formatLines(diffLines(oldText, newText), {context: 3});
  const [diff] = parseDiff(diffText, {nearbySequences: 'zip'});

  return (
    <div id="gptAdvice">
      <button onClick={setModalOpen}>GPT Advice</button>
      <Modal
        isOpen={Boolean(modalOpen)}
        onRequestClose={() => setModalOpen(false)}
        // style={customStyles} (going to research the best practice to do style)
      >
        <h1>Advice</h1>

        <div>
          <main>
            <Diff viewType="split" diffType='' hunks={diff.hunks}>
              {hunks =>
                hunks.map(hunk => (
                  <Hunk key={hunk.content} hunk={hunk} />
                ))
              }
            </Diff>
          </main>
        </div>

        <button onClick={() => setModalOpen(false)}>Close Modal</button>
      </Modal>
    </div>
  );
}

export default GptAdvice;