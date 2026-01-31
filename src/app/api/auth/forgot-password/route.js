import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import { generateVerificationToken } from "@/lib/utils/generateToken";
import { sendEmail } from "@/lib/utils/email";

export async function POST(req) {
  try {
    const { email } = await req.json();
    await connectDB();

    const user = await User.findOne({ email });
    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    const resetToken = generateVerificationToken();

    user.passwordResetToken = resetToken;
    user.passwordResetTokenExpiryDate = Date.now() + 15 * 60 * 1000;
    await user.save();

    const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

    await sendEmail({
      to: email,
      subject: "Reset your password",
      html: `<p>Reset your password:</p><a href="${resetLink}">${resetLink}</a>`,
    });

    return NextResponse.json({ message: "Password reset email sent" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
