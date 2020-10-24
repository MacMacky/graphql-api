import { MockList, gql } from 'apollo-server';
import { createTestClient } from 'apollo-server-testing'
import createServer from '../server'
import { GET_STUDENTS } from './queries';



describe('test mock api graphql', () => {
  let query: Function, mutate: Function;

  beforeAll(async () => {
    const mocks = {
      String: () => 'Hello',
      Int: () => 5,
      Boolean: () => false,
      ID: () => '1',
      Float: () => 1.5,
      Query: () => ({
        students: () => new MockList(5)
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

  // it('should have a student with an id of `1`', async () => {
  //   let response = await query({
  //     query: GET_STUDENTS
  //   })

  //   expect(response.data!.result.pop().id).toBe('1')
  // })



})