import dbConnect from "@/lib/db";
import { ObjectId } from "mongodb";

import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = params; // get id from URL
    console.log(id);
    if (!id) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const product = await dbConnect("product").findOne({
      _id: new ObjectId(id),
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ product });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
