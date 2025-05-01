import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function CodeEditor({ code, setCode, readOnly }) {
  return readOnly ? (
    <SyntaxHighlighter language="python" style={atomDark}>
      {code}
    </SyntaxHighlighter>
  ) : (
    <textarea
      value={code}
      onChange={(e) => setCode(e.target.value)}
      className="code-editor"
    />
  );
}