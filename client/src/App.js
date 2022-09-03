import Header from './Components/Header.jsx';
import Clients from './Components/Clients.jsx';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import AddClientModal from './Components/AddClientModal.jsx';

const cache = new InMemoryCache({
  typePolicies: { 
    Query: {
      fields: { 
        clients: {
          merge(existing, incoming) {
            return incoming
          }
        },
        projects: {
          merge(existing, incoming) {
            return incoming
          }
        }
      }
    }
  }
})


const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache
})

function App() {

  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <div className="container">
          <Clients />
          <AddClientModal />
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
