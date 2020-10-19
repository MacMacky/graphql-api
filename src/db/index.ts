export default () => {
  return fs.readFile(path.resolve(process.cwd(), 'structure.json'), 'utf-8')
    .then(JSON.parse)
    .then(data =>
      r.dbList()
        .run()
        .then(dbs => {
          // check if db already exists
          if (dbs.includes(data.db)) {
            log('[db] already exists skipping creation...')
            return [true, data.tables];
          }

          // if not create db
          log('[db] creating db...')
          return r
            .dbCreate(data.db)
            .run()
            .then(result => [result.dbs_created, data.tables])
        })
    )
    .then(result => {
      const [created, tables] = result as [number, Table[]]
      if (created) {
        // get existing tables
        return Query
          .tableList()
          // filter existing tables to new existing tables in 'structure.json'
          .then(existingTables => {
            // old filter logic
            // const tablesToBeCreated = tables.filter(table => !existingTables.includes(table.name))
            // create new tables
            return Bluebird.map(tables, table => {
              // check if current table already exist in the `existingTables`
              if (existingTables.includes(table.name)) {
                return Query
                  .indexList(table.name)
                  .then(old_indexes => table.indexes.filter(index => !old_indexes.includes(index)))
                  .then(indexes_to_create => Bluebird.map(indexes_to_create, index => Query.indexCreate(table.name, index)))
              } else {
                // if not create table
                return Query
                  .tableCreate(table.name)
                  .then(result => {
                    // if table is created create indexes for that table
                    if (result.tables_created) {
                      return Bluebird.map(table.indexes, index => Query.indexCreate(table.name, index))
                    }
                  })
              }
            })
          })
      }

      return Promise.reject('[db] db was not created...')
    })
}