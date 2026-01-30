import { z } from "zod";

export const UserSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    phonenumber: z.string().min(10, "Phone number must be at least 10 digits long"),
    password: z.string().min(6, "Password must be at least 6 characters long").max(20, "Password must be at most 20 characters long"),
    avatar: z.string().url("Invalid URL").optional(),
})

export const AddressSchema = z.object({
    address: z.string().min(10, "Address must be at least 10 characters long"),
    latitude: z.number(),
    longitude: z.number(),
    country: z.string().min(2, "Country must be at least 2 characters long"),
    state: z.string().min(2, "State must be at least 2 characters long"),
    district: z.string().min(2, "District must be at least 2 characters long"),
})

export const ProductSchema = z.object({
    name: z.string().min(3, "Product name must be at least 3 characters long"),
    description: z.string().min(10, "Description must be at least 10 characters long"),
    category: z.string().min(2, "Category must be at least 2 characters long"),
    price: z.number().min(1, "Price must be at least 1"),
    productImage: z.array(z.string().url("Invalid URL")),
})

export const ReviewSchema = z.object({
    rating: z.number().min(1, "Rating must be at least 1").max(5, "Rating must be at most 5"),
    comment: z.string().min(10, "Comment must be at least 10 characters long"),
})
