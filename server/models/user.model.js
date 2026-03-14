/**
 * user table
 * 1) name string requuired
 * 2) email string required
 * 3) password string required
 * 4) bloodGroup string required
 * 5) city string required 
 * 6) phone string required
 * 7) available boolean required
 * 8) role -> a) patient b) donor c) admin string required
 * 9) created at string required timestamp
 * 10) updated at string required timestamp
 * 11) Location
 * 12) zipcode
 */

const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        }, 
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        password:{
            type: String,
            required: true
        },
        bloodGroup:{
            type: String,
            required: true,
            enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        },
        gender: {
            type: String,
            required: true,
            enum: ['male','female','custom']
        },
        age: {
            type: Number,
            required: true
        },
        city:{
            type: String,
            required: true
        },
        phone:{
            type: String,
            required: true
        },
        role:{
            type: String,
            required: true,
            enum: ['patient','donor','admin']
        },
        zipcode: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

// Hash the password before saving the user
userSchema.pre("save", async function(next){
    // Only hash the password if it's new or modified
    if(this.isModified('password')){
        try {
            const salt = await bcryptjs.genSalt(10);
            this.password = await bcryptjs.hash(this.password, salt);
        } catch (err) {
            return next(err);
        }
    }
    next();
});

userSchema.methods.comparePassword = async function(password){
    console.log("password:",password);
    console.log("this.password",this.password);
    const comparison = await bcryptjs.compare(password, this.password);
    console.log("comparison",comparison);
    return comparison;
} 

// creating access tokens
userSchema.methods.accessToken = async function(){
    try {
        const userAccessToken = jwt.sign(
            {
                userID: this._id.toString(),
                email: this.email,
                role: this.role
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn:"30d"
            }
        );
        return userAccessToken;
    } catch (error) {
        console.log("error in generating the access token:",error);
        
    }
}

const User = mongoose.model('User',userSchema); 

module.exports = User;