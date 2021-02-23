import './modules'
import { ApolloServer, PubSub } from 'apollo-server'
import typeDefs from './schema'
import resolvers from './resolvers'
import utils from './utils'

const pubSub = new PubSub()

export default async (testConfig:
  { mockEntireSchema?: boolean, mocks?: any } = {
    mockEntireSchema: false
  }) => {
  return new ApolloServer({
    typeDefs,
    resolvers: await resolvers,
    ...testConfig,
    formatError(error) {
      return {
        message: error.message,
        extensions: error.extensions
      }
    },
    context({ connection }) {
      if (connection) {
        return { ...connection.context, pubSub }
      }
      console.log('123')
      return {
        utils,
        pubSub
      }
    }
  })
}

