import connectDB from "@/db/connection";
import User from "@/models/userModel";


export async function GET(req) {
    try {
        await connectDB();

        const users = await User.find();

        return Response.json({
            success: true,
            message: "All the user has been retrieved successfully", 
            users: users
        }, { status: 200 });
    } catch (e) {
        return Response.json({
            success: false,
            message: "Error while fetching users"
        }, { status: 500 });
    }
}


export async function POST(req) {
    try {
        await connectDB();

        const body = await req.json();

        console.log(body);

        const { name, email, password } = body;

        const user = await User.create({
            name, 
            email, 
            password
        })

        if (!user) {
            return Response.json({
                success: false,
                message: "User Can not be created"
            }, { status: 500 });
        }


        return Response.json({
            success: true,
            message: "User has been created successfully", 
            user: user
        }, { status: 201 });


    } catch (e) {
        console.log("Error while creating user", e);

        return Response.json({
            success: false,
            message: "Error while creating the user",
            error: e.message
        }, { status: 500 });
    }
}