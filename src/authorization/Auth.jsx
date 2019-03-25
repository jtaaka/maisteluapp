import Cookies from "js-cookie";
import axios from 'axios';


    

    
    
export function refreshToken () {
    if(Cookies.get("token") !== undefined && window.location.pathname !== "/login"){
            axios.defaults.headers.common["token"] = Cookies.get("token");
            axios.get("tokenRefresh", "").then((resp) => {
            console.log(resp);
            if(resp.status === 200){
                console.log("true");
            } else {
                Cookies.remove("token");
                console.log("false");
                window.location.pathname = "/login";
            }
        }).catch((error) => {
            console.log(error);
            Cookies.remove("token");
            window.location.pathname = "/login";
        });
    } else {
        window.location.pathname = "/login";
    }
    
}

export function checkCookies() {
    let isLoggedIn = true;
    if(Cookies.get("token") === undefined){
        isLoggedIn = false;
    } 
    return isLoggedIn;
}
