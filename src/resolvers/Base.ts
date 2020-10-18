export default {
  __resolveType: (item: Data) => {
    if (item.teacher_id && item.course_id) {
      return 'Class'
    }

    if (item.course_id && item.student_id) {
      return 'Enrollment'
    }

    if (item.department_id) {
      return 'Teacher'
    }

    if (item.year_level) {
      return 'Student'
    }

    if (item.course_name) {
      return 'Course'
    }

    return 'Department'
  }
}