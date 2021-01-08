export type AuthToken = {
    access_token: string;
    token_type: string;
};


export const enum UserRole {
    customer = 'customer',
    administrator = 'administrator',
    financer = 'financer',
    talentmanager = 'talentmanager',
}

export const enum UserStatus {
    active = 'active',
    inactive = 'inactive',
    deleted = 'deleted',
}

export const enum AccountType {
    user = 'user',
    talent = 'talent',
}

export interface User {
    email: string;
    phone_number: string | null;
    address: string | null;
    status: string;
    id: string;
    name: string | null | undefined;
}

export interface Currency {
    currencyName: string;
    currencySymbol?: string;
    id: string;
}

export type ArrayCurrency = Map<string, Currency>;
