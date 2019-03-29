const cloud = require('wx-server-sdk')

cloud.init({

})

const db = cloud.database()
exports.main = async (event, context) => await db.collection('userList').where({
  _openID: event.openid
}).get()