import _Bluebird from 'bluebird'
import { ReqlClient } from 'rethinkdbdash'
import { InsertResult, UpdateOptions, DeleteResult, UpdateResult, ArrayResult, TableCreateResult, IndexCreateResult } from 'rethinkdbdash/node_modules/@types/rethinkdb'

type Gender = 'male' | 'female' | 'unknown'
type _Date = Date | string
type OmitInputTypes = 'id' | 'created_at' | 'updated_at'


declare global {
  export interface RethinkQry {
    create(data: {} | any, tableName: string): Promise<InsertResult<unknown>>
    findById<T>(id: string, tableName: string): Promise<T | null>
    findByIndex<T = unknown>(indices: string[] | string, index: string, tableName: string): Promise<ArrayResult<T>>
    findByFilter<T = unknown>(filterData: {} | Function, tableName: string, orderBy?: string): Promise<ArrayResult<T>>
    table<T>(tableName: string, orderBy?: string): Promise<ArrayResult<T>>
    updateById<T>(id: string, data: {}, tableName: string, opts?: UpdateOptions): Promise<UpdateResult<unknown> | T>
    deleteById<T>(id: string, tableName: string, opts?: UpdateOptions): Promise<DeleteResult<unknown> | DeleteResult<T>>
    tableList(): Promise<ArrayResult<string>>
    indexList(tableName: string): Promise<ArrayResult<string>>
    tableCreate(tableName: string): Promise<TableCreateResult>
    indexCreate(tableName: string, index: string): Promise<IndexCreateResult>
  }

  interface Base {
    id: string
    created_at: _Date
    updated_at: _Date
  }

  export interface Student extends Base {
    first_name: string
    last_name: string
    middle_name: string
    year_level: string
    gender: Gender
  }

  export type InputStudent = Omit<Student, OmitInputTypes>

  export interface Enrollment extends Base {
    student_id: string
    course_id: string
  }

  export type InputEnrollment = Omit<Enrollment, OmitInputTypes>

  export interface Teacher extends Base {
    first_name: string
    last_name: string
    middle_name: string
    department_id: string
    gender: Gender
  }

  export type InputTeacher = Omit<Teacher, OmitInputTypes>

  export interface Course extends Base {
    course_name: string
    credits: number
  }

  export type InputCourse = Omit<Course, OmitInputTypes>

  export interface Department extends Base {
    name: string
  }

  export type InputDepartment = Omit<Department, OmitInputTypes>

  export interface Class extends Base {
    course_id: string
    teacher_id: string
    room_number: string
    start_time: _Date
    end_time: _Date
  }

  export type InputClass = Omit<Class, OmitInputTypes>

  export type Data = Class & Department & Student & Enrollment & Course & Teacher


  export interface Table {
    name: string
    indexes: string[]
  }

  var Bluebird: typeof _Bluebird
  var Query: RethinkQry
  var r: ReqlClient
  var path: typeof import('path')
  var fs: typeof import('fs').promises
  var log: (...args: (any | string)[]) => void
}


export { }