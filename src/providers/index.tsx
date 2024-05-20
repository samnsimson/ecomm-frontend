import { FC, PropsWithChildren } from 'react';
import { UIProvider } from './ui-provider';

const Providers: FC<PropsWithChildren> = ({ children }) => {
    return <UIProvider>{children}</UIProvider>;
};

export default Providers;
