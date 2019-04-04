const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const MAX_LIMIT = 2
const _ = db.command
exports.main = async (event, context) => await db.collection('bookList')
  .where(_.or([
    {
    state: 'borrowable',
    publisher: event.id
    },
    {
      state: 'locked',
      publisher: event.id
    }
  ]))
  .get()
