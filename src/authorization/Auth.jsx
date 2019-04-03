import Cookies from "js-cookie";
import axios from 'axios';


    
export function removeCookies(){
    Cookies.remove("token");
    Cookies.remove("user");
    Cookies.remove("id");
}
    
  
export function refreshToken () {
    if(checkCookies() && window.location.pathname !== "/login"){
            axios.defaults.headers.common["token"] = Cookies.get("token");
            axios.get("tokenRefresh", "").then((resp) => {
            console.log(resp);
            if(resp.status === 200){
                console.log("true");
            } else {
                removeCookies();
                console.log("false");
                window.location.pathname = "/login";
            }
        }).catch((error) => {
            console.log(error);
            removeCookies();
            window.location.pathname = "/login";
        });
    } else {
        window.location.pathname = "/login";
    }
    
}

export function checkCookies(){
    if(Cookies.get("token") === undefined || Cookies.get("user") === undefined || Cookies.get("id") === undefined){
        return false;
    }
    return true;
}