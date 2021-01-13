import { UserAuthInfo, userAuthInfoSchema } from '@lib/domain/user/schema';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useYupValidationResolver } from '@lib/helpers/validate';
import { useDispatch } from 'react-redux';
import { AppThunkDispatch } from '@lib/state/types';
import { AuthThunks } from '@lib/state/thunks';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { NextPage, GetStaticProps } from 'next';
import { WithTranslation, withTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Layout = dynamic(import('components/Layout'), { ssr: false });

interface IProps extends WithTranslation {
    namespacesRequired: string[];
}

const SignIn: NextPage<IProps> = ({ t }) => {
    const dispatch = useDispatch<AppThunkDispatch>();
    const validationSchema = useMemo(() => userAuthInfoSchema, []);
    const resolver = useYupValidationResolver(validationSchema);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        errors,
        formState: { isSubmitting },
    } = useForm<UserAuthInfo>({
        resolver,
    });
    const [formError, setFormError] = useState<string>('');
    const onSubmit = handleSubmit(async (data) => {
        try {
            setFormError('');
            await dispatch(AuthThunks.userLogin(data));
            router.push('/about');
        } catch (err) {
            setFormError(err.message);
        }
    });
    return (
        <Layout>
            <div className="flex items-center height-full-screen text-white bg-gray-300">
                <form
                    className="bg-gray-400 w-96 mx-auto flex flex-col"
                    onSubmit={onSubmit}
                >
                    <h1 className="mx-auto py-5 text-2xl">{t('login')}</h1>
                    <p className="mx-4">{`${t('email')}:`}</p>
                    <input
                        className="p-4 mx-4 my-2 text-black"
                        placeholder={t('email')}
                        type="text"
                        name="email"
                        ref={register}
                    />
                    {errors.email && (
                        <p className="py-2 mx-4 text-red-600">{errors.email}</p>
                    )}
                    <p className="mx-4 my-2">{`${t('password')}:`}</p>
                    <input
                        className="p-4 mx-4 text-black"
                        placeholder={t('password')}
                        type="password"
                        name="password"
                        ref={register}
                    />
                    {errors.password && (
                        <p className="py-2 mx-4 text-red-600">
                            {errors.password}
                        </p>
                    )}
                    <button
                        type="submit"
                        className="p-4 bg-blue-600 mx-4 my-4"
                        disabled={isSubmitting}
                    >
                        {t('login')}
                    </button>
                    {formError && (
                        <p className="py-2 mx-4 text-red-600">{formError}</p>
                    )}
                </form>
            </div>
        </Layout>
    );
};

export default withTranslation('login')(SignIn);

// export const getServerSideProps: GetServerSideProps = async () => {
//     return {
//         props: {
//             title: 'meta.login.title',
//             description: 'meta.login.description',
//             namespacesRequired: ['login', 'common', 'header'],
//         },
//     };
// };

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, [
            'common',
            'login',
            'header',
        ])),
        title: 'meta.login.title',
        description: 'meta.login.description',
    },
});
