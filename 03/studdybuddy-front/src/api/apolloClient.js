import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: `https://graphql.datocms.com/`,
});

const DATO_TOKEN = `637c0f02361ac0d8fc533a1bacb2eb`;

//setContext przyjmuje dwa parametry przy czym tutaj korzystam z jednego - stąd podkreślnik kßóry pomija pierwszy parametr
// drugim parametrem są dane które apollo przekazuje, m.in headery
const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            Authorization: `Bearer ${DATO_TOKEN}`
        }
    }
});

export const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
})