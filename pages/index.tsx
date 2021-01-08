import { FC } from 'react';
import Link from 'next/link';
// import { GetServerSideProps } from 'next';
import { TFunction } from 'next-i18next';
import { withTranslation } from 'i18n';

interface IProps {
    t: TFunction;
    namespacesRequired: string[];
}

const HomePage: FC<IProps> = ({ t }) => {
    return (
        <>
            <div>{t('hello')}</div>
            <Link href="/about">
                <a>About page</a>
            </Link>
            <br />
            <Link href="/posts/123">
                <a>Post Page</a>
            </Link>
        </>
    );
};

export default withTranslation('common')(HomePage);

HomePage.defaultProps = {
    namespacesRequired: ['common'],
};

// export const getServerSideProps: GetServerSideProps = async () => {
//     return {
//         props: {
//             title: 'aaaa',
//             description: 'bbbb',
//         },
//     };
// };
