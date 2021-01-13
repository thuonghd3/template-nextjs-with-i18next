import Layout from 'components/Layout';
// import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { NextPage, GetStaticProps } from 'next';
import { WithTranslation, withTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface IProps extends WithTranslation {
    namespacesRequired: string[];
}

const HomePage: NextPage<IProps> = ({ t }) => {
    return (
        <Layout>
            <h1>{t('hello')}</h1>
            <div>
                <Link href="/about">
                    <a className="py-4">About page</a>
                </Link>
            </div>
            <div>
                <Link href="/posts/123">
                    <a className="py-4">Post Page</a>
                </Link>
            </div>
        </Layout>
    );
};

export default withTranslation('common')(HomePage);

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common', 'header'])),
        title: 'Home page',
        description: 'This is desciption for home page',
    },
});
