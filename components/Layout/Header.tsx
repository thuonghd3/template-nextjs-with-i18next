import { FC, useCallback } from 'react';
import { WithTranslation, withTranslation } from 'next-i18next';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { AppThunkDispatch } from '@lib/state/types';
import { AuthThunks } from '@lib/state/thunks';
import { useRouter } from 'next/router';
import { useAuthToken } from 'components/hooks/auth';

import Menu from './Menu';

interface Props extends WithTranslation {
    className?: string;
}

const Header: FC<Props> = ({ className, t }) => {
    const authToken = useAuthToken();
    const router = useRouter();

    const dispatch = useDispatch<AppThunkDispatch>();

    const onLogout = useCallback(async () => {
        await dispatch(AuthThunks.userLogOut());
    }, [dispatch]);

    return (
        <div className={`${className} bg-blue-500`}>
            <div className="container flex justify-between h-16 items-center mx-auto">
                <Link href="/">
                    <a className="hover:no-underline text-4xl text-white">
                        Home
                    </a>
                </Link>
                <div className="flex items-center">
                    <Link
                        href="/"
                        locale={router.locale === 'en' ? 'de' : 'en'}
                    >
                        <button
                            type="button"
                            className="text-white focus:outline-none mx-3 border rounded p-2"
                        >
                            {t('change_locale')}
                        </button>
                    </Link>
                    <Menu authToken={authToken} onLogout={onLogout} />
                </div>
            </div>
        </div>
    );
};

export default withTranslation('header')(Header);
