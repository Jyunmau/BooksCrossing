const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => {
  try {
    return await db.collection('bookList').where(_.or([
      {
        publisher: event.hasOwnProperty("publisher") ? event.publisher : ''
      },
      {
        phone: event.hasOwnProperty("phone") ? event.phone : 0
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
    ])).get()
  } catch (e) {
    console.error(e)
  }
}