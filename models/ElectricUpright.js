import mongoose, { Schema } from 'mongoose';
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// const ObjectId = mongoose.Schema.Types.ObjectId //Only needed if you want to join two collections

const ElectricUpright = mongoose.Schema({
  title: {type: String, required: true},
  priority: {type: Number, required: true},
  price: Number,
  body: {type: String, required: true},
  itemURL: String,
  reviewURL: String,
  audioFileURL: String,
  imageURL: String,
  articles: [{type: ObjectId, ref: 'Article'}]
},
{
  collection: 'ElectricUprights'
})

const activeDB = mongoose.connection.useDb({activeDB})
const UserInfo = activeDB.model('userInfo', userInfoSchema);
// ☞ 34367825-120a-4a11-ba2b-ab7178f1f5e0
export default UserInfo;

module.exports = mongoose.model('ElectricUpright', ElectricUpright)
