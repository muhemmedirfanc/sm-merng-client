import React from 'react'
import {Card,CardHeader,Grid,CardContent,CardActions,Avatar,IconButton,Typography,Zoom} from '@material-ui/core';
import UseStyles from './Styles';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux'
import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton'
import moment from 'moment';

function Post({post: {body, createdAt, id, username, likeCount,commentCount, likes}}) {

  const user = useSelector(state => state.user.user)

  

  const classes = UseStyles();
 



    return (
<Zoom in>

<Grid  >
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
        {user && user.username === username && <DeleteButton postId={id} />}
      </CardActions>
       </Card>
       </Grid>
       </Zoom>
        
    )
}

export default Post
