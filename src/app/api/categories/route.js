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

//7:50
export async function DELETE(req) {
    mongoose.connect(process.env.MONGO_URL);
    // console.log(req.url); //url is by default (also query,search and etc...)
    const url = new URL(req.url) //pravim si go taka za da stane url na object
    const _id = url.searchParams.get('_id');
    console.log(url.searchParams) // i sega kato url e object moje da go popitame da ni vurne informaciqta v .searchParams koeto e neshto po default i moje da vidim rezultata tuk v TERMINAL
    await Category.deleteOne({_id});
    return Response.json(true);
}