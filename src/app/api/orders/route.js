import dbConnect from "@/lib/db";



export async function POST(req) {
  try {
    const body = await req.json();
    const ordersCollection = dbConnect("orders");
    const productsCollection = dbConnect("product");

    // create order object (you can customize fields)
    const orderData = {
      userId: body.userId,
      items: body.items, // array of purchased products
      totalAmount: body.totalAmount,
      paymentMethod: body.paymentMethod,
      status: "Paid",
      createdAt: new Date(),
    };

    // insert into MongoDB
    const result = await ordersCollection.insertOne(orderData);

    // Decrease stock for each item in the order
    if (body.items && body.items.length > 0) {
      const stockUpdatePromises = body.items.map(async (item) => {
        return productsCollection.updateOne(
          { _id: item.productId }, // assuming productId is stored in items
          { $inc: { stock: -item.quantity } } // decrease stock by quantity purchased
        );
      });

      // Wait for all stock updates to complete
      await Promise.all(stockUpdatePromises);
    }

    return Response.json(
      { success: true, orderId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving order:", error);
    return Response.json(
      { success: false, message: "Failed to save order" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const ordersCollection = dbConnect("orders");

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    const query = userId ? { userId } : {};

    const orders = await ordersCollection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return Response.json({ success: true, orders }, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return Response.json(
      { success: false, message: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
