export default {
  createStudent: async (_: null, args: { input: InputStudent }, ctx: Context) => {
    const result = await Query.create<Student>(args.input, 'students')
    await ctx.pubSub.publish('NEW_STUDENT', { newStudent: result })
    return result
  },
  enrollClass: (_: null, args: { input: InputEnrollment }): Enrollment => {
    return {
      ...args.input,
      id: new Date().getMilliseconds().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  },
  createTeacher: (_: null, args: { input: InputTeacher }): Teacher => {
    return {
      ...args.input,
      id: new Date().getMilliseconds().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  },
  createClass: (_: null, args: { input: InputClass }): Class => {
    return {
      ...args.input,
      id: new Date().getMilliseconds().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  }
}