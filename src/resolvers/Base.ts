export default {
  __resolveType: (item: Data) => {
    if (item.teacher_id && item.subject_id) {
      return 'Class'
    }

    if (item.subject_id && item.student_id) {
      return 'Enrollment'
    }

    if (item.subject_name) {
      return 'Subject'
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