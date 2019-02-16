import * as React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";

const Result = () => (
  <Query
    query={gql`
      query getCandidates{
        candidate{
          ID
          email
          github
          fullname
        }
      }    
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      
      console.log(data);
      const candidates = data.candidate;
      console.log(candidates);

      const winner = candidates[Math.floor(Math.random() * candidates.length)];
      console.log(winner);

      return <div>Congratulations {winner.fullname}! <span role="img" aria-label="huray!">🙌</span></div>;
    }}
  </Query>
);

export default Result;
