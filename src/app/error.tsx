'use client';

import { signOut } from 'next-auth/react';
import { FC } from 'react';

const parseError = (error: string) => {
    try {
        const err = JSON.parse(error);
        return err;
    } catch (error) {
        return error;
    }
};

const ErrorBoundry: FC<{ error: Error }> = ({ error }) => {
    const errors = parseError(error.message);

    if (typeof errors === 'string') return <div>ErrorBoundry</div>;

    for (const err of errors) {
        if ('code' in err && err.code === 'UNAUTHENTICATED') signOut();
    }

    return <div>Object error</div>;
};
export default ErrorBoundry;
