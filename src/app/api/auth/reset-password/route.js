import User from "@/models/userModel";
import { hashPassword } from "@/utils/hash";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { token, newPassword } = await req.json();
    await connectDB();

    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetTokenExpiryDate: { $gt: Date.now() },
    });

    if (!user)
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 400 },
      );

    user.password = await hashPassword(newPassword);
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpiryDate = undefined;
    await user.save();

    return NextResponse.json({ message: "Password reset successful" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
