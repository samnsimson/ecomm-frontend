import { z } from 'zod';

export const signInSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(3, 'Password must be at least 3 characters long').max(8, 'Password must be at most 8 characters long'),
});

export const signupSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    email: z.string().min(1, 'Email is required').email('Email in invalid'),
    phone: z.string().min(1, 'phone is required'),
    password: z.string().min(3, 'Password must be at least 3 characters long').max(8, 'Password must be at most 8 characters long'),
});

export const ProfileSchema = z.object({
    firstName: z.string().min(1, 'First Name is required'),
    lastName: z.string().optional().nullable(),
    addressOne: z.string().min(1, 'Address is required'),
    addressTwo: z.string().optional().nullable(),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    country: z.string().min(1, 'Country is required'),
    zipcode: z.string().min(1, 'Zipcode is required'),
});
