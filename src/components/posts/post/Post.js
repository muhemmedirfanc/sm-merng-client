import React,{useState} from 'react'
import {gql,useQuery,useMutation} from '@apollo/client';
import {LinearProgress,Button, Grid,TextField, Zoom, Card, CardHeader,Avatar,IconButton,CardContent,Typography,CardActions, Container  } from '@material-ui/core';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import moment from 'moment';
import {Link} from 'react-router-dom';
import UseStyles from '../Styles'
import {useSelector} from 'react-redux'
import LikeButton from '../LikeButton';
import DeleteButton from '../DeleteButton';
import CreateIcon from '@material-ui/icons/Create';

function Post(props) {

  const onSubmit = (e)=>{
    e.preventDefault();
   
}

    const [comment, setComment] = useState('')

    const user = useSelector(state => state.user.user)
    const classes = UseStyles();

    const postId = props.match.params.postId;
    

   const  deletePostCallback = ()=>{

        props.history.push('/')

    }

    const {data} = useQuery(FETCH_POST_QUERY, {

        variables: {

            postId
        },onError(err){

        }
    })


    const [submitComment] = useMutation(CREATE_COMMENT_MUTATION,{

      update(){

        setComment('')

      },
      variables: {
        postId,
        body: comment

      },onError(){


      }


    })


let postMarkup;

if(!data){

    postMarkup = <LinearProgress />
}else{

    const {id, body, createdAt, username, likeCount, commentCount , likes, comments} = data.getPost;

   

    postMarkup = (
<Zoom in>
        <Container>
        
        <Grid style={{marginTop :30 }} >


       <Card >
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
           {username.charAt(0).toUpperCase()}
          </Avatar>
        }
       
        title={username}
        subheader={moment(createdAt).fromNow()}
      />
  
      <CardContent>
       
        <Typography variant="h6" component="p">
          {body}
        </Typography>

       
      </CardContent>
      <CardActions >
      <LikeButton post={{id, likes, likeCount}} />
        <IconButton size="small" color="primary" aria-label="comments" component={Link} to={`/post/${id}`}>
        {commentCount}  
        &nbsp;  <QuestionAnswerIcon />&nbsp;  &nbsp; 
        </IconButton>
        {user && user.username === username && <DeleteButton postId={id} callback={deletePostCallback} />}
        
      </CardActions>
      {user && (

        <Container>
<form onSubmit={onSubmit}>
      <TextField  style={{marginTop:20}} name="body" 
            type="text"
             variant="outlined" 
             label= "Create Comment"
             value={comment}
             onChange={e => setComment(e.target.value)}

                fullWidth />
                <Button disabled={comment.trim() === ''} onClick={submitComment} style={{marginTop:20,marginBottom:20,float:"right"}} variant="contained" color="primary"
                 size="small" 
                type="submit"  > <CreateIcon fontSize="small"/> &nbsp; Comment  </Button>
                </form>
      </Container>

      )}
      
     
       </Card>
      
        </Grid>
        

        {comments.map(comment =>(
            <Container key={comment.id} >
            <Grid  >
            
           <Card  style={{marginTop:20 ,marginBottom:20}} >

           <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {comment.username.charAt(0).toUpperCase()}
          </Avatar>
        }

        title={comment.username}
        subheader={moment(comment.createdAt).fromNow()}

      />
     <CardContent>
     {user && user.username === comment.username&& (
<DeleteButton  postId={id} commentId={comment.id} />



     )}
        <Typography variant="body2" color="textSecondary" component="p">
         {comment.body}
        </Typography>
      </CardContent>

           </Card>
</Grid>
 </Container>
        ))}

        </Container>
        </Zoom>

    )
}


    return postMarkup;
}


const CREATE_COMMENT_MUTATION = gql`

mutation($postId: ID!, $body: String!){

  createComment(postId: $postId, body: $body){

    id 
    comments{
      id body createdAt username 
    }
    commentCount

  }
}

`

const FETCH_POST_QUERY = gql`

query($postId: ID!){

getPost(postId: $postId){

    id body createdAt username likeCount
    likes{

        
        username
    }
    commentCount
    comments{
        id
        username
        createdAt
        body
    }
}

}


`

export default Post
