import path from 'path'
import fs from 'fs'
const readDir = Bluebird.promisify<string[], string>(fs.readdir)

export default Bluebird.reduce(readDir(__dirname), async (resolvers, module) => {
  const file = module.split('.js').shift() as string
  if (!file.includes('index')) {
    return {
      ...resolvers,
      [file]: (await import(path.join(__dirname, module))).default
    }
  }
  return { ...resolvers }
}, {})