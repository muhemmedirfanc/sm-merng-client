import React from 'react';
import App from './App';
import {InMemoryCache, createHttpLink, ApolloProvider, ApolloClient} from '@apollo/client';
import {setContext} from 'apollo-link-context';

const httpLink = createHttpLink({
    uri: 'http://localhost:5000'
})

const authLink = setContext(()=>{

    const token = localStorage.getItem('jwtToken')
    return{

        headers: {

            Authorization: token ? `Bearer ${token}` : '' 
        }
    }
})


const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({

        typePolicies: {
            Post: {
            fields: {
                comments: {
                    merge(existing, incoming){
                        return incoming
                      }
              },
              likes: {
                merge(existing, incoming){
                    return incoming
                  }
          }
            },
          },
          Query:{
            fields:{
                getPosts:{

                    merge(existing, incoming){
                        return incoming
                      }

                }
            }
          }
        },
       
    })
})


export default (

    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
)