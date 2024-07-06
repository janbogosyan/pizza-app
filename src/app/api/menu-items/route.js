import { MenuItem } from "@/models/MenuItem";
import mongoose from "mongoose";

export async function POST(req) {
    mongoose.connect(process.env.MONGO_URL);
    const data = await req.json();
    const menuItemDoc = await MenuItem.create(data);
    return Response.json(menuItemDoc);
}

export async function PUT(req) {
    mongoose.connect(process.env.MONGO_URL);
    const { _id, ...data } = await req.json();
    await MenuItem.findByIdAndUpdate(_id, data);
    return Response.json(true);
}

export async function GET() {
    mongoose.connect(process.env.MONGO_URL);
    return Response.json(await MenuItem.find())
};

export async function DELETE(req) {
    mongoose.connect(process.env.MONGO_URL);
    const url = new URL(req.url);   
    const _id = url.searchParams.get('_id');
    await MenuItem.deleteOne({ _id });
    return Response.json(true);
}

// In the context of serverless functions or HTTP request handlers, 
// req typically represents the incoming HTTP request object. 
// This object contains details about the request, 
// such as the URL, headers, body, and method (GET, POST, DELETE, etc.). Depending 
// on the framework or runtime environment you're using, the structure of req can vary slightly,
//  but generally, it includes:
// 1. req.url: The URL of the request.
// 2. req.method: The HTTP method (GET, POST, PUT, DELETE, etc.).
// 3. req.headers: An object containing the request headers.
// 4. req.body: The body of the request, often used with POST and PUT requests.
// 5. req.query: An object containing the query parameters (if any).

// For instance, in a Node.js environment using Express.js, req would look something like this:
// javascript
// Copy code
// app.delete('/endpoint', (req, res) => {
//   console.log(req.url);       // '/endpoint?_id=123'
//   console.log(req.method);    // 'DELETE'
//   console.log(req.headers);   // { ...headers }
//   console.log(req.query);     // { _id: '123' }
//   console.log(req.body);      // The body content if any
// });
// For your specific case, assuming you are using a serverless function or a framework 
// like Next.js API routes, you might have a req object that contains similar properties. 