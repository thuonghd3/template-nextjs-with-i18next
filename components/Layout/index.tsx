import { FC, ReactNode } from 'react';
// import { TFunction } from 'next-i18next';
import Header from './Header';

export interface Props {
    home?: boolean;
    className?: string;
    classHeader?: string;
    children: ReactNode | Element;
    // t: TFunction;
}

const Layout: FC<Props> = ({ children, className, classHeader }) => {
    return (
        <>
            <div className={`flex flex-col ${className || ''}`}>
                <Header className={classHeader} />
                <main>{children}</main>
            </div>
        </>
    );
};

export default Layout;
