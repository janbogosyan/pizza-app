import { models, model, Schema } from "mongoose";

const UserSchema = new Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },

}, { timestamps: true });


export const User = models?.User || model('User', UserSchema);  //if exist models and inside we have User, otherwise we create user with the model function with a name 'User' and our UserSchema

//admin: { type: Boolean, default: false }, tova oznachava che po default usera koito se registrira nqma da e admin

//In Mongoose, the 'post' middleware allows you to execute a function after a certain event has occurred. The validate hook is triggered after the document has been validated but before it has been saved
//The post middleware for the validate event is added to the userSchema. The middleware function receives the validated user document as its argument.
// UserSchema.post('validate', function (user) { //So, overall, this middleware >function(user)< ensures that every time a user is validated before saving to the database, their password is hashed using bcrypt for security purposes.
// })


//here we create the model for our User
//we need models bcs for mongoose we need to create models for the database
//спираме си сървъра и тогава инсталираме bcrypt 
//npm install bcrypt
//след това го importvame , import bcrypt from 'bcrypt'

//UserSchema.post('validate', ...): This line indicates that you're adding a middleware function to the validate hook of your UserSchema. This means the function will run every time before the validation of a user instance.
//function (user) { ... }: This is the middleware function that takes the user object as its argument.




//This code defines a Mongoose schema for a user and applies a middleware function to hash the user's password before saving it to the database. Let's break it down:

//Import Statements: The mongoose, bcrypt, and other necessary modules are imported.

//UserSchema Definition: A Mongoose schema named UserSchema is defined using the Schema constructor. It specifies the structure of a user document with fields like email and password. The password field has validation rules to ensure it's required and at least 5 characters long.

//Middleware Function: A middleware function is attached to the validate hook of the UserSchema. This function runs every time a user document is validated before saving to the database. It hashes the user's password using bcrypt for security purposes. The password is hashed synchronously with bcrypt.hashSync().

//Exporting User Model: The User model is exported. If it already exists in the models, it's used; otherwise, a new model is created using model() and the UserSchema. This pattern allows importing the User model from multiple files without redefining it each time.

//Overall, this code ensures that whenever a user document is validated before saving to the database, the password is hashed using bcrypt for security. This helps in securely storing user passwords in the database.