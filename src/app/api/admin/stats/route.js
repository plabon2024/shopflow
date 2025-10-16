import dbConnect from "@/lib/db";

export async function GET() {
  try {
    const ordersCollection = dbConnect("orders");

    const orders = await ordersCollection.find().toArray();

    const totalRevenue = orders.reduce(
      (sum, order) => sum + (order.amountTotal || 0),
      0
    );

    const totalOrders = orders.length;
    const paidOrders = orders.filter((o) => o.paymentStatus === "paid").length;
    const pendingOrders = orders.filter((o) => o.paymentStatus === "pending").length;

    return Response.json(
      {
        success: true,
        stats: {
          totalRevenue,
          totalOrders,
          paidOrders,
          pendingOrders,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching stats:", error);
    return Response.json(
      { success: false, message: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
