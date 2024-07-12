export async function POST(req) {
    const data = await req.formData();
    if (data.get('file')) {     //if we have the file we get it and upload it
        //AWS s3 video 3:44:00
        // console.log('we have the file', data.get('file'));
    }
    // console.lod(data); // tozi console.log nqmam ideq zashto mi pravi problemi ?? i ot nego izliza error
    return Response.json(true);
}

