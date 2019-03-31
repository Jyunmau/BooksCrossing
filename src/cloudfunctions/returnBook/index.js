const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
exports.main = async (event, context) => {
  const promise = await db.collection('bookList').where({
    _id: event.id
  }).get()
  if (promise.data[0].bookID == event.checkCode) {
    try {
      return await db.collection('bookList').where({
        _id: event.id
      })
        .update({
          data: {
            state: 'borrowable',
            borrower: ''
          },
        })
    } catch (e) {
      console.error(e)
    }
  } else {
    return 'checkFailed'
  }
}