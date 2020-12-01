import React from 'react';
import {AppBar,Toolbar,Typography,Button } from '@material-ui/core'
import useStyles from './Styles';
import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {logoutUser} from '../redux';


function Header() {

  const logout = ()=>{

    dispatch(logoutUser())
  }

  const user = useSelector(state => state.user);

  const classes = useStyles()
  const dispatch = useDispatch()

const Header = user.user ? ( <div className={classes.root}>
  <AppBar position="static" color="primary">
    <Toolbar>

      <Typography variant="h6" className={classes.title}>
      <Button color="inherit" component={Link} to="/">{user.user.username}</Button>
      </Typography>
     
      <Button color="inherit" onClick={logout}  component={Link} to="/">Logout</Button>
      
    </Toolbar>
  </AppBar>
</div>) :

( <div className={classes.root}>
  <AppBar position="static" color="primary">
    <Toolbar>

      <Typography variant="h6" className={classes.title}>
      <Button color="inherit" component={Link} to="/">Home</Button>
      </Typography>
      <Button color="inherit" component={Link} to="/signup">SignUp</Button>
      <Button color="inherit" component={Link} to="/login">Login</Button>
      
    </Toolbar>
  </AppBar>
</div>)

    return Header
}

export default Header
