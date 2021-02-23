
export default {
  newStudent: {
    subscribe: (_: null, args: null, ctx: Context) => {
      return ctx.pubSub.asyncIterator('NEW_STUDENT')
    }
  }
}