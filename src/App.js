import React, { Component } from 'react';
import './App.css';

import { Organization } from './components/Organization';
import { GET_ISSUES_OF_REPO } from './GET_ISSUES_OF_REPO';

function resolveIssuesQuery(result, cursor) {
  return function(state) {
    const { data, errors } = result;

    if (!cursor) {
      return {
        organization: data.organization,
        errors: errors,
      };
    }

    const { edges: oldIssues } = state.organization.repository.issues;
    const { edges: newIssues } = data.organization.repository.issues;
    const updatedIssues = oldIssues.concat(newIssues);

    return {
      organization: {
        ...data.organization,
        repository: {
          ...data.organization.repository,
          issues: {
            ...data.organization.repository.issues,
            edges: updatedIssues,
          },
        },
      },
      errors,
    }
  }
}


class App extends Component {
  state = {
    path: 'the-road-to-learn-react/the-road-to-learn-react/',
    organization: null,
    errors: null,
  }

  componentDidMount() {
    this.onFetchFromGithub(this.state.path);
  }

  onChange = (event) => {
    this.setState({ path: event.target.value });
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.onFetchFromGithub(this.state.path);
  }

  onFetchMoreIssues = () => {
    const { endCursor } = this.state.organization.repository.issues.pageInfo;

    this.onFetchFromGithub(this.state.path, endCursor);
  }

  onFetchFromGithub = (path, cursor) => {
    const [organization, repo] = path.split('/');
    const endpoint = 'https://api.github.com/graphql';
    const options = {
      method: 'POST',
      headers: {
        Authorization: `bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        query: GET_ISSUES_OF_REPO,
        variables: { organization, repo, cursor },
      })
    };

    fetch(endpoint, options)
      .then((response) => response.json())
      .then((result) => this.setState(resolveIssuesQuery(result, cursor)))
      .catch((err) => console.error(err));
  }

  render() {
    const { path, organization, errors } = this.state;

    return (
      <div className="App">
        <h1>React GraphQl - Github Client</h1>

        <form onSubmit={this.onSubmit}>
          <label htmlFor="url">
            Show open issues for https://github.com &nbsp;
          </label>
          <input
            id="url"
            type="text"
            onChange={this.onChange}
            value={path}
          />
          <button>Search</button>
        </form>
        <hr />
        {errors ?
          <div>Something went wrong: {errors.map((error) => error.message).join('')}</div>
          : null
        }
        {organization ?
          <Organization organization={organization} onFetchMoreIssues={this.onFetchMoreIssues} />
          : <div>No information yet...</div>
        }
      </div>
    );
  }
}

export default App;
