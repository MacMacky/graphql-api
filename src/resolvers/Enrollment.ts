export default {
  student(_: Enrollment) {
    return Query.findById<Student>(_.student_id, 'students')
  },
  subject(_: Enrollment) {
    return Query.findById<Subject>(_.subject_id, 'subjects')
  },
}