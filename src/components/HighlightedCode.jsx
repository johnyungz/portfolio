import React, { useEffect, useRef } from 'react';
import hljs from 'highlight.js';

const HighlightedCode = ({ language, code }) => {
  const codeRef = useRef();

  useEffect(() => {
    hljs.highlightBlock(codeRef.current);
  }, [code]);

  return (
    <pre className='h-64 overflow-auto'>
      <code ref={codeRef} className={language}>
        {code}
      </code>
    </pre>
  );
};

export default HighlightedCode
