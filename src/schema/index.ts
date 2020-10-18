import { gql } from 'apollo-server'


export default gql`
  scalar Date

  enum Gender {
    MALE
    FEMALE
    UNKNOWN
  }

  interface Base {
    id: ID!
    created_at: Date
    updated_at: Date
  }

  type Student implements Base {
    id: ID!
    first_name: String!
    last_name: String!
    middle_name: String
    gender: Gender
    year_level: String
    created_at: Date
    updated_at: Date
  }

  input InputStudent {
    first_name: String!
    last_name: String!
    middle_name: String
    gender: Gender
  }

  type Enrollment implements Base {
    id: ID!
    student_id: String!
    course_id: String!
    created_at: Date
    updated_at: Date
    student: Student
    course: Course
  }

  input InputEnrollment {
    student_id: String!
    course_id: String!
  }

  type Teacher implements Base {
    id: ID!
    first_name: String!
    last_name: String!
    middle_name: String
    department_id: String!
    gender: Gender
    created_at: Date
    updated_at: Date
  }

  input InputTeacher {
    first_name: String!
    last_name: String!
    middle_name: String
    department_id: String!
    gender: Gender
  }

  type Course implements Base {
    id: ID!
    course_name: String!
    credits: Int
    created_at: Date
    updated_at: Date
  }

  type Department implements Base {
    id: ID!
    name: String!
    created_at: Date
    updated_at: Date
  }

  type Class implements Base  {
    id: ID!
    course_id: String!
    teacher_id: String!
    room_number: String
    start_time: Date
    end_time: Date
    course: Course
    teacher: Teacher
    created_at: Date
    updated_at: Date
  }

  input InputClass {
    course_id: String!
    teacher_id: String!
    room_number: String
    start_time: Date
    end_time: Date
  }

  type Query {
    students: [Student]!
    classes: [Class]!
    enrollments: [Enrollment]!
    teachers: [Teacher]!
    departments: [Department]!
    courses: [Course]!
  }

  type Mutation {
    createStudent(input: InputStudent): Student
    updateStudent(id: ID!, input: InputStudent): Student
    enrollClass(input: InputEnrollment!): Enrollment
    createTeacher(input: InputTeacher!) : Teacher
    createClass(input: InputClass!): Class
  }
`
