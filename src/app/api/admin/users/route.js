import dbConnect from "@/lib/db";

export async function GET() {
  try {
    const usersCollection = dbConnect("users");

    const users = await usersCollection
      .find({}, { projection: { password: 0 } }) // exclude passwords
      .toArray();

    const totalUsers = users.length;

    return Response.json({ success: true, users, totalUsers }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return Response.json(
      { success: false, message: "Failed to fetch users" },
      { status: 500 }
    );
  }
}