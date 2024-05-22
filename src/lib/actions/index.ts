'use server';
import { signIn } from '@/lib/auth';
import { AuthError } from 'next-auth';
import { gql } from '../graphql-client';
import { SignupDocument, SignupMutation, SignupMutationVariables } from '@/graphql/generated';
import { signupSchema } from '../zod/schemas';

const formDataToObject = (data: FormData) => {
    return Array.from(data.entries()).reduce((obj: Record<string, any>, [key, value]) => {
        obj[key] = value;
        return obj;
    }, {});
};

export const authenticate = async (_: string | undefined, formData: FormData) => {
    try {
        const username = formData.get('username');
        const password = formData.get('password');
        await signIn('credentials', { username, password, redirect: true });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
};

export const signup = async (data: SignupMutation['signup'] | undefined, formData: FormData) => {
    try {
        const signupData = formDataToObject(formData);
        const { username, email, phone, password } = await signupSchema.parseAsync(signupData);
        const variables: SignupMutationVariables = { input: { username, email, phone, password } };
        const { data } = await gql.request<SignupMutation, SignupMutationVariables>(SignupDocument, variables);
        return data.signup;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
