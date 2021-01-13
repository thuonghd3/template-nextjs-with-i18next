import { GetStaticProps, NextPage } from 'next';
import { WithTranslation, withTranslation } from 'next-i18next';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface IProps extends WithTranslation {
    namespacesRequired: string[];
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

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
        title: 'About page',
        description: 'This is desciption for the About page',
    },
});
