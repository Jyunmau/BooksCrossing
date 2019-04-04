const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
exports.main = async (event, context) => {
  const promise = await db.collection('bookList').where({
    _id: event.id
  }).get()
  if (promise.data[0]._id == event.checkCode) {
    try {
      await db.collection('bookList').where({
        _id: event.id
      })
        .update({
          data: {
            state: 'borrowable',
            borrower: ''
          },
        })
      return await db.collection('borrowList').where({
        _id:event.lendid

      }).remove()
    } catch (e) {
      console.error(e)
    }
  } else {
    return 'checkFailed'
  }
}