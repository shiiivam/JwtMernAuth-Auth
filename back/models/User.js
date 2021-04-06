const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min: 6,
        max: 15
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum: ['user', 'admin'],
        required: true
    },
    todos: [{type: mongoose.Schema.Types.ObjectId, ref: 'Todo'}]
})

//Mongoose version of MW, Executes before save 
UserSchema.pre('save',function(next){
    // Checking if the password field is already modified in our document
    // // If modified no need to hash the password
    // Maybe the user just createrd account and not hashed password
    // maybe changed the password so not hashed
    if(!this.isModified('password'))
        return next();
    bcrypt.hash(this.password,10,(err,passwordHashed)=>{
        if(err)
            return next(err);
        this.password = passwordHashed;
        next();
    });
});

// cb is the dne function

UserSchema.methods.comparePassword = function(password,cb){
    bcrypt.compare(password, this.password,(err,isMatch)=>{
        if(err)
            return cb(err);
        // Will execute the password the user gave don;t match to password in db
        else{
            if(!isMatch)
                returncb(null, isMatch);
                // 'this' is user object
            return cb(null,this);
        }
    });
}

module.exports = mongoose.model('User',UserSchema)