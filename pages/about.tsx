import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { TFunction } from 'next-i18next';
import { withTranslation } from 'i18n';

interface IProps {
    namespacesRequired: string[];
    t: TFunction;
}

const AboutPage: NextPage<IProps> = ({ t }) => {
    return (
        <>
            <Link href="/">
                <a>Home</a>
            </Link>
            <div>{t('hello')}</div>
            <div>About page</div>
        </>
    );
};

export default withTranslation('common')(AboutPage);

AboutPage.defaultProps = {
    namespacesRequired: ['common'],
};

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        props: {
            title: 'About Page',
            description: 'This is description about page',
        },
    };
};
