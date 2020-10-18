import _Bluebird from 'bluebird'
import { ReqlClient } from 'rethinkdbdash'
import { InsertResult, UpdateOptions, DeleteResult, UpdateResult, ArrayResult } from 'rethinkdbdash/node_modules/@types/rethinkdb'

type Gender = 'male' | 'female' | 'unknown'
type _Date = Date | string




declare global {
  export interface RethinkQry {
    create(data: {} | any, tableName: string): Promise<InsertResult<unknown>>
    findById<T>(id: string, tableName: string): Promise<T | null>
    findByIndex<T = unknown>(indices: string[] | string, index: string, tableName: string): Promise<ArrayResult<T>>
    findByFilter<T = unknown>(filterData: {} | Function, tableName: string, orderBy?: string): Promise<ArrayResult<T>>
    updateById<T>(id: string, data: {}, tableName: string, opts?: UpdateOptions): Promise<UpdateResult<unknown> | T>
    deleteById<T>(id: string, tableName: string, opts?: UpdateOptions): Promise<DeleteResult<unknown> | DeleteResult<T>>
  }

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
  var Query: RethinkQry
  var r: ReqlClient
}


export { }