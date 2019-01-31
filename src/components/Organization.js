import React from 'react';
import { Repository } from './Repository';

export const Organization = ({ organization }) => (<div>
  <strong>Issues from organization:</strong>
  <a href={organization.url} target="_blank">{organization.name}</a>
  <Repository repository={organization.repository} />
</div>);
