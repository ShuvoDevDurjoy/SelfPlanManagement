import { NextResponse } from "next/server";
import { hashPassword } from "@/utils/hash";
import { generateVerificationToken } from "@/utils/generateToken";
import { sendEmail } from "@/utils/email";
import connectDB from "@/db/connection";
import User from "@/models/userModel";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return NextResponse.json({ message: "Email already exists" }, { status: 400 });

    const hashedPassword = await hashPassword(password);
    const verificationToken = generateVerificationToken();

    await User.create({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verificationExpiryDate: Date.now() + 24 * 60 * 60 * 1000,
    });

    const verificationLink = `${process.env.CLIENT_URL}/api/auth/verify-email?token=${verificationToken}`;

    await sendEmail({
      to: email,
      subject: "Verify your email",
      html: `<p>Click to verify your email:</p><a href="${verificationLink}">${verificationLink}</a>`,
    });

    return NextResponse.json({ message: "Signup successful. Please verify email." }, { status: 201 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
