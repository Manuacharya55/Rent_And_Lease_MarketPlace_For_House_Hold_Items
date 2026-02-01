import { z } from "zod";

export const ProductSchema = z.object({
    name: z.string({ required_error: "Product name is required" }),
    description: z.string({ required_error: "Product description is required" }),
    category: z.enum(
        [
            "Kitchen",
            "Bedroom",
            "Electronics",
            "Bathroom",
            "Furniture",
            "Kitchenware",
            "Clothing",
            "Laundry Care",
            "Decor",
            "garden",
        ],
        {
            // required_error: "Product category is required",
            invalid_type_error: "Invalid category",
        }
    ),
    price: z.number({ required_error: "Product price is required" }),
});
