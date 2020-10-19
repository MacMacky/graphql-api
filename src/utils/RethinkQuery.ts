import { UpdateOptions } from 'rethinkdb'

class RethinkQuery implements RethinkQry {
  create<T = any>(data: T, tableName: string) {
    return r.table(tableName)
      .insert(data)
      .run()
  }

  findById(id: string, tableName: string) {
    return r.table(tableName)
      .get(id)
      .run()
  }

  findByFilter(filterData: {} | Function, tableName: string, orderBy = 'created_at') {
    return r.table(tableName)
      .orderBy(r.desc(orderBy))
      .filter(filterData)
      .coerceTo('array')
      .run()
  }

  findByIndex(indices: string[] | string, index: string, tableName: string) {
    return r.table(tableName)
      .getAll(indices, { index })
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
}

export default RethinkQuery