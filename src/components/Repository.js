import React from 'react';
import { Reactions } from './Reactions';

export const Repository = ({ repository, onFetchMoreIssues, onToggleRepoStar }) => {
  const inputId = `start_${repository.id}`;  
  
  return (<div>
  <p>
    <strong>In repository: </strong>
    <a href={repository.url} target="_blank" rel="noopener noreferrer">{repository.name}</a>
    <span> | </span>
    <span>Stars: {repository.stargazers.totalCount}</span>
    <span> | </span>    
    <input 
      type="checkbox" 
      id={inputId} 
      checked={repository.viewerHasStarred} 
      onChange={() => onToggleRepoStar(repository.id, repository.viewerHasStarred)}
    />
    <label htmlFor={inputId}>Star</label> 
  </p>
  <ul>
    {repository.issues.edges.map((issue) => {
    return <li key={issue.node.id}>
      <a href={issue.node.url} target="_blank" rel="noopener noreferrer">{issue.node.title}</a>
      <Reactions reactions={issue.node.reactions.edges} />
    </li>})}
  </ul>
  {repository.issues.pageInfo.hasNextPage ?
    <button type="button" onClick={onFetchMoreIssues}>More</button>
    : null}
</div>)
};


