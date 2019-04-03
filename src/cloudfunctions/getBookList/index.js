const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const MAX_LIMIT = 2
exports.main = async (event, context) => await db.collection('bookList')
  .where({
    state: 'borrowable',
  })
  .get()
