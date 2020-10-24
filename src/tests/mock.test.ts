import { MockList, gql } from 'apollo-server';
import { createTestClient } from 'apollo-server-testing'
import createServer from '../server'
import {
  GET_STUDENTS, GET_CLASSES,
  GET_COURSES, GET_DEPARTMENTS,
  GET_ENROLLMENT, GET_SUBJECTS, GET_TEACHERS
} from './queries';



describe('test mock api graphql', () => {
  let query: Function, mutate: Function;

  beforeAll(async () => {
    const mocks = {
      String: () => 'Hello',
      Int: () => 5,
      Boolean: () => false,
      ID: () => '1',
      Float: () => 1.5,
      Date: () => new Date(),
      Query: () => ({
        students: () => new MockList(5),
        classes: () => new MockList(10),
        courses: () => new MockList(15),
        departments: () => new MockList(5),
        teachers: () => new MockList(20),
        subjects: () => new MockList(10)
      })
    }

    const { query: q, mutate: m } = createTestClient(await createServer({ mocks }));
    query = q
    mutate = m
  })

  it('will have return 5 students', async () => {
    let response = await query({
      query: GET_STUDENTS
    })

    expect(response.data!.result).toHaveLength(5)
  })

  it('should give us return 10 classes', async () => {
    let response = await query({
      query: GET_CLASSES
    })
    expect(response.data!.result).toHaveLength(10)
  })

  it('should give us return 15 courses', async () => {
    let response = await query({
      query: GET_COURSES
    })

    expect(response.data!.result).toHaveLength(15)
  })


  it('should give us return 5 departments', async () => {
    let response = await query({
      query: GET_DEPARTMENTS
    })

    expect(response.data!.result).toHaveLength(5)
  })

  it('should give us return 5 teachers', async () => {
    let response = await query({
      query: GET_TEACHERS
    })

    expect(response.data!.result).toHaveLength(20)
  })

  it('should give us return 5 subjects', async () => {
    let response = await query({
      query: GET_SUBJECTS
    })

    expect(response.data!.result).toHaveLength(10)
  })




})