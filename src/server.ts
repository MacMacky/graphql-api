import { ApolloServer, gql } from 'apollo-server'

const server = new ApolloServer({
  typeDefs: gql`
    type Query {
      name: String!
    }
  `,
  resolvers: {
    Query: {
      name: (): string => 'Mark'
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});