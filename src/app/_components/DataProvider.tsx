'use client'

import React, { createContext, useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const DataContext = createContext({ search: '', setSearch: (search: string) => {} });

const client = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache(),
});

export default function DataProvider({ children }: { children: React.ReactNode }) {
  const [search, setSearch] = useState('');
  return (
    <DataContext.Provider value={{ search, setSearch }}>
      <ApolloProvider client={client}>
        {children}
      </ApolloProvider>
    </DataContext.Provider>
  );
}

export const useData = () => {
  const context = React.useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
