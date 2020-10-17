import { ApolloServer } from 'apollo-server'
import typeDefs from './schema'
import resolvers from './resolvers'

export default async () => {
  return new ApolloServer({
    typeDefs,
    resolvers: await resolvers
  })
}

