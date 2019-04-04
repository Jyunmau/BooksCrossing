const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => {
  try {
    return await db.collection('bookList').where(_.or([
      {
        publisher: event.hasOwnProperty("publisher") ? event.publisher : 'null'
      },
      {
        phone: event.hasOwnProperty("phone") ? event.phone : 0
      },
      {
        bookName: event.hasOwnProperty("bookName") ? event.bookName : 'null'
      },
      {
        state: event.hasOwnProperty("state") ? event.state : 'null'
      },
      {
        borrower: event.hasOwnProperty("borrower") ? event.borrower : 'null'
      }
    ])).get()
  } catch (e) {
    console.error(e)
  }
}