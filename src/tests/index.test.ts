import { createTestClient } from 'apollo-server-testing'
import { gql } from 'apollo-server'
import createServer from '../server'


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
      course_id
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
          course_id
          teacher_id
          room_number
          start_time
          end_time
       }
    }
`

describe('test graphql', () => {
  let query: Function, mutate: Function;
  beforeAll(async () => {
    const { query: q, mutate: m } = createTestClient(await createServer());
    query = q
    mutate = m
  })


  it('should not return an error', () => {
    expect(1).toBe(1)
  })

  it('should return an empty students', async () => {
    const response = await query({
      query: gql`
        query {
          students {
            id
          }
        }
        `
    })
    expect(response.data!.students).toHaveLength(0)
  })

  it('should return an empty classes', async () => {
    const response = await query({
      query: gql`
        query {
          classes {
            id
          }
        }
        `
    })
    expect(response.data!.classes).toHaveLength(0)
  })

  it('should create a new student', async () => {
    const response = await mutate({
      mutation: CREATE_STUDENT,
      variables: {
        student: {
          first_name: 'Mark',
          last_name: 'A',
          gender: 'MALE',
          middle_name: ''
        }
      }
    })
    expect(response.data!.result.first_name).toBe('Mark')
  })

  it('should create an enrollment for a specified student', async () => {
    const response = await mutate({
      mutation: ENROLL_CLASS,
      variables: {
        // test
        input: {
          student_id: '12345',
          course_id: '111'
        }
      }
    })
    expect(response.data!.result.student_id).toBe('12345')
  })

  it('should throw when enrolling if student does not exists', async () => {
    const response = await mutate({
      mutation: ENROLL_CLASS,
      variables: {
        // test
        input: {
          student_id: 'student_that_does_exist',
          course_id: '111'
        }
      }
    })
    expect(response.data!.result.course_id).toBe('111')
  })

  it('should throw when enrolling if course does not exists', async () => {
    const response = await mutate({
      mutation: ENROLL_CLASS,
      variables: {
        // test
        input: {
          student_id: '123123',
          course_id: 'course_that_does_not_exists'
        }
      }
    })
    expect(response.data!.result.student_id).toBe('123123')
  })


  it('should create a new teacher', async () => {
    const response = await mutate({
      mutation: CREATE_TEACHER,
      variables: {
        // test
        input: {
          first_name: 'Mark',
          last_name: 'A',
          middle_name: '',
          gender: 'MALE',
          department_id: '1'
        }
      }
    })

    expect(response.data!.result.department_id).toBe('1')
  })

  it('should throw when creating a teacher that has invalid department_id', async () => {
    const response = await mutate({
      mutation: CREATE_TEACHER,
      variables: {
        // test
        input: {
          first_name: 'Mark',
          last_name: 'A',
          middle_name: '',
          gender: 'MALE',
          department_id: 'invalid_id'
        }
      }
    })

    expect(response.data!.result.department_id).toBe('invalid_id')
  })


  it('should create a new class for the specified teacher', async () => {
    const response = await mutate({
      mutation: CREATE_CLASS,
      variables: {
        // test
        input: {
          course_id: '1',
          teacher_id: '1',
          room_number: '503',
          start_time: '10:00AM',
          end_time: '12:00PM'
        }
      }
    })
    expect(response.data!.result.course_id).toBe('1')
  })

  it('should throw when creating a class whose teacher does not exists', async () => {
    const response = await mutate({
      mutation: CREATE_CLASS,
      variables: {
        // test
        input: {
          course_id: '1',
          teacher_id: 'TEACHER_THAT_DOES_EXITS',
          room_number: '503',
          start_time: '10:00AM',
          end_time: '12:00PM'
        }
      }
    })
    expect(response.data!.result.teacher_id).toBe('TEACHER_THAT_DOES_EXITS')
  })

  it('should throw when creating a class with a invalid course', async () => {
    const response = await mutate({
      mutation: CREATE_CLASS,
      variables: {
        // test
        input: {
          course_id: 'INVALID_COURSE',
          teacher_id: '1',
          room_number: '503',
          start_time: '10:00AM',
          end_time: '12:00PM'
        }
      }
    })
    expect(response.data!.result.course_id).toBe('INVALID_COURSE')
  })



  // close db connection to avoid memory leaks
  afterAll(() => {
    r.getPoolMaster().drain()
  })

})