'use client';

import React from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider, gql ,useQuery } from '@apollo/client';
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import HomePage from './Home/page';

// SETTING THE APPOLO CLINET FOR GRAPH QL

const client = new ApolloClient({
  uri: 'http://localhost:3000/api/graphql',
  cache: new InMemoryCache(),
  onError: (error:any) => {
    console.log('Apollo Client error:', error);
  },
});

 // ADDS THE MESSAGES ONLY IN DEVELOPMENT ENVIRONMENT

if (process.env.NODE_ENV !== "production") { 
  loadDevMessages();
  loadErrorMessages();
}


export default function App() {

  return (
    <ApolloProvider client={client}>
      <HomePage/>
    </ApolloProvider>
  )
}
