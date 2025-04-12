export interface AuthResponse {
    jwt: string;
    message: string;
    role: string;
}

export interface ApiResponse {
    message: string;
    status: boolean;
}

export interface SignupRequest {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    // navigate?: any; // This wasn't in your Spring Boot model but in your original React interface
}

export interface AuthState {
    jwt: string | null;
    role: string | null;
    loading: boolean;
    error: string | null;
    otpSent: boolean;
}

// New interfaces based on your Spring Boot DTOs

export interface AddItemRequest {
    size: string;
    quantity: number;
    productId: number; // Long in Java maps to number in TypeScript
}

export interface CreateProductRequest {
    title: string;
    description: string;
    mrpPrice: number;
    sellingPrice: number;
    color: string;
    images: string[];
    category: string;
    category2: string;
    category3: string;
    sizes: string;
}