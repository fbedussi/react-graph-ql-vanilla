export const GET_ISSUES_OF_REPO = `
query ($organization: String!, $repo: String!, $cursor: String) {
  organization(login: $organization) {
    name
    url
    repository(name: $repo) {
      name
      url
      issues(first:5, after:$cursor, states:[OPEN]) {
        edges {
          node {
            id
            title
            url
            reactions(last: 3) {
              edges {
                node {
                  id
                  content
                }
              }
            }
          }
        }
        totalCount
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
}`;
