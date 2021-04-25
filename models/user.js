 const mongoose =  require('mongoose');
 const passportMongoose = require('passport-local-mongoose')
 const Schema  =  mongoose.Schema;
 const UserSchema =  new Schema({
     email:String,
     image:String,
     posts:[{
         type:Schema.Types.ObjectId,
         ref:'Post'
     }]
 });
 UserSchema.plugin(passportMongoose);
 
 module.exports = mongoose.model('User',UserSchema);