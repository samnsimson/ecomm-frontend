'use client';
import { Alert } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useCreateProfileMutation, useGetUserQuery, useUpdateProfileMutation } from '@/graphql/generated';
import { ProfileSchema } from '@/lib/zod/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { FC, HTMLAttributes, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface ProfileFormProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

type ProfileType = z.infer<typeof ProfileSchema>;

export const ProfileForm: FC<ProfileFormProps> = ({ ...props }) => {
    const { data: session } = useSession();
    const { data: userData, refetch: refetchUser } = useGetUserQuery({ variables: { id: session?.user.id as string } });
    const [createProfile] = useCreateProfileMutation();
    const [updateProfile] = useUpdateProfileMutation();
    const [updating, setUpdating] = useState(false);

    const form = useForm<ProfileType>({ resolver: zodResolver(ProfileSchema) });

    const handleSubmit = async (input: ProfileType) => {
        try {
            setUpdating(true);
            if (!userData) return;
            const { id: userId } = userData.user;
            if (!userId) return;
            if (userData.user.profile) await updateProfile({ variables: { input: { id: userData.user.profile.id, ...input } } });
            else await createProfile({ variables: { userId, input } });
            refetchUser();
        } catch (error) {
            console.log('🚀 ~ handleSubmit ~ error:', error);
            toast.error('Oops!', { description: 'Something went wrong.' });
        } finally {
            setUpdating(false);
            toast.success('Success!', { description: 'Profile updated successfully!' });
        }
    };

    useEffect(() => {
        if (userData) {
            form.setValue('firstName', userData.user.profile?.firstName || '');
            form.setValue('lastName', userData.user.profile?.lastName || '');
            form.setValue('addressOne', userData.user.profile?.addressOne || '');
            form.setValue('addressTwo', userData.user.profile?.addressTwo || '');
            form.setValue('city', userData.user.profile?.city || '');
            form.setValue('state', userData.user.profile?.state || '');
            form.setValue('country', userData.user.profile?.country || '');
            form.setValue('zipcode', userData.user.profile?.zipcode || '');
        }
    }, [form, userData]);

    return (
        <div {...props}>
            {userData && !userData.user.profile && (
                <Alert variant="destructive" className="mb-6">
                    Your profile is missing some information. Update it now!
                </Alert>
            )}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="grid grid-cols-2 gap-6">
                    <FormItem className="col-span-2">
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                            <Input readOnly value={userData?.user.username} className="read-only:bg-secondary" />
                        </FormControl>
                    </FormItem>
                    <FormItem>
                        <FormLabel className="flex items-center justify-between">
                            <span>Email</span>
                            <Badge variant={userData?.user.emailVerified ? 'success' : 'warning'}>
                                {userData?.user.emailVerified ? 'Verified' : 'Not Verified'}
                            </Badge>
                        </FormLabel>
                        <FormControl>
                            <Input readOnly value={userData?.user.email} className="read-only:bg-secondary" />
                        </FormControl>
                    </FormItem>
                    <FormItem>
                        <FormLabel className="flex items-center justify-between">
                            <span>Phone</span>
                            <Badge variant={userData?.user.phoneVerified ? 'success' : 'warning'}>
                                {userData?.user.phoneVerified ? 'Verified' : 'Not Verified'}
                            </Badge>
                        </FormLabel>
                        <FormControl>
                            <Input readOnly value={userData?.user.phone} className="read-only:bg-secondary" />
                        </FormControl>
                    </FormItem>
                    <Separator className="col-span-2" />
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field: { value, ...rest } }) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input type="text" value={value ?? ''} {...rest} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="addressOne"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address line one</FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="addressTwo"
                        render={({ field: { value, ...rest } }) => (
                            <FormItem>
                                <FormLabel>Address line two</FormLabel>
                                <FormControl>
                                    <Input type="text" value={value ?? ''} {...rest} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>State</FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Country</FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="zipcode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Zipcode</FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="col-span-2" size="lg" variant="default" disabled={updating}>
                        Update Profile
                    </Button>
                </form>
            </Form>
        </div>
    );
};
