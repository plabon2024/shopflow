import dbConnect from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Basic validation
    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email and password are required" }),
        { status: 400 }
      );
    }

    const userCollection = await dbConnect("users");
    const existingUser = await userCollection.findOne({ email });

    if (!existingUser) {
      return new Response(
        JSON.stringify({ error: "Invalid email or password" }),
        { status: 401 }
      );
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ error: "Invalid email or password" }),
        { status: 401 }
      );
    }

    // Remove password before returning user info
    const { password: _, ...userWithoutPassword } = existingUser;

    return new Response(JSON.stringify(userWithoutPassword), { status: 200 });
  } catch (error) {
    console.error("Login error:", error);
    return new Response(
      JSON.stringify({ error: "Something went wrong during login." }),
      { status: 500 }
    );
  }
}
