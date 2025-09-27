// import dbConnect from "@/lib/dbConnect";
// import Cart from "@/models/Cart";
// import { getServerSession } from "next-auth";

// export default async function handler(req, res) {
//   if (req.method !== "POST") return res.status(405).end();
//   const session = await getServerSession(req, res);
//   if (!session) return res.status(401).end();

//   const { items } = req.body;
//   await dbConnect();

//   let cart = await Cart.findOne({ userId: session.user.id });
//   if (!cart) cart = await Cart.create({ userId: session.user.id, items: [] });

//   items.forEach((item) => {
//     const existing = cart.items.find((i) => i.productId.toString() === item.productId);
//     if (existing) {
//       existing.quantity = Math.max(existing.quantity, item.quantity);
//     } else {
//       cart.items.push({ productId: item.productId, quantity: item.quantity });
//     }
//   });

//   await cart.save();
//   res.status(200).json({ cart: cart.items });
// }
