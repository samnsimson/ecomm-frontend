import { CreateProductMutationVariables, ShippingType } from '@/graphql/generated';
import { title } from 'process';
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

export const CreateProductDimensionsSchema = z.object({
    width: z.coerce.number().min(0).optional(),
    height: z.coerce.number().min(0).optional(),
    depth: z.coerce.number().min(0).optional(),
});

export const CreateProductSchema = z.object({
    title: z.string().min(1, 'Title cannot be empty'),
    description: z.string().min(1, 'Description is required'),
    brand: z.string().min(1, 'Please choose a value for brand'),
    retailPrice: z.coerce.number().min(0),
    salePrice: z.coerce.number().min(0),
    dimensions: CreateProductDimensionsSchema.optional(),
});

export const SettingsSchema = z.object({
    addressOne: z.string().optional().nullable(),
    addressTwo: z.string().optional().nullable(),
    city: z.string().optional().nullable(),
    state: z.string().optional().nullable(),
    country: z.string().optional().nullable(),
    zipcode: z.string().optional().nullable(),
    currency: z.string().optional().nullable(),
    email: z.string().optional().nullable(),
    phone: z.string().optional().nullable(),
    taxesEnabled: z.boolean().optional().nullable(),
    couponsEnabled: z.boolean().optional().nullable(),
    shippingEnabled: z.boolean().optional().nullable(),
    discountsEnabled: z.boolean().optional().nullable(),
});

export const ShippingsSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional().nullable(),
    type: z.enum([ShippingType.Free, ShippingType.Flat, ShippingType.Percentage]),
    amount: z.coerce.number().min(0).optional().nullable(),
    percentage: z.coerce.number().min(0).optional().nullable(),
});
