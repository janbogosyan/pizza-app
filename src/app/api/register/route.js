// import {User} from '@/models/User';

//creating a new user in a MongoDB database using Mongoose in a Node.js environment
//when register a user to save it to the database
import { User } from "./../../../models/User";
import bcrypt from "bcrypt";
import mongoose from "mongoose";      

//кръстили сме го req , защото тук очаква да получи POST заявката от register/page и ще върне отговор 
export async function POST(req) {
    const body = await req.json();
    mongoose.connect(process.env.MONGO_URL); //we must connect to our database like this
    const pass = body.password;
    if(!pass?.length || pass.length < 5){
        new Error('password must be at least 5 characters');
    }

    const notHashedPassword = pass;
    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(notHashedPassword, salt);

    const createdUser = await User.create(body) //we using the created User from src/models/User 
    return Response.json(createdUser);      
} 


//API - комуникацията между две приложения , фактически този компонент взима данните за регистрирания потребител 
//чрез POST заявка която е направена в компонента register/page и я предава към database

//we making POST request in app/register/page.js to here
//bcs we want to save a user information to database when the user register in our app


//This code seems to handle the creation of a new user based on a POST request. Let's break it down:
//Import Statements: The User model is imported from the ../../../models/User module, and mongoose is imported for database operations.
//POST Function: This function is an asynchronous function that handles POST requests. It expects the req parameter, which represents the request object.
//Parsing Request Body: The request body is parsed using req.json(), which returns a promise that resolves with the parsed JSON data. This is awaited to get the body of the POST request.
//Connecting to MongoDB: The code connects to the MongoDB database using mongoose.connect(). It uses the MONGO_URL environment variable to determine the connection URL.
//Creating a User: After successfully connecting to the database, the code uses User.create(body) to create a new user. It passes the parsed request body (body) to the create method, which creates a new document in the User collection based on the schema defined in the User model.
//Returning Response: The created user object (createdUser) is returned as JSON in the response. 