const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
exports.main = async (event, context) => {
  try {
    return await db.collection('bookList').where({
      _id: event.id
    })
      .update({
        data: {
          state: 'booked'
        },
      })
  } catch (e) {
    console.error(e)
  }
}