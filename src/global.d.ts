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

  export interface Enrollment {
    id: string
    student_id: string
    course_id: string
    enrolled_on: _Date
  }

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

  export interface Course {
    id: string
    name: string
    credits: number
  }

  export interface Department {
    id: string
    name: string
  }

  export interface Class {
    id: string
    course_id: string
    teacher_id: string
    room_number: string
    start_time: _Date
    end_time: _Date
  }

  var Bluebird: typeof _Bluebird

}


export { }