import Link from 'next/link';
import { FC } from 'react';

const MenuNonLogin = (): JSX.Element => (
    <div>
        <Link href="/login">
            <a className="text-white p-1">Login</a>
        </Link>
    </div>
);

type MenuLoggedInProps = {
    onLogout: () => Promise<void>;
};

const MenuLogin: FC<MenuLoggedInProps> = ({ onLogout }) => (
    <div>
        <button className="focus:outline-none" onClick={onLogout} type="button">
            Logout
        </button>
    </div>
);

type MenuProps = {
    authToken: string | undefined;
    onLogout: () => Promise<void>;
};

const Menu: FC<MenuProps> = ({ authToken, onLogout }) => {
    if (authToken) {
        return <MenuLogin onLogout={onLogout} />;
    }
    return <MenuNonLogin />;
};

export default Menu;
