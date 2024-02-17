const mongoose = require('mongoose')

//creating schema
const userSchema = mongoose.Schema([
    {
        name: {
            type:String
        },
        age: {
            type:Number
        },
        email: {
            type:String
        }
    }
])

const userModel=mongoose.model('user',userSchema)
module.exports=userModel