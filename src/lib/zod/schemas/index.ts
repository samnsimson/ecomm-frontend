import { z } from 'zod';

export const signInSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required'),
});

export const signupSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    email: z.string().min(1, 'Email is required').email('Email in invalid'),
    phone: z.string().min(1, 'phone is required'),
    password: z.string().min(3, 'Password must be at least 3 characters long').max(8, 'Password must be at most 8 characters long'),
});
