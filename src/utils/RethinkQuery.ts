import { UpdateOptions } from 'rethinkdb'

class RethinkQuery implements RethinkQry {
  create<T extends object>(data: T, tableName: string) {
    return r.table(tableName)
      .insert({
        ...data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .run()
      .then(result => {
        if (result && result.generated_keys?.length) {
          return { ...data, id: result.generated_keys.pop() }
        }
        return null
      })
  }

  findById<T>(id: string, tableName: string) {
    return r.table<T>(tableName)
      .get(id)
      .run()
  }

  findByFilter<T = unknown>(filterData: {} | Function, tableName: string, orderBy = 'created_at') {
    return r.table<T>(tableName)
      .orderBy(r.desc(orderBy))
      .filter(filterData)
      .coerceTo('array')
      .run()
  }

  findByIndex<T = unknown>(indices: string[] | string, index: string, tableName: string) {
    return r.table<T>(tableName)
      .getAll(indices, { index })
      .coerceTo('array')
      .run()
  }


  table<T>(tableName: string, orderBy = 'created_at') {
    return r.table<T>(tableName)
      .orderBy(r.asc(orderBy))
      .coerceTo('array')
      .run()
  }


  updateById(id: string, data: {} | Function, tableName: string, opts: UpdateOptions = { returnChanges: true }) {
    return r.table(tableName)
      .get(id)
      .update(data, opts)
      .run()
  }

  deleteById(id: string, tableName: string, opts: UpdateOptions = { returnChanges: true }) {
    return r.table(tableName)
      .get(id)
      .delete(opts)
      .run()
  }

  tableList() {
    return r
      .tableList()
      .run()
  }

  indexList(tableName: string) {
    return r
      .table(tableName)
      .indexList()
      .run()
  }

  tableCreate(tableName: string) {
    return r
      .tableCreate(tableName)
      .run()
  }

  indexCreate(tableName: string, index: string) {
    return r.table(tableName)
      .indexCreate(index)
      .run()
  }

  changes<T>(tableName: string, opts = { includeTypes: true }) {
    return r.table<T>(tableName)
      .changes(opts)
      .run()
  }
}

export default RethinkQuery