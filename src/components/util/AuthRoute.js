import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';



function AuthRoute({component : Component, ...rest}){

    const user = useSelector(state => state.user.user)
   

    return(

   <Route 
    {...rest}
    render={props => user ? <Redirect to="/"/> : <Component {...props}/>}

   />


    )
    


}


export default AuthRoute;