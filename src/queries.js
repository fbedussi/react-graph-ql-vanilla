export const GET_ISSUES_OF_REPO = `
query ($organization: String!, $repo: String!, $cursor: String) {
  organization(login: $organization) {
    name
    url
    repository(name: $repo) {
      id
      name
      url
      viewerHasStarred
      stargazers {
        totalCount
      }
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

const toggleStarFragment = `
fragment toggleStarFragment on Starrable { 
  viewerHasStarred 
  stargazers {
    totalCount
  }
}`;


export const ADD_STAR = `
  mutation ($repositoryId: ID!) { 
    addStar(input:{starrableId:$repositoryId}) { 
      starrable {
        ...toggleStarFragment
      }
    } 
  }
  ${toggleStarFragment} 
`;

export const REMOVE_STAR = `
  mutation ($repositoryId: ID!) { 
    removeStar(input:{starrableId:$repositoryId}) { 
      starrable {
        ...toggleStarFragment
      } 
    } 
  } 
  ${toggleStarFragment} 
`;

