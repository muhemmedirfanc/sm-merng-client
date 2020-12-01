import React,{useState} from 'react'
import {Paper,Typography,TextField,Container,Button,CircularProgress} from '@material-ui/core';
import UseStyles from './SignupStyles';
import {useMutation,gql} from '@apollo/client';
import {useDispatch} from 'react-redux';

import {useForm} from './util/hooks';
import {loginUser} from '../redux';

function SignUp(props) {

    const dispatch = useDispatch()

    const [errors, setErrors] = useState()
    const classes = UseStyles();


const {onChange,onSubmit,values} = useForm(registerUser, {
    username: '',
        email:'',
        password:'',
        confirmPassword:''
});

    const [addUser, {loading}] = useMutation(REGISTER_USER,{
        update(proxy,result){
            
            dispatch(loginUser(result.data.register))
            props.history.push('/')
        },
        onError(err){
            
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables: values
    })

 function registerUser(){

    addUser()

 }
   

    return (
<Container maxWidth="sm" className={classes.container}> 

<Paper className={classes.paper}>

<form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={onSubmit}  >


{errors ? <Typography variant="body2" color="secondary">{errors}</Typography> :  <Typography variant="h6" color="primary">Sign Up</Typography>}

 

<TextField  name="username" error={errors ? true : false} type="text" variant="outlined" label="username" value={values.username} onChange={onChange} fullWidth />
<TextField  name="email" error={errors ? true : false} type="email" variant="outlined" label="Email" value={values.email} onChange={onChange} fullWidth />
<TextField  name="password" error={errors ? true : false} type="password" variant="outlined" label="Password" value={values.password} onChange={onChange} fullWidth />
<TextField  name="confirmPassword" error={errors ? true : false} type="password" variant="outlined" label="Confirm Password" value={values.Confirmpassword} onChange={onChange} fullWidth />
<Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" >{loading?  <CircularProgress  size={20} color="secondary" />  : '' }    Submit  </Button>

</form>

   </Paper>

   

</Container>
  
    )
}


const REGISTER_USER = gql`
mutation register(

    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
){

register(

registerInput:{

    username: $username
    email: $email
    password: $password
    confirmPassword: $confirmPassword


}

){

id email username createdAt token

}


}

`

export default SignUp
