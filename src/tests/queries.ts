import { gql } from 'apollo-server'

const CREATE_STUDENT = gql`
  mutation CreateStudent($student: InputStudent) {
    result: createStudent(input: $student) {
      first_name
      last_name
    }
}`

const ENROLL_CLASS = gql`
  mutation EnrollClass($input: InputEnrollment!) {
    result: enrollClass(input: $input) {
      student_id
      subject_id
    }
  }`;

const CREATE_TEACHER = gql`
    mutation CreateTeacher($input: InputTeacher!) {
      result: createTeacher(input: $input) {
        first_name
        last_name
        middle_name
        department_id
        gender
      }
    }
`

const CREATE_CLASS = gql`
    mutation CreateClass($input: InputClass!) {
       result: createClass(input: $input) {
          id
          subject_id
          teacher_id
          room_number
          start_time
          end_time
       }
    }
`


const GET_STUDENTS = gql`
  query getStudents {
    result: students {
      id,
      first_name,
      last_name
    }
  }
`
export {
  CREATE_STUDENT,
  ENROLL_CLASS,
  CREATE_TEACHER,
  CREATE_CLASS,
  GET_STUDENTS
}