import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux"
import { setLogin } from "../store/authSlice";

export const CheckLoginCookie=()=>{
    const dispatch = useDispatch()
    const [cookies, setCookie, removeCookie] = useCookies(['login']);

    useEffect(()=>{         
        dispatch(setLogin(cookies.login)) 

    },[])

    return(<></>)
}


export default {};