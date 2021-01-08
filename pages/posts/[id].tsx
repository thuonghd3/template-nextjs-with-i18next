import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { TFunction } from 'next-i18next';
import { withTranslation } from 'i18n';

interface IProps {
    post?: {
        id: string;
        name: string;
    };
    t: TFunction;
    namespacesRequired: string[];
}

const Post: NextPage<IProps> = ({ post, t }) => {
    return (
        <div>
            <div>{t('hello')}</div>
            <Link href="/">
                <a>Home</a>
            </Link>
            <br />
            Post name:&nbsp;
            {post && post.name}
            <br />
            post id &nbsp;
            {post && post.id}
        </div>
    );
};

export default withTranslation('common')(Post);

Post.defaultProps = {
    namespacesRequired: ['common'],
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const res = await new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                name: 'post 1',
                id: params && params.id ? params.id : '',
            });
        }, 1000);
    });
    return {
        props: {
            post: res,
            title: 'Post 1',
            description: 'this is description post 1',
        },
    };
};
