export interface User {
    id: string;
    email?: string;
    name?: string;
    profile_image?: string;
    role?: string;
}

export interface UserLogin {
    id: string;
    password: string;
}