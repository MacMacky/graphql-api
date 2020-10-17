import { createTestClient } from 'apollo-server-testing'
import { gql } from 'apollo-server'
import createServer from '../server'

describe('test graphql', () => {
  it('should not return an error', async () => {
    const { query } = createTestClient(await createServer())
    const response = await query({
      query: gql`
         query {
              name
         }
        `
    })
    expect(response.data!.name as string).toStrictEqual('Mark')
  })
})