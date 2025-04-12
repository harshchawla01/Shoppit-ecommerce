export interface Address {
    id?: number;
    name: string;
    locality: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    phone: string;
}

export enum UserRole {
    ROLE_admin = 'ROLE_admin',
    ROLE_user = 'ROLE_user',
    ROLE_seller = 'ROLE_seller'
}

export interface User {
    id?: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    role?: UserRole;
    addresses?: Set<Address>;
}

export interface UserState {
    user: User | null;
    loading: boolean;
    error: string | null;
    profileUpdated: boolean;
}