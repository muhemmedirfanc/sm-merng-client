import React,{useState} from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import {IconButton,Button,Dialog,DialogActions,DialogContent,DialogTitle} from '@material-ui/core';
import {useMutation,gql} from '@apollo/client';
import {FETCH_POSTS_QUERY} from '../util/graphql';

 function DeleteButton({postId,commentId,callback}) {

   
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION

const [deletePostorComment] = useMutation(mutation,{

    update(proxy){

        setOpen(false);

        if (callback){
            callback();
            
        }   

        if(!commentId){
          


            const data = proxy.readQuery({

                query: FETCH_POSTS_QUERY
            })
    
       
    
            var newData = {}
    
            newData.getPosts = data.getPosts
    
            newData.getPosts = newData.getPosts.filter((p)=> p.id !== postId);
    
            proxy.writeQuery({query: FETCH_POSTS_QUERY, data:newData})

        
           
           
        }
        
       
   
       

    },
    variables: {

        postId,
        commentId
    },onError(){

    }
})

    return (

        <div style={{float:"right"}}>
        <IconButton   onClick={handleClickOpen} size="small" >
         &nbsp;  <DeleteIcon  />
        </IconButton>

            <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Are you sure you want to delete this post? </DialogTitle>
        <DialogContent>
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deletePostorComment} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      </div>
    )
}

const DELETE_POST_MUTATION = gql`

mutation deletePost($postId: ID!){

deletePost(postId: $postId)

}

`
const DELETE_COMMENT_MUTATION = gql`

mutation deleteComment($postId: ID!,$commentId: ID!){

deleteComment(postId: $postId, commentId: $commentId){

    id
    comments{

        id username createdAt body 
    }
    commentCount
}

}

`

export default DeleteButton;