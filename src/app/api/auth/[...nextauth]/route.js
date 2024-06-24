
import clientPromise from "@/libs/mongoConnect";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import bcrypt from "bcrypt";
import * as mongoose from "mongoose";
import { User } from '@/models/User';
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    secret: process.env.SECRET,
    //adapter: трябва ми за да създаде session в Mongo database и да ми запамети в users логването чрез email
    adapter: MongoDBAdapter(clientPromise),    //СЛЕД КАТО ПРЕМАХНАХ adaptera МИ СЕ ОПРАВИ КОДА
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        CredentialsProvider({
            name: 'Credentials',
            id: 'credentials',
            credentials: {
                username: { label: "Email", type: "email", placeholder: "test@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                console.log({ credentials })
                const email = credentials?.email;
                const password = credentials?.password;

                mongoose.connect(process.env.MONGO_URL);
                const user = await User.findOne({ email });          //its await bcs we r searching for our user in the database
                const passwordOk = user && bcrypt.compareSync(password, user.password);   // comparing password from credentials with user.password
                //тоест сравнява паролата на usera която е въвел при регистрация и е запазена в database

                console.log({passwordOk})

                if (passwordOk) {
                    return user;
                } 
                return null;
                // try {
                //     const { email, password } = credentials;
                //     await mongoose.connect(process.env.MONGO_URL);
                //     const user = await User.findOne({ email });
                //     if (!user) {
                //         throw new Error("User not found");
                //     }
                //     const passwordOk = await bcrypt.compare(password, user.password);
                //     if (passwordOk) {
                //         await mongoose.disconnect();
                //         return user;
                //     } else {
                //         throw new Error("incorrect password");
                //     }
                // } catch (error) {
                //     console.error("Authentication error:", error.message);
                //     await mongoose.disconnect();
                //     return null;
                // }

            }
        })
    ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }


//secret - необходим е за да не се виждат сесиите от други хора, един вид за сигурност
//този компонент е обвързан с login page

//This code appears to be setting up authentication using NextAuth with MongoDB as the database and two authentication providers: Google OAuth and custom credentials (username/email and password).

//Here's a breakdown of what's happening:

//1.//Import Statements: Various dependencies and modules are imported, including mongoose, bcrypt, NextAuth, and authentication providers like CredentialsProvider and GoogleProvider.

//2.//NextAuth Configuration: The NextAuth function is called to initialize the authentication system. It's provided with configuration options:
//secret: A secret key used for session encryption.
//adapter: Specifies the adapter to use for session and user data storage. In this case, it's using MongoDB as the storage adapter, provided by MongoDBAdapter.
//providers: An array of authentication providers. Here, it includes Google OAuth provider and custom credentials provider.

//3.//GoogleProvider Configuration: Configures the Google OAuth provider with client ID and client secret obtained from environment variables.

//4.//CredentialsProvider Configuration: Configures the custom credentials provider, allowing users to log in using their email and password. The authorize function is used for authentication:
//authorize Function: This function receives the credentials object containing the entered email and password. It then attempts to authenticate the user by querying the MongoDB database using Mongoose.
// If a user with the provided email exists, it checks if the password matches using bcrypt. If authentication is successful, it returns the user object; otherwise, it returns null.

//5.//Exporting Handler: The handler function is exported both for GET and POST requests, indicating that this authentication logic is used for both types of requests.

//Overall, this code sets up NextAuth for authentication with MongoDB storage, allowing users to log in via Google OAuth or custom credentials (email and password).



//why we using adapters in NextAuth.js
//In NextAuth.js, an adapter performs a key role as it serves as a bridge between NextAuth.js and your database, it manages important tasks related to authentication.
//When you mention that you can still create a new user in the database even without the adapter, this is because you're directly using the Prisma client. While this 
//lets you interact with your database, it won't take care of managing sessions or OAuth accounts, and it won't integrate with NextAuth.js in the way that using the adapter does.
//The adapter takes care of storing a new user in the database when they log in for the first time. If the same user logs in again, the adapter fetches the user's information from 
//the database. Also, if users are logging in through OAuth providers (like GitHub, Google, or Facebook), the adapter links these OAuth accounts to a user account.



