import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Header from './components/Header';
import Post from './components/posts/post/Post'

import {Provider} from 'react-redux';
import store from './redux/store';
import AuthRoute from './components/util/AuthRoute';



function App() {
  return (
    <Provider store={store}>
  <Router>
    <Header/>
    <Route exact path='/' component={Home} />
    <AuthRoute exact path='/login' component={Login} />
    <AuthRoute exact path='/signUp' component={SignUp} />
    <Route  exact path='/post/:postId' component={Post} />
  </Router>
  </Provider>
  );
}

export default App;
