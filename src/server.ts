import './modules'
import { ApolloServer } from 'apollo-server'
import typeDefs from './schema'
import resolvers from './resolvers'
import utils from './utils'

export default async () => {
  return new ApolloServer({
    typeDefs,
    resolvers: await resolvers,
    context() {
      return {
        utils
      }
    }
  })
}

