import { useContext } from "react";
import { httpContext } from "./http-context";

export default function useAuth(){
    const {auth,setAuth} = useContext(httpContext)

    const changeAuth = (auth) => {
        setAuth(auth)
    }

    return {auth,changeAuth}
}