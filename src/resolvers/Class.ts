export default {
  teacher(_: Class) {
    return Query.findById<Teacher>(_.teacher_id, 'teachers')
  },
  subject(_: Class) {
    return Query.findById<Subject>(_.subject_id, 'subjects')
  }
}