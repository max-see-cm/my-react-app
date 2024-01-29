import { useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import { User } from "../models/user.model";
import { useQueries, useQueryClient } from "react-query";

function AuthProvider({ children }: { children: React.ReactNode }) {

    const queryClient = useQueryClient();


    let signin = (newUser: User, token: string, callback: VoidFunction) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(newUser));

        axios.defaults.headers.common['Authorization'] = `bearer ${token}`;
        queryClient.invalidateQueries();
        callback();
    };

    let signout = async (callback: VoidFunction) => {

        localStorage.clear();
        queryClient.clear();
        delete axios.defaults.headers.common["Authorization"];
        callback();
    };

    let getUserInfo = () => {
        let user = localStorage.getItem('user');
        if (user !== null && user !== "") {
            return JSON.parse(user);
        }

        return null;
    }


    let isUserTokenValid = () => {
        if (localStorage.getItem('token') !== null && localStorage.getItem('token') !== "") {
            return true;
        }
        return false;
    }

    let getUserToken = () => {
        let tokenAuthorisation = localStorage.getItem('token')
        if (tokenAuthorisation) {
            return tokenAuthorisation
        } else {
            return ""
        }
    }

    let value = { getUserInfo, signin, signout, isUserTokenValid, getUserToken };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;