import dbConnect from "@/lib/db";
import { getServerSession } from "next-auth";



export default async function handler(req, res) {
  const session = await getServerSession(req, res);
  if (!session) return res.status(401).json({ message: "Not logged in" });


  res.status(200).json({ cart: cart?.items || [] });
}
