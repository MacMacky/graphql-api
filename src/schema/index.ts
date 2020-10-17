import { gql } from 'apollo-server'


export default gql`
  scalar Date

  enum Gender {
    MALE
    FEMALE
    UNKNOWN
  }

  type Student {
    id: ID!
    first_name: String!
    last_name: String!
    middle_name: String
    gender: Gender
    created_at: Date
    updated_at: Date
  }

  type Enrollment {
    id: ID!
    student_id: String!
    course_id: String!
    enrolled_on: Date
    student: Student
    course: Course
  }

  type Teacher {
    id: ID!
    first_name: String!
    last_name: String!
    middle_name: String
    department: String!
    gender: Gender
    created_at: Date
    updated_at: Date
  }

  type Course {
    id: ID!
    name: String!
    credits: Int
  }

  type Department {
    id: ID!
    name: String!
  }

  type Class {
    id: ID!
    course_id: String!
    teacher_id: String!
    room_number: String
    start_time: Date
    end_time: Date
    course: Course
    teacher: Teacher
  }

  type Query {
   students: [Student]!
    classes: [Class]!
    enrollments: [Enrollment]!
    teachers: [Teacher]!
    departments: [Department]!
    courses: [Course]!
  }
`
