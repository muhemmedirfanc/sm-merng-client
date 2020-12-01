import React,{useState} from 'react'
import {Paper,Typography,TextField,Container,Button,CircularProgress} from '@material-ui/core';
import UseStyles from './SignupStyles';
import {useMutation,gql} from '@apollo/client';
import {useDispatch} from 'react-redux';

import {useForm} from './util/hooks';
import {loginUser} from '../redux';


function Login(props) {

    const dispatch = useDispatch();

    const [errors, setErrors] = useState()
    const classes = UseStyles();


const {onChange,onSubmit,values} = useForm(signInUser, {
    username: '',    
        password:''
       
});

    const [signIn, {loading}] = useMutation(SIGNIN_USER,{
        update(proxy,result){
            dispatch(loginUser(result.data.login))
            props.history.push('/')
        },
        onError(err){
            
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables: values
    })

 function signInUser(){

   signIn()

 }
   

    return (
<Container maxWidth="sm" className={classes.container}> 

<Paper className={classes.paper} style={{marginTop:140}}>

<form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={onSubmit}  >


{errors ? <Typography variant="body2" color="secondary">{errors}</Typography> :  <Typography variant="h6" color="primary">Sign In</Typography>}

 

<TextField  name="username" error={errors ? true : false} type="text" variant="outlined" label="username" value={values.username} onChange={onChange} fullWidth />
<TextField  name="password" error={errors ? true : false} type="password" variant="outlined" label="Password" value={values.password} onChange={onChange} fullWidth />
<Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" >{loading?  <CircularProgress  size={20} color="secondary" />  : '' }    Sign In  </Button>

</form>

   </Paper>

   

</Container>
  
    )
}


const SIGNIN_USER = gql`
mutation login(

    $username: String!
    $password: String!
   
){

login(

    username: $username
    password: $password
    
){

id email username createdAt token

}


}

`

export default Login
