"use client";
import { useState } from "react";
import UploadImage from "@/components/UploadImage";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function CreateProduct() {
  const [imageUrl, setImageUrl] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = {
      image: imageUrl,
      name: e.target.name.value,
      category: e.target.category.value,
      price: parseFloat(e.target.price.value),
      stock: parseInt(e.target.stock.value),
      description: e.target.description.value,
    };

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    if (res.ok) {
      toast.success("product added  successfully !");

      e.target.reset();
      setImageUrl("");
    } else {
      toast.error("Something went wrong !");
    }
  };

  return (
    <Card className="max-w-lg mx-auto mt-10 shadow-lg">
      <CardHeader>
        <h2 className="text-xl font-semibold">Add New Product</h2>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="flex flex-col gap-6">
     
          <div className="mb-4">
            <Label>Product Image</Label>
            <UploadImage onUpload={setImageUrl} />
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover rounded-md border"
              />
            )}
          </div>
          <div className="mb-4">
            <Label>Product Name</Label>
            <Input name="name" placeholder="Product Name" required />
          </div>
          <div className="mb-4">
            <Label>Category</Label>
            <Input name="category" placeholder="Category" required />
          </div>
          <div className="grid grid-cols-2 gap-6 mb-4">
            {" "}
            {/* added mb-4 and increased gap */}
            <div>
              <Label>Price</Label>
              <Input name="price" type="number" placeholder="Price" required />
            </div>
            <div>
              <Label>Stock</Label>
              <Input name="stock" type="number" placeholder="Stock" required />
            </div>
          </div>
          <div className="mb-4">
            <Label>Description</Label>
            <Textarea name="description" placeholder="Description" required />
          </div>
        </CardContent>

        <CardFooter>
          <Button type="submit" className="w-full">
            Add Product
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
