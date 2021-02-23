export default {
  department(_: Teacher) {
    return Query.findById<Department>(_.department_id, 'departments')
  }
}