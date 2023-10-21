import React from 'react';

const ParsedContent = ({ content }) => {
  const lines = content.split('\n');
  const renderedLines = [];

  for (let line of lines) {
    if (line.startsWith('**') && line.endsWith('**')) {
      renderedLines.push(<h5>{line.substring(2, line.length - 2)}</h5>);
    } else {
      renderedLines.push(<p>{line}</p>);
    }
  }

  return (
    <div>
      {renderedLines.map((line, index) => (
        <React.Fragment key={index}>{line}</React.Fragment>
      ))}
    </div>
  );
};


export default ParsedContent