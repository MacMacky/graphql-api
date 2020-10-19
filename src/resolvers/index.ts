export default Bluebird.reduce(fs.readdir(__dirname), async (resolvers, module) => {
  const file = module.split(/\.(js|ts)/).shift() as string
  // check if file is not 'index.js or index.ts'
  if (!file.includes('index')) {
    return {
      ...resolvers,
      [file]: (await import(path.join(__dirname, module))).default
    }
  }
  return resolvers
}, {})