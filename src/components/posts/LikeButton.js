import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useMutation,gql} from '@apollo/client';
import {IconButton} from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite';
import {useSelector} from 'react-redux';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';


 function LikeButton({post: {id,likes,likeCount}}) {

    const [likePost] = useMutation(LIKE_POST_MUTATION,{

        variables: {postId: id},
        onError(err){

        }
    })
    const user = useSelector(state => state.user.user)
    const [liked,setLiked] = useState(false)
    useEffect(()=>{

        if(user && likes.find(like => like.username === user.username)){

            setLiked(true)

        }else{

            setLiked(false)
        }

    },[user,likes])

 const likeButton = user ? (

    liked ? (

        <FavoriteIcon color="secondary"  fontSize="small" /> 
    ) : (

        <FavoriteBorderIcon   fontSize="small" /> 

    )

 ) : (

    <FavoriteBorderIcon  fontSize="small" />
   

 )

    return (
        !user ? (
            <IconButton size="small" component={Link} to="/login" >
            {likeButton}&nbsp; 
           {likeCount} 
             &nbsp; &nbsp; 
         </IconButton> 
        ) : (

            <IconButton size="small" onClick={likePost} >
            {likeButton}&nbsp; 
           {likeCount} 
             &nbsp; &nbsp; 
         </IconButton> 
        )
       
    )
}

const LIKE_POST_MUTATION = gql`

mutation likePost($postId: ID!){

    likePost(postId: $postId){
        id
        likes{
            id username
        }
        likeCount

    }
}

`

export default LikeButton;