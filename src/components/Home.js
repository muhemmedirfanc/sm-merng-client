import React from 'react'
import { useQuery } from '@apollo/client';
import {CircularProgress,Grid,Container,AppBar,Typography,Zoom } from '@material-ui/core'
import useStyles from './HomeStyle'
import Post from './posts/Post.js'
import {useSelector} from 'react-redux';
import PostForm from './posts/PostForm';
import {FETCH_POSTS_QUERY} from './util/graphql'
function Home() {

  const user = useSelector(state => state.user.user)
  const classes = useStyles();
    const { data} = useQuery(FETCH_POSTS_QUERY);
    

    
    return (


      
      !data ? <CircularProgress className={classes.root}  />:(
<Zoom in>

<Container maxwidth="lg">



<AppBar className={classes.appBar} position="static" color="inherit">

    <Typography className={classes.heading} variant="h4" align="center">Recent Posts</Typography>
    {/* <img className={classes.image} src={memories} alt="memories" height="60" /> */}

</AppBar>

{user &&(


  
        
        

  <Grid  
    style={{ padding: 30 }}>
          
          <PostForm/>
          
        </Grid>
 
   



)}


        <Grid  container   
   style={{marginTop :20}}>{

          data.getPosts && data.getPosts.map(post => (
          
          <Grid container   direction="column"  justify="space-evenly"
   alignItems="stretch"  item key={post.id} xs={12} sm={6} md={4} style={{ padding: 30 }}>
          
        
          <Post post={post}/>

        </Grid>
         
         

       ))


        }
       
     
       
       
        </Grid>


        </Container>
        </Zoom>
      )
    
    )
}



export default Home;
