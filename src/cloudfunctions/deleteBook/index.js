const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
exports.main = async (event, context) => {
  try {
    return await db.collection('bookList').where(db.command.or([
      {
        publisher: event.hasOwnProperty("publisher") ? event.publisher : ''
      },
      {
        _id: event.hasOwnProperty("id") ? event.id : ''
      },
      {
        bookName: event.hasOwnProperty("bookName") ? event.bookName : ''
      },
      {
        state: event.hasOwnProperty("state") ? event.state : ''
      },
      {
        borrower: event.hasOwnProperty("borrower") ? event.borrower : ''
      }
    ])).remove()
  } catch (e) {
    console.error(e)
  }
}