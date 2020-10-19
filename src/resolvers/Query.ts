export default {
  students: () => Query.table<Student>('students'),
  classes: () => Query.table<Class>('classes'),
  enrollments: () => Query.table<Enrollment>('enrollment'),
  teachers: () => Query.table<Teacher>('teachers'),
  departments: () => Query.table<Department>('departments'),
  courses: () => Query.table<Course>('courses')
}