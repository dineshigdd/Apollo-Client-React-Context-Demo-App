import {  gql } from '@apollo/client';

export const GET_ALL_POSTS = gql`
    query($limit: Int ){
        posts(options:{paginate : { limit: $limit }}){
          data{
            id
            title
          }
        }
      }
`;

export const SHOW_ALL_POSTS = gql`
query {
  posts {
    data {
      id
      title
    }
   
  }
}
`;

export const GET_POST = gql`
    query( $id: ID!){
      post(id: $id) {
        id
        title
        body
      }
    }`;