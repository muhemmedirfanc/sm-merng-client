import React from 'react'
import {TextField,Button} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import { gql ,useMutation} from '@apollo/client';

import {useForm} from '../util/hooks';
import {FETCH_POSTS_QUERY} from '../util/graphql'



function PostForm() {

const {values, onChange, onSubmit} = useForm(createPostCallback, {body: ''});

const [createPost, {error}] = useMutation(CREATE_POST_MUTATION, {

    variables: values,
    update(proxy,result){
     const data = proxy.readQuery({

            query: FETCH_POSTS_QUERY
       });
       var newData = {}
       newData.getPosts = data.getPosts
      
      newData.getPosts = [result.data.createPost, ...newData.getPosts];
      proxy.writeQuery({query: FETCH_POSTS_QUERY, data:newData  })
        values.body= ''
    },onError(err){

        
    }
})



function createPostCallback(){

    createPost()
}
    return (
        <form onSubmit={onSubmit}>
           <TextField  name="body" 
            type="text"
             variant="outlined" 
             label={error ? error.graphQLErrors[0].message : "Create Post"}
             error= {error ? true : false}
             onChange={onChange}
             value={values.body}
                fullWidth />
                <Button style={{marginTop:20}} variant="contained" color="primary"
                 size="small" 
                type="submit" > <CreateIcon fontSize="small"/> &nbsp; Submit  </Button>
        </form>
    )
}

const CREATE_POST_MUTATION = gql`

mutation createPost($body: String!){

createPost(body: $body){

    id body createdAt username 
    likes{

        id username createdAt
    }
    likeCount
    comments{

        id body username createdAt
    }
    commentCount
}

}

`

export default PostForm;
