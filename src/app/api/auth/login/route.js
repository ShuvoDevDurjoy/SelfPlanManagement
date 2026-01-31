import connectDB from "@/db/connection";
import User from "@/models/userModel";
import { generateJWT } from "@/utils/generateToken";
import { comparePassword } from "@/utils/hash";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    await connectDB();

    const user = await User.findOne({ email }).select("+password");
    if (!user)
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 },
      );

    if (!user.is_verified)
      return NextResponse.json(
        { message: "Please verify your email" },
        { status: 403 },
      );

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch)
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 },
      );

    const token = generateJWT(user._id);

    const response = NextResponse.json({
      message: "Login successful",
      issuedAt: Date.now(),
      user: { id: user._id, name: user.name, email: user.email },
    });

    // ✅ SET COOKIE HERE
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax", 
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
