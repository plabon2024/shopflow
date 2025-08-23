import dbConnect from "@/lib/db";

export async function GET(request) {
  const data = await dbConnect("product").find().toArray();
  return Response.json({ data });
}

export async function POST(request) {
  try {
    const body = await request.json(); // parse JSON from request body

    // Basic validation
    if (!body.name || !body.price) {
      return Response.json(
        { error: "Name and Price are required fields." },
        { status: 400 }
      );
    }

    const result = await dbConnect("product").insertOne({
      image: body.image || "",
      name: body.name,
      category: body.category || "Uncategorized",
      rating: body.rating || 0,
      description: body.description || "",
      price: body.price,
      stock: body.stock ?? 0,
      createdAt: new Date(),
    });

    return Response.json(
      { message: "Product added successfully", productId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/products error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
