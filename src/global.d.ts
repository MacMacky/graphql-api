import _Bluebird from 'bluebird'

type Gender = 'male' | 'female' | 'unknown'
type _Date = Date | string

declare global {

  export interface Student {
    id: string
    first_name: string
    last_name: string
    middle_name: string
    gender: Gender
    created_at: _Date
    updated_at: _Date
  }

  export type InputStudent = Omit<Student, 'id' | 'created_at' | 'updated_at'>

  export interface Enrollment {
    id: string
    student_id: string
    course_id: string
    enrolled_on: _Date
  }

  export type InputEnrollment = Omit<Enrollment, 'id'>

  export interface Teacher {
    id: string
    first_name: string
    last_name: string
    middle_name: string
    department: string
    gender: Gender
    created_at: _Date
    updated_at: _Date
  }

  export type InputTeacher = Omit<Teacher, 'id' | 'created_at' | 'updated_at'>

  export interface Course {
    id: string
    name: string
    credits: number
  }

  export type InputCourse = Omit<Course, 'id'>

  export interface Department {
    id: string
    name: string
  }

  export type InputDepartment = Omit<Department, 'id'>

  export interface Class {
    id: string
    course_id: string
    teacher_id: string
    room_number: string
    start_time: _Date
    end_time: _Date
  }

  export type InputClass = Omit<Class, 'id'>

  var Bluebird: typeof _Bluebird

}


export { }