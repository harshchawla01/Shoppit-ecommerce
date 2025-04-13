export interface Address {
    id?: number;
    name: string;
    locality: string;
    address: string;
    city: string;
    state: string;
    postalCode: string; // changed from pinCode to match backend
    phone: string; // changed from mobile to match backend
}

// Update UserRole to match Keycloak roles
// These roles will be prefixed with "ROLE_" by your JwtAuthConverter
export enum UserRole {
    ROLE_admin = 'ROLE_admin',
    ROLE_user = 'ROLE_user',
    ROLE_seller = 'ROLE_seller'
}

// Update User to match backend fields exactly
export interface User {
    id?: number;
    username: string; // changed from fullName
    email: string;
    firstName: string; // new field to match backend
    lastName: string; // new field to match backend
    phone?: string; // changed from mobile to match backend
    role?: UserRole; // This will come from Keycloak via JwtAuthConverter
    addresses?: Set<Address>; // Changed from array to Set to match backend
}

export interface UserState {
    user: User | null;
    loading: boolean;
    error: string | null;
    profileUpdated: boolean;
}