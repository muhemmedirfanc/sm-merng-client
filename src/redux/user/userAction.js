import {LOGIN,LOGOUT} from './userType';


export const loginUser = (userData)=>{

localStorage.setItem("jwtToken", userData.token)

return{

type: LOGIN,
payload: userData

}

}

export const logoutUser = ()=>{

    localStorage.removeItem("jwtToken");

return{

    type:LOGOUT
}

}