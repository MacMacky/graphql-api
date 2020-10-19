import createServer from './server'
import initDB from './db'

createServer()
  .then(server => initDB().then(_ => server))
  .then(server => server.listen())
  .then(info => console.log(`GraphQL Service listening at ${info.url}`))
  .catch(e => {
    console.log(e);
    process.exit(1)
  })