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
            return [true, data.db, data.tables];
          }

          // if not create db
          log('[db] creating db...')
          return r
            .dbCreate(data.db)
            .run()
            .then(result => [result.dbs_created, data.db, data.tables])
        })
    )
    .then(result => {
      const [created, db, tables] = result as [number, string, Table[]]
      if (created) {
        // get existing tables
        const tablesToBeCreated = r.db(db)
          .tableList()
          .run() // filter existing tables to new existing tables in 'structure.json'
          .then(existingTables => tables.filter(table => !existingTables.includes(table.name)))

        // create new tables
        return Bluebird.map(tablesToBeCreated, table =>
          r.db(db)
            .tableCreate(table.name)
            .run()
            .then(result => {
              if (result.tables_created) {
                return Bluebird.map(table.indexes, index => {
                  return r.db(db)
                    .table(table.name)
                    .indexCreate(index)
                    .run()
                })
              }
            })
        )
      }

      return Promise.reject('[db] db was not created...')
    })
}