import gql from 'graphql-tag';
import { Mutation } from "react-apollo";
import * as React from 'react';
import { Redirect } from 'react-router-dom'

const CREATE = gql`
  mutation createMe($me: candidate_insert_input!){
    insert_candidate(objects: [$me]){
      returning{
        ID
        email
        fullname
        github
      }
    }
  }
`;

const CandidateForm = () => {
  let me = {};
  return (
    <Mutation mutation={CREATE}>
      {(createCandidate, { loading, error, data }) => (
        <div className="container">
          <img src="./x-white.png" alt="X-Team logo white" style={{ width: "33%" }}/>
          <p>
            This is your chance to win an <a href="https://alura.com.br" style={{ color: "white" }}>alura.com.br</a> membership <span role="img" aria-label="love">😍</span>.
          </p>
          <form className="dark-matter"
            onSubmit={e => {
              e.preventDefault();
              me.email = me.email.value;
              me.fullname = me.fullname.value;
              me.github = me.github.value;
              console.log(me);

              createCandidate({ variables: { me }}).catch(e => {
                window.location.href = "/join";  
              });
              me = {};
              window.location.href = "/success";
            }}
          >
            <ul className="flex-outer">
              <li>
                <label for="email">Email</label>
                <input id="email" placeholder="thedude@lebowski.co.en"
                  ref={node => {
                    me.email = node;
                  }}
                />
              </li>
              <li>
                  <label for="name">Full name</label>
                  <input id="name" placeholder="Jeffrey The Dude Lebowski"
                  ref={node => {
                    me.fullname = node;
                  }}
                />
              </li>
              <li>
                <label for="github">Github</label>
                <input id="github" placeholder="https://github.com/thedude" 
                  ref={node => {
                    me.github = node;
                  }}
                />
              </li>
              <li>
                <button type="submit">Alura, here I come!</button>
              </li>
            </ul>
          </form>
        </div>
      )}
    </Mutation>
  );
};

export default CandidateForm;
