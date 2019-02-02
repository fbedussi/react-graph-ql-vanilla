import React from 'react';

export const Reactions = ({ reactions }) => {
  return reactions.length ?
    <ul>
      {reactions.map((reaction) => <li key={reaction.node.id}>{reaction.node.content}</li>)}
    </ul>
    : null;
};
