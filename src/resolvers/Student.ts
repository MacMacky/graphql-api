export default {
  course(_: Student) {
    return Query.findById<Course>(_.course_id, 'courses')
  }
}