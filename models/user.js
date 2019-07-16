var mongoose=require('mongoose');
var passportLocalMongoose=require('passport-local-mongoose');



var Schema=mongoose.Schema;
var UserSchema=new Schema({
  password: String,
  email:{
  	type:String,
  	required:true
  },
  name:String,
  role:Number
});


UserSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model('User',UserSchema);