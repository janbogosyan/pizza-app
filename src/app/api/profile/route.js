import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@/models/User";
import { UserInfo } from "@/models/UserInfo";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

//the info inside (req) will be the result from function handleProfileInfoUpdate in app/profile/page
export async function PUT(req) {   
    mongoose.connect(process.env.MONGO_URL);   //first we are connected to our database
    const data = await req.json();
    const {name, ...otherUserInfo} = data; // taka vzimame samo name ot nashtiq obekt data, i ostanalite danni ot obekta gi vzimame v ...otherUserInfo, po tozi nachin name shte e otdelno zashtoto ne iskame da go vzimame zaedno s ostanalite neshta ot obekta
    const session = await getServerSession(authOptions);
    // console.log(session, data)
    const email = session.user.email; //we take the email, because email is something unique

    // console.log('name' in data); // should print true or false

    await User.updateOne({ email }, {name});

    await UserInfo.findOneAndUpdate({email}, otherUserInfo, {upsert:true}); //5:23:00

    return Response.json(true); //so the route will work with that return - so we can check console.log(session) for example
}

export async function GET() {
    mongoose.connect(process.env.MONGO_URL);
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    if (!email) {
        return Response.json({});
    }
    const user = await User.findOne({email}).lean();              
    const userInfo = await UserInfo.findOne({email}).lean();
    return Response.json({...user, ...userInfo});
}

//When calling from the server-side i.e. in Route Handlers, 
//React Server Components, API routes or in getServerSideProps , 
//we recommend using this function instead of getSession to retrieve the session object. 
//This method is especially useful when you are using NextAuth.js with a database
//and in our case we are using getServerSession in API route

//Build a Fullstack Food Ordering App with Next.js 14(react.js,mongo,tailwind)
//video 3:12:50
//first we connect to our database so mongoose.connect
//after that we want to grab the data