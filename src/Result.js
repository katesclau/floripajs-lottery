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

      if (winner){
        return (
          <div>
            <img src="./x-white.png" alt="X-Team logo white" style={{ width: "33%" }}/>
              <h1>
                Congratulations {winner.fullname}! <span role="img" aria-label="huray!">🙌</span>
              </h1>
          </div>
        );
      }
      return <img src="./waiting.gif" style={{}} />    
    }}
  </Query>
);

export default Result;
