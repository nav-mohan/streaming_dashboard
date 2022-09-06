import { createContext } from "react";
import useLocalStorage from "./useLocalStorage";
import { authStateLocalStorageKey } from "./config";

export const AuthContext = createContext();

export const AuthContextProvider = function(props){
    const [authState,setAuthState] = useLocalStorage(authStateLocalStorageKey,{'username':'lalal','jwt':'aksjhdiasy','exp':100000000000});

    return (
        <AuthContext.Provider value = {{authState,setAuthState}}>
            {props.children}
        </AuthContext.Provider>

    )
}