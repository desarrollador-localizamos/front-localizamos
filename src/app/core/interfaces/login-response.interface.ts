import { User } from "./user.interface";

export interface LoginResponse{
    user: User;
    token: string;
    success: boolean;
    message: string;
    status_code: number;
 
}

