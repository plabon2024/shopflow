import dbConnect from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const user = await req.json();

    const existingUser = await dbConnect("users").findOne({ email: user.email });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), {
        status: 400,
      });
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = {
      name: user.name,
      email: user.email,
      password: hashedPassword,
      role: "user",
      image: "",
      provider: "credentials", // ✅ provider saved here
      createdAt: new Date(),
      isVerified: false,
      status: "active",
    };

    const result = await dbConnect("users").insertOne(newUser);

    return Response.json({ success: true, insertedId: result.insertedId });
  } catch (error) {
    console.error("Error registering user:", error);
    return new Response(
      JSON.stringify({ error: "Something went wrong during registration." }),
      { status: 500 }
    );
  }
}
