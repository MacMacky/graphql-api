import { createTestClient } from 'apollo-server-testing'
import createServer from '../server'
import { CREATE_CLASS, CREATE_STUDENT, CREATE_TEACHER, ENROLL_CLASS } from './queries'


describe('test api graphql', () => {
  let query: Function, mutate: Function;
  beforeAll(async () => {
    const { query: q, mutate: m } = createTestClient(await createServer());
    query = q
    mutate = m
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
          subject_id: '111'
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
          subject_id: '111'
        }
      }
    })
    expect(response.data!.result.subject_id).toBe('111')
  })

  it('should throw when enrolling if course does not exists', async () => {
    const response = await mutate({
      mutation: ENROLL_CLASS,
      variables: {
        // test
        input: {
          student_id: '123123',
          subject_id: 'course_that_does_not_exists'
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

  const inputs = [
    ['should create a new class for the specified teacher', {
      subject_id: '1',
      teacher_id: '1',
      room_number: '503',
      start_time: '10:00AM',
      end_time: '12:00PM'
    }],
    ['should throw when creating a class whose teacher does not exists', {
      subject_id: '2',
      teacher_id: 'TEACHER_THAT_DOES_EXITS',
      room_number: '503',
      start_time: '10:00AM',
      end_time: '12:00PM'
    }],
    ['should throw when creating a class with a invalid course', {
      subject_id: 'INVALID_COURSE',
      teacher_id: '1',
      room_number: '503',
      start_time: '10:00AM',
      end_time: '12:00PM'
    }]
  ] as unknown as readonly [[string, Class]]

  it.each(inputs)('%s', async (message, input) => {
    const response = await mutate({
      mutation: CREATE_CLASS,
      variables: {
        // test
        input
      }
    })
    expect(response.data!.result.subject_id).toBe(input.subject_id)
  })

  // close db connection to avoid memory leaks
  afterAll(() => {
    r.getPoolMaster().drain()
  })

})