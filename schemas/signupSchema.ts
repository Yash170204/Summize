import { z } from "zod";

const signupSchema = z.object({
    name: z.string() 
        .min(3, { message: "Name should be atleast 3 characters long" })
        .max(30, { message: "Name cannot exceed 30 characters" }),
    email: z.string()
        .email({ message: "Enter a valid email address" })
        .min(3, { message: "Enter a valid email address" })
        .max(50, { message: "Email cannot exceed 50 characters" }),
    password: z.string()
        .min(6, { message: "Password should be atleast 6 characters long" })
        .max(30, { message: "Password cannot exceed 30 characters" }),
    confirmPassword: z.string()
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
});

export default signupSchema;