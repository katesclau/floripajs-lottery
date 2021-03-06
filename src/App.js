import { ApolloProvider } from "react-apollo";
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from "graphql-tag";
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import './App.css';
import CandidateForm from './CandidateForm'
import Result from './Result'

require('dotenv').config();

const auth = {};
auth[process.env.REACT_APP_API_SECRET_HEADER] = process.env.REACT_APP_API_SECRET

const link = createHttpLink({
  uri: process.env.REACT_APP_API_ENDPOINT,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      ...auth,
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div className="App">
            <header className="App-header">
                <Route path="/:id" component={Child} />
                <Route path="/join" component={CandidateForm} />
            </header>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

const Child = ({ match }) => (
  <div>
    { 
      match.params.id === "success" ? (
        <div>
          <p>
            Thank you! Please access <a href="https://calendly.com/x-team-community/ben-60-min" style={{ color: "white" }}>https://calendly.com/x-team-community/ben-60-min</a> to schedule a talk with Ben <span role="img" aria-label="love">😎</span>.
          </p>
          <img src="./ben.png" style={{ width: "30%" }} alt="This is Ben btw!" />
        </div>
      ) : ( match.params.id === "raffle" ? (
        <Result />
      ) : ( <Redirect to="/join"/> ))
    }
  </div>
);

export default App;
