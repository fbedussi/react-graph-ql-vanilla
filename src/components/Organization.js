import React from 'react';
import { Repository } from './Repository';

export const Organization = ({ organization, onFetchMoreIssues }) => (<div>
  <strong>Issues from organization: </strong>
  <a href={organization.url} target="_blank" rel="noopener noreferrer">{organization.name}</a>
  <Repository repository={organization.repository} onFetchMoreIssues={onFetchMoreIssues}/>
</div>);
