// import dbConnect from "@/lib/dbConnect";
// import Cart from "@/models/Cart";
// import { getServerSession } from "next-auth";

// export default async function handler(req, res) {
//   if (req.method !== "POST") return res.status(405).end();
//   const session = await getServerSession(req, res);
//   if (!session) return res.status(401).end();

//   const { productId, quantity } = req.body;
//   await dbConnect();

//   let cart = await Cart.findOne({ userId: session.user.id });
//   if (!cart) {
//     cart = await Cart.create({ userId: session.user.id, items: [] });
//   }

//   const existing = cart.items.find((i) => i.productId.toString() === productId);
//   if (existing) {
//     existing.quantity += quantity;
//   } else {
//     cart.items.push({ productId, quantity });
//   }

//   await cart.save();
//   res.status(200).json({ success: true, cart: cart.items });
// }
