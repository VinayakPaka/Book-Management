
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { setContext } from '@apollo/client/link/context';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';

import App from './App';
import './index.css';

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

const AuthorizedApolloProvider = ({ children }: { children: React.ReactNode }) => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const httpLink = createHttpLink({
    uri: 'http://localhost:3000/graphql',
  });

  const authLink = setContext(async (_, { headers }) => {
    let token = '';
    if (isAuthenticated) {
      try {
        token = await getAccessTokenSilently({
          authorizationParams: {
            audience: audience,
          }
        });
      } catch (e) {
        console.error("Error getting token", e);
      }
    }

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: audience,
      }}
    >
      <AuthorizedApolloProvider>
        <ChakraProvider value={defaultSystem}>
          <App />
        </ChakraProvider>
      </AuthorizedApolloProvider>
    </Auth0Provider>
  </React.StrictMode>,
);
