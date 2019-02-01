import React, { Component } from 'react';
import './App.css';

import { Organization } from './components/Organization';


const GET_ISSUES_OF_REPO = `
{
  organization(login: "the-road-to-learn-react") {
    name
    url
    repository(name: "the-road-to-learn-react") {
      name
      url
      issues(last:5) {
        edges {
          node {
            id
            title
            url
          }
        }
      }
    }
  }
}`;

class App extends Component {
  state = {
    path: 'the-road-to-learn-react/the-road-to-learn-react/',
    organization: null,
    errors: null,
  }

  componentDidMount() {
    this.onFetchFromGithub();
  }

  onChange = event => {
    this.setState({ path: event.target.value });
  }

  onSubmit = event => {
    event.preventDefault();
  }

  onFetchFromGithub() {
    fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          Authorization: `bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({ query: GET_ISSUES_OF_REPO })
      })
      .then((response) => response.json())
      .then(({ data }) => {
        this.setState({
          organization: data.organization,
          errors: data.errors,
        })
      })
      .catch((err) => console.error(err));
  }
  render() {
    const { path, organization, errors } = this.state;

    return (
      <div className="App">
        <h1>React GraphQl - Github Client</h1>

        <form onSubmit={this.onSubmit}>
          <label htmlFor="url">
            Show open issues for https://github.com
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
          <Organization organization={organization} />
          : <div>No information yet...</div>
        }
      </div>
    );
  }
}

export default App;
