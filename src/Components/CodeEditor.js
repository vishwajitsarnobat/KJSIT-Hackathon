import React, { useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/clike/clike';  // Supports C++ like syntax

const CodeEditor = () => {
  const [code, setCode] = useState('// Write your C++ code here');

  const handleRunCode = () => {
    // Implement code execution logic here (call backend/API or display alert)
    console.log('Running Code:', code);
  };

  return (
    <div>
      <CodeMirror
        value={code}
        options={{
          mode: 'text/x-c++src',
          lineNumbers: true,
        }}
        onBeforeChange={(editor, data, value) => {
          setCode(value);
        }}
      />
      <button onClick={handleRunCode}>Run Code</button>
    </div>
  );
};

export default CodeEditor;
