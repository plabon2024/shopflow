
import dbConnect from "@/lib/db";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route";


export async function GET(request) {
  try {
    const collection = await dbConnect("product");
  const session = await getServerSession(authOptions)
    console.log(session, "from server");
    const popularProducts = await collection
      .aggregate([{ $sample: { size: 4 } }])
      .toArray();

    return Response.json({ data: popularProducts });
  } catch (err) {
    console.error(err);
    return Response.json(
      { data: [], error: "Failed to fetch popular products" },
      { status: 500 }
    );
  }
}
