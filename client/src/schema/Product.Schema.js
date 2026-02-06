import { z } from "zod";

export const ProductSchema = z.object({
    name: z.string({ required_error: "Product name is required" }),
    description: z.string({ required_error: "Product description is required" }),
    category: z.string({ required_error: "Product category is required" }),
    price: z.number({ required_error: "Product price is required" }).min(50,"price must be at least 50"),
});
