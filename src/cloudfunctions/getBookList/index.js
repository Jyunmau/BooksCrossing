const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const MAX_LIMIT = 9
exports.main = async (event, context) => await db.collection('bookList')
  .where({
    state: 'borrowable',
  })
  .skip(event.pageNum * MAX_LIMIT)
  .limit(MAX_LIMIT)
  .get()