import dbConnect from "@/lib/db";

export async function GET(req) {
  try {
    const ordersCollection = dbConnect("orders");

    const { searchParams } = new URL(req.url);

    // Optional filters for admin
    const status = searchParams.get("status"); // e.g. ?status=Paid
    const limit = parseInt(searchParams.get("limit")) || 50; // default 50
    const page = parseInt(searchParams.get("page")) || 1;

    const query = status ? { status } : {};

    const orders = await ordersCollection
      .find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    const totalOrders = await ordersCollection.countDocuments(query);

    return Response.json(
      { 
        success: true, 
        orders,
        pagination: {
          total: totalOrders,
          page,
          limit,
          totalPages: Math.ceil(totalOrders / limit)
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching admin orders:", error);
    return Response.json(
      { success: false, message: "Failed to fetch admin orders" },
      { status: 500 }
    );
  }
}
