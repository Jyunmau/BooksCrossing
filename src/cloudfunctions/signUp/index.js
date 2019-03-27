const cloud = require('wx-server-sdk')

cloud.init({

})

const db = cloud.database()
exports.main = async (event, context) => {
  const promise = await db.collection('userList').where({
    _openID: event.openid
  }).get()
  if (promise.data.length==0) {
    try {
      return await db.collection('userList').add({
        data: {
          nickName: event.nickName,
          phone: event.phone,
          _openID: event.openid
        }
      })
    } catch (e) {
      console.error(e)
    }
  } else {
    return 'duplication'
  }
}