import { createContext } from "react";
import { User } from "../models/user.model";

interface AuthContextType {
    // user: any;
    signin: (user: User, token:string ,callback: VoidFunction) => void;
    signout: (callback: VoidFunction) => void;
    isUserTokenValid: () => boolean;
    getUserInfo: () => User;
    getUserToken: () => string;
}

export const AuthContext = createContext<AuthContextType>(null!);

