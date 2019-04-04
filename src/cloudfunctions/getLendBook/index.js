// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const MAX_LIMIT = 2
// 云函数入口函数

exports.main = async (event, context) =>{
  return await db.collection('borrowList').where({
    lendid: event.id
  }).get()
}