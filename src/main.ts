import createServer from './server'

const start = async () => {
  try {
    const server = await createServer()
    const { url } = await server.listen();
    console.log(`GraphQL Server listening at: ${url}`)
  } catch (e) {
    console.log(e);
    process.exit(1)
  }
}

start()