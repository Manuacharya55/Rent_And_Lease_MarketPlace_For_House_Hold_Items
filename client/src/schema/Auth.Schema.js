import { z } from "zod";

export const LoginSchema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .email({ message: "Invalid email address" }),
    password: z
        .string({ required_error: "Password is required" })
        .min(1, { message: "Password is required" }),
});

export const RegisterSchema = z.object({
    name: z.string({ required_error: "Name is required" }).min(1, { message: "Name is required" }),
    email: z
        .string({ required_error: "Email is required" })
        .email({ message: "Invalid email address" }),
    phonenumber: z.string({ required_error: "Phone number is required" }).min(10, { message: "Phone number must be at least 10 digits" }),
    password: z.string({ required_error: "Password is required" }).min(6, { message: "Password must be at least 6 characters" }),
    avatar: z.any().optional(),
});
