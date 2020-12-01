import {LOGIN,LOGOUT} from './userType';
import jwtDecode from 'jwt-decode';

const initialState= {

    user: null
}

if(localStorage.getItem('jwtToken')){

    const decodedToken =jwtDecode(localStorage.getItem('jwtToken'))

    if(decodedToken.exp * 1000 < Date.now()){

        localStorage.removeItem('jWtToken')
    }else{

        initialState.user = decodedToken;
    }

}

const userReducer = (state = initialState,action)=>{

    switch(action.type){

        case LOGIN:
            return{

                ...state,
                user: action.payload
            }
        case LOGOUT:
            return{

                ...state,
                user: null

            }    

        default:
            return state;

    }


}

export default userReducer;