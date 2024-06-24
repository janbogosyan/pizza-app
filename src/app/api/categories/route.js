import mongoose from "mongoose";
import { Category } from "../../../models/Category";

export async function POST(req) {
    mongoose.connect(process.env.MONGO_URL);
    const { name } = await req.json();
    //we put categoryDoc like variable so we can return it if needeed
    const categoryDoc = await Category.create({ name });
    return Response.json(categoryDoc);
}

//5:59:00
export async function PUT(req) {
    mongoose.connect(process.env.MONGO_URL);
    const { _id, name } = await req.json();
    await Category.updateOne({ _id }, { name });
    return Response.json(true);
}

//here we making end point to app/categories/page.js inside useEffect we gonna use this endpoint
export async function GET() {
    mongoose.connect(process.env.MONGO_URL);
    return Response.json(
        await Category.find()
    )
}