import React from 'react';
import emojis from 'emojis';

export const Reactions = ({ reactions }) => {
  return reactions.length ?
    <ul>
      {reactions.map((reaction) => 
        <li key={reaction.node.id}>
          {emojis.unicode(`:${reaction.node.content.toLowerCase().replace('_', '')}:`)}
        </li>)}
    </ul>
    : null;
};
