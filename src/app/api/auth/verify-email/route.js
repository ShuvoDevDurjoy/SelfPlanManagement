import connectDB from "@/db/connection";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    console.log("got email");
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");


    await connectDB();

    const user = await User.findOne({
      verificationToken: token,
      verificationExpiryDate: { $gt: Date.now() },
    });

    if (!user)
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 400 },
      );

    user.is_verified = true;
    user.verificationToken = undefined;
    user.verificationExpiryDate = undefined;
    await user.save();

    return NextResponse.json({ message: "Email verified successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
